import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import EmailSignup from "@/components/EmailSignup";
import { getLatestVideos, getPopularVideos, getChannelViewCount } from "@/lib/youtube";

export default async function Home() {
  const [latestVideos, popularVideos, viewCount] = await Promise.all([
    getLatestVideos(6),
    getPopularVideos(6),
    getChannelViewCount(),
  ]);

  return (
    <>
      <Hero viewCount={viewCount} />
      <VideoSection title="Latest Videos" videos={latestVideos} />
      <VideoSection title="Most Popular" videos={popularVideos} />
      <EmailSignup />
    </>
  );
}
