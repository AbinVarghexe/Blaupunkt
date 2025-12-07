import React from 'react'
import HeroSection from '../Components/HeroSection'
import ContactUs from '../Components/ContactUs'
import SEO from '../Components/Common/SEO'

const ContactPage = () => {
  return (
    <>
      <SEO 
        title="Contact Blaupunkt UAE | EV Charger Support"
        description="Contact Blaupunkt UAE for EV charger support, inquiries, and installation assistance. Our team is ready to help."
        keywords="contact Blaupunkt UAE, EV charger support UAE, EV charger inquiries, EV charger installation assistance, Blaupunkt contact"
        canonical="https://blaupunkt-ev.com/contact"
        ogTitle="Contact Blaupunkt UAE"
        ogDescription="Reach out to Blaupunkt for EV charger support."
        twitterTitle="Contact Blaupunkt UAE"
        twitterDescription="Reach out to Blaupunkt for EV charger support."
        ogType="website"
      />
      <div>
       <h1 className="sr-only">Contact Blaupunkt UAE</h1>
       <h2 className="sr-only">Inquiries, support & installation assistance</h2>
       <h2 className="sr-only">Get in touch for product or service requests</h2>
       <ContactUs />
      </div>
    </>
  )
}

export default ContactPage