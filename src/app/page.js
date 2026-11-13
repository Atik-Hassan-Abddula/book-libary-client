
import ExtraSections from "@/components/home/extra-sections";
import HeroSlider from "@/components/home/hero-slider";
import NewArrivals from "@/components/home/new-arrivals";
import ScrollReveal from "@/components/scroll-reveal";

export default function Home() {
  return (
    <div>
      <HeroSlider />

      <ScrollReveal direction="up">
        <NewArrivals />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.15}>
        <ExtraSections />
      </ScrollReveal>
    </div>
  );
}
