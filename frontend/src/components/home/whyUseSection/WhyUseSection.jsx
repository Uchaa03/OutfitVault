import React from "react";
import WhyUseDropdown from './WhyUseDropdown.jsx';
import {useDarkMode} from "../../../store/authStore.jsx";

const WhyUseSection = () => {
  const darkMode = useDarkMode();

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
      <h2 className={darkMode ? "whyuse__title whyuse__title--dark" : "whyuse__title"}>¿POR QUÉ USAR OUTFITVAULT?</h2>
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