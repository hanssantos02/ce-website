import { PageContainer } from "./page-container";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <PageContainer className="footer-inner">
        <p>CEPath · An independent civil engineering learning project.</p>
        <a href="#main-content">Back to top</a>
      </PageContainer>
    </footer>
  );
}
