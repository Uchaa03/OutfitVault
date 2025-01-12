


const ContactButton = () => {
  const handleClick = () => {
    alert('Contact form submitted!')
    // Add form submission logic here (e.g., using fetch API)
  }
  return (
      <button className="contact-button" onClick={handleClick}>Contact Us</button>
  )
}

export default ContactButton