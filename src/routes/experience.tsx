import { createFileRoute } from "@tanstack/react-router";
import { ExperienceSection } from "@/components/portfolio/Sections";
import { PageShell } from "@/components/portfolio/PageShell";
import { pageMeta } from "@/lib/portfolio";
export const Route = createFileRoute("/experience")({
  head: () =>
    pageMeta(
      "The Flight Path",
      "Mihir’s academic journey, current learning, and future career ambitions.",
    ),
  component: ExperiencePage,
});
function ExperiencePage() {
  return (
    <PageShell>
      <ExperienceSection />
    </PageShell>
  );
}
