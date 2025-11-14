import React from 'react'
import HeroSection from '../Components/HeroSection'
import Category from '../Components/Category'
import OurProducts from '../Components/OurProducts'
import { Link } from 'react-router-dom'
import SEO from '../Components/Common/SEO'

const HomePage = () => {
  return (
    <>
      <SEO 
        title="Blaupunkt - Premium EV Charging Solutions | Electric Vehicle Chargers"
        description="Discover Blaupunkt's complete range of EV charging solutions including AC charging stations, DC fast chargers, portable EV chargers, and premium charging cables for electric vehicles."
        keywords="EV charging, electric vehicle charger, DC fast charger, AC charging station, portable EV charger, charging cables, Blaupunkt"
        canonical="/"
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