import Image from "next/image";
import { Video } from "@/lib/types";

export default function VideoCard({ video }: { video: Video }) {
  const isPlaceholder = video.id.startsWith("placeholder");
  const date = new Date(video.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const isShort = video.isShort === true;

  const content = (
    <div className="group bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 hover:border-brand-gold/50 transition-all duration-300 hover:scale-[1.02]">
      {/* Shorts use 9:16, long-form use 16:9 */}
      <div className={`relative bg-neutral-800 ${isShort ? "aspect-[9/16]" : "aspect-video"}`}>
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
        {/* Shorts badge */}
        {isShort && (
          <span className="absolute top-2 left-2 bg-brand-gold text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
            Short
          </span>
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

  // Shorts link to the /shorts/ URL for proper mobile experience
  const url = isShort
    ? `https://www.youtube.com/shorts/${video.id}`
    : `https://www.youtube.com/watch?v=${video.id}`;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  );
}
