import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/portfolio/Hero";
import {
  AboutSection,
  SkillsSection,
  ProjectsSection,
  ExperienceSection,
  CertificationsSection,
  ContactSection,
  Footer,
} from "@/components/portfolio/Sections";
import { pageMeta } from "@/lib/portfolio";
export const Route = createFileRoute("/")({
  head: () => ({
    ...pageMeta(
      "A Mind in Motion",
      "Explore Mihir Chhatwani’s universe — AI engineer, full-stack developer, and lifelong learner based in Udaipur, India.",
    ),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Mihir Chhatwani",
          email: "chhatwanimihir@gmail.com",
          jobTitle: "AI Engineer and Full Stack Developer",
          address: { "@type": "PostalAddress", addressLocality: "Udaipur", addressCountry: "IN" },
          alumniOf: { "@type": "CollegeOrUniversity", name: "JECRC University" },
        }),
      },
    ],
  }),
  component: Index,
});
function Index() {
  return (
    <main id="main" className="portfolio-journey">
      <Hero />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
