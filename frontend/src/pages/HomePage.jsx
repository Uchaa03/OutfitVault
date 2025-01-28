import HeroSection from '../components/home/hero/HeroSection.jsx'
import ProcessSection from '../components/home/processSection/ProcessSection.jsx'
import WhyUseSection from '../components/home/whyUseSection/WhyUseSection.jsx'


export const HomePage = () => {
  return (
    <section className="home" aria-label="Main content sections">
      <HeroSection/>
      <ProcessSection/>
      <WhyUseSection/>
    </section>
  )
}

export default HomePage