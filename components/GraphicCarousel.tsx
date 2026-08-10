"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

type CarouselItem = {
  id: string;
  title: string;
  image: string;
  aspect?: string; // e.g. "4/5" or "16/9"
};

const AUTOPLAY_MS = 4500;
const HEIGHT = 420;
const GAP = 20;

export default function GraphicCarousel({
  title,
  items,
}: {
  title: string;
  items: CarouselItem[];
}) {
  const [index, setIndex] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const count = items.length;

  const goTo = (i: number) => setIndex(((i % count) + count) % count);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  const widthFor = (aspect?: string) => {
    const [w, h] = (aspect ?? "4/5").split("/").map(Number);
    return HEIGHT * (w / h);
  };

  // Autoplay
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [index, count]);

  // Center the active slide — widths vary per aspect ratio, so this is
  // measured rather than computed from a fixed percentage.
  useLayoutEffect(() => {
    const container = containerRef.current;
    const active = slideRefs.current[index];
    if (!container || !active) return;
    const containerWidth = container.offsetWidth;
    const activeLeft = active.offsetLeft;
    const activeWidth = active.offsetWidth;
    setOffsetX(containerWidth / 2 - (activeLeft + activeWidth / 2));
  }, [index, items]);

  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="mb-4 flex items-center justify-between px-6 md:px-10">
        <span className="text-lg font-bold text-ink">{title}</span>
        <span className="text-sm text-inkdim">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
      </div>

      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{ height: HEIGHT }}
      >
        <div
          className="absolute left-0 top-0 flex items-center transition-transform duration-500"
          style={{ transform: `translateX(${offsetX}px)`, gap: GAP, height: HEIGHT }}
        >
          {items.map((item, i) => {
            const isCenter = i === index;
            const w = widthFor(item.aspect);
            return (
              <div
                key={item.id}
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
                className="relative flex-shrink-0 transition-all duration-500"
                style={{
                  width: w,
                  height: HEIGHT,
                  opacity: isCenter ? 1 : 0.45,
                  transform: `scale(${isCenter ? 1 : 0.88})`,
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-card border border-line bg-band">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-sm font-semibold text-white">
                      {item.title}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous"
          className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-paper text-ink shadow-sm transition hover:border-ink"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next"
          className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-paper text-ink shadow-sm transition hover:border-ink"
        >
          ›
        </button>
      </div>

      <div className="mt-5 flex justify-center gap-2">
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to ${item.title}`}
            className={`h-1.5 rounded-pill transition-all ${
              i === index ? "w-6 bg-ink" : "w-3 bg-line"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
