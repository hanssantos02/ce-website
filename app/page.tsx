import { PageContainer } from "../components/layout/page-container";

const learningApproach = [
  {
    title: "Learn the concept.",
    description: "Start with clear explanations and the ideas behind each formula.",
  },
  {
    title: "Understand the engineering.",
    description: "Connect the mathematics to the forces, materials, and systems it describes.",
  },
  {
    title: "Practice the problem.",
    description: "Work through examples, check the units, and make sense of the solution.",
  },
  {
    title: "Track your progress.",
    description: "Build a record of your learning and return to the topics you need.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="introduction" aria-labelledby="page-title">
        <PageContainer className="introduction-grid">
          <div>
            <h1 id="page-title" className="page-title">
              A clear path through civil engineering.
            </h1>
            <p className="introduction-copy">
              CEPath is being built to connect concepts, engineering reasoning,
              and practice for Filipino students preparing for the CELE.
            </p>
            <a className="text-link" href="#approach">
              Read our learning approach
            </a>
          </div>
          <aside className="page-index">
            <nav aria-label="On this page">
              <h2 className="index-title">On this page</h2>
              <a href="#approach">Our learning approach</a>
              <a href="#about">About CEPath</a>
            </nav>
            <p className="development-note">
              In development. Curriculum and progress tracking are not yet available.
            </p>
          </aside>
        </PageContainer>
      </section>

      <section id="approach" className="content-section" tabIndex={-1} aria-labelledby="approach-title">
        <PageContainer className="section-grid">
          <div className="section-introduction">
            <h2 id="approach-title" className="section-title">Our learning approach</h2>
            <p>A foundation for understanding, one idea at a time.</p>
          </div>
          <ol className="approach-list">
            {learningApproach.map((step, index) => (
              <li key={step.title}>
                <span className="step-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </PageContainer>
      </section>

      <section id="about" className="content-section about-section" tabIndex={-1} aria-labelledby="about-title">
        <PageContainer className="section-grid">
          <h2 id="about-title" className="section-title">Built for the way you study.</h2>
          <div className="reading-copy">
            <p>
              Build your foundations in a recommended order, or revisit the topics
              you need during board exam review. CEPath’s planned curriculum will
              guide your study while keeping published free lessons open to everyone.
            </p>
            <p>
              Understanding why a solution works is at the heart of the project.
              Recommended prerequisites will offer guidance, without lesson unlocking
              or forced progression.
            </p>
            <p className="project-note">
              CEPath is a working title. This independent project is not affiliated
              with or endorsed by the Professional Regulation Commission.
            </p>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
