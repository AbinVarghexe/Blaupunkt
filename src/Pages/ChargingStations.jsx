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
        title="AC Charging Stations - Blaupunkt EV Charging Solutions"
        description="Premium AC charging stations from Blaupunkt for residential and commercial use. Smart, efficient, and safe EV charging solutions."
        keywords="AC charging station, home EV charger, commercial charging, smart EV charger"
        canonical="/charging-stations"
      />
      <div>
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
