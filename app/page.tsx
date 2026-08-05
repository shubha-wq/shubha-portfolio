import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectIndex from "@/components/ProjectIndex";
import site from "@/content/site.json";
import projects from "@/content/projects.json";
import type { Project } from "@/lib/types";

export default function Home() {
  const { hero, journey } = site;

  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="px-6 pb-20 pt-10 md:px-10 md:pb-32 md:pt-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-5 md:gap-8">
          <div className="md:col-span-3">
            <p className="font-mono text-xs uppercase tracking-widest2 text-brass">
              {hero.eyebrow}
            </p>
            <h1 className="mt-6 font-display text-4xl italic leading-[1.1] text-parchment md:text-6xl">
              {hero.headline}
            </h1>
            <p className="mt-6 max-w-md text-base text-parchmentdim md:text-lg">
              {hero.subhead}
            </p>
            <a
              href={hero.resumeUrl}
              className="mt-10 inline-flex items-center gap-3 border border-brassdim px-6 py-3 font-mono text-xs uppercase tracking-widest2 text-parchment transition hover:border-brass hover:text-brass"
            >
              {hero.resumeLabel}
            </a>
          </div>
          <div className="relative md:col-span-2">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-inkline">
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                fill
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section id="journey" className="border-t border-inkline px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-5 md:gap-16">
          <div className="md:col-span-2">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-inkline">
              <Image
                src={journey.image.src}
                alt={journey.image.alt}
                fill
                sizes="(min-width: 768px) 35vw, 90vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-3">
            <p className="font-mono text-xs uppercase tracking-widest2 text-brass">
              {journey.kicker}
            </p>
            <h2 className="mt-4 font-display text-3xl italic text-parchment md:text-4xl">
              {journey.title}
            </h2>
            <div className="mt-6 space-y-5 text-parchmentdim">
              {journey.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section id="projects" className="py-4">
        <div className="mx-auto max-w-6xl px-6 pb-10 md:px-10">
          <p className="font-mono text-xs uppercase tracking-widest2 text-brass">
            Case studies
          </p>
          <h2 className="mt-4 font-display text-3xl italic text-parchment md:text-4xl">
            Selected work
          </h2>
        </div>
        <ProjectIndex projects={projects as Project[]} />
      </section>

      <Footer />
    </main>
  );
}
