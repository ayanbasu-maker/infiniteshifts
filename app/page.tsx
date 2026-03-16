import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import EmailSignup from "@/components/EmailSignup";
import { getLatestVideos, getPopularVideos } from "@/lib/youtube";

export default async function Home() {
  const [latestVideos, popularVideos] = await Promise.all([
    getLatestVideos(6),
    getPopularVideos(6),
  ]);

  return (
    <>
      <Hero />
      <VideoSection title="Latest Videos" videos={latestVideos} />
      <VideoSection title="Most Popular" videos={popularVideos} />
      <EmailSignup />
    </>
  );
}
