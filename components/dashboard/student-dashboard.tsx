import Link from "next/link";
import { PageContainer } from "../layout/page-container";
import { SubjectSymbol } from "../curriculum/subject-symbol";
import { PrerequisiteRecommendations } from "../curriculum/prerequisite-recommendations";
import { ProgressStatus } from "../progress/progress-status";
import type { DashboardSummary, PublishedLesson } from "../../lib/dashboard/summary";

function LessonReference({ entry, label }: { entry: PublishedLesson; label: string }) {
  return <div className="dashboard-lesson">
    <p className="dashboard-context">{entry.subject.abbreviation} · {entry.module.title}</p>
    <h3>{entry.lesson.title}</h3>
    <p>{entry.lesson.shortDescription}</p>
    <Link href={entry.href} className="dashboard-link">{label}</Link>
  </div>;
}

export function DashboardHeader() {
  return <header className="dashboard-header">
    <div><h1>Your learning dashboard</h1>
      <p>See your saved progress, return to unfinished study, and choose your next lesson.</p></div>
    <Link href="/curriculum" className="dashboard-link">Explore the curriculum</Link>
  </header>;
}

function RecordedLessons({ title, entries, status }: { title: string; entries: readonly PublishedLesson[]; status: "in_progress" | "completed" }) {
  return <section className="dashboard-records" aria-label={title}>
    <h3>{title}</h3>
    {entries.length ? <><p className="project-note">{entries.length > 5 ? "Showing the five most recently updated lessons." : "Ordered by the latest saved progress update."}</p>
      <ul>{entries.slice(0, 5).map(entry => <li key={entry.lesson.id}>
        <div><Link className="dashboard-link" href={entry.href}>{entry.lesson.title}</Link><p className="dashboard-context">{entry.subject.abbreviation} · {entry.module.title}</p></div>
        <ProgressStatus status={status} />
      </li>)}</ul></> : <p>No lessons marked {status === "completed" ? "Completed" : "In Progress"} yet.</p>}
  </section>;
}

export function StudentDashboard({ summary }: { summary: DashboardSummary }) {
  const current = summary.continueLesson;
  const next = summary.recommendedLesson;
  return <PageContainer className="dashboard">
    <DashboardHeader />
    <section className="dashboard-section" aria-labelledby="overview-title">
      <h2 id="overview-title">Your learning overview</h2>
      <dl className="dashboard-overview">
        <div><dt>Completed lessons</dt><dd>{summary.completed}</dd></div>
        <div><dt>In-progress lessons</dt><dd>{summary.inProgress}</dd></div>
        <div><dt>Currently available lessons</dt><dd>{summary.available}</dd></div>
      </dl>
      <p className="dashboard-note">Counts cover published lessons with complete content, not the full CELE syllabus.</p>
      {!summary.hasProgress && <p className="dashboard-welcome">Start with any available lesson. Use its progress controls when you’re ready to save your study status; simply reading a lesson changes nothing.</p>}
      {summary.allCompleted && <p className="dashboard-welcome">You’ve completed every currently available lesson. Revisit them whenever you need, or explore the subject outlines while more lessons are developed.</p>}
    </section>
    <div className="dashboard-learning">
      <section className="dashboard-section" aria-labelledby="continue-title">
        <h2 id="continue-title">Continue learning</h2>
        {current ? <><p className="dashboard-note">Your most recently updated In Progress lesson. Lesson visits are not tracked.</p>
          <LessonReference entry={current} label="Continue this lesson" /><ProgressStatus status="in_progress" /></>
          : <p>{summary.allCompleted ? "No unfinished lessons are recorded. You can revisit your completed lessons below." : "No lessons are marked In Progress. Recommended Next offers a suggested starting point, rather than recent activity."}</p>}
      </section>
      <section className="dashboard-section" aria-labelledby="recommended-title">
        <h2 id="recommended-title">Recommended next</h2>
        {next ? <><p className="dashboard-note">Suggested by curriculum order. You’re free to choose another lesson.</p>
          <LessonReference entry={next} label={current?.lesson.id === next.lesson.id ? "Return to this suggested lesson" : "Open this suggested lesson"} />
          {current?.lesson.id === next.lesson.id && <p className="dashboard-note">Your unfinished lesson is also the next suggestion in sequence.</p>}
          {!!next.lesson.prerequisiteIds?.length && <PrerequisiteRecommendations ids={next.lesson.prerequisiteIds} />}</>
          : <p>{summary.available ? "No incomplete published lesson remains to recommend. Browse the curriculum or review completed material." : "Complete lessons are being developed. Explore the subject outlines in the meantime."}</p>}
      </section>
    </div>
    <section className="dashboard-section" aria-labelledby="subjects-title">
      <h2 id="subjects-title">Progress by subject</h2>
      <p className="dashboard-note">Progress through currently published content only; completion does not establish subject mastery.</p>
      <ul className="dashboard-subjects">
        {summary.subjects.map(({ subject, available, completed, percentage }) => <li key={subject.id}>
          <div className="dashboard-subject-name"><SubjectSymbol subject={subject.id} /><div>
            <h3><Link href={`/curriculum/${subject.slug}`} className="dashboard-link">{subject.abbreviation}</Link></h3>
            <p>{subject.title}</p>
          </div></div>
          <div className="dashboard-subject-progress">
            {percentage === null ? <p>Lessons coming soon.</p> : <>
              <p id={`${subject.id}-progress-label`}>{completed} of {available} currently available {available === 1 ? "lesson" : "lessons"} completed.</p>
              <progress value={completed} max={available} aria-labelledby={`${subject.id}-progress-label`} />
              <p className="dashboard-note">{percentage}% of currently published content</p>
            </>}
            <Link href={`/curriculum/${subject.slug}`} className="dashboard-link">Explore {subject.abbreviation}</Link>
          </div>
        </li>)}
      </ul>
    </section>
    <section className="dashboard-section" aria-labelledby="saved-lessons-title">
      <h2 id="saved-lessons-title">Your recorded lessons</h2>
      <div className="dashboard-learning dashboard-history">
        <RecordedLessons title="In progress" entries={summary.inProgressLessons} status="in_progress" />
        <RecordedLessons title="Completed" entries={summary.completedLessons} status="completed" />
      </div>
    </section>
    <nav className="dashboard-section dashboard-footer" aria-label="Dashboard shortcuts">
      <Link href="/curriculum" className="dashboard-link">Full curriculum catalog</Link>
      <Link href="/account" className="dashboard-link">My account</Link>
    </nav>
  </PageContainer>;
}

export function DashboardUnavailable() {
  return <PageContainer className="dashboard"><DashboardHeader />
    <section className="dashboard-section dashboard-unavailable" aria-labelledby="dashboard-error-title">
      <h2 id="dashboard-error-title">Your progress couldn’t be loaded</h2>
      <p role="alert">We couldn’t retrieve your saved progress. Your counts are unavailable; this does not mean they are zero. Try again, or keep reading the public curriculum.</p>
      <a href="/dashboard" className="dashboard-link">Reload your dashboard</a>
      <Link href="/account" className="dashboard-link">Check your account</Link>
    </section>
  </PageContainer>;
}
