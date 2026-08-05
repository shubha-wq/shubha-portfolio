import Link from "next/link";
import type { Project } from "@/lib/types";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function ProjectIndex({ projects }: { projects: Project[] }) {
  return (
    <div className="border-t border-inkline">
      {projects.map((project, i) => (
        <Link
          key={project.slug}
          href={`/projects/${project.slug}`}
          className="group block border-b border-inkline px-6 py-8 transition hover:bg-inkline/40 md:px-10 md:py-10"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-baseline md:justify-between md:gap-8">
            <div className="flex items-baseline gap-6">
              <span className="font-mono text-sm text-brassdim transition group-hover:text-brass">
                No. {pad(i + 1)}
              </span>
              <div>
                <h3 className="font-display text-2xl italic text-parchment md:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-1 max-w-md text-sm text-parchmentdim">
                  {project.tagline}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-6 md:justify-end">
              <span className="font-mono text-[11px] uppercase tracking-widest2 text-parchmentdim">
                {project.industry}
              </span>
              <span className="font-mono text-xs text-brass opacity-0 transition group-hover:opacity-100">
                See the project →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
