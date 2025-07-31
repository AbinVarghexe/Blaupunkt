import React from 'react'
import HeroSection from '../Components/CommonPages/HeroSection'
import Specifications from '../Components/CommonPages/Specifications.jsx'
import ImageHeader from '../Components/Common/ImageHeader'
import OverviewSection from '../Components/Common/Overview/OverviewSection'
import OverviewAdvantage from '../Components/Common/Overview/OverviewAdvantage'
import OverviewFeatureasandideal from '../Components/Common/Overview/OverviewFeatureasandideal'
import DownloadButton from '../Components/CommonPages/DownlaodButton'
import Models from '../Components/CommonPages/Models.jsx'
import { Entirepagedata, dcSuperFastChargingStationImages } from '../Data/index.js'
import { dcSuperFastChargingStationData, dcSuperFastChargingStationConfig } from '../Data/DCSuperFastChargingStation/index.js'

const DCSuperFastChargingStation = () => {
  // Get data from Entirepagedata
  const {
    title,
    description,
    breadcrumbs,
    buttonText,
    imageAlt,
    OverviewData
  } = Entirepagedata.dcSuperFastChargingStation

  // Process thumbnails with actual images
  const thumbnails = Entirepagedata.dcSuperFastChargingStation.thumbnails.map(
    thumb => ({
      ...thumb,
      image: thumb.image, // Use the actual thumbnail image instead of hardcoded image
      alt: thumb.alt
    })
  )

  return (
    <div>
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
  )
}

export default DCSuperFastChargingStation
