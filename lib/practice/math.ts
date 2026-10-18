import { renderToString } from "katex";
import { katexOptions } from "../../mdx-options.mjs";

// Only trusted repository equations reach this formatter; never accept public HTML/MDX.
export function renderPracticeMath(equation: string): string {
  return renderToString(equation, { ...katexOptions, displayMode: true, throwOnError: true });
}
