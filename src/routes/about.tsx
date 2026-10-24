import { createFileRoute } from "@tanstack/react-router";
import { AboutSection } from "@/components/portfolio/Sections";
import { PageShell } from "@/components/portfolio/PageShell";
import { pageMeta } from "@/lib/portfolio";
export const Route = createFileRoute("/about")({
  head: () =>
    pageMeta(
      "The Human Behind the Machine",
      "Meet Mihir Chhatwani, a curious builder studying at JECRC University in Udaipur, India.",
    ),
  component: AboutPage,
});
function AboutPage() {
  return (
    <PageShell>
      <AboutSection />
    </PageShell>
  );
}
