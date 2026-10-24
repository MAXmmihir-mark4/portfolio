import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, Orbit, X } from "lucide-react";
import { Button } from "@/components/ui/button";
const links = [
  ["About", "/about"],
  ["Skills", "/skills"],
  ["Projects", "/projects"],
  ["Experience", "/experience"],
] as const;
export function Navigation() {
  const [scrolled, setScrolled] = useState(false),
    [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    const change = () => setScrolled(window.scrollY > 60);
    change();
    window.addEventListener("scroll", change, { passive: true });
    return () => window.removeEventListener("scroll", change);
  }, []);
  useEffect(() => setOpen(false), [path]);
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className={`navigation ${scrolled ? "navigation-small" : ""}`}>
        <Link to="/" className="brand" aria-label="Mihir Chhatwani home">
          <Orbit size={26} strokeWidth={1.4} />
          <span>
            mihir<span className="text-primary">.</span>
          </span>
        </Link>
        <nav aria-label="Main navigation" className={open ? "nav-links nav-open" : "nav-links"}>
          {links.map(([label, to]) => (
            <Link key={to} to={to} activeProps={{ className: "nav-active" }}>
              {label}
            </Link>
          ))}
        </nav>
        <Button asChild variant="nav">
          <Link to="/contact">
            Let’s talk <ArrowUpRight />
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </header>
    </>
  );
}
