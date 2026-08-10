import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectSections, { Section } from "@/components/ProjectSections";
import externalProjects from "@/content/external-projects.json";

export const metadata = { title: "Projects — Shubha Singh" };

export default function ProjectsPage() {
  return (
    <main>
      <Header />

      <section className="px-6 pb-14 pt-6 md:px-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="max-w-2xl text-4xl font-extrabold text-ink md:text-5xl">
            Selected Projects
          </h1>
        </div>
      </section>

      <section className="pb-24">
        <ProjectSections sections={externalProjects as Section[]} />
      </section>

      <Footer />
    </main>
  );
}
