import React from 'react'
import HeroSection from '../Components/HeroSection'
import ContactUs from '../Components/ContactUs'
import SEO from '../Components/Common/SEO'

const ContactPage = () => {
  return (
    <>
      <SEO 
        title="Contact Blaupunkt - EV Charging Solutions Support"
        description="Get in touch with Blaupunkt for EV charging solutions. Contact our team for product inquiries, technical support, and sales information."
        keywords="contact Blaupunkt, EV charger support, electric vehicle charging inquiry, customer service, technical support"
      />
      <div>
        <ContactUs />
      </div>
    </>
  )
}

export default ContactPage