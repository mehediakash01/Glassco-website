import HeroBanner from "@/components/HeroBanner";
import AboutSection from "./about/page";
import ServicesSection from "./services/page";
import ProjectsSection from "./projects/page";
import ContactSection from "./contact/page";




export default function Home() {
  return (
  <div>
       <HeroBanner />
       <AboutSection/>
       <ServicesSection/>
       <ProjectsSection/>
       <ContactSection/>
  </div>
  );
}
