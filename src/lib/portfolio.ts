export const profile = {
  name: "Mihir Chhatwani",
  email: "chhatwanimihir@gmail.com",
  location: "Udaipur, India",
};
export const skills = [
  {
    name: "C / C++",
    code: "C++",
    kind: "Foundations",
    description:
      "Exploring systems programming, problem solving, and the fundamentals behind efficient software.",
    stack: "C · C++ · Algorithms",
    className: "planet-cpp",
  },
  {
    name: "JavaScript",
    code: "JS",
    kind: "Interfaces",
    description: "Building interactive experiences and connecting ideas to the web.",
    stack: "JavaScript · Web APIs · Frontend",
    className: "planet-js",
  },
  {
    name: "Node.js",
    code: "N",
    kind: "Backend",
    description: "Exploring server-side JavaScript and the systems that power applications.",
    stack: "Node.js · JavaScript · Backend",
    className: "planet-node",
  },
  {
    name: "Django",
    code: "Dj",
    kind: "Applications",
    description: "Turning ideas into structured web applications with Python.",
    stack: "Django · Python · Web",
    className: "planet-django",
  },
];
export const pageMeta = (title: string, description: string) => ({
  meta: [
    { title: `${title} — Mihir Chhatwani` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} — Mihir Chhatwani` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});
