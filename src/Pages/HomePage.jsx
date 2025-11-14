import React from 'react'
import HeroSection from '../Components/HeroSection'
import Category from '../Components/Category'
import OurProducts from '../Components/OurProducts'
import SEO from '../Components/Common/SEO'

const HomePage = () => {
  return (
    <>
      <SEO 
        title="Blaupunkt EV Charging Solutions - Premium Electric Vehicle Chargers"
        description="Premium electric vehicle charging solutions from Blaupunkt. Discover our range of EV chargers, charging cables, and charging stations for home and commercial use."
        keywords="EV charger, electric vehicle charging, EV charging station, charging cable, Blaupunkt, DC fast charging, portable EV charger, home EV charger"
      />
      <div>
        <HeroSection />
        <Category />
        <OurProducts />
      </div>
    </>
  )
}

export default HomePage