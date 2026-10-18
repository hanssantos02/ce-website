import test from 'node:test';
import assert from 'node:assert/strict';
import { deriveDashboard, dashboardFromProgress } from '../lib/dashboard/summary.ts';
import { getPublishedLessons } from '../content/published-lessons.ts';
import { getSubjects } from '../content/curriculum.ts';

const currentId='psad-statics-forces-vectors';
const row=(lesson_id,status='in_progress',updated_at='2026-10-17T01:00:00Z')=>({lesson_id,status,updated_at});
function catalog(){
 const base=getPublishedLessons()[0];
 return [
  {...base,lesson:{...base.lesson,id:'a',displayOrder:1}},
  {...base,lesson:{...base.lesson,id:'b',displayOrder:2}},
  {...base,module:{...base.module,id:'later-module',displayOrder:2},lesson:{...base.lesson,id:'c',displayOrder:1}},
  {...base,subject:getSubjects()[1],module:{...base.module,id:'mste-module',subjectId:'mste'},lesson:{...base.lesson,id:'d',displayOrder:1}},
 ];
}
test('real published registry gives accurate new-student counts and zero-content subjects',()=>{
 const view=deriveDashboard([]);
 assert.equal(view.available,2);assert.equal(view.completed,0);assert.equal(view.inProgress,0);
 assert.equal(view.continueLesson,undefined);assert.equal(view.recommendedLesson.lesson.id,currentId);
 assert.equal(view.hasProgress,false);assert.equal(view.allCompleted,false);
 assert.deepEqual(view.subjects.map(s=>[s.subject.id,s.available,s.completed,s.percentage]),[['psad',2,0,0],['mste',0,0,null],['hge',0,0,null]]);
});
test('completed published content is counted once; stale/planned records do not inflate totals',()=>{
 const view=deriveDashboard([row(currentId,'completed'),row(currentId,'completed'),row('psad-statics-equilibrium-particles','completed'),row('gone','completed')]);
 assert.equal(view.completed,1);assert.equal(view.available,2);assert.equal(view.inProgress,0);
 assert.equal(view.subjects[0].percentage,50);assert.equal(view.allCompleted,false);
 assert.equal(view.recommendedLesson.lesson.id,'psad-statics-free-body-diagrams');assert.equal(view.continueLesson,undefined);
 assert.equal(view.completedLessons.length,1);assert.equal(view.ignoredRecords,2);
});
test('out-of-order completion never fills earlier lessons or requires prerequisites',()=>{
 const entries=catalog();entries[0].lesson={...entries[0].lesson,prerequisiteIds:['not-completed']};
 const view=deriveDashboard([row('c','completed')],entries);
 assert.equal(view.completed,1);assert.equal(view.available,4);assert.equal(view.subjects[0].percentage,33);
 assert.equal(view.recommendedLesson.lesson.id,'a');assert.equal(view.continueLesson,undefined);
});
test('Continue Learning uses latest progress update and deterministic curriculum ties',()=>{
 const entries=catalog();
 const view=deriveDashboard([row('b'),row('a'),row('c','in_progress','2026-10-17T02:00:00Z')],entries);
 assert.equal(view.continueLesson.lesson.id,'c');assert.equal(view.recommendedLesson.lesson.id,'c');
 for(const rows of [[row('b'),row('a')],[row('a'),row('b')]])assert.equal(deriveDashboard(rows,entries).continueLesson.lesson.id,'a');
 const missing=deriveDashboard([row('b','in_progress','bad timestamp'),{...row('a'),updated_at:undefined}],entries);
 assert.equal(missing.continueLesson.lesson.id,'a');
});
test('Recommended Next prefers active module, then subject, then global order',()=>{
 const entries=catalog();
 assert.equal(deriveDashboard([row('b','completed')],entries).recommendedLesson.lesson.id,'a');
 assert.equal(deriveDashboard([row('a','completed'),row('b','completed')],entries).recommendedLesson.lesson.id,'c');
 assert.equal(deriveDashboard([row('a','completed'),row('b','completed'),row('c','completed')],entries).recommendedLesson.lesson.id,'d');
 assert.equal(deriveDashboard([],entries.toReversed()).recommendedLesson.lesson.id,'a');
});
test('empty catalog has no invalid percentages, fallback links or completed-all claim',()=>{
 const view=deriveDashboard([row('gone')],[]);
 assert.equal(view.available,0);assert.equal(view.allCompleted,false);
 assert.equal(view.continueLesson,undefined);assert.equal(view.recommendedLesson,undefined);
 assert(view.subjects.every(s=>s.percentage===null));
});
test('failed or expired progress loads never become a zero-progress dashboard',()=>{
 for(const kind of ['unauthenticated','unavailable'])assert.deepEqual(dashboardFromProgress({kind}),{kind});
 const result=dashboardFromProgress({kind:'ready',userId:'private-user',statuses:{},rows:[]});
 assert.equal(result.kind,'ready');assert.equal(result.dashboard.completed,0);
 assert(!JSON.stringify(result).includes('private-user'));
});
