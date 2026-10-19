/** Keep server-rendered display equations keyboard-scrollable at narrow widths. */
export default function equationAccessibility() {
  return function transform(tree) {
    function visit(node) {
      if (node.type === 'element' && node.properties?.className?.includes('katex-display')) {
        node.properties.tabIndex = 0;
        node.properties.role = 'region';
        node.properties.ariaLabel = 'Equation';
      }
      node.children?.forEach(visit);
    }
    visit(tree);
  };
}
