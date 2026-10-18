import assert from 'node:assert/strict';
import test from 'node:test';
import { URL } from 'node:url';
import { readFile, readdir } from 'node:fs/promises';
import { compile, evaluate } from '@mdx-js/mdx';
import * as jsxRuntime from 'react/jsx-runtime';
import { mdxOptions } from '../mdx-options.mjs';
import { registeredLessonIds } from '../content/lesson-ids.ts';
import { getSubjects, getLessonById, getLessonHref } from '../content/curriculum.ts';

async function compilerOptions() {
  const options = {};
  for (const key of ['remarkPlugins', 'rehypePlugins']) {
    options[key] = await Promise.all(mdxOptions[key].map(async entry => {
      const [name, settings] = Array.isArray(entry) ? entry : [entry];
      return [(await import(name)).default, settings];
    }));
  }
  return options;
}
const lessonUrl = new URL('../content/lessons/forces-and-vectors.mdx', import.meta.url);

test('only the existing Forces and Vectors ID is published, at its original public URL', () => {
  const published = getSubjects().flatMap(s => s.modules.flatMap(m => m.lessons.filter(l => l.availability === 'published')));
  assert.deepEqual(published.map(l => l.id), ['psad-statics-forces-vectors']);
  const {subject, module, lesson} = getLessonById(published[0].id);
  assert.equal(getLessonHref(subject, module, lesson), '/curriculum/psad/engineering-mechanics-statics/forces-and-vectors');
  assert.equal(getLessonById('constructor'), undefined);
});

test('the real MDX lesson compiles cleanly and exports its objectives and nine unique section targets', async () => {
  const source = await readFile(lessonUrl, 'utf8');
  const options = await compilerOptions();
  const result = await compile(source, options);
  assert.deepEqual(result.messages, [], result.messages.map(m => m.toString()).join('\n'));
  assert(String(result).includes('katex-mathml'));
  assert(!String(result).includes('katex-error'));
  // Evaluate only trusted repository content in the test process to inspect its actual exports.
  const document = await evaluate(source, {...options, ...jsxRuntime});
  assert.equal(document.lessonId, 'psad-statics-forces-vectors');
  assert.equal(document.learningObjectives.length, 7);
  assert.equal(document.sections.length, 9);
  assert.equal(new Set(document.sections.map(s => s.id)).size, 9);
  assert(document.sections.every(s => s.id && s.title));
  assert(document.editorialStatus.includes('Independent academic review pending'));
});

test('published metadata has a real registered MDX body; no body invents an unknown lesson ID', async () => {
  const directory = new URL('../content/lessons/', import.meta.url);
  const registry = await readFile(new URL('../content/lesson-documents.ts', import.meta.url), 'utf8');
  const ids = [];
  for (const file of (await readdir(directory)).filter(f => f.endsWith('.mdx'))) {
    const source = await readFile(new URL(file, directory), 'utf8');
    const document = await evaluate(source, {...await compilerOptions(), ...jsxRuntime});
    assert(getLessonById(document.lessonId), file);
    assert(registry.includes(`./lessons/${file}`), `${file} must be registered`);
    ids.push(document.lessonId);
  }
  assert.equal(new Set(ids).size, ids.length);
  assert.deepEqual([...Object.values(registeredLessonIds)].sort(), [...ids].sort());
  for (const subject of getSubjects()) for (const module of subject.modules) for (const lesson of module.lessons)
    if (lesson.availability === 'published') assert(ids.includes(lesson.id), lesson.id);
});

test('the shared compiler supports tables and required notation and reports invalid equations', async () => {
  const options = await compilerOptions();
  const fixture = String.raw`| Quantity | Unit |
| --- | --- |
| Force | N |

Inline $F_x$, $F^2$, $\theta$, and $\frac{1}{2}$.

$$
\begin{aligned}
F_x &= F\cos\theta \\
F_y &= F\sin\theta \\
F &= \sqrt{F_x^2+F_y^2}\;\mathrm{N}
\end{aligned}
$$

> A note.

![A useful description](/example.svg)`;
  const result = await compile(fixture, options);
  assert.deepEqual(result.messages, []);
  assert(String(result).includes('table'));
  assert(String(result).includes('katex-display'));
  assert(String(result).includes('katex-mathml'));
  const invalid = await compile(String.raw`$\notARealKatexCommand$`, options);
  assert(invalid.messages.some(m => m.source === 'rehype-katex'));
});

test('authored worked and practice answers agree with independent component and quadrant calculations', async () => {
  const source = await readFile(lessonUrl, 'utf8');
  const radians = degrees => degrees * Math.PI / 180;
  const fx = 500 * Math.cos(radians(30));
  const fy = 500 * Math.sin(radians(30));
  assert.equal(fx.toFixed(2), '433.01');
  assert(Math.abs(fy - 250) < 1e-10);
  assert(Math.abs(Math.hypot(fx, fy) - 500) < 1e-10);
  assert(source.includes('433.01') && source.includes('250') && source.includes('500'));
  const practiceX = 600 * Math.cos(radians(120));
  const practiceY = 600 * Math.sin(radians(120));
  assert(Math.abs(practiceX + 300) < 1e-10);
  assert.equal(practiceY.toFixed(2), '519.62');
  assert(Math.abs(Math.atan2(practiceY, practiceX) * 180 / Math.PI - 120) < 1e-10);
  assert(source.includes('-300') && source.includes('519.62') && source.includes('120'));
  assert(source.includes('atan2') && source.includes('positive') && source.includes('counterclockwise'));
});
