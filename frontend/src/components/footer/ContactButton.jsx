


const ContactButton = () => {
  const handleClick = () => {
    alert('Contact form submitted!')
    // Add form submission logic here (e.g., using fetch API)
  }
  return (
      <button className="footer__contact" onClick={handleClick}>Contact Us</button>
  )
}

export default ContactButton