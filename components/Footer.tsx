import site from "@/content/site.json";

export default function Footer() {
  const { contact } = site;
  return (
    <footer className="border-t border-inkline px-6 py-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-widest2 text-brass">
          {contact.title === "Let's talk." ? "Get in touch" : ""}
        </p>
        <h2 className="mt-4 font-display text-4xl italic text-parchment md:text-6xl">
          {contact.title}
        </h2>
        <p className="mt-3 max-w-md text-parchmentdim">{contact.subtitle}</p>
        <div className="mt-8 flex flex-col gap-2 font-mono text-sm text-parchment md:flex-row md:gap-8">
          <a
            href={`mailto:${contact.email}`}
            className="underline decoration-brassdim underline-offset-4 transition hover:text-brass"
          >
            {contact.email}
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-brassdim underline-offset-4 transition hover:text-brass"
          >
            LinkedIn ↗
          </a>
        </div>
        <p className="mt-16 font-mono text-[10px] uppercase tracking-widest2 text-parchmentdim/60">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
