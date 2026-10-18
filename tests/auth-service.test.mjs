import assert from 'node:assert/strict';
import test from 'node:test';
import { performAuth, confirmEmailLink, exchangeAuthCode } from '../lib/auth/service.ts';

const form = {email:'learner@example.invalid',password:'example-password',confirmPassword:'example-password'};
function provider(overrides={}) {
 const calls=[];const auth={};
 for(const method of ['signUp','signInWithPassword','resetPasswordForEmail','updateUser','signOut','verifyOtp','exchangeCodeForSession','getUser']) auth[method]=async (...args)=>{calls.push({method,args});return method==='getUser'?{data:{user:{id:'user-a',email_confirmed_at:'2026-10-14'}},error:null}:{data:{user:{id:'user-a'},session:['verifyOtp','exchangeCodeForSession'].includes(method)?{}:null},error:null};};
 Object.assign(auth,overrides);return {auth,calls};
}
test('server validation prevents provider calls and never returns passwords in state',async()=>{
 const p=provider();const result=await performAuth('signup',{...form,confirmPassword:'different'},p.auth,'http://localhost:3000');assert.equal(result.status,'error');assert.deepEqual(p.calls,[]);assert(!JSON.stringify(result).includes('example-password'));
});
test('registration pending and authenticated registration are distinct',async()=>{
 const p=provider();const pending=await performAuth('signup',form,p.auth,'http://localhost:3000');assert.equal(pending.status,'pending-email');assert.equal(pending.destination,undefined);assert.equal(p.calls[0].args[0].options.emailRedirectTo,'http://localhost:3000/auth/callback?next=/account');
 const authenticated=await performAuth('signup',form,provider({signUp:async()=>({data:{session:{},user:{id:'a'}},error:null})}).auth,'http://localhost:3000');assert.equal(authenticated.destination,'/account');
});
test('provider error and thrown network failures are sanitized',async()=>{
 for(const result of [{error:{code:'invalid_credentials',message:'private raw error'},data:{}},{error:{code:'over_request_rate_limit'},data:{}}]){const p=provider({signInWithPassword:async()=>result});const state=await performAuth('login',form,p.auth,'http://localhost:3000');assert.equal(state.status,'error');assert(!JSON.stringify(state).includes('private raw error'));}
 const p=provider({signInWithPassword:async()=>{throw new Error('sensitive transport details');}});const state=await performAuth('login',form,p.auth,'http://localhost:3000');assert.equal(state.status,'error');assert(!JSON.stringify(state).includes('sensitive'));
});
test('login redirects only when the provider returns an authenticated session',async()=>{
 const p=provider({signInWithPassword:async()=>({data:{user:{id:'a'},session:{}},error:null})});assert.equal((await performAuth('login',{...form,next:'//evil.example'},p.auth,'http://localhost:3000')).destination,'/account');
 assert.equal((await performAuth('login',form,provider().auth,'http://localhost:3000')).status,'error');
});
test('recovery uses a fixed destination and generic acknowledgment',async()=>{
 const p=provider();const result=await performAuth('forgot-password',form,p.auth,'http://localhost:3000');assert.equal(result.status,'pending-email');assert(result.message.includes('If'));assert.equal(p.calls[0].args[1].redirectTo,'http://localhost:3000/auth/callback?next=/update-password');
});
test('password updates require fresh verified identity and sign-out is explicitly local',async()=>{
 const denied=provider({getUser:async()=>({data:{user:null},error:{code:'session_not_found'}})});assert.equal((await performAuth('update-password',form,denied.auth,'http://localhost:3000')).status,'error');assert(!denied.calls.some(c=>c.method==='updateUser'));
 const accepted=provider();assert.equal((await performAuth('update-password',form,accepted.auth,'http://localhost:3000')).status,'success');assert(accepted.calls.some(c=>c.method==='getUser'));assert(accepted.calls.some(c=>c.method==='updateUser'));
 const signedOut=provider();assert.equal((await performAuth('signout',{},signedOut.auth,'http://localhost:3000')).destination,'/login');assert.deepEqual(signedOut.calls[0].args,[{scope:'local'}]);
 const failed=provider({signOut:async()=>({error:{code:'unexpected_failure'}})});const unconfirmed=await performAuth('signout',{},failed.auth,'http://localhost:3000');assert.equal(unconfirmed.status,'error');assert.equal(unconfirmed.destination,'/login?notice=signout-unconfirmed');
});
test('explicit email confirmation and PKCE exchange do not echo credentials',async()=>{
 const p=provider();assert.equal((await confirmEmailLink({tokenHash:'opaque-private-hash',type:'recovery'},p.auth)).destination,'/update-password');assert.deepEqual(p.calls[0].args,[{token_hash:'opaque-private-hash',type:'recovery'}]);
 const failed=provider({verifyOtp:async()=>({error:{code:'otp_expired',message:'opaque-private-hash'},data:{}})});const response=await confirmEmailLink({tokenHash:'opaque-private-hash',type:'email'},failed.auth);assert.equal(response.status,'error');assert(!JSON.stringify(response).includes('opaque-private-hash'));
 const codeProvider=provider();assert.equal((await exchangeAuthCode({code:'private-code',destination:'/account'},codeProvider.auth)).destination,'/account');assert.deepEqual(codeProvider.calls[0].args,['private-code']);
});
