import HeroSection from "@/components/home/HeroSection"
import IntroSection from "@/components/home/IntroSection"
import PartnerSection from "@/components/home/PartnerSection"
import InvestmentProperties from "@/components/home/InvestmentProperties"
import TopProperties from "@/components/home/TopProperties"
import LatestProjects from "@/components/home/LatestProjects"
import ContactSection from "@/components/home/ContactSection"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <PartnerSection />
      <InvestmentProperties />
      <TopProperties />
      <LatestProjects />
      <ContactSection />
    </>
  )
}
