import { Video } from "./types";

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_HANDLE = "infiniteshifts1";
const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

let cachedChannelId: string | null = null;

async function getChannelId(): Promise<string> {
  if (cachedChannelId) return cachedChannelId;

  const res = await fetch(
    `${YOUTUBE_API_BASE}/channels?forHandle=${CHANNEL_HANDLE}&part=id&key=${API_KEY}`,
    { next: { revalidate: 86400 } }
  );
  const data = await res.json();

  if (!data.items?.length) {
    throw new Error("Could not find YouTube channel for @" + CHANNEL_HANDLE);
  }

  cachedChannelId = data.items[0].id;
  return cachedChannelId!;
}

async function fetchVideos(
  order: "date" | "viewCount",
  count: number
): Promise<Video[]> {
  if (!API_KEY || API_KEY === "your_api_key_here") {
    return getPlaceholderVideos(count);
  }

  try {
    const channelId = await getChannelId();
    const res = await fetch(
      `${YOUTUBE_API_BASE}/search?part=snippet&channelId=${channelId}&order=${order}&type=video&maxResults=${count}&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();

    if (!data.items) {
      console.error("YouTube API error:", data);
      return getPlaceholderVideos(count);
    }

    return data.items.map(
      (item: { id: { videoId: string }; snippet: { title: string; thumbnails: { high: { url: string } }; publishedAt: string } }) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        publishedAt: item.snippet.publishedAt,
      })
    );
  } catch (error) {
    console.error("Failed to fetch YouTube videos:", error);
    return getPlaceholderVideos(count);
  }
}

export async function getLatestVideos(count: number = 6): Promise<Video[]> {
  return fetchVideos("date", count);
}

export async function getPopularVideos(count: number = 6): Promise<Video[]> {
  return fetchVideos("viewCount", count);
}

export async function getChannelViewCount(): Promise<string> {
  if (!API_KEY || API_KEY === "your_api_key_here") return "";

  try {
    const channelId = await getChannelId();
    const res = await fetch(
      `${YOUTUBE_API_BASE}/channels?part=statistics&id=${channelId}&key=${API_KEY}`,
      { next: { revalidate: 86400 } }
    );
    const data = await res.json();
    const views = Number(data.items?.[0]?.statistics?.viewCount ?? 0);
    if (views >= 1_000_000) return `${Math.floor(views / 1_000_000)}M+`;
    if (views >= 1_000) return `${Math.floor(views / 1_000)}K+`;
    return `${views}`;
  } catch {
    return "";
  }
}

function getPlaceholderVideos(count: number): Video[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `placeholder-${i}`,
    title: `Video ${i + 1} — Add your YouTube API key to see real videos`,
    thumbnail: "",
    publishedAt: new Date().toISOString(),
  }));
}
