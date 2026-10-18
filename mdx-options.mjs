// String plugin names and plain options remain serializable for Turbopack.
/** @type {import('katex').KatexOptions} */
export const katexOptions = { strict: 'error', trust: false, output: 'htmlAndMathml' };

/** @type {{ remarkPlugins: string[], rehypePlugins: [string, import('katex').KatexOptions][] }} */
export const mdxOptions = {
  remarkPlugins: ['remark-gfm', 'remark-math'],
  rehypePlugins: [['rehype-katex', katexOptions]],
};
