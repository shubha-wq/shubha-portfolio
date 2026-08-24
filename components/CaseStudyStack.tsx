import Link from "next/link";
import Placeholder from "./Placeholder";
import type { Project } from "@/lib/types";

export default function CaseStudyStack({ projects }: { projects: Project[] }) {
  return (
    <div>
      {projects.map((project, i) => {
        const imageOnRight = i % 2 === 0;
        const thumbSrc = project.thumbnail?.src || project.image.src;
        const thumbAlt = project.thumbnail?.alt || project.image.alt;

        return (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group block border-t border-line px-6 py-10 transition hover:bg-band/60 md:px-10 md:py-12"
          >
            <div className="mx-auto max-w-6xl">
              <div
                className={`flex flex-col items-center gap-8 md:gap-10 ${
                  imageOnRight ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="relative aspect-[4/5] w-full flex-shrink-0 overflow-hidden rounded-card border border-line md:w-56 lg:w-64">
                  {thumbSrc ? (
                    <img
                      src={thumbSrc}
                      alt={thumbAlt}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <Placeholder label={project.title} aspect="aspect-[4/5]" rounded={false} />
                  )}
                </div>

                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-inkdim">
                    {project.role} · {project.industry}
                  </p>
                  <h3 className="mt-3 text-2xl font-extrabold text-ink transition group-hover:opacity-70 md:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-inkdim">
                    {project.carouselBody ?? project.tagline}
                  </p>

                  {project.skillTags && project.skillTags.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.skillTags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-pill border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-ink"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                    View case study
                    <span className="transition group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
