import React from 'react'
import HeroSection from '../Components/HeroSection'
import ContactUs from '../Components/ContactUs'
import SEO from '../Components/Common/SEO'

const ContactPage = () => {
  return (
    <>
      <SEO 
        title="Contact Us - Blaupunkt EV Charging Solutions"
        description="Get in touch with Blaupunkt for inquiries about EV charging stations, installation services, and customer support. We're here to help with your electric vehicle charging needs."
        keywords="contact Blaupunkt, EV charging support, charging station inquiry, customer service"
        canonical="/contact"
      />
      <div>
       <ContactUs />
      </div>
    </>
  )
}

export default ContactPage