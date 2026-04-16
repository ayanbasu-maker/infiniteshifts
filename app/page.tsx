import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import EmailSignup from "@/components/EmailSignup";
import { getLatestVideos, getPopularVideos, getChannelViewCount } from "@/lib/youtube";

export default async function Home() {
  const [latestVideos, popularVideos, viewCount] = await Promise.all([
    getLatestVideos(18),
    getPopularVideos(18),
    getChannelViewCount(),
  ]);

  const latestLong = latestVideos.filter((v) => !v.isShort);
  const popularLong = popularVideos.filter((v) => !v.isShort);

  return (
    <>
      <Hero viewCount={viewCount} />
      <VideoSection title="Latest Videos" videos={latestLong.slice(0, 6)} />
      <VideoSection title="Most Popular" videos={popularLong.slice(0, 6)} />
      <EmailSignup />
    </>
  );
}
