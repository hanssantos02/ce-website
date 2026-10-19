import { fileURLToPath, URL } from 'node:url';

// String plugin paths and plain options remain serializable for Turbopack.
/** @type {import('katex').KatexOptions} */
export const katexOptions = { strict: 'error', trust: false, output: 'htmlAndMathml' };

/** @type {{ remarkPlugins: string[], rehypePlugins: (string | [string, import('katex').KatexOptions])[] }} */
export const mdxOptions = {
  remarkPlugins: ['remark-gfm', 'remark-math'],
  rehypePlugins: [['rehype-katex', katexOptions], fileURLToPath(new URL('./rehype-equation-accessibility.mjs', import.meta.url).href)],
};
