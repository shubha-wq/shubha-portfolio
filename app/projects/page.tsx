import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ExternalProjectGrid from "@/components/ExternalProjectGrid";
import externalProjects from "@/content/external-projects.json";

export const metadata = { title: "Projects — Shubha Singh" };

export default function ProjectsPage() {
  return (
    <main>
      <Header />

      <section className="px-6 pb-14 pt-6 md:px-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="max-w-2xl text-4xl font-extrabold text-ink md:text-5xl">
            Work, elsewhere
          </h1>
          <p className="mt-5 max-w-lg text-lg text-inkdim">
            A few things I&apos;ve made that live outside this site — click
            through to see them where they&apos;re actually hosted.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <ExternalProjectGrid items={externalProjects} />
      </section>

      <Footer />
    </main>
  );
}
