// src/pages/Home/index.jsx
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import HowItWorksSection from './components/HowItWorksSection'
import ReportPreviewSection from './components/ReportPreviewSection'
import CTASection from './components/CTASection'

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-black font-goldman via-purple-950 to-black text-white">
      <HeroSection />
      <ReportPreviewSection />
      <HowItWorksSection />
      <FeaturesSection />
      <CTASection />
    </div>
  )
}
