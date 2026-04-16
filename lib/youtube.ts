import { Video } from "./types";

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_HANDLE = "infiniteshifts1";
const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

// YouTube Shorts can be up to 3 minutes (180 seconds)
const SHORTS_MAX_SECONDS = 180;

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

// Parse ISO 8601 duration (e.g. "PT1M30S") to seconds
function parseDuration(iso: string): number {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  return (parseInt(match[1] || "0") * 3600) +
         (parseInt(match[2] || "0") * 60) +
          parseInt(match[3] || "0");
}

// Fetch durations for a list of video IDs, returns map of id → seconds
async function fetchDurations(ids: string[]): Promise<Record<string, number>> {
  if (!ids.length) return {};
  const res = await fetch(
    `${YOUTUBE_API_BASE}/videos?part=contentDetails&id=${ids.join(",")}&key=${API_KEY}`,
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  const map: Record<string, number> = {};
  for (const item of data.items ?? []) {
    map[item.id] = parseDuration(item.contentDetails.duration);
  }
  return map;
}

type SearchItem = {
  id: { videoId: string };
  snippet: {
    title: string;
    thumbnails: { high: { url: string } };
    publishedAt: string;
  };
};

async function searchVideos(
  order: "date" | "viewCount",
  count: number,
  videoDuration: "medium" | "long" | "any" = "any"
): Promise<SearchItem[]> {
  const durationParam = videoDuration !== "any" ? `&videoDuration=${videoDuration}` : "";
  const res = await fetch(
    `${YOUTUBE_API_BASE}/search?part=snippet&channelId=${await getChannelId()}&order=${order}&type=video${durationParam}&maxResults=${count}&key=${API_KEY}`,
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  return data.items ?? [];
}

async function fetchVideos(
  order: "date" | "viewCount",
  count: number
): Promise<Video[]> {
  if (!API_KEY || API_KEY === "your_api_key_here") {
    return getPlaceholderVideos(count);
  }

  try {
    // Fetch medium (4–20 min) and long (>20 min) in parallel — this excludes
    // Shorts at the API level so they never appear in Latest / Most Popular.
    const [medItems, longItems] = await Promise.all([
      searchVideos(order, count, "medium"),
      searchVideos(order, count, "long"),
    ]);

    // Merge & de-duplicate
    const seen = new Set<string>();
    const allItems: SearchItem[] = [];
    for (const item of [...medItems, ...longItems]) {
      if (!seen.has(item.id.videoId)) {
        seen.add(item.id.videoId);
        allItems.push(item);
      }
    }

    // Re-sort by publishedAt for "date" order (merging disrupts sequence)
    if (order === "date") {
      allItems.sort(
        (a, b) =>
          new Date(b.snippet.publishedAt).getTime() -
          new Date(a.snippet.publishedAt).getTime()
      );
    }

    const topItems = allItems.slice(0, count);
    if (!topItems.length) return getPlaceholderVideos(count);

    const ids = topItems.map((item) => item.id.videoId);
    const durations = await fetchDurations(ids);

    return topItems.map((item) => {
      const secs = durations[item.id.videoId] ?? 0;
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        publishedAt: item.snippet.publishedAt,
        durationSeconds: secs,
        // Belt-and-suspenders: API already excluded Shorts, but flag any
        // that slipped through (e.g. if duration lookup failed)
        isShort: secs > 0 && secs <= SHORTS_MAX_SECONDS,
      };
    });
  } catch (error) {
    console.error("Failed to fetch YouTube videos:", error);
    return getPlaceholderVideos(count);
  }
}

export async function getLatestVideos(count: number = 12): Promise<Video[]> {
  return fetchVideos("date", count);
}

export async function getPopularVideos(count: number = 12): Promise<Video[]> {
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
    isShort: i % 3 === 0, // every 3rd placeholder is a "short" for preview
    durationSeconds: i % 3 === 0 ? 45 : 600,
  }));
}
