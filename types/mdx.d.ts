declare module "*.mdx" {
  export const lessonId: string;
  export const learningObjectives: readonly string[];
  export const sections: readonly { id: string; title: string }[];
  export const editorialStatus: string;
}
