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
        title="EV Charging Cables - Blaupunkt Premium Charging Solutions"
        description="High-quality EV charging cables from Blaupunkt. Type 1, Type 2, and CCS connectors for reliable and safe electric vehicle charging."
        keywords="EV charging cables, Type 2 cables, Type 1 cables, CCS cables, electric vehicle cables"
        canonical="/charging-cables"
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
