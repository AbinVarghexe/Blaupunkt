import React from 'react'
import HeroSection from '../Components/CommonPages/HeroSection'
import { Entirepagedata, chargingCableProductImages } from '../Data/index.js'
import { chargingCablesConfig } from '../Data/ChargingCables/index.js'
import Specifications from '../Components/CommonPages/Specifications.jsx'
import ImageHeader from '../Components/Common/ImageHeader'
import OverviewSection from '../Components/Common/Overview/OverviewSection'
import Models from '../Components/CommonPages/Models.jsx'
import DownloadButton from '../Components/CommonPages/DownlaodButton'
import SEO from '../Components/Common/SEO'

const ChargingCables = () => {
  // Get data from Entirepagedata
  const {
    title,
    description,
    breadcrumbs,
    buttonText,
    imageAlt,
    OverviewData
  } = Entirepagedata.chargingCables // Process thumbnails with actual images
  const thumbnails = Entirepagedata.chargingCables.thumbnails.map(thumb => ({
    ...thumb,
    image: thumb.image, // Use the actual thumbnail image instead of productImage
    alt: thumb.alt
  }))
  return (
    <>
    <SEO 
        title="EV Charging Cables UAE | Type 2 & 22kW Cables"
        description="Buy EV charging cables in the UAE. Type 2 and 22kW charging cables compatible with all major EV brands. High-quality Blaupunkt cables."
        keywords="EV charging cables UAE, Type 2 EV cables, 22kW charging cables, EV cables for all brands, Blaupunkt charging cables"
        canonical="https://blaupunkt-ev.com/charging-cables"
        ogTitle="EV Charging Cables UAE"
        ogDescription="Premium Type 2 and high-power EV charging cables."
        twitterTitle="EV Charging Cables UAE"
        twitterDescription="Premium Type 2 and high-power EV charging cables."
        ogImage={chargingCableProductImages.specifications}
      />
      <div>
      <h1 className="sr-only">EV Charging Cables in UAE — Type 2 & 22kW</h1>
      <h2 className="sr-only">Type 2 charging cables compatible with major EV brands</h2>
      <h2 className="sr-only">High-power 22kW cables for faster AC charging</h2>
      <HeroSection
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
        buttonText={buttonText}
        imageAlt={imageAlt}
        thumbnails={thumbnails}
      />
      {/* Overview Header */}
      <div>
        <ImageHeader
          title='Overview'
          backgroundImage={OverviewData?.BgImage}
          showBackgroundImage={!!OverviewData?.BgImage}
        />{' '}
        {/* Only Overview Section for Charging Cables */}
        <OverviewSection
          overviewData={{
            ...OverviewData,
            category: 'chargingCables',
            image: OverviewData?.image || ''
          }}
        />{' '}
      </div>
      <Specifications
        productImage={chargingCableProductImages.specifications}
        category='chargingCables'
      />{' '}
      <Models category='chargingCables' />
      <DownloadButton
        productCategory='chargingCables'
        downloadData={chargingCablesConfig.downloads}
      />
      </div>
    </>
  )
}

export default ChargingCables
