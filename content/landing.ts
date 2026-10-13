// Introductory previews, not lesson availability or a curriculum catalog.
// Names/topics: PRC September 2026 CELE program; see D012 in docs/DECISIONS.md.
export const curriculumPreviews = [
  {
    id: "psad",
    shorthand: "PSAD",
    name: "Principles of Structural Analysis and Design",
    description: "Understand how forces move through a structure, and how its members resist them.",
    topics: ["Engineering mechanics", "Strength of materials", "Concrete and steel design"],
  },
  {
    id: "mste",
    shorthand: "MSTE",
    name: "Applied Mathematics, Surveying, Principles of Transportation and Highway Engineering, Construction Management and Methods",
    description: "Connect mathematical tools with the work of measuring, planning, and building.",
    topics: ["Calculus and differential equations", "Surveying and highway engineering", "Construction management"],
    note: "MSTE is the familiar student shorthand.",
  },
  {
    id: "hge",
    shorthand: "HGE",
    name: "Hydraulics and Principles of Geotechnical Engineering",
    description: "Explore the behavior of water and soil, from fluid flow to the ground beneath a foundation.",
    topics: ["Hydrostatics and fluid flow", "Soil properties and strength", "Bearing capacity and settlement"],
  },
] as const;

export const learningJourney = [
  {
    title: "Choose your subject.",
    description: "Start with PSAD, MSTE, or HGE. The planned curriculum will keep every subject independently accessible.",
  },
  {
    title: "Find your way through.",
    description: "Follow a recommended sequence or jump to the topic you need. Prerequisites will offer guidance, without locking lessons.",
  },
  {
    title: "Learn it. Then work it out.",
    description: "Future lessons will connect clear concepts with engineering examples and practice, so each formula has a reason behind it.",
  },
  {
    title: "Return and keep building.",
    description: "Once accounts and progress tracking are available, you’ll be able to resume unfinished lessons and keep a record of completed study.",
  },
] as const;

export const learningValues = [
  {
    title: "A structure for your study.",
    description: "A coherent subject–module–lesson path will help you connect ideas across your review.",
  },
  {
    title: "Understanding that travels with you.",
    description: "Concepts, units, and engineering reasoning come first. Worked examples will show why a solution works.",
  },
  {
    title: "Your pace. Your point of entry.",
    description: "Every published free lesson will be open without an account. Switch subjects, skip ahead, and revisit material whenever you need.",
  },
] as const;
