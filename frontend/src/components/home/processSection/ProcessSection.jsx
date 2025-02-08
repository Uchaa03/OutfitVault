import React from 'react';
import Process from './Process.jsx';
import { useDarkMode } from "../../../store/authStore.jsx";

/**
 * The ProcessSection component displays a list of processes that users can follow. 
 * It dynamically renders a series of process steps using the Process component, 
 * applying dark or light mode styles based on the current theme.
 *
 * @returns {JSX.Element} A section containing a list of process steps.
 */
const ProcessSection = () => {
  // Get the current dark mode state from the store
  const darkMode = useDarkMode();

  // Array of processes to display
  const processes = [
    {
      title: "SUBE UNA FOTO",
      description: "Saca fotos de tu ropa y súbela al sistema para tenerla bien organizada.",
      image: darkMode ? "/assets/img/Process_Box_Dark.svg" : "/assets/img/Process_Box_Light.svg", // Conditionally load image based on dark mode
      alt: "Caja representativa y animada de la sección de ropa con imagen representativa dentro",
      overlayImage: darkMode ? "/assets/img/Process_photo_Upload_Dark.svg" : "/assets/img/Process_photo_Upload_Light.svg", // Conditionally load overlay image based on dark mode
      overlayAlt: "Icono que representa la subida de una prenda a la página web, simple imagen representativa",
      reverse: false, // Flag to indicate whether the layout should be reversed
      buttonText: "Agrega"
    },
    {
      title: "HAZ TU VAULT",
      description: "Ordena todo virtualmente por categorías, en un vault especial y único.",
      image: darkMode ? "/assets/img/Process_Box_Dark.svg" : "/assets/img/Process_Box_Light.svg", 
      overlayImage: darkMode ? "/assets/img/Process_Photo_Organization_Dark.svg" : "/assets/img/Process_Photo_Organization_Light.svg",
      overlayAlt: "Icono de una persona organizando algo, como organizas tu vault subiendo tus prendas, simple imagen representativa",
      alt: "Caja representativa y animada de la sección de vault con imagen representativa dentro",
      reverse: true, // Reverse the layout for this process
      buttonText: "Vault"
    },
    {
      title: "CREA TUS OUTFITS",
      description: "Combina prendas y encuentra el look perfecto utilizando lo último en inteligencia artificial.",
      image: darkMode ? "/assets/img/Process_Box_Dark.svg" : "/assets/img/Process_Box_Light.svg",
      overlayImage: darkMode ? "/assets/img/Process_Photo_Create_Dark.svg" : "/assets/img/Process_Photo_Create_Light.svg",
      overlayAlt: "Icono de varios cuadrados con un símbolo de más, representando la creación de outfits propios con IA",
      alt: "Caja representativa y animada de la sección de generación de outfits con IA con imagen representativa dentro",
      reverse: false, // Default layout
      buttonText: "Generar"
    },
  ];

  return (
    <section className="processes">
      {/* Map over the processes array and render the Process component for each item */}
      {processes.map((process, index) => (
        <Process
          key={index} // Unique key for each Process component
          title={process.title}
          description={process.description}
          image={process.image}
          alt={process.alt}
          overlayImage={process.overlayImage}
          overlayAlt={process.overlayAlt}
          reverse={process.reverse} // Reverse layout flag
          buttonText={process.buttonText}
        />
      ))}
    </section>
  );
};

export default ProcessSection;
