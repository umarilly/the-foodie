import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { FeaturedDishes } from "@/components/home/featured-dishes";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { CtaBanner } from "@/components/home/cta-banner";

export default function Home() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <FeaturedDishes />
      <WhyChooseUs />
      <CtaBanner />
    </div>
  );
}
