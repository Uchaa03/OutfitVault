import ContactButton from '../../components/footer/ContactButton.jsx';


const FooterLayout = () => {
  return (
    <section className={'footer'}>
      <p className={'footer__terms-and-conditions'}>
        Por OutfitVault ©2025 Adrián Ucha, Pablo Barrera, Maurice Darner está
        autorizado bajo CC BY-NC-ND 4.0 licencia CC BY-NC-ND 4.0
      </p>
      <ContactButton />
    </section>
  )
}

export default FooterLayout