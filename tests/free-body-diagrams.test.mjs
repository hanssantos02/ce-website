import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {URL} from 'node:url';
import {Buffer} from 'node:buffer';
import ts from 'typescript';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {compile, evaluate} from '@mdx-js/mdx';
import * as jsxRuntime from 'react/jsx-runtime';
import {mdxOptions} from '../mdx-options.mjs';
import {getLessonById, getLessonHref, getRecommendedNeighbors} from '../content/curriculum.ts';
import {getPublishedLesson, getPublishedLessons} from '../content/published-lessons.ts';
import {freeBodyDiagramQuestions} from '../content/free-body-diagrams-questions.ts';
import {validatePracticeBank, validateQuestion, getPracticeQuestions} from '../lib/practice/questions.ts';
import {gradeAnswer} from '../lib/practice/state.ts';
import {renderPracticeMath} from '../lib/practice/math.ts';
const id='psad-statics-free-body-diagrams';
async function options(){
 const result={};
 for(const key of ['remarkPlugins','rehypePlugins'])result[key]=await Promise.all(mdxOptions[key].map(async entry=>{
  const [name,settings]=Array.isArray(entry)?entry:[entry];return [(await import(name)).default,settings];
 }));return result;
}
test('approved FBD publication preserves identity and enables public navigation, progress and practice',()=>{
 const {subject,module,lesson}=getLessonById(id);
 assert.equal(lesson.slug,'free-body-diagrams');assert.equal(lesson.displayOrder,2);
 assert.equal(lesson.availability,'published');assert.deepEqual(lesson.prerequisiteIds,['psad-statics-forces-vectors']);
 assert.equal(getLessonHref(subject,module,lesson),'/curriculum/psad/engineering-mechanics-statics/free-body-diagrams');assert(getPublishedLesson(id));
 assert.equal(getPublishedLessons().length,3);assert.deepEqual(getPracticeQuestions(id),freeBodyDiagramQuestions);
 assert.equal(getRecommendedNeighbors(module,lesson.id).previous.id,'psad-statics-forces-vectors');
});
test('trusted published lesson compiles with nine measurable objectives, eight sections and review status',async()=>{
 const source=await readFile(new URL('../content/lessons/free-body-diagrams.mdx',import.meta.url),'utf8');
 const opts=await options();const compiled=await compile(source,opts);
 assert.deepEqual(compiled.messages,[]);assert(String(compiled).includes('katex-mathml'));
 const doc=await evaluate(source,{...opts,...jsxRuntime});assert.equal(doc.lessonId,id);
 assert.equal(doc.learningObjectives.length,9);assert.equal(doc.sections.length,8);
 assert.equal(new Set(doc.sections.map(s=>s.id)).size,8);assert(!/draft|not published/i.test(doc.editorialStatus));
 assert.match(doc.editorialStatus,/Independent academic review pending/);
 assert(source.includes('<BlockFreeBodyDiagram />'));assert(source.includes('<SupportReactionsDiagrams />'));assert(source.includes('<BeamFreeBodyDiagram />'));
});
test('exactly two published questions have complete checked explanations, valid keys and strict equations',()=>{
 assert.equal(freeBodyDiagramQuestions.length,2);assert.deepEqual(validatePracticeBank(freeBodyDiagramQuestions),[]);
 assert.deepEqual(freeBodyDiagramQuestions.map(q=>q.displayOrder),[1,2]);
 for(const q of freeBodyDiagramQuestions){
  assert.equal(q.lessonId,id);assert.equal(q.status,'published');assert.equal(q.reviewStatus,'source-calculation-checked');
  assert.deepEqual(validateQuestion(q),[]);
  assert.equal(gradeAnswer(q,q.correctOptionId),true);
  for(const o of q.options)assert.equal(gradeAnswer(q,o.id),o.id===q.correctOptionId);
  for(const step of q.solution.steps)if(step.equation)assert(renderPracticeMath(step.equation).includes('katex-mathml'));
 }
 const support=freeBodyDiagramQuestions[0];assert.match(support.given,/frictionless/);assert.match(support.given,/horizontal/);
 assert.match(support.options.find(o=>o.id===support.correctOptionId).text,/vertical force/);
});
test('independent block/beam calculations and numerical practice satisfy all equilibrium residuals',async()=>{
 const source=await readFile(new URL('../content/lessons/free-body-diagrams.mdx',import.meta.url),'utf8');
 const weight=20*9.81;assert(Math.abs(weight-196.2)<1e-10);assert.equal(weight.toFixed(2),'196.20');
 assert(source.includes('196.20'));assert(source.includes('smooth'));assert(source.includes('self-weight'));
 const solve=(load,x,L)=>({ax:0,by:load*x/L,ay:load-load*x/L});
 const symmetric=solve(12,3,6);assert.deepEqual(symmetric,{ax:0,by:6,ay:6});
 assert.equal(symmetric.ay+symmetric.by-12,0);assert.equal(symmetric.by*6-12*3,0);assert.equal(-symmetric.ay*6+12*3,0);
 assert(source.includes('6\\,\\mathrm{kN}'));assert(source.includes('36\\,\\mathrm{kN}'));
 const practice=solve(10,2,5);assert.deepEqual(practice,{ax:0,by:4,ay:6});
 assert.equal(practice.ay+practice.by-10,0);assert.equal(practice.by*5-10*2,0);assert.equal(-practice.ay*5+10*3,0);
 const q=freeBodyDiagramQuestions[1],correct=q.options.find(o=>o.id===q.correctOptionId);
 assert.equal(Number.parseFloat(correct.text),practice.by);assert.equal(Number.parseFloat(q.solution.answer),practice.by);
 assert.equal(q.options.filter(o=>(o.text.includes('downward')?-1:1)*Number.parseFloat(o.text)===practice.by).length,1);
 assert(q.solution.steps.some(s=>s.equation?.includes('4.00')));assert.match(q.given,/5 m/);assert.match(q.given,/2 m/);
});

test('textbook extension develops moments and checks the asymmetric reaction derivation',async()=>{
 const source=await readFile(new URL('../content/lessons/free-body-diagrams.mdx',import.meta.url),'utf8');
 assert(source.includes('fbd-off-centre-example'));
 assert(source.includes('B_y=\\frac{Pa}{L}'));
 // Independent force and moment residuals, including the endpoint limits.
 for(const a of [0,2,3,6]){
  const P=12,L=6,by=P*a/L,ay=P-by;
  assert.equal(ay+by-P,0);assert.equal(by*L-P*a,0);assert.equal(-ay*L+P*(L-a),0);
  if(a===2){assert.equal(ay,8);assert.equal(by,4);}
 }
 const x=2,y=1,fx=3,fy=4;
 const moment=x*fy-y*fx;assert.equal(moment,5);
 // Sliding along the same force line leaves the external moment unchanged.
 assert.equal((x+2*fx)*fy-(y+2*fy)*fx,moment);
 assert(source.includes('xF_y-yF_x'));assert(source.includes('d_\\perp'));
 const result=await compile(source,await options());assert.deepEqual(result.messages,[]);
});

test('reused beam figures preserve physical lever arms and have unique accessible references',async()=>{
 const source=await readFile(new URL('../components/lesson/free-body-diagrams.tsx',import.meta.url),'utf8');
 const {outputText}=ts.transpileModule(source,{compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}});
 const code=outputText.replaceAll('"react/jsx-runtime"',JSON.stringify(import.meta.resolve('react/jsx-runtime')));
 const {BeamFreeBodyDiagram}=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
 const original=renderToStaticMarkup(createElement(BeamFreeBodyDiagram));
 const asymmetric=renderToStaticMarkup(createElement(BeamFreeBodyDiagram,{offCentre:true}));
 for(const [html,fraction] of [[original,3/6],[asymmetric,2/6]]){
  const upper=Number(html.match(/d="M([\d.]+) 42 V103"/)[1]);
  const lower=Number(html.match(/d="M([\d.]+) 255 V318"/)[1]);
  assert.equal(upper,lower);assert(Math.abs((upper-40)/320-fraction)<1e-12);
  assert(html.includes('role="img"'));
 }
 assert(original.includes('Aᵧ = Bᵧ = 6 kN upward'));assert(original.includes('>3 m</text>'));
 assert(asymmetric.includes('>2 m</text>'));assert(asymmetric.includes('>4 m</text>'));
 assert(asymmetric.includes('Aᵧ = 8 kN upward and Bᵧ = 4 kN upward'));
 const both=original+asymmetric,ids=[...both.matchAll(/id="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(new Set(ids).size,ids.length);
 for(const m of both.matchAll(/url\(#([^)]*)\)/g))assert(ids.includes(m[1]));
 for(const m of both.matchAll(/aria-labelledby="([^"]+)"/g))for(const id of m[1].split(' '))assert(ids.includes(id));
});
