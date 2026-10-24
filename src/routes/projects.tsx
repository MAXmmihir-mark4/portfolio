import { createFileRoute } from "@tanstack/react-router";
import { ProjectsSection } from "@/components/portfolio/Sections";
import { PageShell } from "@/components/portfolio/PageShell";
import { pageMeta } from "@/lib/portfolio";
export const Route = createFileRoute("/projects")({
  head: () =>
    pageMeta(
      "Selected Explorations",
      "Follow Mihir’s project mission log and upcoming explorations in AI and full-stack development.",
    ),
  component: ProjectsPage,
});
function ProjectsPage() {
  return (
    <PageShell>
      <ProjectsSection />
    </PageShell>
  );
}
