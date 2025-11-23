import React from 'react'
import HeroSection from '../Components/CommonPages/HeroSection'
import Specifications from '../Components/CommonPages/Specifications.jsx'
import ImageHeader from '../Components/Common/ImageHeader'
import OverviewSection from '../Components/Common/Overview/OverviewSection'
import OverviewAdvantage from '../Components/Common/Overview/OverviewAdvantage'
import OverviewFeatureasandideal from '../Components/Common/Overview/OverviewFeatureasandideal'
import DownloadButton from '../Components/CommonPages/DownlaodButton'
import ChargingStationModels from '../Components/CommonPages/ChargingStationModels.jsx'
import { Entirepagedata, chargingStationProductImages } from '../Data/index.js'
import { chargingStationsConfig } from '../Data/ChargingStations/index.js'
import SEO from '../Components/Common/SEO'

const ChargingStations = () => {
  // Get data from Entirepagedata
  const {
    title,
    description,
    breadcrumbs,
    buttonText,
    imageAlt,
    OverviewData
  } = Entirepagedata.chargingStations  // Process thumbnails with actual images
  const thumbnails = Entirepagedata.chargingStations.thumbnails.map(thumb => ({
    ...thumb,
    image: thumb.image, // Use the actual thumbnail image instead of productImage
    alt: thumb.alt
  }))
  return (
    <>
      <SEO 
        title="Home EV Charging Station UAE | Blaupunkt AC Chargers"
        description="Install a reliable home EV charging station in the UAE. Blaupunkt offers AC, Wallbox, and residential charging station solutions."
        keywords="home EV charging station UAE, AC EV charger UAE, Wallbox charger UAE, residential EV charging, Blaupunkt AC chargers"
        canonical="https://blaupunkt-ev.com/charging-stations"
        ogTitle="Home EV Charging Station UAE"
        ogDescription="Reliable AC and Wallbox-style chargers for homes."
        twitterTitle="Home EV Charging Station UAE"
        twitterDescription="Reliable AC and Wallbox-style chargers for homes."
        ogImage={chargingStationProductImages.spec}
      />
      <div>
      <h1 className="sr-only">Home EV Charging Station UAE — Blaupunkt AC Chargers</h1>
      <h2 className="sr-only">Wallbox and residential AC charging solutions</h2>
      <h2 className="sr-only">Safe, reliable home charging installations</h2>
      <HeroSection
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
        buttonText={buttonText}
        imageAlt={imageAlt}
        thumbnails={thumbnails}
      />
      {/* Overview Header */}
      <div className='gap-y-8'>
        <ImageHeader
          title='Overview'
          backgroundImage={OverviewData?.BgImage}
          showBackgroundImage={!!OverviewData?.BgImage}
        />
        {/* All three overview components for Charging Stations */}
        <OverviewSection
          overviewData={{
            ...OverviewData,
            category: 'chargingStations',
            image: OverviewData?.image || ""
          }}
        />
        <OverviewAdvantage
          overviewData={{ ...OverviewData, category: 'chargingStations' }}
        />
        <OverviewFeatureasandideal
          overviewData={{
            ...OverviewData,
            category: 'chargingStations',
            IdealandFeaturesImage: OverviewData?.IdealandFeaturesImage || ""
          }}
        />
      </div>
      <Specifications
        productImage={chargingStationProductImages.spec}
        category='chargingStations'
        imageHeight={{ mobile: '400px', desktop: '600px' }}
      />
      <ChargingStationModels category='chargingStations' />
      <DownloadButton 
        productCategory='chargingStations' 
        downloadData={chargingStationsConfig.downloads}
      />
      </div>
    </>
  )
}

export default ChargingStations
