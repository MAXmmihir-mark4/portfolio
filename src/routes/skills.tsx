import { createFileRoute } from "@tanstack/react-router";
import { SkillsSection } from "@/components/portfolio/Sections";
import { PageShell } from "@/components/portfolio/PageShell";
import { pageMeta } from "@/lib/portfolio";
export const Route = createFileRoute("/skills")({
  head: () =>
    pageMeta(
      "My Tech Universe",
      "Explore Mihir’s skills in C, C++, JavaScript, Node.js and Django.",
    ),
  component: SkillsPage,
});
function SkillsPage() {
  return (
    <PageShell>
      <SkillsSection />
    </PageShell>
  );
}
