import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
    .filter((p): p is Project => Boolean(p) && p!.enabled);

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

      {/* Case studies carousel — this is the only "selected work" on the home page */}
      <div id="work" className="grid grid-cols-1 gap-0 sm:grid-cols-3">
        {featuredProjects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group block"
          >
            <Placeholder
              label={project.title}
              aspect="aspect-[4/3]"
              rounded={false}
            />
          </Link>
        ))}
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
