import React from 'react'
import HeroSection from '../Components/CommonPages/HeroSection'
import Specifications from '../Components/CommonPages/Specifications.jsx'
import ImageHeader from '../Components/Common/ImageHeader'
import OverviewSection from '../Components/Common/Overview/OverviewSection'
import OverviewAdvantage from '../Components/Common/Overview/OverviewAdvantage'
import OverviewFeatureasandideal from '../Components/Common/Overview/OverviewFeatureasandideal'
import DownloadButton from '../Components/CommonPages/DownlaodButton'
import Models from '../Components/CommonPages/Models.jsx'
import { Entirepagedata, ProductImages } from '../Data/index.js'
import { dcSuperFastChargingStationData, dcSuperFastChargingStationConfig } from '../Data/DCSuperFastChargingStation/index.js'
import SEO from '../Components/Common/SEO'

const DCSuperFastChargingStation = () => {
  // Get data from Entirepagedata for DC Super Fast Charging Station
  const {
    title,
    description,
    breadcrumbs,
    buttonText,
    imageAlt,
    OverviewData
  } = Entirepagedata.dcSuperFastChargingStation

  // Get images for DC Super Fast Charging Station
  const dcSuperFastChargingStationImages = ProductImages.dcSuperFastChargingStation

  // Process thumbnails with actual images
  const thumbnails = Entirepagedata.dcSuperFastChargingStation.thumbnails.map(
    thumb => ({
      ...thumb,
      image: thumb.image, // Use the actual thumbnail image instead of hardcoded image
      alt: thumb.alt
    })
  )

  return (
    <>
      <SEO 
        title="DC Super Fast Charger UAE | Ultra Fast EV Charging"
        description="Install ultra fast DC charging stations in the UAE. High-power solutions for commercial and rapid EV charging applications."
        keywords="DC super fast charger UAE, ultra fast DC charging UAE, high power EV charging station, rapid DC charger UAE"
        canonical="https://blaupunkt-ev.com/dc-super-fast-charging-station"
        ogTitle="DC Super Fast Charger UAE"
        ogDescription="Ultra fast, high-power EV charging stations."
        twitterTitle="DC Super Fast Charger UAE"
        twitterDescription="Ultra fast, high-power EV charging stations."
        ogImage={dcSuperFastChargingStationImages.fastSpec}
      />
      <div>
      <h1 className="sr-only">DC Super Fast Charger UAE — Ultra Fast EV Charging</h1>
      <h2 className="sr-only">Ultra fast charging solutions for commercial sites</h2>
      <h2 className="sr-only">High-power 150kW / 350kW DC charging solutions</h2>
      {' '}
      <HeroSection
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
        buttonText={buttonText}
        mainImage={
          Entirepagedata.dcSuperFastChargingStation.mainImage ||
          dcSuperFastChargingStationImages.fastMid
        }
        imageAlt={imageAlt}
        thumbnails={thumbnails}
      />
      {/* Overview Header */}
      <ImageHeader
        title='Overview'
        backgroundImage={OverviewData?.BgImage}
        showBackgroundImage={!!OverviewData?.BgImage}
      />{' '}
      {/* All three overview components for DC Super Fast Charging Station */}
      <OverviewSection
        overviewData={{
          ...OverviewData,
          category: 'dcSuperFastChargingStation',
          image: OverviewData?.image || dcSuperFastChargingStationImages.fastMid
        }}
      />
      <OverviewAdvantage
        overviewData={{ ...OverviewData, category: 'dcSuperFastChargingStation' }}
      />
      <OverviewFeatureasandideal
        overviewData={{
          ...OverviewData,
          category: 'dcSuperFastChargingStation',
          IdealandFeaturesImage:
            OverviewData?.IdealandFeaturesImage ||
            dcSuperFastChargingStationImages.fastMid
        }}
      />{' '}
      <Specifications
        productImage={dcSuperFastChargingStationImages.fastSpec}
        category='dcSuperFastChargingStation'
      />
      <Models
        category='dcSuperFastChargingStation'
        modelsData={dcSuperFastChargingStationData.modelsData}
      />
      <DownloadButton 
        productCategory='dcSuperFastChargingStation' 
        downloadData={dcSuperFastChargingStationConfig.downloads}
      />
    </div>
    </>
  )
}

export default DCSuperFastChargingStation
