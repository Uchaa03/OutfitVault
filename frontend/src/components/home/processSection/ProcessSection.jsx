import React from 'react';
import Process from './Process.jsx'


const ProcessSection = () => {

  const processes = [
    {
      title: "SUBE UNA FOTO",
      description: "Saca fotos de tu ropa y súbela al sistema para tenerla bien organizada.",
      image: "/assets/img/process_photo.svg",
      alt: "Ropa",
      reverse: false,
    },
    {
      title: "ORGANIZAR TU ARMARIO",
      description: "Ordena todo virtualmente por categorías.",
      image: "/assets/img/process_photo.svg",
      alt: "Armario",
      reverse: true,
    },
    {
      title: "CREA TUS OUTFITS",
      description: "Combina prendas y encuentra el look perfecto utilizando lo último en inteligencia artificial.",
      image: "/assets/img/process_photo.svg",
      alt: "Outfit",
      reverse: false,
    },
  ];

  return (
    <section className="processes">
      {processes.map((process, index) => (
        <Process
          key={index}
          title={process.title}
          description={process.description}
          image={process.image}
          alt={process.alt}
          reverse={process.reverse}
        />
      ))}
    </section>
  );
};

export default ProcessSection;
