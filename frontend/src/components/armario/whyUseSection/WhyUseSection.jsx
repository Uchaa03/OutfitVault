import React from "react";
import WhyUseCard from './WhyUseCard.jsx'


const WhyUseSection = () => {

  const reasons = [
    {
      title: "ORGANIZACIÓN TOTAL",
      description:
        "Toma fotos de tu ropa desde cualquier dispositivo y súbelas fácilmente al sistema. Digitaliza tu armario en minutos y ten todas tus prendas al alcance de un clic.",
    },
    {
      title: "AHORRA TIEMPO",
      description:
        "Clasifica tu ropa en categorías como camisetas, pantalones, vestidos y más. Mantén todo ordenado de manera virtual para que encontrar lo que necesitas sea rápido y sencillo.",
    },
    {
      title: "ESTILO SIEMPRE IMPECABLE",
      description:
        "Combina tus prendas favoritas y descubre nuevas ideas para armar el look perfecto. Personaliza tus combinaciones para cada ocasión y ten siempre a mano el outfit ideal.",
    },
  ];

  return (
    <section className="whyuse">
      <h2>¿POR QUÉ USAR OUTFITVAULT?</h2>
      <div className="whyuse__cards">
        {reasons.map((reason, index) => (
          <WhyUseCard
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
