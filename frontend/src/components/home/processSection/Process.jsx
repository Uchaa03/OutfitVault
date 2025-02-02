import { useEffect } from "react";
import Button from '../../button/button';
import {useDarkMode} from "../../../store/authStore.jsx";

const Process = ({ title, description, image, alt, overlayImage, overlayAlt, reverse , buttonText}) => {
  const darkMode = useDarkMode();

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
        <article className={`${darkMode ? "process__text process__text--dark" : "process__text"} ${reverse ? "process__text--reverse" : ""}`}>
          <h2>{title}</h2>
          <p>{description}</p>
          <Button className={darkMode ? "process__button process__button--dark" : "process__button"}>{buttonText}</Button>
          <figure className="process__photo-container">
            <img src={image} alt={alt} className="process__photo"/>
            <img src={overlayImage} alt={overlayAlt} className="process__overlay-photo"/>
          </figure>
        </article>
      </section>
    </>
  );
};

export default Process;