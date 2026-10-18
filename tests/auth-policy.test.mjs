import assert from 'node:assert/strict';
import test from 'node:test';
import { safeDestination, validateAuthFields, parseEmailLink, parseCodeCallback, readSupabaseConfig, resolveSiteUrl } from '../lib/auth/policy.ts';

test('post-auth destinations use an exact allowlist and reject open-redirect variants', () => {
 for (const next of ['https://evil.example','//evil.example','/\\evil.example','/%2f%2fevil.example','/account?next=https://evil.example','/account#x','/account/','constructor',null]) assert.equal(safeDestination(next),'/account');
 for (const next of ['/account','/update-password','/curriculum','/dashboard']) assert.equal(safeDestination(next),next);
});
test('validation rejects malformed input and preserves passwords without trimming', () => {
 assert(validateAuthFields('signup',{email:'bad',password:'x',confirmPassword:'y'}).errors.email);
 assert(validateAuthFields('signup',{email:'a@example.invalid',password:' x ',confirmPassword:'x'}).errors.confirmPassword);
 const value=validateAuthFields('signup',{email:' a@example.invalid ',password:' x ',confirmPassword:' x '});assert.deepEqual(value.errors,{});assert.equal(value.password,' x ');assert.equal(value.email,'a@example.invalid');
 assert(validateAuthFields('login',{email:['a@example.invalid'],password:''}).errors.email);
 assert(validateAuthFields('update-password',{}).errors.password);
});
test('callbacks separate token-hash intent from PKCE exchange and reject parameter pollution', () => {
 assert.deepEqual(parseEmailLink('?token_hash=example-hash&type=recovery'),{tokenHash:'example-hash',type:'recovery'});
 assert.equal(parseEmailLink('?token_hash=x&type=invite'),undefined);
 assert.equal(parseEmailLink('?token_hash=x&token_hash=y&type=email'),undefined);
 assert.equal(parseEmailLink('?type=email'),undefined);
 assert.equal(parseCodeCallback('?code=x&code=y'),undefined);
 assert.deepEqual(parseCodeCallback('?code=opaque-code&next=//evil.example'),{code:'opaque-code',destination:'/account'});
});
test('configuration rejects privileged keys and requires a trusted canonical production origin', () => {
 const url='https://example.supabase.co';assert.equal(readSupabaseConfig(url,'sb_secret_no'),undefined);assert.equal(readSupabaseConfig(url,''),undefined);
 assert.equal(readSupabaseConfig('http://evil.example','sb_publishable_example'),undefined);
 assert.equal(readSupabaseConfig(url,'service_role'),undefined);
 assert.deepEqual(readSupabaseConfig(url,'sb_publishable_testing'),{url,key:'sb_publishable_testing'});
 assert.equal(resolveSiteUrl(undefined,false),'http://localhost:3000');
 assert.equal(resolveSiteUrl(undefined,true),undefined);
 assert.equal(resolveSiteUrl('https://cepath.example/account',true),undefined);
 assert.equal(resolveSiteUrl('https://cepath.example',true),'https://cepath.example');
 assert.equal(resolveSiteUrl('https://user:secret@cepath.example',true),undefined);
});

test('login return paths include only canonical published lesson destinations',()=>{
 const lesson='/curriculum/psad/engineering-mechanics-statics/forces-and-vectors';
 assert.equal(safeDestination(lesson),lesson);
 for(const bad of [lesson+'?next=//evil.example',lesson+'#section',lesson+'/',lesson.replace('forces-and-vectors','free-body-diagrams'),'/curriculum/psad/unknown','/curriculum/%70sad/engineering-mechanics-statics/forces-and-vectors'])assert.equal(safeDestination(bad),'/account');
});
