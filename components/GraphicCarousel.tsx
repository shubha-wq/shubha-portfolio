"use client";

import { useEffect, useRef, useState } from "react";

type CarouselItem = {
  id: string;
  title: string;
  image: string;
};

const AUTOPLAY_MS = 4500;

export default function GraphicCarousel({
  title,
  items,
}: {
  title: string;
  items: CarouselItem[];
}) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = items.length;

  const goTo = (i: number) => setIndex(((i % count) + count) % count);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // Autoplay — resets its timer on any manual navigation so a click doesn't
  // get immediately overridden by the next scheduled tick.
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [index, count]);

  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-lg font-bold text-ink">{title}</span>
        <span className="text-sm text-inkdim">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
      </div>

      <div className="relative flex h-[420px] items-center justify-center overflow-hidden">
        {items.map((item, i) => {
          const offset = i - index;
          // wrap offset to the shortest direction (-count/2 .. count/2)
          let rel = offset;
          if (rel > count / 2) rel -= count;
          if (rel < -count / 2) rel += count;

          const isCenter = rel === 0;
          const isNear = Math.abs(rel) === 1;
          if (!isCenter && !isNear) {
            return null; // only render the 3 visible slots
          }

          return (
            <div
              key={item.id}
              className="absolute top-0 h-full w-[62%] max-w-md transition-all duration-500"
              style={{
                transform: `translateX(${rel * 62}%) scale(${
                  isCenter ? 1 : 0.82
                })`,
                opacity: isCenter ? 1 : 0.45,
                zIndex: isCenter ? 10 : 5,
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

        <button
          type="button"
          onClick={prev}
          aria-label="Previous"
          className="absolute left-0 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper text-ink shadow-sm transition hover:border-ink"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next"
          className="absolute right-0 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper text-ink shadow-sm transition hover:border-ink"
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
