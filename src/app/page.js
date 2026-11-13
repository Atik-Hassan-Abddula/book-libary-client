import ExtraSections from "@/components/home/extra-sections";
import HeroSlider from "@/components/home/hero-slider";
import NewArrivals from "@/components/home/new-arrivals";


export default function Home() {
  return (
    <div>
           <HeroSlider />
            <NewArrivals/>
               <ExtraSections />
    </div>
  );
}
