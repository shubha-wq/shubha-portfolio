import Placeholder from "./Placeholder";

export type Item = {
  id: string;
  title: string;
  description: string;
  url: string;
};

export type Section = {
  id: string;
  title: string;
  layout: "featured" | "grid";
  items: Item[];
};

function ItemCard({ item, compact = false }: { item: Item; compact?: boolean }) {
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
      {item.title && (
        <h3 className="mt-4 text-base font-bold text-ink">{item.title}</h3>
      )}
      {item.description && (
        <p className="mt-1 text-sm text-inkdim">{item.description}</p>
      )}
      {!isPlaceholder && (
        <span className="mt-2 text-sm font-semibold text-ink opacity-0 transition group-hover:opacity-100">
          Open ↗
        </span>
      )}
    </a>
  );
}

export default function ProjectSections({ sections }: { sections: Section[] }) {
  return (
    <div className="mx-auto max-w-6xl space-y-20 px-6 md:px-10">
      {sections.map((section) => (
        <div key={section.id}>
          <h2 className="mb-6 text-2xl font-bold text-ink">
            {section.title}
          </h2>

          {section.layout === "featured" ? (
            <div className="max-w-2xl">
              {section.items.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
              {section.items.map((item) => (
                <ItemCard key={item.id} item={item} compact />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
