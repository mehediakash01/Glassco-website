import HeroBanner from "@/components/HeroBanner";
import AboutSection from "./about/page";
import ServicesSection from "./services/page";
import ProjectsSection from "./projects/page";




export default function Home() {
  return (
  <div>
       <HeroBanner />
       <AboutSection/>
       <ServicesSection/>
       <ProjectsSection></ProjectsSection>
  </div>
  );
}
