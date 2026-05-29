import HeroD from "@/components/home/HeroD";
import Featured from "@/components/home/Featured";
import FiltersRow from "@/components/home/FiltersRow";
import Recent from "@/components/home/Recent";
import PillsAndPromo from "@/components/home/PillsAndPromo";
import Cases from "@/components/home/Cases";
import PodcastAnalysis from "@/components/home/PodcastAnalysis";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <main className="max-w-[1320px] mx-auto px-8 pt-14 pb-24 max-sm:px-5">
      <HeroD />
      <Featured />
      <FiltersRow />
      <Recent />
      <PillsAndPromo />
      <Cases />
      <PodcastAnalysis />
      <Newsletter />
    </main>
  );
}
