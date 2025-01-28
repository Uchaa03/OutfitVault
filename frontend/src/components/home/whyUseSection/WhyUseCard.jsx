/**
 * WhyUseCard component represents a card displaying a title and a description.
 * It is commonly used to highlight features or reasons to use a service or product.
 *
 * @component
 * @example
 * // Usage example:
 * <WhyUseCard title="Easy to Use" description="Our platform is intuitive and simple to navigate." />
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the card.
 * @param {string} props.description - The description of the card content.
 *
 * @returns {JSX.Element} The rendered card with a title and description.
 */
const WhyUseCard = ({ title, description }) => (
  <article className="whyuse__card">
    <h3>{title}</h3>
    <p>{description}</p>
  </article>
);

export default WhyUseCard;
