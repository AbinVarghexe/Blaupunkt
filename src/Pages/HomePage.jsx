import React from 'react'
import HeroSection from '../Components/HeroSection'
import Category from '../Components/Category'
import OurProducts from '../Components/OurProducts'
import { Link } from 'react-router-dom'
import SEO from '../Components/Common/SEO'
import OgImage from '../assets/Images/CatImages/Ev_charging.webp'

const HomePage = () => {
  return (
    <>
      <SEO 
        title="EV Charger UAE | Blaupunkt EV Charging Solutions"
        description="Buy premium EV chargers in the UAE. DEWA-approved home and commercial charging solutions. High-quality AC and DC chargers from Blaupunkt."
        keywords="EV charger UAE, EV chargers UAE, DEWA approved EV charger, home EV charger UAE, commercial EV chargers UAE, AC DC EV charger, Blaupunkt EV"
        canonical="https://blaupunkt-ev.com/"
        ogTitle="EV Charger UAE – Blaupunkt"
        ogDescription="Premium EV chargers for UAE homes and businesses."
        twitterTitle="EV Charger UAE – Blaupunkt"
        twitterDescription="Premium EV chargers for UAE homes and businesses."
        ogImage={OgImage}
        ogType="website"
      />
      <div>
        <h1 className="sr-only">EV Charger UAE — Blaupunkt EV Charging Solutions</h1>
        <h2 className="sr-only">DEWA-approved home and commercial EV chargers</h2>
        <h2 className="sr-only">High-quality AC and DC chargers for UAE homes and businesses</h2>
        <HeroSection />
        <Category />
        <OurProducts />
      </div>
    </>
  )
}

export default HomePage