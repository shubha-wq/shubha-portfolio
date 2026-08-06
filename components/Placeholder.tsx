export default function Placeholder({
  label,
  aspect = "aspect-[4/3]",
  rounded = true,
}: {
  label: string;
  aspect?: string;
  rounded?: boolean;
}) {
  return (
    <div
      className={`placeholder-box flex w-full items-center justify-center border border-line ${aspect} ${
        rounded ? "rounded-card" : ""
      }`}
    >
      <span className="rounded-pill bg-paper px-3 py-1 text-xs font-medium text-inkdim">
        {label}
      </span>
    </div>
  );
}
