import Placeholder from "./Placeholder";

type ExternalProject = {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  tag: string;
};

export default function ExternalProjectGrid({
  items,
}: {
  items: ExternalProject[];
}) {
  return (
    <div className="mx-auto max-w-6xl px-6 md:px-10">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const isPlaceholder = item.url === "#";
          return (
            <a
              key={item.id}
              href={isPlaceholder ? undefined : item.url}
              target={isPlaceholder ? undefined : "_blank"}
              rel={isPlaceholder ? undefined : "noopener noreferrer"}
              aria-disabled={isPlaceholder}
              className={`group flex flex-col ${
                isPlaceholder ? "cursor-default opacity-70" : ""
              }`}
            >
              <Placeholder label={item.tag} />
              <h3 className="mt-5 text-lg font-bold text-ink">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-inkdim">{item.description}</p>
              {!isPlaceholder && (
                <span className="mt-3 text-sm font-semibold text-ink opacity-0 transition group-hover:opacity-100">
                  Open ↗
                </span>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
