"use client";

import { useEffect, useMemo, useState } from "react";
import { ReaderControls } from "@/components/reader/ReaderControls";
import { ReaderSettings } from "@/components/reader/ReaderSettings";
import { PagedReader } from "@/components/reader/PagedReader";
import { VerticalReader } from "@/components/reader/VerticalReader";
import type { ReadingSettings, VolumePagesResponse } from "@/types";

export function MangaReader({
  data,
  initialPage,
  initialSettings,
}: {
  data: VolumePagesResponse;
  initialPage: number;
  initialSettings: ReadingSettings;
}) {
  const [page, setPage] = useState(initialPage);
  const [chromeVisible, setChromeVisible] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState(initialSettings);
  const totalPages = Math.max(1, data.pages.length);

  useEffect(() => {
    const show = () => setChromeVisible(true);
    window.addEventListener("mousemove", show);
    window.addEventListener("touchstart", show);
    const timer = window.setInterval(() => setChromeVisible(false), 3000);
    return () => {
      window.removeEventListener("mousemove", show);
      window.removeEventListener("touchstart", show);
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        setPage((current) => Math.min(totalPages, current + 1));
      }
      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        setPage((current) => Math.max(1, current - 1));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [totalPages]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetch("/api/progress", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          volumeId: data.volume.id,
          currentPage: page,
          completed: page >= totalPages,
        }),
      });
    }, 2000);
    return () => window.clearTimeout(timer);
  }, [data.volume.id, page, totalPages]);

  const title = useMemo(
    () => `${data.volume.seriesTitle} - Tomo ${data.volume.number}`,
    [data.volume.number, data.volume.seriesTitle],
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-bg-primary">
      {settings.readingMode === "VERTICAL" ? (
        <VerticalReader volume={data.volume} pages={data.pages} />
      ) : (
        <PagedReader volume={data.volume} pages={data.pages} page={page} onPageChange={setPage} />
      )}
      <ReaderControls
        visible={chromeVisible}
        title={title}
        seriesSlug={data.volume.seriesSlug}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        onSettings={() => setSettingsOpen(true)}
      />
      <ReaderSettings
        open={settingsOpen}
        settings={settings}
        onClose={() => setSettingsOpen(false)}
        onChange={(next) => {
          setSettings((current) => ({ ...current, ...next }));
          void fetch("/api/settings", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(next),
          });
        }}
      />
    </main>
  );
}
