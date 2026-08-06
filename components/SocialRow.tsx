type SocialLink = { label: string; url: string };

export default function SocialRow({
  links,
  dark = false,
}: {
  links: SocialLink[];
  dark?: boolean;
}) {
  return (
    <div className="flex gap-3">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          title={link.label}
          className={`flex h-10 w-10 items-center justify-center rounded-full border text-[11px] font-semibold uppercase transition ${
            dark
              ? "border-darkline text-darkdim hover:border-darkdim hover:text-paper"
              : "border-line text-inkdim hover:border-ink hover:text-ink"
          }`}
        >
          {link.label.slice(0, 2)}
        </a>
      ))}
    </div>
  );
}
