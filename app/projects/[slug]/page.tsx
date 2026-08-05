import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import projects from "@/content/projects.json";
import type { Project } from "@/lib/types";

export function generateStaticParams() {
  return (projects as Project[]).map((p) => ({ slug: p.slug }));
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
  if (!project) notFound();

  const others = all.filter((p) => p.slug !== project.slug);

  return (
    <main>
      <Header />

      <section className="px-6 pt-10 md:px-10 md:pt-16">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/#projects"
            className="font-mono text-xs uppercase tracking-widest2 text-parchmentdim transition hover:text-brass"
          >
            ← All case studies
          </Link>

          <h1 className="mt-8 font-display text-4xl italic text-parchment md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-parchmentdim">
            {project.tagline}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 border-y border-inkline py-6 font-mono text-xs uppercase tracking-widest2 text-parchmentdim sm:grid-cols-3">
            <div>
              <p className="text-brassdim">Role</p>
              <p className="mt-1 text-parchment">{project.role}</p>
            </div>
            <div>
              <p className="text-brassdim">Industry</p>
              <p className="mt-1 text-parchment">{project.industry}</p>
            </div>
            <div>
              <p className="text-brassdim">Duration</p>
              <p className="mt-1 text-parchment">{project.duration}</p>
            </div>
          </div>
        </div>
      </section>

      {project.image.src && (
        <section className="px-6 py-12 md:px-10">
          <div className="relative mx-auto aspect-[16/10] max-w-6xl overflow-hidden border border-inkline">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              sizes="90vw"
              className="object-cover"
            />
          </div>
        </section>
      )}

      <section className="px-6 py-12 md:px-10">
        <div className="mx-auto max-w-3xl space-y-12">
          {sections.map(({ key, label }) => (
            <div key={key}>
              <p className="font-mono text-xs uppercase tracking-widest2 text-brass">
                {label}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-parchmentdim">
                {project[key] as string}
              </p>
            </div>
          ))}
        </div>
      </section>

      {others.length > 0 && (
        <section className="border-t border-inkline px-6 py-16 md:px-10">
          <div className="mx-auto max-w-6xl">
            <p className="font-mono text-xs uppercase tracking-widest2 text-brass">
              Other projects
            </p>
            <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/projects/${o.slug}`}
                  className="group border border-inkline p-6 transition hover:border-brassdim"
                >
                  <h3 className="font-display text-xl italic text-parchment">
                    {o.title}
                  </h3>
                  <p className="mt-2 text-sm text-parchmentdim">
                    {o.tagline}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
