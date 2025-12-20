import HeroBanner from "@/components/HeroBanner";
import Image from "next/image";
import AboutSection from "./about/page";

export default function Home() {
  return (
  <div>
       <HeroBanner />
       <AboutSection/>
  </div>
  );
}
