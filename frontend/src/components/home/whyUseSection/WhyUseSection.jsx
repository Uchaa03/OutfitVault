import React from "react";
import WhyUseDropdown from './WhyUseDropdown.jsx';
import { useDarkMode } from "../../../store/authStore.jsx";

/**
 * WhyUseSection component renders a section that explains the benefits of using the app.
 * It displays a title and a list of reasons with descriptions, each in a collapsible dropdown.
 * The section's appearance changes based on the dark mode theme.
 *
 * @returns {JSX.Element} A section element containing the reasons to use the app.
 */
const WhyUseSection = () => {
  // Get the current dark mode state from the store
  const darkMode = useDarkMode();

  // List of reasons with titles and descriptions for using the app
  const reasons = [
    {
      title: "Organización total",
      description:
        "Toma fotos de tu ropa desde cualquier dispositivo y súbelas fácilmente al sistema. Digitaliza tu home en minutos y ten todas tus prendas al alcance de un clic.",
    },
    {
      title: "Ahorra tiempo",
      description:
        "Clasifica tu ropa en categorías como camisetas, pantalones, vestidos y más. Mantén todo ordenado de manera virtual para que encontrar lo que necesitas sea rápido y sencillo.",
    },
    {
      title: "Estilo siempre impecable",
      description:
        "Combina tus prendas favoritas y descubre nuevas ideas para armar el look perfecto. Personaliza tus combinaciones para cada ocasión y ten siempre a mano el outfit ideal.",
    },
  ];

  return (
    <section className="whyuse">
      {/* Title for the section, dynamically applying dark mode styles */}
      <h2 className={darkMode ? "whyuse__title whyuse__title--dark" : "whyuse__title"}>
        ¿POR QUÉ USAR OUTFITVAULT?
      </h2>
      
      {/* Container for the dropdowns */}
      <div className="whyuse__dropdown">
        {reasons.map((reason, index) => (
          <WhyUseDropdown
            key={index}
            title={reason.title}
            description={reason.description}
          />
        ))}
      </div>
    </section>
  );
};

export default WhyUseSection;
