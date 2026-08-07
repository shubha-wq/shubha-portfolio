import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialRow from "@/components/SocialRow";
import Placeholder from "@/components/Placeholder";
import CaseStudyCarousel from "@/components/CaseStudyCarousel";
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
            {hero.image.src ? (
              <img
                src={hero.image.src}
                alt={hero.image.alt}
                className="h-full w-full object-cover"
              />
            ) : (
              <Placeholder label="Photo" aspect="aspect-square" rounded={false} />
            )}
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
      <div id="work" className="pb-6 pt-4">
        <div className="mx-auto max-w-6xl px-6 pb-6 md:px-10">
          <h2 className="text-2xl font-bold text-ink">Selected case studies</h2>
        </div>
        <CaseStudyCarousel projects={featuredProjects} />
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
