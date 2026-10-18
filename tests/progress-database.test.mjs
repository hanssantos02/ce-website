import test from 'node:test';
import { URL } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { PGlite } from '@electric-sql/pglite';

const userA='00000000-0000-4000-8000-000000000001';
const userB='00000000-0000-4000-8000-000000000002';
const migration=new URL('../supabase/migrations/20261016000100_create_lesson_progress.sql',import.meta.url);

// Real PostgreSQL engine; these fixtures model Supabase role/identity plumbing only.
async function database(){
 const sql=await readFile(migration,'utf8');
 const db=new PGlite();
 await db.exec(`create role anon nologin; create role authenticated nologin; create schema auth;
 create table auth.users(id uuid primary key);
 create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
 grant usage on schema public,auth to anon,authenticated;
 grant execute on function auth.uid() to anon,authenticated;
 insert into auth.users values ('${userA}'),('${userB}');`);
 await db.exec(sql);
 return db;
}
async function asUser(db,id,sql,params=[]){
 return db.transaction(async tx=>{
  await tx.exec(`set local role ${id ? 'authenticated':'anon'}`);
  await tx.query("select set_config('request.jwt.claim.sub',$1,true)",[id??'']);
  return tx.query(sql,params);
 });
}
const insert='insert into public.lesson_progress(user_id,lesson_id,status) values($1,$2,$3) on conflict(user_id,lesson_id) do update set status=excluded.status returning *';

test('migration enforces row ownership for every CRUD operation and rejects anonymous access',async()=>{
 const db=await database();
 try{
  await asUser(db,userA,insert,[userA,'lesson-a','in_progress']);
  await asUser(db,userB,insert,[userB,'lesson-b','completed']);
  assert.deepEqual((await asUser(db,userA,'select lesson_id from public.lesson_progress')).rows.map(r=>r.lesson_id),['lesson-a']);
  for(const sql of ['select * from public.lesson_progress','insert into public.lesson_progress(user_id,lesson_id,status) values($1,\'anon-lesson\',\'completed\')','update public.lesson_progress set status=\'completed\'','delete from public.lesson_progress'])
   await assert.rejects(asUser(db,null,sql,sql.includes('$1')?[userA]:[]),e=>e.code==='42501');
  await assert.rejects(asUser(db,userA,insert,[userB,'forged-owner','completed']),e=>e.code==='42501');
  await assert.rejects(asUser(db,userA,insert,[userB,'lesson-b','in_progress']),e=>e.code==='42501');
  assert.equal((await asUser(db,userA,"update public.lesson_progress set status='in_progress' where user_id=$1 returning *",[userB])).rows.length,0);
  assert.equal((await asUser(db,userA,'delete from public.lesson_progress where user_id=$1 returning *',[userB])).rows.length,0);
  await assert.rejects(asUser(db,userA,'update public.lesson_progress set user_id=$1 where user_id=$2',[userB,userA]));
  assert.equal((await asUser(db,userB,'select status from public.lesson_progress')).rows[0].status,'completed');
  await asUser(db,userA,"update public.lesson_progress set status='completed' where lesson_id='lesson-a'");
  assert.equal((await asUser(db,userA,'delete from public.lesson_progress returning *')).rows.length,1);
  const security=(await db.query("select relrowsecurity from pg_class where oid='public.lesson_progress'::regclass")).rows[0];
  assert.equal(security.relrowsecurity,true);
  assert.equal((await db.query("select count(*)::int as count from pg_policies where schemaname='public' and tablename='lesson_progress'")).rows[0].count,4);
 }finally{await db.close();}
});

test('upserts are idempotent, timestamps are server-owned, and resets affect only one lesson',async()=>{
 const db=await database();
 try{
  const first=(await asUser(db,userA,insert,[userA,'lesson-7','in_progress'])).rows[0];
  await delay(10);
  const again=(await asUser(db,userA,insert,[userA,'lesson-7','in_progress'])).rows[0];
  assert.equal(new Date(first.started_at).getTime(),new Date(again.started_at).getTime());assert.equal(new Date(first.updated_at).getTime(),new Date(again.updated_at).getTime());
  const done=(await asUser(db,userA,insert,[userA,'lesson-7','completed'])).rows[0];assert(done.completed_at);
  await delay(10);
  const repeated=(await asUser(db,userA,insert,[userA,'lesson-7','completed'])).rows[0];
  assert.equal(new Date(done.completed_at).getTime(),new Date(repeated.completed_at).getTime());assert.equal(new Date(done.updated_at).getTime(),new Date(repeated.updated_at).getTime());
  const resumed=(await asUser(db,userA,insert,[userA,'lesson-7','in_progress'])).rows[0];assert.equal(resumed.completed_at,null);assert.equal(new Date(resumed.started_at).getTime(),new Date(first.started_at).getTime());
  const tampered=(await asUser(db,userA,"update public.lesson_progress set started_at='2000-01-01',updated_at='2000-01-01',completed_at='2000-01-01' returning *")).rows[0];
  assert.equal(new Date(tampered.started_at).getTime(),new Date(first.started_at).getTime());assert.equal(new Date(tampered.updated_at).getTime(),new Date(resumed.updated_at).getTime());assert.equal(tampered.completed_at,null);
  await asUser(db,userA,insert,[userA,'lesson-1','completed']);
  await asUser(db,userA,"delete from public.lesson_progress where lesson_id='lesson-7'");
  await asUser(db,userA,"delete from public.lesson_progress where lesson_id='lesson-7'");
  assert.deepEqual((await asUser(db,userA,'select lesson_id,status from public.lesson_progress')).rows,[{lesson_id:'lesson-1',status:'completed'}]);
  await assert.rejects(asUser(db,userA,insert,[userA,'bad-status','not_started']),e=>e.code==='23514');
  await assert.rejects(asUser(db,userA,"update public.lesson_progress set lesson_id='replacement'"),e=>e.code==='23514');
  // No database curriculum registry: direct clients can write only their own arbitrary IDs.
  // Application mutations and rendered reads enforce published content separately.
  await asUser(db,userA,insert,[userA,'direct-client-unknown-id','in_progress']);
  const restarted=(await asUser(db,userA,insert,[userA,'lesson-7','in_progress'])).rows[0];
  assert(new Date(restarted.started_at).getTime()>new Date(first.started_at).getTime());
  await asUser(db,userB,insert,[userB,'lesson-b','completed']);
  await db.query('delete from auth.users where id=$1',[userA]);
  assert.deepEqual((await db.query('select user_id,lesson_id,status from public.lesson_progress')).rows,[{user_id:userB,lesson_id:'lesson-b',status:'completed'}]);
 }finally{await db.close();}
});
