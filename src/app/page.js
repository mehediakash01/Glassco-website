import HeroBanner from "@/components/HeroBanner";
import AboutSection from "./about/page";
import ServicesSection from "./services/page";
import ProjectsSection from "./projects/page";
import ContactSection from "./contact/page";
import SectionWrapper from "@/components/SectionWrapper";





export default function Home() {
  return (
  <div>
       <HeroBanner />
       <SectionWrapper>
         <AboutSection/>
         <ServicesSection/>
         <ProjectsSection/>
         <ContactSection/>
       </SectionWrapper>
   
  </div>
  );
}
