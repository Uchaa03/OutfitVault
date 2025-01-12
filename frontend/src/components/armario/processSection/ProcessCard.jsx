


const ProcessCard = ({ title, description, image, alt, reverse }) => {

  return (
    <article className={`process ${reverse ? "process-reverse" : ""}`}>
      <section>
        <h2>{title}</h2>
        <p>{description}</p>
      </section>
      <img src={image} alt={alt} />
    </article>
  );
};

export default ProcessCard;