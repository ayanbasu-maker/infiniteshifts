import Image from "next/image";
import { Video } from "@/lib/types";

export default function VideoCard({ video }: { video: Video }) {
  const isPlaceholder = video.id.startsWith("placeholder");
  const date = new Date(video.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const content = (
    <div className="group bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 hover:border-brand-gold/50 transition-all duration-300 hover:scale-[1.02]">
      <div className="relative aspect-video bg-neutral-800">
        {video.thumbnail ? (
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-neutral-700">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-brand-gold transition-colors">
          {video.title}
        </h3>
        <p className="text-xs text-neutral-400">{date}</p>
      </div>
    </div>
  );

  if (isPlaceholder) return content;

  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  );
}
