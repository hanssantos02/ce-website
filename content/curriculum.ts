// CEPath-authored representative learning areas, not a complete PRC syllabus.
// Full subject titles: PRC September 2026 CELE program, checked 2026-10-14.
// Ordering and prerequisites are guidance. Availability describes content, never student progress.
// IDs are persistent keys; retain them if a title or URL slug is renamed.
export type SubjectId = "psad" | "mste" | "hge";

export type Topic = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly shortDescription: string;
  readonly displayOrder: number;
};

// Publication describes content availability; it is independent of editorial review.
export type ContentAvailability = "planned" | "overview";

export type Lesson = {
  readonly id: string;
  readonly slug: string;
  readonly moduleId: string;
  readonly title: string;
  readonly shortDescription: string;
  readonly displayOrder: number;
  readonly prerequisiteIds?: readonly string[];
  readonly availability: ContentAvailability | "published";
  readonly source?: { readonly label: string; readonly url: string };
};

export type Module = {
  readonly id: string;
  readonly slug: string;
  readonly subjectId: SubjectId;
  readonly title: string;
  readonly description: string;
  readonly displayOrder: number;
  readonly availability: ContentAvailability;
  readonly lessons: readonly Lesson[];
};

export type Subject = {
  readonly id: SubjectId;
  readonly slug: SubjectId;
  readonly abbreviation: string;
  readonly title: string;
  readonly description: string;
  readonly learningOverview: string;
  readonly displayOrder: number;
  readonly previewTopics: readonly string[];
  readonly topics: readonly Topic[];
  readonly modules: readonly Module[];
  readonly note?: string;
};

export const curriculumSource = {
  label: "PRC September 2026 examination program",
  url: "https://www.prc.gov.ph/sites/default/files/exam%20program%20Sept%202026%20%28CE%29.pdf",
};

const subjectOverviews: readonly Omit<Subject, "modules">[] = [
  {
    "id": "psad",
    "slug": "psad",
    "abbreviation": "PSAD",
    "title": "Principles of Structural Analysis and Design",
    "description": "Understand how forces move through a structure, and how its members resist them.",
    "learningOverview": "This subject connects equilibrium and material behavior with structural analysis and design. Its learning areas move from mechanics to common structural members and governing practice.",
    "displayOrder": 1,
    "previewTopics": [
      "Engineering mechanics",
      "Strength of materials",
      "Concrete and steel design"
    ],
    "topics": [
      {
        "id": "psad-engineering-mechanics",
        "slug": "engineering-mechanics",
        "title": "Engineering mechanics",
        "shortDescription": "Forces, moments, and equilibrium in particles and rigid bodies.",
        "displayOrder": 1
      },
      {
        "id": "psad-strength-of-materials",
        "slug": "strength-of-materials",
        "title": "Strength of materials",
        "shortDescription": "Stress, strain, deformation, and the response of members to loading.",
        "displayOrder": 2
      },
      {
        "id": "psad-theory-of-structures",
        "slug": "theory-of-structures",
        "title": "Theory of structures",
        "shortDescription": "Structural behavior, load paths, reactions, and the analysis of connected members.",
        "displayOrder": 3
      },
      {
        "id": "psad-reinforced-concrete-design",
        "slug": "reinforced-concrete-design",
        "title": "Reinforced concrete design",
        "shortDescription": "Design considerations for reinforced concrete beams and columns.",
        "displayOrder": 4
      },
      {
        "id": "psad-prestressed-concrete",
        "slug": "prestressed-concrete",
        "title": "Prestressed concrete",
        "shortDescription": "Prestressing principles and the behavior of prestressed concrete beams.",
        "displayOrder": 5
      },
      {
        "id": "psad-steel-design",
        "slug": "steel-design",
        "title": "Steel design",
        "shortDescription": "The behavior and design considerations of steel beams, columns, and connections.",
        "displayOrder": 6
      },
      {
        "id": "psad-footings",
        "slug": "footings",
        "title": "Footings",
        "shortDescription": "How structural loads are transferred to the supporting ground through foundations.",
        "displayOrder": 7
      },
      {
        "id": "psad-construction-materials-testing",
        "slug": "construction-materials-testing",
        "title": "Construction materials testing",
        "shortDescription": "Material properties, testing methods, and their role in assessing construction quality.",
        "displayOrder": 8
      },
      {
        "id": "psad-codes-and-standards",
        "slug": "codes-and-standards",
        "title": "Relevant codes and standards",
        "shortDescription": "How governing codes inform design assumptions, checks, and detailing.",
        "displayOrder": 9
      }
    ]
  },
  {
    "id": "mste",
    "slug": "mste",
    "abbreviation": "MSTE",
    "title": "Applied Mathematics, Surveying, Principles of Transportation and Highway Engineering, Construction Management and Methods",
    "description": "Connect mathematical tools with the work of measuring, planning, and building.",
    "learningOverview": "This subject brings together the analytical tools and practical decisions used across civil engineering projects. Its learning areas connect calculations with surveying, transportation, materials, and construction practice.",
    "displayOrder": 2,
    "previewTopics": [
      "Calculus and differential equations",
      "Surveying and highway engineering",
      "Construction management"
    ],
    "topics": [
      {
        "id": "mste-engineering-mathematics",
        "slug": "engineering-mathematics",
        "title": "Engineering mathematics",
        "shortDescription": "Algebra, trigonometry, and geometry as tools for engineering calculations.",
        "displayOrder": 1
      },
      {
        "id": "mste-calculus-and-differential-equations",
        "slug": "calculus-and-differential-equations",
        "title": "Calculus and differential equations",
        "shortDescription": "Rates of change, accumulation, and mathematical models of changing systems.",
        "displayOrder": 2
      },
      {
        "id": "mste-numerical-methods",
        "slug": "numerical-methods",
        "title": "Numerical methods",
        "shortDescription": "Numerical approaches to equations, approximation, and engineering computation.",
        "displayOrder": 3
      },
      {
        "id": "mste-engineering-economy",
        "slug": "engineering-economy",
        "title": "Engineering economy",
        "shortDescription": "Time value of money and the economic comparison of engineering alternatives.",
        "displayOrder": 4
      },
      {
        "id": "mste-surveying",
        "slug": "surveying",
        "title": "Surveying",
        "shortDescription": "Measurement, construction surveying, and the layout of points and alignments.",
        "displayOrder": 5
      },
      {
        "id": "mste-highway-and-transportation-engineering",
        "slug": "highway-and-transportation-engineering",
        "title": "Highway and transportation engineering",
        "shortDescription": "Transport systems, highway geometry, and the movement of people and goods.",
        "displayOrder": 6
      },
      {
        "id": "mste-construction-materials",
        "slug": "construction-materials",
        "title": "Construction materials",
        "shortDescription": "Properties and selection of materials used in civil engineering construction.",
        "displayOrder": 7
      },
      {
        "id": "mste-quantity-surveying",
        "slug": "quantity-surveying",
        "title": "Quantity surveying",
        "shortDescription": "Measuring work quantities and relating drawings and specifications to estimates.",
        "displayOrder": 8
      },
      {
        "id": "mste-construction-management-and-methods",
        "slug": "construction-management-and-methods",
        "title": "Construction management and methods",
        "shortDescription": "Planning, scheduling, resources, and methods for carrying out construction work.",
        "displayOrder": 9
      },
      {
        "id": "mste-construction-safety",
        "slug": "construction-safety",
        "title": "Construction safety",
        "shortDescription": "Occupational safety and health considerations in construction operations.",
        "displayOrder": 10
      }
    ],
    "note": "MSTE is the familiar student shorthand."
  },
  {
    "id": "hge",
    "slug": "hge",
    "abbreviation": "HGE",
    "title": "Hydraulics and Principles of Geotechnical Engineering",
    "description": "Explore the behavior of water and soil, from fluid flow to the ground beneath a foundation.",
    "learningOverview": "This subject connects fluid behavior with the engineering properties of the ground. Its learning areas begin with water at rest and in motion, then turn to soil, seepage, foundations, and stability.",
    "displayOrder": 3,
    "previewTopics": [
      "Hydrostatics and fluid flow",
      "Soil properties and strength",
      "Bearing capacity and settlement"
    ],
    "topics": [
      {
        "id": "hge-fluid-properties",
        "slug": "fluid-properties",
        "title": "Fluid properties",
        "shortDescription": "The physical properties that describe fluid behavior in engineering systems.",
        "displayOrder": 1
      },
      {
        "id": "hge-hydrostatics",
        "slug": "hydrostatics",
        "title": "Hydrostatics",
        "shortDescription": "Pressure and forces in fluids at rest, including buoyancy.",
        "displayOrder": 2
      },
      {
        "id": "hge-fluid-flow",
        "slug": "fluid-flow",
        "title": "Fluid flow",
        "shortDescription": "Flow rate, continuity, and the use of energy relationships in moving fluids.",
        "displayOrder": 3
      },
      {
        "id": "hge-hydrodynamics",
        "slug": "hydrodynamics",
        "title": "Hydrodynamics",
        "shortDescription": "The relationship between fluid motion, forces, and momentum.",
        "displayOrder": 4
      },
      {
        "id": "hge-water-supply",
        "slug": "water-supply",
        "title": "Water supply",
        "shortDescription": "Principles of conveying and distributing water through supply systems.",
        "displayOrder": 5
      },
      {
        "id": "hge-soil-properties-and-classification",
        "slug": "soil-properties-and-classification",
        "title": "Soil properties and classification",
        "shortDescription": "Soil constituents, index properties, and the classification of soil types.",
        "displayOrder": 6
      },
      {
        "id": "hge-permeability-and-seepage",
        "slug": "permeability-and-seepage",
        "title": "Permeability and seepage",
        "shortDescription": "How water moves through soil and how that flow affects engineering behavior.",
        "displayOrder": 7
      },
      {
        "id": "hge-stress-distribution-in-soils",
        "slug": "stress-distribution-in-soils",
        "title": "Stress distribution in soils",
        "shortDescription": "How applied loads and overburden contribute to stresses within soil.",
        "displayOrder": 8
      },
      {
        "id": "hge-shear-strength",
        "slug": "shear-strength",
        "title": "Shear strength",
        "shortDescription": "The resistance of soil to shearing and the factors that influence failure.",
        "displayOrder": 9
      },
      {
        "id": "hge-compaction-and-consolidation",
        "slug": "compaction-and-consolidation",
        "title": "Compaction and consolidation",
        "shortDescription": "Soil densification and time-dependent volume change, including settlement.",
        "displayOrder": 10
      },
      {
        "id": "hge-bearing-capacity",
        "slug": "bearing-capacity",
        "title": "Bearing capacity",
        "shortDescription": "The ability of supporting soil to carry foundation loads.",
        "displayOrder": 11
      },
      {
        "id": "hge-lateral-earth-pressure",
        "slug": "lateral-earth-pressure",
        "title": "Lateral earth pressure",
        "shortDescription": "Pressures exerted by soil on retaining structures and related systems.",
        "displayOrder": 12
      },
      {
        "id": "hge-slope-stability",
        "slug": "slope-stability",
        "title": "Slope stability",
        "shortDescription": "The balance of driving and resisting effects in natural and constructed slopes.",
        "displayOrder": 13
      }
    ]
  }
];

const staticsModule: Module = {
  id: "psad-statics",
  slug: "engineering-mechanics-statics",
  subjectId: "psad",
  title: "Engineering Mechanics — Statics",
  description: "An introductory sequence connecting forces and free body diagrams with particle and rigid-body equilibrium.",
  displayOrder: 1,
  availability: "overview",
  lessons: [
    {
      id: "psad-statics-forces-vectors", slug: "forces-and-vectors", moduleId: "psad-statics",
      title: "Forces and Vectors",
      shortDescription: "Represent forces by their magnitude and direction, and combine them using vector components.",
      displayOrder: 1, availability: "published",
      source: { label: "OpenStax University Physics: Forces and vector algebra", url: "https://openstax.org/books/university-physics-volume-1/pages/2-3-algebra-of-vectors" },
    },
    {
      id: "psad-statics-free-body-diagrams", slug: "free-body-diagrams", moduleId: "psad-statics",
      title: "Free Body Diagrams", shortDescription: "Isolate a body and identify the external forces acting on it.",
      displayOrder: 2, availability: "planned", prerequisiteIds: ["psad-statics-forces-vectors"],
    },
    {
      id: "psad-statics-equilibrium-particles", slug: "equilibrium-of-particles", moduleId: "psad-statics",
      title: "Equilibrium of Particles", shortDescription: "Use force balance to describe the equilibrium of a particle.",
      displayOrder: 3, availability: "planned", prerequisiteIds: ["psad-statics-forces-vectors", "psad-statics-free-body-diagrams"],
    },
    {
      id: "psad-statics-equilibrium-rigid-bodies", slug: "equilibrium-of-rigid-bodies", moduleId: "psad-statics",
      title: "Equilibrium of Rigid Bodies", shortDescription: "Consider both force and moment balance for a rigid body in equilibrium.",
      displayOrder: 4, availability: "planned", prerequisiteIds: ["psad-statics-equilibrium-particles"],
    },
  ],
};

// One representative module per subject. Reuse existing topic copy for empty overviews;
// these are not an automatically populated curriculum or a complete module sequence.
const subjects: readonly Subject[] = subjectOverviews.map(subject => {
  if (subject.id === "psad") return { ...subject, modules: [staticsModule] };
  const topicId = subject.id === "mste" ? "mste-engineering-mathematics" : "hge-fluid-properties";
  const topic = subject.topics.find(topic => topic.id === topicId);
  if (!topic) throw new Error(`Representative module topic missing: ${topicId}`);
  return {
    ...subject,
    modules: [{
      id: subject.id === "mste" ? "mste-mathematics" : "hge-fluid-properties",
      slug: topic.slug,
      subjectId: subject.id,
      title: topic.title,
      description: topic.shortDescription,
      displayOrder: 1,
      availability: "overview",
      lessons: [],
    }],
  };
});

export function getSubjects(): Subject[] {
  return [...subjects].sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getSubjectBySlug(slug: string): Subject | undefined {
  return subjects.find((subject) => subject.slug === slug);
}

export function getOrderedTopics(subject: Subject): Topic[] {
  return [...subject.topics].sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getOrderedModules(subject: Subject): Module[] {
  return [...subject.modules].sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getModuleBySlug(subject: Subject, slug: string): Module | undefined {
  return subject.modules.find(module => module.slug === slug);
}

export function getOrderedLessons(module: Module): Lesson[] {
  return [...module.lessons].sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getLessonBySlug(module: Module, slug: string): Lesson | undefined {
  return module.lessons.find(lesson => lesson.slug === slug);
}

export function getLessonById(id: string): { subject: Subject; module: Module; lesson: Lesson } | undefined {
  for (const subject of subjects) {
    for (const module of subject.modules) {
      const lesson = module.lessons.find(lesson => lesson.id === id);
      if (lesson) return { subject, module, lesson };
    }
  }
}

export function getModuleHref(subject: Subject, module: Module): string | undefined {
  if (module.subjectId !== subject.id || module.availability === "planned") return undefined;
  return `/curriculum/${subject.slug}/${module.slug}`;
}

export function getLessonHref(subject: Subject, module: Module, lesson: Lesson): string | undefined {
  const moduleHref = getModuleHref(subject, module);
  if (!moduleHref || lesson.moduleId !== module.id || lesson.availability === "planned") return undefined;
  return `${moduleHref}/${lesson.slug}`;
}

export function getRecommendedNeighbors(module: Module, lessonId: string) {
  const ordered = getOrderedLessons(module);
  const index = ordered.findIndex(lesson => lesson.id === lessonId);
  if (index < 0) return undefined;
  return { previous: ordered[index - 1], next: ordered[index + 1] };
}

// Editorial validation only: this never runs as an access or prerequisite gate.
export function validatePrerequisites(lessons: readonly Lesson[]): string[] {
  const errors: string[] = [];
  const byId = new Map(lessons.map(lesson => [lesson.id, lesson]));
  if (byId.size !== lessons.length) errors.push("Duplicate lesson IDs");
  for (const lesson of lessons) {
    for (const id of lesson.prerequisiteIds ?? []) {
      if (id === lesson.id) errors.push(`${lesson.id} recommends itself`);
      else if (!byId.has(id)) errors.push(`${lesson.id} has missing prerequisite ${id}`);
    }
  }
  const visiting = new Set<string>();
  const visited = new Set<string>();
  function visit(id: string) {
    if (visiting.has(id)) { errors.push(`Circular prerequisite at ${id}`); return; }
    if (visited.has(id) || !byId.has(id)) return;
    visiting.add(id);
    for (const prerequisite of byId.get(id)?.prerequisiteIds ?? []) visit(prerequisite);
    visiting.delete(id);
    visited.add(id);
  }
  for (const lesson of lessons) visit(lesson.id);
  return errors;
}
