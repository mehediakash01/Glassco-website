import HeroBanner from "@/components/HeroBanner";
import AboutSection from "./about/page";
import ServicesSection from "./services/page";
import ProjectsSection from "./projects/page";
import ContactSection from "./contact/page";
import SectionWrapper from "@/components/SectionWrapper";
import ThemeWrapper from "@/components/ThemeWrapper";

export default function Home() {
  return (
    <div>
      <ThemeWrapper>
        <HeroBanner />
        <SectionWrapper>
          <AboutSection />
        </SectionWrapper>
        <SectionWrapper>
          <ServicesSection />
        </SectionWrapper>
        <SectionWrapper>
          <ContactSection />
        </SectionWrapper>
        <SectionWrapper>
          <ProjectsSection />
        </SectionWrapper>
        
       
      </ThemeWrapper>
    </div>
  );
}
