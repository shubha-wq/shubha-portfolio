"use client";

import { useState, useEffect } from "react";
import Placeholder from "./Placeholder";

type VideoData = {
  type: "youtube" | "vimeo" | "file" | null;
  src: string;
  vertical?: boolean;
};

function embedUrl(video: VideoData): string | null {
  if (!video.type || !video.src) return null;
  if (video.type === "youtube") {
    return `https://www.youtube.com/embed/${video.src}?autoplay=1`;
  }
  if (video.type === "vimeo") {
    return `https://player.vimeo.com/video/${video.src}?autoplay=1`;
  }
  return null; // "file" is handled directly with a <video> tag
}

function thumbnailUrl(video: VideoData): string | null {
  if (video.type === "youtube" && video.src) {
    // YouTube auto-generates this for every video, including unlisted ones —
    // no upload needed. maxresdefault isn't always available for Shorts,
    // hqdefault reliably is.
    return `https://img.youtube.com/vi/${video.src}/hqdefault.jpg`;
  }
  return null;
}

export default function VideoCard({
  title,
  description,
  video,
  thumbnail,
}: {
  title: string;
  description: string;
  video: VideoData;
  thumbnail?: string;
}) {
  const [open, setOpen] = useState(false);
  const hasVideo = Boolean(video?.type && video?.src);
  const iframeSrc = video ? embedUrl(video) : null;
  const thumbSrc = thumbnail && thumbnail.trim() ? thumbnail : video ? thumbnailUrl(video) : null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => hasVideo && setOpen(true)}
        disabled={!hasVideo}
        className={`group flex w-full flex-col text-left ${
          hasVideo ? "cursor-pointer" : "cursor-default"
        }`}
      >
        <div className="relative aspect-square w-full overflow-hidden rounded-card border border-line bg-band">
          {thumbSrc ? (
            <img
              src={thumbSrc}
              alt={title || "Video thumbnail"}
              className="h-full w-full object-cover"
            />
          ) : (
            <Placeholder
              label={hasVideo ? "▶ Play" : title || "Video placeholder"}
              aspect="aspect-square"
              rounded={false}
            />
          )}
          {hasVideo && thumbSrc && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition group-hover:opacity-100">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-paper/90 text-lg text-ink">
                ▶
              </span>
            </div>
          )}
        </div>
        {title && <h3 className="mt-4 text-base font-bold text-ink">{title}</h3>}
        {description && (
          <p className="mt-1 text-sm text-inkdim">{description}</p>
        )}
      </button>

      {open && hasVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          onClick={() => setOpen(false)}
        >
          <div
            className={`relative w-full ${
              video.vertical ? "max-w-xs" : "max-w-3xl"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-0 text-sm font-medium text-paper"
            >
              Close ✕
            </button>
            <div
              className={`w-full overflow-hidden rounded-card bg-black ${
                video.vertical ? "aspect-[9/16]" : "aspect-video"
              }`}
            >
              {video.type === "file" ? (
                <video
                  src={video.src}
                  controls
                  autoPlay
                  className="h-full w-full"
                />
              ) : iframeSrc ? (
                <iframe
                  src={iframeSrc}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
