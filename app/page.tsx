import HeroSection from "@/components/home/HeroSection"
import IntroSection from "@/components/home/IntroSection"
import InvestmentProperties from "@/components/home/InvestmentProperties"
import TrustedPartnerSection from "@/components/home/TrustedPartnerSection"
import TopProperties from "@/components/home/TopProperties"
import LatestProjects from "@/components/home/LatestProjects"
import ContactSection from "@/components/home/ContactSection"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <InvestmentProperties />
      <TopProperties />
      <LatestProjects />
      {/* <TrustedPartnerSection /> */}
      {/* <ContactSection /> */}
    </>
  )
}
