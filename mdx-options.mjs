// String plugin names and plain options remain serializable for Turbopack.
/** @type {{ remarkPlugins: string[], rehypePlugins: [string, {strict: string, trust: boolean, output: string}][] }} */
export const mdxOptions = {
  remarkPlugins: ['remark-gfm', 'remark-math'],
  rehypePlugins: [['rehype-katex', { strict: 'error', trust: false, output: 'htmlAndMathml' }]],
};
