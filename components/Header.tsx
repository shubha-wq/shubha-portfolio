import Link from "next/link";
import site from "@/content/site.json";

export default function Header() {
  return (
    <header className="w-full">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10">
        <Link href="/" className="text-lg font-bold text-ink">
          {site.name}
        </Link>
        <nav className="flex items-center gap-8 text-[15px] text-inkdim">
          <Link href="/projects" className="transition hover:text-ink">
            Projects
          </Link>
          <Link href="/services" className="transition hover:text-ink">
            Services
          </Link>
          <Link href="/#journey" className="transition hover:text-ink">
            About me
          </Link>
          <a
            href={site.hero.resumeUrl}
            className="rounded-pill border border-line px-6 py-2.5 text-sm font-medium text-ink transition hover:border-ink"
          >
            {site.hero.resumeLabel}
          </a>
        </nav>
      </div>
    </header>
  );
}
