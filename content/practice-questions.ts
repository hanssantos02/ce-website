import { registeredLessonIds } from "./lesson-ids.ts";

export type PracticeQuestion = {
  readonly id: string;
  readonly lessonId: string;
  readonly type: "single-answer";
  readonly displayOrder: number;
  readonly status: "draft" | "published";
  readonly reviewStatus: "unchecked" | "source-calculation-checked";
  readonly prompt: string;
  readonly given: string;
  readonly options: readonly { readonly id: string; readonly text: string }[];
  readonly correctOptionId: string;
  readonly explanation: string;
  readonly solution: {
    readonly required: string;
    readonly steps: readonly { readonly explanation: string; readonly equation?: string }[];
    readonly answer: string;
    readonly interpretation: string;
  };
};

export const practiceEditorialStatus = "Source and calculation checks completed. Independent academic review pending.";
export const practiceSource = {
  label: "OpenStax: Algebra of Vectors",
  url: "https://openstax.org/books/university-physics-volume-1/pages/2-3-algebra-of-vectors",
};

// Original CEPath self-study questions, not official or reproduced PRC exam items.
export const practiceQuestions: readonly PracticeQuestion[] = [
  {
    id: "psad-vectors-horizontal-component", lessonId: registeredLessonIds.forcesAndVectors,
    type: "single-answer", displayOrder: 1, status: "published", reviewStatus: "source-calculation-checked",
    prompt: "What is the horizontal component of this force? Round to two decimal places.",
    given: "A force of 500 N acts at 30° counterclockwise from the positive x-axis. Take positive x to the right and positive y upward.",
    options: [
      { id: "vertical-projection", text: "250.00 N" },
      { id: "horizontal-projection", text: "433.01 N" },
      { id: "original-force", text: "500.00 N" },
      { id: "reciprocal-projection", text: "866.03 N" },
    ],
    correctOptionId: "horizontal-projection",
    explanation: "The angle is referenced to the x-axis, so the horizontal projection is adjacent to that angle and uses cosine. The sine projection would give the vertical component instead.",
    solution: {
      required: "The signed horizontal component, Fx, in newtons.",
      steps: [
        { explanation: "Use the x-component formula for an angle measured counterclockwise from positive x.", equation: String.raw`F_x = F\cos\theta` },
        { explanation: "Substitute the force magnitude and angle. Use degree mode.", equation: String.raw`F_x = (500\,\mathrm{N})\cos 30^\circ` },
        { explanation: "Evaluate and round only the final component.", equation: String.raw`F_x \approx +433.01\,\mathrm{N}` },
      ],
      answer: "433.01 N in the positive x-direction.",
      interpretation: "The force points rightward, so its horizontal component is positive. Its magnitude is less than the original 500 N force.",
    },
  },
  {
    id: "psad-vectors-vertical-component", lessonId: registeredLessonIds.forcesAndVectors,
    type: "single-answer", displayOrder: 2, status: "published", reviewStatus: "source-calculation-checked",
    prompt: "What is the vertical component of this force? Round to two decimal places.",
    given: "A force of 300 N acts at 30° counterclockwise from the positive x-axis. Take positive x to the right and positive y upward.",
    options: [
      { id: "horizontal-projection", text: "259.81 N" },
      { id: "vertical-projection", text: "150.00 N" },
      { id: "original-force", text: "300.00 N" },
      { id: "wrong-scale", text: "86.60 N" },
    ],
    correctOptionId: "vertical-projection",
    explanation: "The vertical projection is opposite the angle measured from positive x, so use sine. Using cosine here would calculate the horizontal component.",
    solution: {
      required: "The signed vertical component, Fy, in newtons.",
      steps: [
        { explanation: "Select the y-component formula for the stated angle reference.", equation: String.raw`F_y = F\sin\theta` },
        { explanation: "Substitute the magnitude and angle in degrees.", equation: String.raw`F_y = (300\,\mathrm{N})\sin 30^\circ` },
        { explanation: "The sine of 30° is one-half.", equation: String.raw`F_y = +150.00\,\mathrm{N}` },
      ],
      answer: "150.00 N in the positive y-direction.",
      interpretation: "The force acts above the horizontal axis, so its vertical component acts upward. Keep newtons as the unit of force.",
    },
  },
  {
    id: "psad-vectors-resultant-magnitude", lessonId: registeredLessonIds.forcesAndVectors,
    type: "single-answer", displayOrder: 3, status: "published", reviewStatus: "source-calculation-checked",
    prompt: "What is the magnitude of the force represented by these rectangular components?",
    given: "In a two-dimensional Cartesian system, Fx = +300 N and Fy = +400 N are perpendicular components of one force. Positive x is rightward and positive y is upward.",
    options: [
      { id: "difference", text: "100.00 N" },
      { id: "pythagorean-magnitude", text: "500.00 N" },
      { id: "scalar-sum", text: "700.00 N" },
      { id: "vertical-only", text: "400.00 N" },
    ],
    correctOptionId: "pythagorean-magnitude",
    explanation: "Perpendicular components form a right triangle. Their magnitudes do not add directly; use the square root of the sum of their squares to recover the force magnitude.",
    solution: {
      required: "The nonnegative force magnitude, F, in newtons.",
      steps: [
        { explanation: "Apply the magnitude formula to perpendicular rectangular components.", equation: String.raw`F = \sqrt{F_x^2 + F_y^2}` },
        { explanation: "Square the components with their units, then take the square root.", equation: String.raw`F = \sqrt{(300\,\mathrm{N})^2 + (400\,\mathrm{N})^2}` },
        { explanation: "The sum is 250,000 square newtons; its square root returns newtons.", equation: String.raw`F = \sqrt{250000\,\mathrm{N}^2} = 500.00\,\mathrm{N}` },
      ],
      answer: "500.00 N.",
      interpretation: "This 3–4–5 component triangle gives a magnitude larger than either component and smaller than their scalar sum. Magnitude itself has no negative sign.",
    },
  },
  {
    id: "psad-vectors-component-sign", lessonId: registeredLessonIds.forcesAndVectors,
    type: "single-answer", displayOrder: 4, status: "published", reviewStatus: "source-calculation-checked",
    prompt: "What is the signed horizontal component of this force? Round to two decimal places.",
    given: "A force of 200 N acts at 120° counterclockwise from the positive x-axis. Take positive x to the right and positive y upward.",
    options: [
      { id: "wrong-horizontal-sign", text: "+100.00 N" },
      { id: "negative-horizontal", text: "-100.00 N" },
      { id: "negative-vertical-size", text: "-173.21 N" },
      { id: "positive-vertical", text: "+173.21 N" },
    ],
    correctOptionId: "negative-horizontal",
    explanation: "An angle of 120° lies in quadrant II. The force points left and up, so the x-component is negative and the y-component is positive. The horizontal component still uses cosine.",
    solution: {
      required: "The signed horizontal component, Fx, in newtons.",
      steps: [
        { explanation: "Retain the full angle measured from positive x; cosine supplies its sign.", equation: String.raw`F_x = F\cos\theta` },
        { explanation: "Substitute the given force and quadrant-II angle.", equation: String.raw`F_x = (200\,\mathrm{N})\cos 120^\circ` },
        { explanation: "The cosine of 120° is negative one-half.", equation: String.raw`F_x = -100.00\,\mathrm{N}` },
      ],
      answer: "-100.00 N, meaning 100 N to the left.",
      interpretation: "A negative component describes direction along the chosen axis; it does not mean the force magnitude is negative.",
    },
  },
  {
    id: "psad-vectors-scalar-distinction", lessonId: registeredLessonIds.forcesAndVectors,
    type: "single-answer", displayOrder: 5, status: "published", reviewStatus: "source-calculation-checked",
    prompt: "In basic statics, why is force classified as a vector quantity while mass is a scalar?",
    given: "Consider forces in a two-dimensional Cartesian system with positive x rightward and positive y upward. Compare the quantities themselves, not the directions of motion of objects.",
    options: [
      { id: "both-directed", text: "Both force and mass require a spatial direction." },
      { id: "magnitude-and-direction", text: "Force has magnitude and direction; mass has magnitude only." },
      { id: "direction-only", text: "Force has direction but no magnitude." },
      { id: "unit-determines-type", text: "The SI unit alone determines whether a quantity is a vector." },
    ],
    correctOptionId: "magnitude-and-direction",
    explanation: "A vector has both magnitude and direction. Mass is a scalar: an object can move in a direction, but that does not give its mass a spatial direction. Units identify a quantity’s scale, not whether it is a vector.",
    solution: {
      required: "The distinction between scalar and vector quantities.",
      steps: [
        { explanation: "Compare two forces of the same magnitude acting in different directions. Their effects in a statics model depend on those directions." },
        { explanation: "Compare masses of equal value. Changing the orientation of the coordinate axes does not assign a direction to the mass." },
      ],
      answer: "Force has magnitude and direction; mass has magnitude only.",
      interpretation: "When resolving forces, retain signs and directions as well as units. No numerical calculation is needed to distinguish a vector from a scalar.",
    },
  },
];
