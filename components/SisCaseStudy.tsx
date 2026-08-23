import VideoCard from "./VideoCard";
import externalProjectsData from "@/content/external-projects.json";
import type { Project } from "@/lib/types";

const VIDEO_IDS = ["video-dame-health", "video-mille", "video-nykaa"];

export default function SisCaseStudy({ project }: { project: Project }) {
  const videoSection = (externalProjectsData as any[]).find(
    (s) => s.id === "video-editing"
  );
  const videos = (videoSection?.items ?? []).filter((item: any) =>
    VIDEO_IDS.includes(item.id)
  );

  return (
    <>
      {/* 01 Context — plain text, matching the other case studies */}
      <div className="bg-paper">
        <div className="mx-auto max-w-4xl px-6 py-14 md:px-10">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[140px_1fr] md:gap-10">
            <div>
              <span className="text-4xl font-extrabold text-line md:text-5xl">
                01
              </span>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-inkdim">
                Context
              </p>
            </div>
            <p className="text-lg leading-relaxed text-ink">
              {project.context}
            </p>
          </div>
        </div>
      </div>

      {/* 02 Problem — text left, image right */}
      <div className="bg-band">
        <div className="mx-auto max-w-5xl px-6 py-14 md:px-10">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <span className="text-4xl font-extrabold text-line md:text-5xl">
                02
              </span>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-inkdim">
                Problem
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink">
                {project.problem}
              </p>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-line">
              <img
                src="/graphic-design/padel-coaching.png"
                alt="Sisters in Sweat campaign creative"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 03 Process — image left, text right */}
      <div className="bg-paper">
        <div className="mx-auto max-w-5xl px-6 py-14 md:px-10">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="relative order-2 aspect-[4/5] overflow-hidden rounded-card border border-line md:order-1">
              <img
                src="/graphic-design/cold-brew-workshop.png"
                alt="Sisters in Sweat campaign creative"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <span className="text-4xl font-extrabold text-line md:text-5xl">
                03
              </span>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-inkdim">
                Process
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink">
                {project.process}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Video gallery — in the middle of the story, not tacked at the end */}
      {videos.length > 0 && (
        <div className="bg-band">
          <div className="mx-auto max-w-5xl px-6 py-14 md:px-10">
            <p className="mb-6 text-xs font-semibold uppercase tracking-wide text-inkdim">
              Selected work — video
            </p>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              {videos.map((item: any) => (
                <VideoCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  video={item.video}
                  thumbnail={item.thumbnail}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 04 Outcome — plain text, bookending Context */}
      <div className="bg-paper">
        <div className="mx-auto max-w-4xl px-6 py-14 md:px-10">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[140px_1fr] md:gap-10">
            <div>
              <span className="text-4xl font-extrabold text-line md:text-5xl">
                04
              </span>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-inkdim">
                Outcome
              </p>
            </div>
            <p className="text-lg leading-relaxed text-ink">
              {project.outcome}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
