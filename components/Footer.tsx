import Link from "next/link";
import SocialRow from "./SocialRow";
import site from "@/content/site.json";

export default function Footer() {
  const { contact, socials, name } = site;
  return (
    <div className="bg-dark text-paper">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
        <h2 className="text-4xl font-extrabold md:text-5xl">
          {contact.title}
        </h2>
        <p className="mt-3 max-w-md text-darkdim">{contact.subtitle}</p>
        <a
          href={`mailto:${contact.email}`}
          className="mt-8 inline-flex items-center rounded-pill bg-paper px-7 py-3 text-sm font-medium text-ink transition hover:bg-darkdim"
        >
          Get in touch
        </a>

        <div className="mt-16 flex flex-col gap-6 border-t border-darkline pt-8 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-lg font-bold">{name}</span>
          <nav className="flex gap-6 text-sm text-darkdim">
            <Link href="/projects" className="transition hover:text-paper">
              Projects
            </Link>
            <Link href="/certifications" className="transition hover:text-paper">
              Certifications
            </Link>
            <Link href="/services" className="transition hover:text-paper">
              Services
            </Link>
            <Link href="/resume" className="transition hover:text-paper">
              Resume
            </Link>
          </nav>
          <SocialRow links={socials} dark />
        </div>
        <p className="mt-10 text-center text-xs text-darkdim/70">
          © {new Date().getFullYear()} {name}
        </p>
      </div>
    </div>
  );
}
