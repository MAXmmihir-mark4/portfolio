import { createFileRoute } from "@tanstack/react-router";
import { CertificationsSection } from "@/components/portfolio/Sections";
import { PageShell } from "@/components/portfolio/PageShell";
import { pageMeta } from "@/lib/portfolio";
export const Route = createFileRoute("/certifications")({
  head: () =>
    pageMeta(
      "Milestones",
      "Academic milestones and the growing certification log of Mihir Chhatwani.",
    ),
  component: CertificationsPage,
});
function CertificationsPage() {
  return (
    <PageShell>
      <CertificationsSection />
    </PageShell>
  );
}
