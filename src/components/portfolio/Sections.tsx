import { useState, type ReactNode, type MouseEvent, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Braces,
  GraduationCap,
  MapPin,
  Plus,
  Rocket,
  Send,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog";
import { skills, profile } from "@/lib/portfolio";

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
export function SectionHeading({
  number,
  label,
  title,
  subtitle,
}: {
  number: string;
  label: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="section-heading">
      <div className="section-eyebrow mono">
        <span>{number} /</span> {label}
      </div>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </Reveal>
  );
}
function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const [rotate, setRotate] = useState({ rotateX: 0, rotateY: 0 });
  const move = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    setRotate({
      rotateX: -(e.clientY - r.top - r.height / 2) / 70,
      rotateY: (e.clientX - r.left - r.width / 2) / 70,
    });
  };
  return (
    <motion.div
      className={`tilt-panel ${className}`}
      onMouseMove={move}
      onMouseLeave={() => setRotate({ rotateX: 0, rotateY: 0 })}
      animate={rotate}
      transition={{ type: "spring", stiffness: 160, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}
export function AboutSection() {
  return (
    <section className="content-section about-section" id="about">
      <div className="section-inner">
        <SectionHeading
          number="01"
          label="THE HUMAN BEHIND THE MACHINE"
          title="Curiosity is my operating system."
        />
        <div className="about-grid">
          <Reveal>
            <p className="large-copy">
              I’m Mihir. A builder by instinct,
              <br />a learner by choice.
            </p>
            <p className="body-copy">
              I like building new things every day. I challenge myself with tasks that polish my
              skills, push my boundaries, and make sure I learn something new along the way.
            </p>
            <div className="location-line">
              <MapPin size={16} /> Udaipur, India <span>·</span> Exploring what’s next
            </div>
          </Reveal>
          <Reveal>
            <Tilt className="education-panel">
              <div className="panel-label mono">
                <GraduationCap size={18} /> EDUCATION LOG <span>001</span>
              </div>
              <h3>JECRC University</h3>
              <p>Bachelor of Technology</p>
              <div className="education-stats">
                <div>
                  <strong>
                    9.00<span>/10</span>
                  </strong>
                  <small>CGPA</small>
                </div>
                <div>
                  <strong>
                    2025<span>—2029</span>
                  </strong>
                  <small>ACADEMIC ORBIT</small>
                </div>
              </div>
            </Tilt>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
export function SkillsSection() {
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const selectedSkill = skills[selected];
  if (!selectedSkill) return null;
  return (
    <section className="content-section skills-section" id="skills">
      <div className="section-inner">
        <SectionHeading
          number="02"
          label="MY TECH UNIVERSE"
          title="Different worlds. One builder."
          subtitle="The tools I’m exploring, connecting, and creating with."
        />
        <div className="skills-orbit">
          {skills.map((skill, i) => (
            <Reveal key={skill.name}>
              <Button
                variant="planet"
                className={selected === i ? "planet-button planet-selected" : "planet-button"}
                onClick={() => setSelected(i)}
                onMouseEnter={() => setSelected(i)}
                onFocus={() => setSelected(i)}
                aria-pressed={selected === i}
              >
                <motion.span
                  className={`planet ${skill.className}`}
                  animate={reduced ? { y: 0 } : { y: [0, -7, 0] }}
                  transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span>{skill.code}</span>
                  <i />
                </motion.span>
                <span className="planet-title">{skill.name}</span>
                <span className="mono planet-type">{skill.kind}</span>
              </Button>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="skill-detail" aria-live="polite">
            <Braces size={22} />
            <div>
              <h3>{selectedSkill.name}</h3>
              <p>{selectedSkill.description}</p>
            </div>
            <span className="mono">
              {selectedSkill.stack}
              <small>LEARNING & BUILDING</small>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
export function ProjectsSection() {
  const [detail, setDetail] = useState(false);
  return (
    <section className="content-section projects-section" id="projects">
      <div className="section-inner">
        <SectionHeading
          number="03"
          label="SELECTED EXPLORATIONS"
          title="Ideas into existence."
          subtitle="A space for experiments, late-night builds, and the things I’m proud to make."
        />
        <Reveal>
          <Tilt className="project-card">
            <div className="project-art" aria-hidden>
              <div className="project-orbits">
                <span />
                <span />
                <span />
                <Terminal size={48} strokeWidth={1} />
              </div>
              <span className="mono">NEXT MISSION / IN DEVELOPMENT</span>
            </div>
            <div className="project-copy">
              <span className="status-chip mono">
                <span /> PROJECT LOG
              </span>
              <h3>
                The next idea
                <br />
                starts here.
              </h3>
              <p>
                Exploring the intersection of AI and the web. New projects will appear here as
                they’re ready to share.
              </p>
              <div className="tech-chips">
                <span>AI</span>
                <span>Full Stack</span>
                <span>Experiments</span>
              </div>
              <Button variant="space" onClick={() => setDetail(true)}>
                Open mission log <ArrowUpRight />
              </Button>
            </div>
          </Tilt>
        </Reveal>
        <Dialog.Root open={detail} onOpenChange={setDetail}>
          <Dialog.Portal>
            <Dialog.Overlay className="modal-backdrop" />
            <Dialog.Content className="mission-dialog">
              <Dialog.Close asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="dialog-close"
                  aria-label="Close mission log"
                >
                  <X />
                </Button>
              </Dialog.Close>
              <span className="mono">MISSION LOG / 001</span>
              <Dialog.Title asChild>
                <h3>A work in progress.</h3>
              </Dialog.Title>
              <Dialog.Description>
                No project has been published here yet. If you’re curious about what I’m working on,
                let’s start a conversation.
              </Dialog.Description>
              <Button asChild variant="space">
                <a href={`mailto:${profile.email}`}>
                  Ask Mihir <ArrowUpRight />
                </a>
              </Button>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </section>
  );
}
export function ExperienceSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="content-section experience-section" id="experience">
      <div className="section-inner">
        <SectionHeading number="04" label="THE FLIGHT PATH" title="Every day, a little further." />
        <Reveal>
          <div className="timeline">
            <div className="timeline-entry">
              <span className="timeline-dot" />
              <div className="mono timeline-date">
                2025 — 2029<span>CURRENT CHAPTER</span>
              </div>
              <div>
                <h3>Learning. Building. Evolving.</h3>
                <p>B.Tech · JECRC University</p>
                <p className="body-copy">
                  Strengthening my foundations in software and exploring the possibilities of AI,
                  full-stack development, and machine learning.
                </p>
              </div>
            </div>
            <div className="timeline-entry future-entry">
              <span className="timeline-dot" />
              <div className="mono timeline-date">
                2029 — 2030<span>FUTURE AMBITION</span>
              </div>
              <div>
                <Button
                  variant="timeline"
                  aria-expanded={expanded}
                  onClick={() => setExpanded(!expanded)}
                >
                  <span>
                    <h3>Valve Corporation</h3>
                    <p>SDE-II · Aspirational next chapter</p>
                  </span>
                  <Plus className={expanded ? "rotate-45" : ""} />
                </Button>
                {expanded && (
                  <p className="body-copy">
                    A future-dated career goal, not completed employment. The journey is still being
                    written.
                  </p>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
export function CertificationsSection() {
  return (
    <section className="content-section certification-section" id="certifications">
      <div className="section-inner">
        <SectionHeading number="05" label="MILESTONES" title="Proof of the journey." />
        <div className="milestones">
          <Reveal>
            <Tilt className="milestone-card">
              <GraduationCap size={30} strokeWidth={1} />
              <span className="mono">ACADEMIC ACHIEVEMENT</span>
              <h3>9.00 CGPA</h3>
              <p>JECRC University · B.Tech</p>
            </Tilt>
          </Reveal>
          <Reveal>
            <Tilt className="milestone-card">
              <Sparkles size={30} strokeWidth={1} />
              <span className="mono">CERTIFICATIONS</span>
              <h3>Still exploring.</h3>
              <p>New credentials will join the mission log.</p>
            </Tilt>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
export function ContactSection() {
  const [launched, setLaunched] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name"));
    const email = String(data.get("email"));
    const message = String(data.get("message"));
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio transmission from ${name}`)}&body=${encodeURIComponent(`${message}\n\nFrom: ${name}\nReply to: ${email}`)}`;
    setLaunched(true);
  }
  return (
    <section className="content-section contact-section" id="contact">
      <div className="section-inner">
        <SectionHeading
          number="06"
          label="MISSION CONTROL"
          title="Let’s build what’s next."
          subtitle="An idea, an opportunity, or just a hello. My inbox is open."
        />
        <div className="contact-grid">
          <Reveal>
            <a className="contact-email" href={`mailto:${profile.email}`}>
              chhatwanimihir
              <br />
              @gmail.com <ArrowUpRight />
            </a>
            <div className="location-line">
              <MapPin size={16} /> Udaipur, India
            </div>
            <span className="availability">
              <span /> Open to ideas & collaboration
            </span>
          </Reveal>
          <Reveal>
            <form className="contact-form" onSubmit={submit}>
              <div className="form-row">
                <label>
                  Your name
                  <input name="name" placeholder="Alex" required autoComplete="name" />
                </label>
                <label>
                  Email address
                  <input
                    name="email"
                    type="email"
                    placeholder="alex@example.com"
                    required
                    autoComplete="email"
                  />
                </label>
              </div>
              <label>
                Your transmission
                <textarea
                  name="message"
                  placeholder="I have something in mind…"
                  rows={4}
                  required
                />
              </label>
              <Button variant="space" type="submit">
                {launched ? "Open another transmission" : "Send transmission"}
                <motion.span animate={launched ? { y: [0, -30, 0], opacity: [1, 0, 1] } : {}}>
                  {launched ? <Rocket size={16} /> : <Send size={16} />}
                </motion.span>
              </Button>
              <p className="form-note" role="status">
                {launched
                  ? "Your email app will open with your message. Send it there to complete the transmission."
                  : "Delivered through your email app."}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <a href="/" className="footer-brand">
        mihir<span>.</span>
      </a>
      <span className="mono">BUILT WITH CURIOSITY. SENT FROM EARTH.</span>
      <a href="#main" aria-label="Back to top">
        <ArrowRight className="-rotate-90" size={19} />
      </a>
      <small>© 2026 Mihir Chhatwani</small>
    </footer>
  );
}
