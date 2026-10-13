import { PageContainer } from "./page-container";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <PageContainer>
        <div className="footer-inner">
          <div className="footer-description">
            <p className="footer-brand">CEPath</p>
            <p>Concept-first civil engineering learning for Filipino students.</p>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            <a href="/#curriculum">Curriculum preview</a>
            <a href="/#how-it-works">How it works</a>
            <a href="#main-content">Back to top</a>
          </nav>
        </div>
        <p className="footer-disclaimer">CEPath is a working title for an independent educational platform in development. It is not affiliated with or endorsed by the Professional Regulation Commission. Educational material does not replace official examination guidance.</p>
      </PageContainer>
    </footer>
  );
}
