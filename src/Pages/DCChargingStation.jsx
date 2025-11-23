import React from 'react'
import HeroSection from '../Components/CommonPages/HeroSection'
import Specifications from '../Components/CommonPages/Specifications.jsx'
import ImageHeader from '../Components/Common/ImageHeader'
import OverviewSection from '../Components/Common/Overview/OverviewSection'
import OverviewAdvantage from '../Components/Common/Overview/OverviewAdvantage'
import OverviewFeatureasandideal from '../Components/Common/Overview/OverviewFeatureasandideal'
import DownloadButton from '../Components/CommonPages/DownlaodButton'
import Models from '../Components/CommonPages/Models.jsx'
import {
  Entirepagedata,
  dcChargingStationImages
} from '../Data/index.js'
import { dcChargingStationData, dcChargingStationConfig } from '../Data/DCChargingStation/index.js'
import SEO from '../Components/Common/SEO'

const DCChargingStation = () => {
  // Get data from Entirepagedata
  const {
    title,
    description,
    breadcrumbs,
    buttonText,
    imageAlt,
    OverviewData
  } = Entirepagedata.dcChargingStation

  // Process thumbnails with actual images
  const thumbnails = Entirepagedata.dcChargingStation.thumbnails.map(thumb => ({
    ...thumb,
    image: thumb.image, // Use the actual thumbnail image instead of productImage
    alt: thumb.alt
  }))

  return (
    <>
      <SEO 
        title="DC Charger UAE | DC Charging Station & Fast Chargers"
        description="Explore DC chargers for commercial and high-power EV charging in the UAE. Fast DC charging stations with advanced safety and performance."
        keywords="DC charger UAE, DC charging station UAE, fast DC charger, commercial DC EV charging, high power EV charging UAE"
        canonical="https://blaupunkt-ev.com/dc-charging-station"
        ogTitle="DC Charger UAE"
        ogDescription="Fast and commercial DC charging solutions."
        twitterTitle="DC Charger UAE"
        twitterDescription="Fast and commercial DC charging solutions."
        ogImage={dcChargingStationImages.dcMidSpec}
      />
      <div>
      <h1 className="sr-only">DC Charger UAE — Commercial & Fast Charging</h1>
      <h2 className="sr-only">DC fast chargers for commercial applications</h2>
      <h2 className="sr-only">High-power, reliable DC charging solutions</h2>
      {' '}
      <HeroSection
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
        buttonText={buttonText}
        imageAlt={imageAlt}
        thumbnails={thumbnails}
      />
      {/* Overview Header */}
      <ImageHeader
        title='Overview'
        backgroundImage={OverviewData?.BgImage}
        showBackgroundImage={!!OverviewData?.BgImage}
      />{' '}
      {/* All three overview components for DC Charging Station */}
      <OverviewSection
        overviewData={{
          ...OverviewData,
          category: 'dcChargingStation',
          image: OverviewData?.image || ''
        }}
      />
      <OverviewAdvantage
        overviewData={{ ...OverviewData, category: 'dcChargingStation' }}
      />
      <OverviewFeatureasandideal
        overviewData={{
          ...OverviewData,
          category: 'dcChargingStation',
          IdealandFeaturesImage: OverviewData?.IdealandFeaturesImage || ''
        }}
      />{' '}
      <Specifications
        productImage={dcChargingStationImages.dcMidSpec}
        category='dcChargingStation'
      />{' '}
      <Models
        category='dcChargingStation'
        modelsData={dcChargingStationData.modelsData}
      />
      <DownloadButton 
        productCategory='dcChargingStation' 
        downloadData={dcChargingStationConfig.downloads}
      />
    </div>
    </>
  )
}

export default DCChargingStation
