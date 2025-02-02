import { useEffect } from "react";
import Button from '../../button/button';
import { useDarkMode } from "../../../store/authStore.jsx";
import { useNavigate } from "react-router-dom";

/**
 * Process component displays a process section with an optional reversed layout.
 * It shows a title, description, an image with an overlay, and a button. The section also has an animation effect when it comes into view.
 *
 * @param {Object} props - The props passed to the component.
 * @param {string} props.title - The title of the process.
 * @param {string} props.description - The description of the process.
 * @param {string} props.image - The source URL of the main image.
 * @param {string} props.alt - The alt text for the main image.
 * @param {string} props.overlayImage - The source URL of the overlay image.
 * @param {string} props.overlayAlt - The alt text for the overlay image.
 * @param {boolean} [props.reverse=false] - A flag that determines if the layout is reversed.
 * @param {string} props.buttonText - The text to display on the button.
 * @returns {JSX.Element} A section element with the process content, images, and button.
 */
const Process = ({ title, description, image, alt, overlayImage, overlayAlt, reverse, buttonText }) => {
  // Get the current dark mode state from the store
  const darkMode = useDarkMode();
  const navigate = useNavigate();

  useEffect(() => {
    // Create an intersection observer to trigger animation when the element enters the viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!entry.target.classList.contains("animated")) {
            entry.target.classList.add("show", "animated");
          }
        }
      });
    });

    // Observe all elements with the "hidden" class
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
          {/* Title and description */}
          <h2>{title}</h2>
          <p>{description}</p>

          {/* Button with dark mode styling */}
          <Button className={darkMode ? "process__button process__button--dark" : "process__button"} onClick={() => navigate('/login')}>
            {buttonText}
          </Button>

          {/* Image and overlay image */}
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
