import type { MDXComponents } from "mdx/types";
import { LessonSection, WorkedExample, LessonNote, PracticeSolution, LessonTable } from "./components/lesson/educational-components";
import { ForceComponentsDiagram } from "./components/lesson/force-components-diagram";
import { BlockFreeBodyDiagram, SupportReactionsDiagrams, BeamFreeBodyDiagram } from "./components/lesson/free-body-diagrams";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { LessonSection, WorkedExample, LessonNote, PracticeSolution, ForceComponentsDiagram,
    BlockFreeBodyDiagram, SupportReactionsDiagrams, BeamFreeBodyDiagram, table: LessonTable, ...components };
}
