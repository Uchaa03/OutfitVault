/**
 * ProcessSection component renders a collection of process steps.
 * Each process step is represented by a `Process` component with its associated title, description, image, and overlay.
 *
 * @component
 * @example
 * // Usage example:
 * <ProcessSection />
 *
 * @returns {JSX.Element} The rendered section containing multiple process steps.
 */
const ProcessSection = () => {

  const processes = [
    {
      title: "SUBE UNA FOTO",
      description: "Saca fotos de tu ropa y súbela al sistema para tenerla bien organizada.",
      image: "/assets/img/process_photo.svg",
      alt: "Ropa",
      overlayImage: "/assets/img/process_photo_upload.svg",
      overlayAlt: "Icono de subir foto",
      reverse: false,
    },
    {
      title: "HAZ TU VAULT",
      description: "Ordena todo virtualmente por categorías.",
      image: "/assets/img/process_photo.svg",
      overlayImage: "/assets/img/process_photo_organization.svg",
      overlayAlt: "Icono de una persona organizando algo",
      alt: "Armario",
      reverse: true,
    },
    {
      title: "CREA TUS OUTFITS",
      description: "Combina prendas y encuentra el look perfecto utilizando lo último en inteligencia artificial.",
      image: "/assets/img/process_photo.svg",
      overlayImage: "/assets/img/process_photo_create.svg",
      overlayAlt: "Icono de varios cuadrados con un simbolo de mas",
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
          overlayImage={process.overlayImage}
          overlayAlt={process.overlayAlt}
          reverse={process.reverse}
        />
      ))}
    </section>
  );
};

export default ProcessSection;
