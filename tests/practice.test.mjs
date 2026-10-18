import test from 'node:test';
import assert from 'node:assert/strict';
import { practiceQuestions } from '../content/practice-questions.ts';
import { getPracticeQuestions, validatePracticeBank, validateQuestion } from '../lib/practice/questions.ts';
import { initialAttempt, updateAttempt, gradeAnswer } from '../lib/practice/state.ts';
import { renderPracticeMath } from '../lib/practice/math.ts';

const lessonId='psad-statics-forces-vectors';
test('seven original questions have valid stable metadata and deterministic lesson-scoped order',()=>{
 assert.equal(practiceQuestions.length,7);
 assert.deepEqual(validatePracticeBank(practiceQuestions),[]);
 const questions=getPracticeQuestions(lessonId);
 assert.equal(questions.length,5);
 assert.deepEqual(questions.map(q=>q.displayOrder),[1,2,3,4,5]);
 assert.deepEqual(getPracticeQuestions('psad-statics-free-body-diagrams').map(q=>q.displayOrder),[1,2]);
 assert.deepEqual(getPracticeQuestions(lessonId,[...practiceQuestions].reverse()).map(q=>q.id),questions.map(q=>q.id));
 for(const id of ['missing','constructor','psad-statics-equilibrium-particles','mste-mathematics'])assert.deepEqual(getPracticeQuestions(id),[]);
});
test('invalid, duplicate, unchecked and unpublished questions are rejected or excluded',()=>{
 const source=practiceQuestions[0];
 const invalids=[{...source,id:''},{...source,lessonId:'missing'},{...source,type:'essay'},{...source,status:'invalid'},
  {...source,correctOptionId:'missing'},{...source,options:source.options.slice(0,1)},
  {...source,options:[source.options[0],source.options[0]]},{...source,displayOrder:0},
  {...source,explanation:''},{...source,reviewStatus:'unchecked'},
  {...source,options:source.options.map(o=>({...o,text:'same answer'}))},
  {...source,solution:{...source.solution,steps:[]}}];
 for(const q of invalids){assert(validateQuestion(q).length>0,JSON.stringify(q));assert.deepEqual(getPracticeQuestions(lessonId,[q]),[]);}
 assert(validatePracticeBank([source,source]).some(message=>message.includes('duplicate')));
 assert.deepEqual(getPracticeQuestions(lessonId,[source,source]),[]);
 assert.deepEqual(getPracticeQuestions(lessonId,[{...source,status:'draft'}]),[]);
});
test('answers are graded using stable IDs, not displayed wording or option positions',()=>{
 for(const q of practiceQuestions){
  assert.equal(gradeAnswer(q,q.correctOptionId),true);
  for(const option of q.options.filter(o=>o.id!==q.correctOptionId))assert.equal(gradeAnswer(q,option.id),false);
  assert.equal(gradeAnswer(q,'unknown'),undefined);
  assert.equal(gradeAnswer({...q,correctOptionId:'missing'},q.options[0].id),undefined);
  assert.equal(gradeAnswer({...q,options:[...q.options].reverse().map(o=>({...o,text:'Changed visible text'}))},q.correctOptionId),true);
 }
});
test('selection, guarded submission, repeat submission and retry have predictable independent states',()=>{
 const q=practiceQuestions[0],other=practiceQuestions[1];const blank=initialAttempt();
 assert.deepEqual(updateAttempt(q,blank,{type:'submit'}),blank);
 assert.deepEqual(updateAttempt(q,blank,{type:'select',optionId:'unknown'}),blank);
 let state=updateAttempt(q,blank,{type:'select',optionId:q.options[0].id});
 assert.equal(state.status,'selected');
 state=updateAttempt(q,state,{type:'select',optionId:q.correctOptionId});
 assert.equal(state.selectedOptionId,q.correctOptionId);
 state=updateAttempt(q,state,{type:'submit'});assert.equal(state.status,'submitted');assert.equal(state.correct,true);
 assert.deepEqual(updateAttempt(q,state,{type:'submit'}),state);
 assert.deepEqual(updateAttempt(q,state,{type:'select',optionId:q.options[0].id}),state);
 assert.deepEqual(updateAttempt(q,state,{type:'retry'}),blank);
 assert.deepEqual(blank,initialAttempt());assert.deepEqual(updateAttempt(other,blank,{type:'submit'}),blank);
 const wrong=updateAttempt(q,updateAttempt(q,blank,{type:'select',optionId:q.options.find(o=>o.id!==q.correctOptionId).id}),{type:'submit'});
 assert.equal(wrong.status,'submitted');assert.equal(wrong.correct,false);
});
test('the four numerical answers and displayed solutions match independent SI calculations',()=>{
 const radians=angle=>angle*Math.PI/180;
 const expectations=[500*Math.cos(radians(30)),300*Math.sin(radians(30)),Math.hypot(300,400),200*Math.cos(radians(120))];
 practiceQuestions.slice(0,4).forEach((q,i)=>{
  const correct=q.options.find(o=>o.id===q.correctOptionId);const expected=Number(expectations[i].toFixed(2));
  assert.equal(Number.parseFloat(correct.text),expected,q.id);assert.match(correct.text,/ N$/);
  assert.equal(q.options.filter(o=>Number.parseFloat(o.text)===expected).length,1);
  assert.equal(new Set(q.options.map(o=>Number.parseFloat(o.text))).size,4);
  assert.equal(Number.parseFloat(q.solution.answer),expected);
  assert(q.solution.steps.some(step=>step.equation?.includes(expected.toFixed(2))));
  if(i!==2){assert(q.given.includes('counterclockwise'));assert(q.given.includes('positive x-axis'));}
 });
 const concept=practiceQuestions[4];assert.match(concept.options.find(o=>o.id===concept.correctOptionId).text,/magnitude and direction/);
 assert.match(concept.explanation,/scalar/);
});
test('all authored equations render strict KaTeX HTML and MathML; malformed syntax fails',()=>{
 const equations=practiceQuestions.flatMap(q=>q.solution.steps.flatMap(step=>step.equation?[step.equation]:[]));
 assert(equations.length>=12);
 for(const equation of equations){const html=renderPracticeMath(equation);assert(html.includes('katex-mathml'));assert(!html.includes('katex-error'));}
 assert.throws(()=>renderPracticeMath(String.raw`\notARealKatexCommand`));
 assert(!renderPracticeMath(String.raw`\href{javascript:alert(1)}{bad}`).includes('href="javascript:'));
});
