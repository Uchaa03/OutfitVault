import React from 'react';
import Process from './Process.jsx'
import {useDarkMode} from "../../../store/authStore.jsx";


const ProcessSection = () => {
  const darkMode = useDarkMode();

  const processes = [
    {
      title: "SUBE UNA FOTO",
      description: "Saca fotos de tu ropa y súbela al sistema para tenerla bien organizada.",
      image: darkMode?"/assets/img/Process_Box_Dark.svg":"/assets/img/Process_Box_Light.svg",
      alt: "Ropa",
      overlayImage: darkMode?"/assets/img/Process_photo_Upload_Dark.svg":"/assets/img/Process_photo_Upload_Light.svg",
      overlayAlt: "Icono de subir foto",
      reverse: false,
      buttonText: "Agrega"
    },
    {
      title: "HAZ TU VAULT",
      description: "Ordena todo virtualmente por categorías.",
      image:  darkMode?"/assets/img/Process_Box_Dark.svg":"/assets/img/Process_Box_Light.svg",
      overlayImage: darkMode?"/assets/img/Process_Photo_Organization_Dark.svg":"/assets/img/Process_Photo_Organization_Light.svg",
      overlayAlt: "Icono de una persona organizando algo",
      alt: "Armario",
      reverse: true,
      buttonText: "Vault"
    },
    {
      title: "CREA TUS OUTFITS",
      description: "Combina prendas y encuentra el look perfecto utilizando lo último en inteligencia artificial.",
      image:  darkMode?"/assets/img/Process_Box_Dark.svg":"/assets/img/Process_Box_Light.svg",
      overlayImage: darkMode?"/assets/img/Process_Photo_Create_Dark.svg":"/assets/img/Process_Photo_Create_Light.svg",
      overlayAlt: "Icono de varios cuadrados con un símbolo de mas",
      alt: "Outfit",
      reverse: false,
      buttonText: "Generar"
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
          overlayImage={process.overlayImage}
          overlayAlt={process.overlayAlt}
          reverse={process.reverse}
          buttonText={process.buttonText}
        />
      ))}
    </section>
  );
};

export default ProcessSection;
