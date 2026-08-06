import Link from "next/link";
import Placeholder from "./Placeholder";
import type { Project } from "@/lib/types";

export default function ProjectIndex({ projects }: { projects: Project[] }) {
  return (
    <div className="mx-auto max-w-6xl px-6 md:px-10">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group flex flex-col"
          >
            <Placeholder label="Project image" />
            <h3 className="mt-5 text-lg font-bold text-ink">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-inkdim">{project.tagline}</p>
            <span className="mt-3 text-sm font-semibold text-ink opacity-0 transition group-hover:opacity-100">
              See the project →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
