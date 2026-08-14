"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import externalProjectsData from "@/content/external-projects.json";

type VideoItem = {
  id: string;
  title: string;
  description: string;
  video: { type: "youtube" | "vimeo" | "file" | null; src: string; vertical?: boolean };
  thumbnail?: string;
  enabled: boolean;
};

function makeId() {
  return "video-" + Math.random().toString(36).slice(2, 8);
}

export default function AdminPage() {
  const videoSection = (externalProjectsData as any[]).find(
    (s) => s.id === "video-editing"
  );
  const [items, setItems] = useState<VideoItem[]>(videoSection?.items ?? []);
  const [downloaded, setDownloaded] = useState(false);
  const [localPreviews, setLocalPreviews] = useState<Record<string, string>>({});

  const update = (id: string, patch: Partial<VideoItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch } : item))
    );
    setDownloaded(false);
  };

  const updateVideo = (id: string, patch: Partial<VideoItem["video"]>) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, video: { ...item.video, ...patch } } : item
      )
    );
    setDownloaded(false);
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: makeId(),
        title: "",
        description: "",
        video: { type: "youtube", src: "", vertical: true },
        thumbnail: "",
        enabled: true,
      },
    ]);
    setDownloaded(false);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setDownloaded(false);
  };

  const handleFilePreview = (id: string, file: File | undefined) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setLocalPreviews((prev) => ({ ...prev, [id]: url }));
  };

  const downloadFile = () => {
    const updated = (externalProjectsData as any[]).map((section) =>
      section.id === "video-editing" ? { ...section, items } : section
    );
    const blob = new Blob([JSON.stringify(updated, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "external-projects.json";
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
  };

  return (
    <main>
      <Header />

      <section className="px-6 pb-8 pt-6 md:px-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-extrabold text-ink md:text-4xl">
            Video Editor
          </h1>
          <p className="mt-4 text-inkdim">
            Edit titles, YouTube video IDs, thumbnails, and enable/disable any
            video below. This page doesn&apos;t save automatically (the site
            has no database, which is what keeps hosting free) — when
            you&apos;re done, click <strong>Download updated file</strong>{" "}
            below, then replace{" "}
            <code className="rounded bg-band px-1.5 py-0.5 text-[13px]">
              content/external-projects.json
            </code>{" "}
            in your project folder with the downloaded file before your next
            GitHub upload.
          </p>
          <p className="mt-3 text-inkdim">
            <strong>To change a thumbnail:</strong> by default, each video
            shows a frame YouTube generates automatically. To use your own
            image instead — (1) click &ldquo;Preview a file from your
            computer&rdquo; to see how it&apos;ll look here (this preview is
            local only, it isn&apos;t saved), (2) upload that same image file
            to your GitHub repo inside{" "}
            <code className="rounded bg-band px-1.5 py-0.5 text-[13px]">
              public/video-thumbnails/
            </code>
            , and (3) type its path into the &ldquo;Custom thumbnail&rdquo;
            field (e.g.{" "}
            <code className="rounded bg-band px-1.5 py-0.5 text-[13px]">
              /video-thumbnails/nykaa.jpg
            </code>
            ) — that&apos;s what actually shows on the live site once
            deployed.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16 md:px-10">
        <div className="mx-auto max-w-3xl space-y-6">
          {items.map((item) => {
            const autoThumb =
              item.video.type === "youtube" && item.video.src
                ? `https://img.youtube.com/vi/${item.video.src}/hqdefault.jpg`
                : null;
            const thumb =
              localPreviews[item.id] ||
              (item.thumbnail && item.thumbnail.trim() ? item.thumbnail : autoThumb);
            return (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-card border border-line bg-paper p-5 sm:flex-row"
              >
                <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-card border border-line bg-band">
                  {thumb ? (
                    <img
                      src={thumb}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-inkdim">
                      No preview
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-3">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-inkdim">
                      Title
                    </label>
                    <input
                      value={item.title}
                      onChange={(e) => update(item.id, { title: e.target.value })}
                      className="mt-1 w-full rounded border border-line px-3 py-2 text-sm"
                      placeholder="e.g. Sisters in Sweat x Nykaa Wellness"
                    />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <div className="flex-1">
                      <label className="text-xs font-semibold uppercase tracking-wide text-inkdim">
                        YouTube Video ID
                      </label>
                      <input
                        value={item.video.src}
                        onChange={(e) =>
                          updateVideo(item.id, { src: e.target.value })
                        }
                        className="mt-1 w-full rounded border border-line px-3 py-2 text-sm"
                        placeholder="e.g. FnCDs8kQ644"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-inkdim">
                      Custom thumbnail (optional — overrides the YouTube one)
                    </label>
                    <input
                      value={item.thumbnail ?? ""}
                      onChange={(e) =>
                        update(item.id, { thumbnail: e.target.value })
                      }
                      className="mt-1 w-full rounded border border-line px-3 py-2 text-sm"
                      placeholder="/video-thumbnails/your-image.jpg"
                    />
                    <div className="mt-2 flex items-center gap-3">
                      <label className="cursor-pointer text-xs font-medium text-ink underline">
                        Preview a file from your computer
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFilePreview(item.id, e.target.files?.[0])
                          }
                        />
                      </label>
                      <span className="text-xs text-inkdim">
                        (preview only — see below to make it real)
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 pt-1">
                    <label className="flex items-center gap-2 text-sm text-ink">
                      <input
                        type="checkbox"
                        checked={item.video.vertical ?? false}
                        onChange={(e) =>
                          updateVideo(item.id, { vertical: e.target.checked })
                        }
                      />
                      Vertical (Short)
                    </label>
                    <label className="flex items-center gap-2 text-sm text-ink">
                      <input
                        type="checkbox"
                        checked={item.enabled}
                        onChange={(e) =>
                          update(item.id, { enabled: e.target.checked })
                        }
                      />
                      Enabled (shows on site)
                    </label>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-sm font-medium text-inkdim underline transition hover:text-ink"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <button
            type="button"
            onClick={addItem}
            className="w-full rounded-card border border-dashed border-line py-4 text-sm font-medium text-inkdim transition hover:border-ink hover:text-ink"
          >
            + Add another video
          </button>

          <div className="sticky bottom-6 flex justify-center pt-4">
            <button
              type="button"
              onClick={downloadFile}
              className="rounded-pill bg-ink px-8 py-3 text-sm font-medium text-paper shadow-lg transition hover:bg-band hover:text-ink"
            >
              {downloaded ? "Downloaded ✓ — download again?" : "Download updated file"}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
