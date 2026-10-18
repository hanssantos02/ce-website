import test from 'node:test';
import assert from 'node:assert/strict';
import { performProgress, loadProgress } from '../lib/progress/service.ts';
import { getPublishedLesson } from '../content/published-lessons.ts';
import { classifyIdentityError } from '../lib/progress/policy.ts';
const lesson='psad-statics-forces-vectors';
function gateway(identity={kind:'authenticated',userId:'verified-user'}){
 const rows=new Map();const calls=[];
 return {rows,calls,verifyIdentity:async()=>identity,
  read:async(userId,ids)=>{calls.push(['read',userId,ids]);return ids.filter(id=>rows.has(id)).map(id=>({lesson_id:id,status:rows.get(id)}));},
  upsert:async(userId,id,status)=>{calls.push(['upsert',userId,id,status]);rows.set(id,status);return{lesson_id:id,status};},
  remove:async(userId,id)=>{calls.push(['remove',userId,id]);rows.delete(id);}
 };
}
test('published eligibility uses stable IDs and actual registered content, without requiring earlier progress',()=>{
 assert(getPublishedLesson(lesson));
 for(const id of ['unknown','psad-statics-free-body-diagrams','constructor',''])assert.equal(getPublishedLesson(id),undefined);
});
test('no record is Not Started; explicit updates and resets return confirmed statuses',async()=>{
 const db=gateway();assert.deepEqual((await loadProgress([lesson],db)).statuses,{});
 for(const intent of ['in_progress','completed','completed','in_progress']){
  const r=await performProgress({lessonId:lesson,intent,user_id:'forged-user'},db);
  assert.equal(r.kind,'saved');assert.equal(r.status,intent);assert.equal(db.rows.size,1);
 }
 assert(db.calls.filter(c=>c[0]==='upsert').every(c=>c[1]==='verified-user'));
 assert.equal((await performProgress({lessonId:lesson,intent:'reset'},db)).status,'not_started');
 assert.equal((await performProgress({lessonId:lesson,intent:'reset'},db)).status,'not_started');
 assert.equal(db.rows.size,0);
});
test('malformed, unknown and unpublished mutations never reach storage',async()=>{
 const db=gateway();
 for(const fields of [{lessonId:'unknown',intent:'completed'},{lessonId:'psad-statics-free-body-diagrams',intent:'completed'},{lessonId:lesson,intent:'not_started'},{lessonId:[lesson],intent:'completed'}])assert.equal((await performProgress(fields,db)).kind,'error');
 assert.equal(db.calls.length,0);
});
test('anonymous/expired and unavailable identity have distinct safe feedback and no database calls',async()=>{
 for(const kind of ['unauthenticated','unavailable']){
  const db=gateway({kind});assert.equal((await loadProgress([lesson],db)).kind,kind);
  const result=await performProgress({lessonId:lesson,intent:'completed'},db);assert.equal(result.kind,kind==='unavailable'?'error':'unauthenticated');assert.equal(db.calls.length,0);
 }
 assert.equal(classifyIdentityError({name:'AuthSessionMissingError'}).kind,'unauthenticated');
 assert.equal(classifyIdentityError({code:'refresh_token_not_found',status:400}).kind,'unauthenticated');
 assert.equal(classifyIdentityError({name:'AuthRetryableFetchError',status:0}).kind,'unavailable');
});
test('reads are scoped and deduplicated; failures and invalid rows never invent Not Started',async()=>{
 const db=gateway();await loadProgress([lesson,lesson,'unknown'],db);assert.deepEqual(db.calls[0],['read','verified-user',[lesson]]);
 db.read=async()=>{throw Error('private provider detail');};assert.equal((await loadProgress([lesson],db)).kind,'unavailable');
 db.read=async()=>[{lesson_id:lesson,status:'fake-state'}];assert.equal((await loadProgress([lesson],db)).kind,'unavailable');
});
test('verified scoped reads preserve database activity timestamps for the dashboard',async()=>{
 const db=gateway();const rows=[{lesson_id:lesson,status:'in_progress',updated_at:'2026-10-17T01:00:00Z'}];
 db.read=async(userId,ids)=>{assert.equal(userId,'verified-user');assert.deepEqual(ids,[lesson]);return rows;};
 assert.deepEqual((await loadProgress([lesson],db)).rows,rows);
});
test('failed or unconfirmed writes remain errors and retry is safe',async()=>{
 const db=gateway();db.upsert=async()=>{throw Error('secret provider detail');};
 let r=await performProgress({lessonId:lesson,intent:'completed'},db);assert.equal(r.kind,'error');assert(!JSON.stringify(r).includes('secret'));
 db.upsert=async()=>({lesson_id:lesson,status:'in_progress'});assert.equal((await performProgress({lessonId:lesson,intent:'completed'},db)).kind,'error');
 db.rows.set(lesson,'completed');db.remove=async()=>{};
 assert.equal((await performProgress({lessonId:lesson,intent:'reset'},db)).kind,'error');
});
test('reload only reads; independent published lessons can complete out of order',async()=>{
 const db=gateway();const available=id=>['lesson-1','lesson-7'].includes(id)?{lesson:{id}}:undefined;
 assert.equal((await performProgress({lessonId:'lesson-7',intent:'completed'},db,available)).status,'completed');
 assert(!db.rows.has('lesson-1'));
 assert.equal((await performProgress({lessonId:'lesson-1',intent:'reload'},db,available)).status,'not_started');
 assert.equal(db.rows.size,1);
});


test('a session expiring between identity verification and storage cannot report a save',async()=>{
 const db=gateway();db.upsert=async()=>{throw {status:401};};
 assert.equal((await performProgress({lessonId:lesson,intent:'completed'},db)).kind,'unauthenticated');
});
