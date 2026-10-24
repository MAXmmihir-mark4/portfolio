import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Footer } from "./Sections";
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main id="main" className="detail-page">
      <div className="detail-back">
        <Link to="/">
          <ArrowLeft size={15} /> Back to the universe
        </Link>
      </div>
      {children}
      <Footer />
    </main>
  );
}
