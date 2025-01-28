import HeroSection from '../components/home/hero/HeroSection.jsx';
import ProcessSection from '../components/home/processSection/ProcessSection.jsx';
import WhyUseSection from '../components/home/whyUseSection/WhyUseSection.jsx';

/**
 * HomePage Component
 *
 * The main landing page of the application. It consists of multiple sections:
 * - `HeroSection`: Displays an introductory banner or main highlight.
 * - `ProcessSection`: Explains how the application works.
 * - `WhyUseSection`: Provides reasons why users should use the application.
 *
 * @component
 * @returns {JSX.Element} The rendered HomePage component.
 */
export const HomePage = () => {
  return (
    <section className="home" aria-label="Main content sections">
      <HeroSection />
      <ProcessSection />
      <WhyUseSection />
    </section>
  );
};

export default HomePage;
