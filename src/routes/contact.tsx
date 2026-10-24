import { createFileRoute } from "@tanstack/react-router";
import { ContactSection } from "@/components/portfolio/Sections";
import { PageShell } from "@/components/portfolio/PageShell";
import { pageMeta } from "@/lib/portfolio";
export const Route = createFileRoute("/contact")({
  head: () =>
    pageMeta(
      "Mission Control",
      "Start a conversation with Mihir Chhatwani about ideas, opportunities, and collaboration.",
    ),
  component: ContactPage,
});
function ContactPage() {
  return (
    <PageShell>
      <ContactSection />
    </PageShell>
  );
}
