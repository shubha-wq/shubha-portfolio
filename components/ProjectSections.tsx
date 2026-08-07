import Placeholder from "./Placeholder";
import VideoCard from "./VideoCard";

export type LinkItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  enabled: boolean;
};

export type VideoItem = {
  id: string;
  title: string;
  description: string;
  video: { type: "youtube" | "vimeo" | "file" | null; src: string; vertical?: boolean };
  enabled: boolean;
};

export type ImageItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  enabled: boolean;
};

export type Section =
  | { id: string; title: string; layout: "featured" | "grid"; kind: "link"; items: LinkItem[] }
  | { id: string; title: string; layout: "featured" | "grid"; kind: "video"; items: VideoItem[] }
  | { id: string; title: string; layout: "featured" | "grid"; kind: "image"; items: ImageItem[] };

function LinkCard({ item, compact }: { item: LinkItem; compact?: boolean }) {
  const isPlaceholder = item.url === "#";
  return (
    <a
      href={isPlaceholder ? undefined : item.url}
      target={isPlaceholder ? undefined : "_blank"}
      rel={isPlaceholder ? undefined : "noopener noreferrer"}
      aria-disabled={isPlaceholder}
      className={`group flex flex-col ${isPlaceholder ? "cursor-default" : ""}`}
    >
      <Placeholder
        label={item.title || "Image placeholder"}
        aspect={compact ? "aspect-square" : "aspect-[16/9]"}
      />
      {item.title && <h3 className="mt-4 text-base font-bold text-ink">{item.title}</h3>}
      {item.description && <p className="mt-1 text-sm text-inkdim">{item.description}</p>}
      {!isPlaceholder && (
        <span className="mt-2 text-sm font-semibold text-ink opacity-0 transition group-hover:opacity-100">
          Open ↗
        </span>
      )}
    </a>
  );
}

function ImageCard({ item }: { item: ImageItem }) {
  return (
    <div className="flex flex-col">
      <Placeholder label={item.title || "Image placeholder"} aspect="aspect-square" />
      {item.title && <h3 className="mt-4 text-base font-bold text-ink">{item.title}</h3>}
      {item.description && <p className="mt-1 text-sm text-inkdim">{item.description}</p>}
    </div>
  );
}

export default function ProjectSections({ sections }: { sections: Section[] }) {
  return (
    <div className="mx-auto max-w-6xl space-y-20 px-6 md:px-10">
      {sections.map((section) => {
        const visibleItems = section.items.filter((item) => item.enabled);
        if (visibleItems.length === 0) return null;

        return (
          <div key={section.id}>
            <h2 className="mb-6 text-2xl font-bold text-ink">{section.title}</h2>

            {section.layout === "featured" ? (
              <div className="max-w-2xl">
                {section.kind === "link" &&
                  (visibleItems as LinkItem[]).map((item) => (
                    <LinkCard key={item.id} item={item} />
                  ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
                {section.kind === "video" &&
                  (visibleItems as VideoItem[]).map((item) => (
                    <VideoCard
                      key={item.id}
                      title={item.title}
                      description={item.description}
                      video={item.video}
                    />
                  ))}
                {section.kind === "image" &&
                  (visibleItems as ImageItem[]).map((item) => (
                    <ImageCard key={item.id} item={item} />
                  ))}
                {section.kind === "link" &&
                  (visibleItems as LinkItem[]).map((item) => (
                    <LinkCard key={item.id} item={item} compact />
                  ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
