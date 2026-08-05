import Link from "next/link";
import site from "@/content/site.json";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-inkline/0">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10">
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-widest2 text-parchment"
        >
          {site.name}
        </Link>
        <nav className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest2 text-parchmentdim">
          <Link href="/#journey" className="transition hover:text-brass">
            {site.nav.journey}
          </Link>
          <Link href="/#projects" className="transition hover:text-brass">
            {site.nav.projects}
          </Link>
        </nav>
      </div>
    </header>
  );
}
