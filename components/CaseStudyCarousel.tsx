"use client";

import { useState } from "react";
import Link from "next/link";
import Placeholder from "./Placeholder";
import type { Project } from "@/lib/types";

export default function CaseStudyCarousel({ projects }: { projects: Project[] }) {
  const [index, setIndex] = useState(0);
  const count = projects.length;

  const goTo = (i: number) => setIndex(((i % count) + count) % count);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  return (
    <div className="relative mx-auto max-w-6xl px-6 md:px-10">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-card border border-line md:aspect-[21/9]">
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="relative h-full w-full flex-shrink-0"
            >
              {project.image.src ? (
                <img
                  src={project.image.src}
                  alt={project.image.alt}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Placeholder
                  label={project.title}
                  aspect="aspect-[16/9]"
                  rounded={false}
                />
              )}

              {/* Floating text — sits directly on the image, no background panel */}
              <div className="absolute inset-0 flex flex-col items-start justify-end p-6 md:p-10">
                <h3
                  className="text-2xl font-extrabold text-white md:text-4xl"
                  style={{ textShadow: "0 2px 6px rgba(0,0,0,0.35)" }}
                >
                  {project.carouselHeading ?? project.title}
                </h3>
                <p
                  className="mt-2 max-w-md text-sm text-white md:text-base"
                  style={{ textShadow: "0 1px 4px rgba(0,0,0,0.35)" }}
                >
                  {project.carouselBody ?? project.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous case study"
          className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-paper text-ink shadow-sm transition hover:border-ink"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next case study"
          className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-paper text-ink shadow-sm transition hover:border-ink"
        >
          ›
        </button>
      </div>

      <div className="mt-5 flex justify-center gap-2">
        {projects.map((project, i) => (
          <button
            key={project.slug}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to ${project.title}`}
            className={`h-1.5 rounded-pill transition-all ${
              i === index ? "w-6 bg-ink" : "w-3 bg-line"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
