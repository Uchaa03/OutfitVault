/**
 * Process component that displays a section with a title, description, and images.
 * It uses an IntersectionObserver to animate elements when they become visible in the viewport.
 * The component supports a reverse layout for the text and image order.
 *
 * @component
 * @example
 * // Usage example:
 * <Process
 *   title="Step 1: Preparation"
 *   description="This is the first step in the process."
 *   image="/path/to/image.jpg"
 *   alt="Image alt text"
 *   overlayImage="/path/to/overlay-image.jpg"
 *   overlayAlt="Overlay image alt text"
 *   reverse={false}
 * />
 *
 * @param {string} title - The title of the process step.
 * @param {string} description - The description text for the process step.
 * @param {string} image - The URL of the main image.
 * @param {string} alt - The alt text for the main image.
 * @param {string} overlayImage - The URL of the overlay image.
 * @param {string} overlayAlt - The alt text for the overlay image.
 * @param {boolean} reverse - A boolean to reverse the layout (text on the right, image on the left).
 * @returns {JSX.Element} The rendered process section with title, description, and images.
 */
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
