import HeroSection from '../components/home/hero/HeroSection.jsx'
import ProcessSection from '../components/home/processSection/ProcessSection.jsx'
import WhyUseSection from '../components/home/whyUseSection/WhyUseSection.jsx'


export const ArmarioSection = () => {
  return (
    <section className="armario" aria-label="Main content sections">
      <HeroSection/>
      <ProcessSection/>
      <WhyUseSection/>
    </section>
  )
}

export default ArmarioSection