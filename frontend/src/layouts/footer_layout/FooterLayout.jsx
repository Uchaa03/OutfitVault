import ContactButton from '../../components/footer/ContactButton.jsx';

/**
 * FooterLayout component represents the footer section of the page,
 * providing information such as terms and conditions, along with a
 * contact button for further inquiries.
 *
 * @component
 * @example
 * return (
 *   <FooterLayout />
 * )
 */
const FooterLayout = () => {
  return (
    <section className={'footer'}>
      <p className={'footer__terms-and-conditions'}>
        Por OutfitVault ©2025 Adrián Ucha, Pablo Barrera, Maurice Darner está
        autorizado bajo CC BY-NC-ND 4.0 licencia CC BY-NC-ND 4.0
      </p>
      <ContactButton />
    </section>
  );
};

export default FooterLayout;
