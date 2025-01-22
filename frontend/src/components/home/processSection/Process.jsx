
const Process = ({ title, description, image, alt, overlayImage, overlayAlt, reverse }) => {
  return (
    <section className={`process ${reverse ? "process--reverse" : ""}`}>
      <article className="process__text">
        <h2>{title}</h2>
        <p>{description}</p>
      </article>
      <figure className="process__photo-container">
        <img src={image} alt={alt} className="process__photo" />
        <img src={overlayImage} alt={overlayAlt} className="process__overlay-photo" />
      </figure>
    </section>
  );
};

export default Process;