import { Video } from "@/lib/types";
import VideoCard from "./VideoCard";

export default function VideoSection({
  title,
  videos,
  isShorts = false,
}: {
  title: string;
  videos: Video[];
  isShorts?: boolean;
}) {
  if (!videos.length) return null;

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
          {isShorts && (
            <span className="bg-brand-gold text-black text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
              Shorts
            </span>
          )}
        </div>
        <div className="w-12 h-1 bg-brand-gold rounded mb-10" />
        {/* Shorts use more columns since cards are narrow/vertical */}
        <div className={isShorts
          ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        }>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}
