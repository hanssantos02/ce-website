import type { PracticeQuestion } from "./practice-questions";

// Original CEPath questions published with Product Owner approval; independent academic review remains pending.
export const freeBodyDiagramQuestions: readonly PracticeQuestion[] = [
  {
    id: "psad-fbd-roller-reaction", lessonId: "psad-statics-free-body-diagrams",
    type: "single-answer", displayOrder: 1, status: "published", reviewStatus: "source-calculation-checked",
    prompt: "Which reaction belongs on the beam’s free body diagram at this roller?",
    given: "A beam rests on an ideal frictionless roller on a horizontal surface. Contact is maintained. Consider planar statics with positive x rightward and positive y upward.",
    options: [
      { id: "normal-force", text: "One vertical force normal to the surface; no horizontal force or reaction moment." },
      { id: "pin-components", text: "Independent horizontal and vertical forces; no reaction moment." },
      { id: "fixed-reactions", text: "Independent horizontal and vertical forces and a reaction moment." },
      { id: "tangent-force", text: "One horizontal force parallel to the surface; no vertical force." },
    ],
    correctOptionId: "normal-force",
    explanation: "The smooth contact resists motion normal to the horizontal surface, giving a vertical reaction. It does not resist tangential motion or transmit a reaction couple. Two force components describe an ideal pin; two components and a couple describe an ideal fixed support.",
    solution: {
      required: "The reaction set exerted by the roller on the isolated beam.",
      steps: [
        { explanation: "Remove the roller from the drawing of the isolated beam, keeping its contact location." },
        { explanation: "Replace the smooth contact with one force perpendicular to the horizontal surface: a vertical force." },
        { explanation: "Do not add a horizontal reaction or reaction moment. For this resting, maintained contact, the roller pushes upward on the beam; an unanchored roller cannot pull the beam down." },
      ],
      answer: "One upward vertical reaction at the contact; no horizontal reaction or reaction moment.",
      interpretation: "The support model determines which reactions are possible. The applied loading determines their magnitudes. An inclined smooth surface would have an inclined normal reaction instead.",
    },
  },
  {
    id: "psad-fbd-off-centre-beam", lessonId: "psad-statics-free-body-diagrams",
    type: "single-answer", displayOrder: 2, status: "published", reviewStatus: "source-calculation-checked",
    prompt: "What is the right roller reaction, By, in this beam?",
    given: "A horizontal 5 m beam has an ideal pin at A on the left and a frictionless roller on a horizontal surface at B on the right. A 10 kN downward point load acts 2 m from A. Neglect self-weight. Use positive x rightward, positive y upward and counterclockwise moments positive.",
    options: [
      { id: "equal-share", text: "5.00 kN upward" },
      { id: "left-reaction", text: "6.00 kN upward" },
      { id: "moment-balance", text: "4.00 kN upward" },
      { id: "wrong-moment-sign", text: "4.00 kN downward" },
    ],
    correctOptionId: "moment-balance",
    explanation: "An off-centre load does not generally split equally. Taking moments about A eliminates both pin-force moments. The roller is 5 m from A, while the load is 2 m from A; both distances are perpendicular lever arms for these vertical forces.",
    solution: {
      required: "The signed vertical roller reaction By, in kilonewtons.",
      steps: [
        { explanation: "Isolate the beam. Include Ax rightward, Ay upward, By upward and the 10 kN load downward. There are no reaction couples at the ideal pin or roller." },
        { explanation: "Set the sum of counterclockwise moments about A to zero. The load causes a clockwise moment.", equation: String.raw`\sum M_A = B_y(5\,\mathrm{m})-(10\,\mathrm{kN})(2\,\mathrm{m})=0` },
        { explanation: "Solve for the roller reaction; the positive sign confirms upward action.", equation: String.raw`B_y=\frac{(10\,\mathrm{kN})(2\,\mathrm{m})}{5\,\mathrm{m}}=+4.00\,\mathrm{kN}` },
        { explanation: "Check force balance: the remaining upward reaction is 6 kN and no horizontal load exists.", equation: String.raw`A_y=10\,\mathrm{kN}-4\,\mathrm{kN}=6\,\mathrm{kN},\qquad A_x=0\,\mathrm{kN}` },
        { explanation: "Verify vertical forces and the independent moment check about B.", equation: String.raw`(6+4-10)\,\mathrm{kN}=0\,\mathrm{kN},\qquad -(6\,\mathrm{kN})(5\,\mathrm{m})+(10\,\mathrm{kN})(3\,\mathrm{m})=0` },
      ],
      answer: "4.00 kN upward at B.",
      interpretation: "The load is closer to A, so A carries more of it. Both positive vertical reactions are consistent with maintained roller contact. Equal 5 kN reactions would fail moment balance.",
    },
  },
];
