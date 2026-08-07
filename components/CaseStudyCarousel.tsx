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
    <div className="relative mx-auto max-w-4xl px-6 md:px-10">
      <div className="relative flex h-[420px] items-center justify-center overflow-hidden">
        {projects.map((project, i) => {
          let rel = i - index;
          if (rel > count / 2) rel -= count;
          if (rel < -count / 2) rel += count;

          const isCenter = rel === 0;
          const isNear = Math.abs(rel) === 1;
          if (!isCenter && !isNear) return null;

          const card = (
            <div className="relative h-full w-full overflow-hidden rounded-card border border-line bg-band">
              {project.image.src ? (
                <img
                  src={project.image.src}
                  alt={project.image.alt}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Placeholder label={project.title} aspect="aspect-square" rounded={false} />
              )}
              {isCenter && (
                <div className="absolute inset-0 flex flex-col items-start justify-end p-5">
                  <h3
                    className="text-xl font-extrabold text-white md:text-2xl"
                    style={{ textShadow: "0 2px 6px rgba(0,0,0,0.35)" }}
                  >
                    {project.carouselHeading ?? project.title}
                  </h3>
                  <p
                    className="mt-1 max-w-xs text-sm text-white"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.35)" }}
                  >
                    {project.carouselBody ?? project.tagline}
                  </p>
                </div>
              )}
            </div>
          );

          return (
            <div
              key={project.slug}
              className="absolute top-0 h-full w-[62%] max-w-md transition-all duration-500"
              style={{
                transform: `translateX(${rel * 62}%) scale(${isCenter ? 1 : 0.82})`,
                opacity: isCenter ? 1 : 0.45,
                zIndex: isCenter ? 10 : 5,
              }}
            >
              {isCenter ? (
                <Link href={`/projects/${project.slug}`} className="block h-full w-full">
                  {card}
                </Link>
              ) : (
                card
              )}
            </div>
          );
        })}

        <button
          type="button"
          onClick={prev}
          aria-label="Previous case study"
          className="absolute left-0 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper text-ink shadow-sm transition hover:border-ink"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next case study"
          className="absolute right-0 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper text-ink shadow-sm transition hover:border-ink"
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
