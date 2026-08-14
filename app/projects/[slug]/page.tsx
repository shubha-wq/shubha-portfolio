import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Placeholder from "@/components/Placeholder";
import projects from "@/content/projects.json";
import type { Project } from "@/lib/types";

export function generateStaticParams() {
  return (projects as Project[])
    .filter((p) => p.enabled)
    .map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = (projects as Project[]).find((p) => p.slug === params.slug);
  return { title: project ? `${project.title} — Case Study` : "Case Study" };
}

const sections: { key: keyof Project; label: string }[] = [
  { key: "context", label: "Context" },
  { key: "problem", label: "Problem" },
  { key: "process", label: "Process" },
  { key: "outcome", label: "Outcome" },
];

export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const all = projects as Project[];
  const project = all.find((p) => p.slug === params.slug);
  if (!project || !project.enabled) notFound();

  const others = all.filter((p) => p.slug !== project.slug && p.enabled);

  return (
    <main>
      <Header />

      <section className="px-6 pb-8 pt-6 md:px-10">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/#work"
            className="text-sm font-medium text-inkdim transition hover:text-ink"
          >
            ← Back to case studies
          </Link>

          <h1 className="mt-6 max-w-2xl text-4xl font-extrabold text-ink md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-inkdim">
            {project.tagline}
          </p>

          <div className="mt-10 grid max-w-xl grid-cols-1 gap-6 border-y border-line py-6 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-inkdim">
                Role
              </p>
              <p className="mt-1 text-sm text-ink">{project.role}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-inkdim">
                Industry
              </p>
              <p className="mt-1 text-sm text-ink">{project.industry}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-inkdim">
                Duration
              </p>
              <p className="mt-1 text-sm text-ink">{project.duration}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-8 md:px-10">
        <div className="mx-auto max-w-4xl">
          <Placeholder label="Case study image" aspect="aspect-[16/10]" />
        </div>
      </section>

      {sections.map(({ key, label }, i) => {
        const isPullQuoteSlot = key === "process" && project.pullQuote;
        return (
          <div key={key}>
            <div className={i % 2 === 0 ? "bg-paper" : "bg-band"}>
              <div className="mx-auto max-w-4xl px-6 py-14 md:px-10">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-[140px_1fr] md:gap-10">
                  <div>
                    <span className="text-4xl font-extrabold text-line md:text-5xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-inkdim">
                      {label}
                    </p>
                  </div>
                  <p className="text-lg leading-relaxed text-ink">
                    {project[key] as string}
                  </p>
                </div>
              </div>
            </div>

            {isPullQuoteSlot && (
              <div className="bg-dark">
                <div className="mx-auto max-w-3xl px-6 py-16 text-center md:px-10">
                  <p className="text-2xl font-bold leading-snug text-paper md:text-3xl">
                    &ldquo;{project.pullQuote}&rdquo;
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {others.length > 0 && (
        <div className="border-t border-line bg-band">
          <section className="mx-auto max-w-6xl px-6 py-20 md:px-10">
            <p className="text-center text-sm font-semibold text-inkdim">
              Other projects
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/projects/${o.slug}`}
                  className="rounded-card border border-line bg-paper p-6 transition hover:border-ink"
                >
                  <h3 className="text-lg font-bold text-ink">{o.title}</h3>
                  <p className="mt-2 text-sm text-inkdim">{o.tagline}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      )}

      <Footer />
    </main>
  );
}
