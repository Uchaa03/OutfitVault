import HeroSection from '../components/home/hero/HeroSection.jsx';
import ProcessSection from '../components/home/processSection/ProcessSection.jsx';
import WhyUseSection from '../components/home/whyUseSection/WhyUseSection.jsx';
import { Helmet } from "react-helmet";

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
    <>
      <Helmet>
        <title>OutfitVault | Tu Armario Digital</title>
        <meta name="description" content="Descubre OutfitVault, tu armario digital que te ayuda a gestionar y organizar tu ropa de forma inteligente." />
        <meta name="keywords" content="armario digital, gestión de ropa, outfits, moda, estilo, inteligencia artificial" />
        <link rel="canonical" href="https://outfitvault-1.onrender.com/" />
      </Helmet>
      
      <main className="home" aria-label="Main content sections">
        <HeroSection />
        <ProcessSection />
        <WhyUseSection />
      </main>
    </>
  );
};

export default HomePage;