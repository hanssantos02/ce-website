// Exact statics geometry, not decorative artwork. Each diagram is self-describing.
function Arrowhead({ id }: { id: string }) {
  return <defs><marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 10 5 0 10Z" fill="context-stroke" /></marker></defs>;
}

export function BlockFreeBodyDiagram() {
  return <figure className="force-diagram">
    <svg viewBox="0 0 360 300" role="img" aria-labelledby="block-fbd-title block-fbd-desc" fontFamily="var(--font-source-sans), sans-serif" fontSize="24" fill="var(--text-ink)">
      <title id="block-fbd-title">Free body diagram of the stationary 20 kg block</title>
      <desc id="block-fbd-desc">Only the isolated block is drawn. Weight W equals 196.20 N downward through its centre. The normal reaction N equals 196.20 N upward on the same vertical line. No floor or horizontal friction force is present. Positive x is right and positive y is up.</desc>
      <Arrowhead id="block-fbd-arrow" />
      <rect x="115" y="110" width="130" height="75" fill="var(--surface-paper)" stroke="var(--text-ink)" strokeWidth="2" />
      <g stroke="var(--accent-blue)" strokeWidth="3" markerEnd="url(#block-fbd-arrow)"><path d="M180 147 V25" /><path d="M180 147 V265" /></g>
      <text x="195" y="48">N</text><text x="195" y="254">W</text>
      <g stroke="var(--text-muted)" strokeWidth="1.5" markerEnd="url(#block-fbd-arrow)"><path d="M30 80 H85" /><path d="M30 80 V25" /></g>
      <text x="65" y="108">+x</text><text x="45" y="30">+y</text>
    </svg>
    <figcaption>Isolated block: N = W = 196.20 N. The opposite forces act on this one block and have different sources; they are not an action–reaction pair.</figcaption>
  </figure>;
}

export function SupportReactionsDiagrams() {
  return <>
    <figure className="force-diagram">
      <svg viewBox="0 0 360 210" role="img" aria-labelledby="roller-title roller-desc" fontFamily="var(--font-source-sans), sans-serif" fontSize="24" fill="var(--text-ink)">
        <title id="roller-title">Horizontal frictionless roller: one normal reaction</title>
        <desc id="roller-desc">An isolated short beam has no physical support drawn. One upward arrow R at the contact represents the roller reaction normal to the removed horizontal surface. There is no horizontal reaction or reaction moment.</desc>
        <Arrowhead id="roller-arrow" /><path d="M90 130 H280" stroke="var(--text-ink)" strokeWidth="6" />
        <path d="M130 130 V30" stroke="var(--accent-blue)" strokeWidth="3" markerEnd="url(#roller-arrow)" />
        <text x="145" y="52">R</text><text x="85" y="180">Roller: 1 unknown</text>
      </svg>
      <figcaption>Roller on a horizontal smooth surface: one vertical reaction. The surface orientation determines the normal direction.</figcaption>
    </figure>
    <figure className="force-diagram">
      <svg viewBox="0 0 360 210" role="img" aria-labelledby="pin-title pin-desc" fontFamily="var(--font-source-sans), sans-serif" fontSize="24" fill="var(--text-ink)">
        <title id="pin-title">Ideal planar pin: two force components</title>
        <desc id="pin-desc">An isolated beam at A has Ay upward and Ax rightward. The removed frictionless pin supplies two independent force components and no reaction moment. Arrows are assumed positive directions, not solved magnitudes.</desc>
        <Arrowhead id="pin-arrow" /><path d="M90 130 H280" stroke="var(--text-ink)" strokeWidth="6" />
        <g stroke="var(--accent-blue)" strokeWidth="3" markerEnd="url(#pin-arrow)"><path d="M90 130 V30" /><path d="M90 130 H195" /></g>
        <text x="105" y="52">Aᵧ</text><text x="175" y="112">Aₓ</text><text x="85" y="180">Pin: 2 unknowns</text>
      </svg>
      <figcaption>Pin: horizontal and vertical force components. It allows rotation in this ideal planar model, so add no reaction couple.</figcaption>
    </figure>
    <figure className="force-diagram">
      <svg viewBox="0 0 360 250" role="img" aria-labelledby="fixed-title fixed-desc" fontFamily="var(--font-source-sans), sans-serif" fontSize="24" fill="var(--text-ink)">
        <title id="fixed-title">Ideal planar fixed support: two forces and a couple</title>
        <desc id="fixed-desc">An isolated beam at A has Ay upward, Ax rightward and a counterclockwise curved reaction-moment arrow MA. All three are independent assumed unknowns; the curved arrow is a couple, not an extra force.</desc>
        <Arrowhead id="fixed-arrow" /><path d="M90 140 H285" stroke="var(--text-ink)" strokeWidth="6" />
        <g fill="none" stroke="var(--accent-blue)" strokeWidth="3" markerEnd="url(#fixed-arrow)"><path d="M90 140 V30" /><path d="M90 140 H200" /><path d="M62 164 A37 37 0 1 0 62 116" /></g>
        <text x="105" y="50">Aᵧ</text><text x="180" y="124">Aₓ</text><text x="138" y="200">Mₐ</text><text x="70" y="238">Fixed: 3 unknowns</text>
      </svg>
      <figcaption>Fixed support: two force components and a reaction couple. A negative solved value reverses the corresponding assumed direction.</figcaption>
    </figure>
  </>;
}

export function BeamFreeBodyDiagram({ offCentre = false }: { offCentre?: boolean } = {}) {
  const loadX = offCentre ? 40 + 320 / 3 : 200;
  const id = offCentre ? "beam-fbd-off-centre" : "beam-fbd";
  const description = offCentre
    ? "Upper panel: a 6 m beam with pin A at the left and horizontal frictionless roller B at the right. A 12 kN downward point load lies 2 m from A and 4 m from B. Lower panel: isolated beam with Ax assumed right, Ay and By upward and the load at the same off-centre position. Ax is zero, Ay is 8 kN upward and By is 4 kN upward. Positive x right, y up; counterclockwise moments positive. Lengths match the stated 2 m and 4 m spans; force arrows show directions, not force scale."
    : "Upper panel: a 6 m horizontal beam, pin at A on the left and roller at B on a horizontal surface on the right, with a 12 kN load downward at its midpoint. Lower panel: isolated beam without supports, showing Ax assumed right, Ay and By upward and the 12 kN midpoint load downward. Dimensions are 3 m from A to the load and 3 m to B. Solutions are Ax zero and Ay and By each 6 kN upward. Positive x right, y up; counterclockwise moments positive. Diagram lengths match the stated equal spans; force arrows indicate directions, not force scale.";
  return <figure className="force-diagram">
    <svg viewBox="0 0 400 470" role="img" aria-labelledby={`${id}-title ${id}-desc`} fontFamily="var(--font-source-sans), sans-serif" fontSize="24" fill="var(--text-ink)">
      <title id={`${id}-title`}>{offCentre ? "6 m beam: load 2 m from A, 4 m from B" : "6 m beam: physical supports replaced by reactions"}</title>
      <desc id={`${id}-desc`}>{description}</desc>
      <Arrowhead id={`${id}-arrow`} />
      <text x="18" y="28">Physical model</text>
      <path d="M40 105 H360" stroke="var(--text-ink)" strokeWidth="6" />
      <g fill="none" stroke="var(--text-muted)" strokeWidth="2"><path d="M40 108 24 135 H56Z" /><path d="M360 108 344 130 H376Z" /><circle cx="351" cy="138" r="6" /><circle cx="369" cy="138" r="6" /><path d="M18 147 H62 M338 150 H382" /></g>
      <path d={`M${loadX} 42 V103`} stroke="var(--accent-blue)" strokeWidth="3" markerEnd={`url(#${id}-arrow)`} />
      <text x={loadX + 13} y="69">12 kN</text><text x="26" y="178">A: pin</text><text x="258" y="178">B: roller</text>
      <text x="18" y="227">Isolated beam</text>
      <path d="M40 320 H360" stroke="var(--text-ink)" strokeWidth="6" />
      <g stroke="var(--accent-blue)" strokeWidth="3" markerEnd={`url(#${id}-arrow)`}><path d={`M${loadX} 255 V318`} /><path d="M40 395 V322" /><path d="M360 395 V322" /><path d="M40 320 H115" /></g>
      <text x={loadX + 13} y="277">12 kN</text><text x="12" y="417">Aᵧ</text><text x="337" y="417">Bᵧ</text><text x="88" y="305">Aₓ</text>
      <g fill="none" stroke="var(--text-muted)" strokeWidth="1.5"><path d={`M40 430 V462 M${loadX} 430 V462 M360 430 V462 M40 450 H360`} /></g>
      <text x={(40 + loadX) / 2} y="442" textAnchor="middle">{offCentre ? "2 m" : "3 m"}</text><text x={(loadX + 360) / 2} y="442" textAnchor="middle">{offCentre ? "4 m" : "3 m"}</text>
    </svg>
    <figcaption>The support symbols belong to the physical model only. In the FBD, reactions replace them: {offCentre ? "Aₓ = 0 kN, Aᵧ = 8 kN upward and Bᵧ = 4 kN upward." : "Aₓ = 0 kN, Aᵧ = Bᵧ = 6 kN upward."} Ax is shown as an assumed unknown before solving, not an additional nonzero load.</figcaption>
  </figure>;
}
