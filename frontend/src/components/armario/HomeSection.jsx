import HeroSection from './HeroSection.jsx'
import ProcessSection from './processSection/ProcessSection.jsx'
import WhyUseSection from './whyUseSection/WhyUseSection.jsx'


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