export function ForceComponentsDiagram() {
  return <figure className="force-diagram">
    <svg viewBox="0 0 460 310" role="img" aria-labelledby="force-diagram-title force-diagram-description">
      <title id="force-diagram-title">A 500 newton force at 30 degrees above the positive x-axis</title>
      <desc id="force-diagram-description">The force points right and up. Its horizontal component is 433.01 newtons and its vertical component is 250 newtons. Dashed projections form a right triangle. The force arrow rises 150 drawing units and extends 259.81 units horizontally, matching 30 degrees.</desc>
      <defs><marker id="force-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke" /></marker></defs>
      <g fill="none" stroke="var(--text-muted)" strokeWidth="1.5" markerEnd="url(#force-arrow)">
        <path d="M 30 230 H 420" /><path d="M 60 265 V 20" />
      </g>
      <path d="M 60 80 H 319.8076 V 230" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeDasharray="5 5" />
      <g fill="none" stroke="var(--text-ink)" strokeWidth="2" markerEnd="url(#force-arrow)">
        <path d="M 60 230 H 319.8076" /><path d="M 60 230 V 80" />
      </g>
      <path d="M 60 230 L 319.8076 80" fill="none" stroke="var(--accent-blue)" strokeWidth="3" markerEnd="url(#force-arrow)" />
      <path d="M 115 230 A 55 55 0 0 0 107.6314 202.5" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" />
      <g fill="var(--text-ink)" fontFamily="var(--font-source-sans), sans-serif" fontSize="26">
        <text x="400" y="266">+x</text><text x="18" y="27">+y</text><text x="29" y="260">O</text>
        <text x="120" y="217">30°</text><text x="190" y="286" textAnchor="middle">Fₓ = 433.01 N</text>
        <text x="88" y="64">Fᵧ = 250 N</text><text x="260" y="153" fill="var(--accent-blue)">F = 500 N</text>
      </g>
    </svg>
    <figcaption>The resultant force and its rectangular components share the same origin. Dashed lines show the projections; all labels refer to the 500 N example.</figcaption>
  </figure>;
}
