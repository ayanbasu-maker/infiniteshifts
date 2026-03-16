import { Video } from "@/lib/types";
import VideoCard from "./VideoCard";

export default function VideoSection({
  title,
  videos,
}: {
  title: string;
  videos: Video[];
}) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">{title}</h2>
        <div className="w-12 h-1 bg-brand-gold rounded mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}
