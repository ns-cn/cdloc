import { Hero } from "@/components/sections/hero";
import { Timeline } from "@/components/sections/timeline";
import { getPhases } from "@/content/loaders";

export default async function Home() {
  const phases = await getPhases();
  return (
    <>
      <Hero />
      <Timeline phases={phases} />
    </>
  );
}
