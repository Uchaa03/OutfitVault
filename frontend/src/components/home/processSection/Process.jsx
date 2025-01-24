import { useEffect } from "react";

const Process = ({ title, description, image, alt, overlayImage, overlayAlt, reverse }) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!entry.target.classList.contains("animated")) {
            entry.target.classList.add("show", "animated");
          }
        }
      });
    });

    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach((element) => { observer.observe(element) });

    // Cleanup function to unobserve elements when the component unmounts
    return () => {
      hiddenElements.forEach((element) => { observer.unobserve(element) });
    };
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return (
    <>
      <section className={`hidden process ${reverse ? "process--reverse" : ""}`}>
        <article className="process__text">
          <h2>{title}</h2>
          <p>{description}</p>
        </article>
        <figure className="process__photo-container">
          <img src={image} alt={alt} className="process__photo" />
          <img src={overlayImage} alt={overlayAlt} className="process__overlay-photo" />
        </figure>
      </section>
    </>
  );
};

export default Process;