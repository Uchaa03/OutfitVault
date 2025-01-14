


const Process = ({ title, description, image, alt, reverse }) => {

  return (
    <article className={`process ${reverse ? "process--reverse" : ""}`}>
      <section className={'process__text'}>
        <h2>{title}</h2>
        <p>{description}</p>
      </section>
      <img src={image} alt={alt} className={'process__photo'} />
    </article>
  );
};

export default Process;