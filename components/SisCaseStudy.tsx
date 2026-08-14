import VideoCard from "./VideoCard";
import externalProjectsData from "@/content/external-projects.json";
import type { Project } from "@/lib/types";

const VIDEO_IDS = ["video-dame-health", "video-mille", "video-nykaa"];

const GALLERY_IMAGES = [
  { src: "/graphic-design/padel-coaching.png", alt: "Padel Coaching campaign" },
  { src: "/graphic-design/cold-brew-workshop.png", alt: "Cold Brew Workshop x The Kind" },
  { src: "/graphic-design/jiujitsu-workshop.png", alt: "Jiu Jitsu Workshop poster" },
];

export default function SisCaseStudy({ project }: { project: Project }) {
  const videoSection = (externalProjectsData as any[]).find(
    (s) => s.id === "video-editing"
  );
  const videos = (videoSection?.items ?? []).filter((item: any) =>
    VIDEO_IDS.includes(item.id)
  );

  const sections: { key: keyof Project; label: string }[] = [
    { key: "context", label: "Context" },
    { key: "problem", label: "Problem" },
    { key: "process", label: "Process" },
    { key: "outcome", label: "Outcome" },
  ];

  return (
    <>
      {/* Custom hero grid — headline+copy, main image, secondary image, highlight card */}
      <section className="px-6 py-8 md:px-10">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col justify-center rounded-card border border-line bg-band p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-inkdim">
              Brand Strategy
            </p>
            <h2 className="mt-3 text-2xl font-extrabold text-ink md:text-3xl">
              Building a brand system from scratch — in-house.
            </h2>
            <p className="mt-3 text-inkdim">
              Strategy, visual identity and creative direction for one of
              India's fastest-growing women's wellness communities.
            </p>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-line md:aspect-auto">
            <img
              src={GALLERY_IMAGES[0].src}
              alt={GALLERY_IMAGES[0].alt}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-line">
            <img
              src={GALLERY_IMAGES[1].src}
              alt={GALLERY_IMAGES[1].alt}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center rounded-card bg-dark p-8 text-paper">
            <p className="text-lg font-bold leading-snug md:text-xl">
              &ldquo;One consistent visual identity across every partner
              collaboration — built entirely in-house, at zero agency
              cost.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Highlights strip — real facts, no invented numbers */}
      <div className="border-y border-line bg-band">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-6 py-8 sm:grid-cols-3 md:px-10">
          <div>
            <p className="text-lg font-bold text-ink">4-person team</p>
            <p className="mt-1 text-sm text-inkdim">Led alongside the co-founder</p>
          </div>
          <div>
            <p className="text-lg font-bold text-ink">10+ brand collaborations</p>
            <p className="mt-1 text-sm text-inkdim">
              Cava, Nike, Mille, Nykaa Wellness, Zerodha & more
            </p>
          </div>
          <div>
            <p className="text-lg font-bold text-ink">Zero agency cost</p>
            <p className="mt-1 text-sm text-inkdim">Brand system built fully in-house</p>
          </div>
        </div>
      </div>

      {/* Video gallery */}
      {videos.length > 0 && (
        <section className="px-6 py-14 md:px-10">
          <div className="mx-auto max-w-5xl">
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
        </section>
      )}

      {/* Image gallery */}
      <section className="px-6 pb-14 md:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-wide text-inkdim">
            Selected work — campaigns
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {GALLERY_IMAGES.map((img) => (
              <div
                key={img.src}
                className="relative aspect-[4/5] overflow-hidden rounded-card border border-line"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative sections — same visual language as other case studies */}
      {sections.map(({ key, label }, i) => (
        <div key={key} className={i % 2 === 0 ? "bg-paper" : "bg-band"}>
          <div className="mx-auto max-w-4xl px-6 py-14 md:px-10">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[140px_1fr] md:gap-10">
              <div>
                <span className="text-4xl font-extrabold text-line md:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-inkdim">
                  {label}
                </p>
              </div>
              <p className="text-lg leading-relaxed text-ink">
                {project[key] as string}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
