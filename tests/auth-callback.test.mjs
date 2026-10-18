import assert from 'node:assert/strict';
import test from 'node:test';
import { readStagedEmailLink, emailLinkOptions } from '../lib/auth/email-link.ts';

test('staged email credentials are limited to explicitly supported verification intent',()=>{
 assert.equal(readStagedEmailLink(),undefined);
 for(const value of ['null','invalid JSON','{}','{"tokenHash":false,"type":"email"}','{"tokenHash":"x","type":"invite"}', 'x'.repeat(4097)]) assert.equal(readStagedEmailLink(value),undefined);
 assert.deepEqual(readStagedEmailLink('{"tokenHash":"opaque-hash","type":"email"}'),{tokenHash:'opaque-hash',type:'email'});
 assert.equal(emailLinkOptions.httpOnly,true);assert.equal(emailLinkOptions.sameSite,'lax');assert.equal(emailLinkOptions.path,'/auth');assert.equal(emailLinkOptions.maxAge,600);
});
