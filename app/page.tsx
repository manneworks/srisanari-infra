import Hero from '../src/components/Hero';
import IntroSection from '../src/components/IntroSection';
import ServicesSection from '../src/components/ServicesSection';
import PropertiesSection from '../src/components/PropertiesSection';
import ProjectsSection from '../src/components/ProjectsSection';
import ContactSection from '../src/components/ContactSection';
import MapSection from '../src/components/MapSection';

export default function Home() {
  return (
    <div className="pt-16">
      <Hero />
      <IntroSection />
      <ServicesSection />
      <PropertiesSection />
      <ProjectsSection />
      <ContactSection />
      <MapSection />
    </div>
  );
}
