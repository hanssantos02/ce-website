import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {URL} from 'node:url';
import {compile,evaluate} from '@mdx-js/mdx';
import * as jsxRuntime from 'react/jsx-runtime';
import {mdxOptions} from '../mdx-options.mjs';
import {getLessonById,getLessonHref,validatePrerequisites} from '../content/curriculum.ts';
import {getPublishedLesson,getPublishedLessons} from '../content/published-lessons.ts';
import {getPracticeQuestions,validatePracticeBank,validateQuestion} from '../lib/practice/questions.ts';
import {gradeAnswer} from '../lib/practice/state.ts';
import {renderPracticeMath} from '../lib/practice/math.ts';
const id='mste-economy-simple-compound-interest';
const lessonUrl=new URL('../content/lessons/simple-and-compound-interest.mdx',import.meta.url);
async function compilerOptions(){
 const opts={};
 for(const key of ['remarkPlugins','rehypePlugins'])opts[key]=await Promise.all(mdxOptions[key].map(async entry=>{
  const [name,settings]=Array.isArray(entry)?entry:[entry];return [(await import(name)).default,settings];
 }));return opts;
}
test('the approved economy chapter is published at its stable destination with three public questions',()=>{
 const {subject,module,lesson}=getLessonById(id)??{};
 assert(subject,'approved economy metadata exists');
 assert.equal(subject.id,'mste');assert.equal(module.id,'mste-engineering-economy');
 assert.equal(module.slug,'engineering-economy');assert.equal(module.displayOrder,4);
 assert.equal(lesson.slug,'simple-and-compound-interest');assert.equal(lesson.moduleId,module.id);
 assert.equal(lesson.displayOrder,1);assert.equal(lesson.availability,'published');
 assert.deepEqual(validatePrerequisites([lesson]),[]);
 const href='/curriculum/mste/engineering-economy/simple-and-compound-interest';
 assert.equal(getLessonHref(subject,module,lesson),href);assert.equal(getPublishedLesson(id).href,href);
 assert.equal(getPracticeQuestions(id).length,3);assert.equal(getPublishedLessons().length,3);
});
test('trusted published chapter compiles with thirteen objectives, twelve focus targets and explicit review status',async()=>{
 const source=await readFile(lessonUrl,'utf8');const opts=await compilerOptions();
 const compiled=await compile(source,opts);assert.deepEqual(compiled.messages,[]);
 const doc=await evaluate(source,{...opts,...jsxRuntime});
 assert.equal(doc.lessonId,id);assert.equal(doc.learningObjectives.length,13);assert.equal(doc.sections.length,12);
 assert.equal(new Set(doc.sections.map(s=>s.id)).size,12);
 for(const section of doc.sections)assert(source.includes(`section={sections[${doc.sections.indexOf(section)}]}`));
 assert.doesNotMatch(doc.editorialStatus,/draft|not published/i);assert.match(doc.editorialStatus,/independent academic review pending/i);
 assert(String(compiled).includes('katex-mathml'));assert(!String(compiled).includes('katex-error'));
 assert.equal((source.match(/<WorkedExample /g)??[]).length,4);
 assert.equal((source.match(/^\| ---/gm)??[]).length,6);
 for(const text of ['12,000.00','72,000.00','126,247.70','62,000.00','62,985.60','985.60','129,575.64','12.6825'])assert(source.includes(text),text);
});
test('three original published questions have strict equations, unique keys and complete checked solutions',async()=>{
 const {interestQuestions}=await import('../content/interest-questions.ts');
 assert.equal(interestQuestions.length,3);assert.deepEqual(validatePracticeBank(interestQuestions),[]);
 assert.deepEqual(interestQuestions.map(q=>q.displayOrder),[1,2,3]);
 for(const q of interestQuestions){
  assert.equal(q.lessonId,id);assert.equal(q.status,'published');assert.equal(q.reviewStatus,'source-calculation-checked');
  assert.equal(q.options.length,4);assert.deepEqual(validateQuestion({...q,status:'published'}),[]);
  for(const o of q.options)assert.equal(gradeAnswer(q,o.id),o.id===q.correctOptionId);
  for(const step of q.solution.steps)if(step.equation){const html=renderPracticeMath(step.equation);assert(html.includes('katex-mathml'));assert(!html.includes('katex-error'));}
 }
});
test('independent calculations reproduce worked examples, growth tables and all three answer keys',async()=>{
 const {interestQuestions:q}=await import('../content/interest-questions.ts');
 const round=x=>x.toFixed(2);const principal=100000;let balance=principal;
 assert.equal(round(60000*.08*2.5),'12000.00');assert.equal(round(60000*(1+.08*2.5)),'72000.00');
 for(const expected of ['106000.00','112360.00','119101.60','126247.70']){balance+=balance*.06;assert.equal(round(balance),expected);}
 assert.equal(round(balance),round(principal*1.06**4));
 assert.equal(round(50000*(1+.08*3)),'62000.00');assert.equal(round(50000*1.08**3),'62985.60');
 assert.equal(round(50000*1.08**3-62000),'985.60');
 const present=150000/(1.05**3);assert.equal(round(present),'129575.64');assert(Math.abs(present*1.05**3-150000)<1e-8);
 assert.equal(round(80000*.06*9/12),'3600.00');assert.equal(round(75000*1.04**3),'84364.80');
 const ear=(1+.12/12)**12-1;assert.equal((ear*100).toFixed(4),'12.6825');
 const expectedKeys=['interest-only','compound-future','annual-yield'];
 assert.deepEqual(q.map(x=>x.correctOptionId),expectedKeys);
 for(const [index,value] of [[0,'3,600.00'],[1,'84,364.80'],[2,'12.6825%']]){
  assert(q[index].options.find(o=>o.id===q[index].correctOptionId).text.includes(value));
  assert(q[index].solution.answer.includes(value));
 }
 for(const [year,expected] of [[0,50000],[1,54000],[2,58320],[3,62985.6]])assert.equal(round(50000*1.08**year),round(expected));
});

test('authored growth tables match their formulas and rate conversions use the correct period',async()=>{
 const source=await readFile(lessonUrl,'utf8');
 function rows(header){
  const lines=source.slice(source.indexOf(header)).split('\n');
  return lines.slice(2).filter((line,index,array)=>line.startsWith('|')&&array.slice(0,index).every(x=>x.startsWith('|')))
   .map(line=>line.split('|').slice(1,-1).map(cell=>cell.trim()));
 }
 const number=text=>Number(text.replaceAll(',',''));
 const simple=rows('| Elapsed time (years)');assert.equal(simple.length,4);
 for(const [time,interest,future] of simple){const t=number(time);assert.equal(number(interest),60000*.08*t);assert.equal(number(future).toFixed(2),(60000*(1+.08*t)).toFixed(2));}
 const compound=rows('| End of year | Opening');assert.equal(compound.length,4);
 let balance=100000;
 for(const [year,opening,interest,closing] of compound){
  assert.equal(number(opening).toFixed(2),balance.toFixed(2));
  assert.equal(number(interest).toFixed(2),(balance*.06).toFixed(2));
  balance*=1.06;assert.equal(number(closing).toFixed(2),balance.toFixed(2));
  assert.equal(balance.toFixed(2),(100000*1.06**number(year)).toFixed(2));
 }
 const comparison=rows('| End of year | Simple');assert.equal(comparison.length,4);
 for(const [year,simple,compound,difference] of comparison){
  const n=number(year),fs=50000*(1+.08*n),fc=50000*1.08**n;
  assert.equal(number(simple).toFixed(2),fs.toFixed(2));assert.equal(number(compound).toFixed(2),fc.toFixed(2));
  assert.equal(number(difference).toFixed(2),(fc-fs).toFixed(2));
 }
 const rates=rows('| Compounding convention');assert.equal(rates.length,4);
 for(const [,m,periodic] of rates)assert.equal(parseFloat(periodic)/100,.12/Number(m));
 const quarterly=1.08**(1/4)-1;
 assert.equal((quarterly*100).toFixed(6),'1.942655');
 assert(Math.abs((1+quarterly)**4-1.08)<1e-12);
 assert.equal(((1+.08/4)**4*100-100).toFixed(6),'8.243216');
 assert.notEqual((1+.08/4)**4,1.08);
});
