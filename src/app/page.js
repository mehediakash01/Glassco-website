import HeroBanner from "@/components/HeroBanner";
import AboutSection from "./about/page";

import ProjectsSection from "./projects/page";
import ContactSection from "./contact/page";
import GalleryPage from "./gallery/page";




export default function Home() {
  return (
    <div>

      <HeroBanner />
    
      <AboutSection />
      {/* <ServicesSection /> */}
      
      <ProjectsSection />
      <GalleryPage></GalleryPage>
      <ContactSection />
 
    </div>
  );
}
