import HeroSection from "@/components/home/HeroSection"
import IntroSection from "@/components/home/IntroSection"
import InvestmentProperties from "@/components/home/InvestmentProperties"
import TrustedPartnerSection from "@/components/home/TrustedPartnerSection"
import RecentProperties from "@/components/home/RecentProperties"
import LatestProjects from "@/components/home/LatestProjects"
import ContactSection from "@/components/home/ContactSection"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      {/* <InvestmentProperties /> */}
      <RecentProperties />
      <LatestProjects />
      {/* <TrustedPartnerSection /> */}
      {/* <ContactSection /> */}
    </>
  )
}
