import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectIndex from "@/components/ProjectIndex";
import SocialRow from "@/components/SocialRow";
import Placeholder from "@/components/Placeholder";
import site from "@/content/site.json";
import projects from "@/content/projects.json";
import type { Project } from "@/lib/types";

export default function Home() {
  const { hero, journey, socials } = site;

  const featuredSlugs = ["sisters-in-sweat", "voucher-management-system", "mohmani"];
  const featuredProjects = featuredSlugs
    .map((slug) => (projects as Project[]).find((p) => p.slug === slug))
    .filter((p): p is Project => Boolean(p));

  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="px-6 pb-14 pt-6 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 h-24 w-24 overflow-hidden rounded-full">
            <Placeholder label="Photo" aspect="aspect-square" rounded={false} />
          </div>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-ink md:text-6xl">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-inkdim">{hero.subhead}</p>
          <div className="mt-8">
            <SocialRow links={socials} />
          </div>
        </div>
      </section>

      {/* Image strip */}
      <div className="grid grid-cols-2 gap-0 sm:grid-cols-4">
        <Placeholder label="Work" aspect="aspect-[4/3]" rounded={false} />
        <Placeholder label="Work" aspect="aspect-[4/3]" rounded={false} />
        <Placeholder label="Work" aspect="aspect-[4/3]" rounded={false} />
        <Placeholder label="Work" aspect="aspect-[4/3]" rounded={false} />
      </div>

      {/* Featured case studies */}
      <div className="bg-band">
        <div id="case-studies" className="mx-auto max-w-6xl px-6 py-20 md:px-10">
          <h2 className="text-3xl font-extrabold text-ink md:text-4xl">
            Selected work
          </h2>
          <p className="mt-3 max-w-md text-inkdim">
            A few case studies across brand strategy, fitness and product.
          </p>
        </div>
        <ProjectIndex projects={featuredProjects} />
        <div className="h-20" />
      </div>

      {/* Journey */}
      <section id="journey" className="px-6 py-20 md:px-10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 md:grid-cols-2">
          <Placeholder label="Photo" />
          <div>
            <h2 className="text-2xl font-bold text-ink md:text-3xl">
              {journey.title}
            </h2>
            <div className="mt-5 space-y-4 text-inkdim">
              {journey.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
