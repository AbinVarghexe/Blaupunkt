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
  portableEvChargingProductImages
} from '../Data/index.js'
import { portableEvChargingData, portableEvChargingConfig } from '../Data/PortableEVCharging/index.js'
import SEO from '../Components/Common/SEO'

const PortableEVCharging = () => {
  // Get data from Entirepagedata
  const {
    title,
    description,
    breadcrumbs,
    buttonText,
    imageAlt,
    OverviewData
  } = Entirepagedata.portableEVCharging

  // Process thumbnails with actual images
  const thumbnails = Entirepagedata.portableEVCharging.thumbnails.map(
    thumb => ({
      ...thumb,
      image: thumb.image, // Use the actual thumbnail image instead of hardcoded image
      alt: thumb.alt
    })
  )

  return (
    <>
      <SEO 
        title="Portable EV Charger UAE | Mobile & Emergency Chargers"
        description="Get portable EV chargers in the UAE. Safe, compact and ideal for travel or emergency charging. Compatible with multiple EV brands."
        keywords="portable EV charger UAE, mobile EV charger, emergency EV charging UAE, compact EV charger, Blaupunkt portable charger"
        canonical="https://blaupunkt-ev.com/portable-ev-charging"
        ogTitle="Portable EV Charger UAE"
        ogDescription="Compact mobile chargers for emergencies and travel."
        twitterTitle="Portable EV Charger UAE"
        twitterDescription="Compact mobile chargers for emergencies and travel."
        ogImage={portableEvChargingProductImages.specifications}
        ogType="website"
      />
      <div>
      <h1 className="sr-only">Portable EV Charger UAE — Mobile & Emergency Chargers</h1>
      <h2 className="sr-only">Compact, safe portable EV chargers for travel</h2>
      <h2 className="sr-only">Emergency charging solutions compatible with multiple brands</h2>
      <HeroSection
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
        buttonText={buttonText}
        mainImage={
          Entirepagedata.portableEVCharging.mainImage ||
          portableEvChargingProductImages.main
        }
        imageAlt={imageAlt}
        thumbnails={thumbnails}
        thumbnailObjectFit='object-cover'
        mainImageObjectFit='object-cover'
      />
      {/* Overview Header */}
      <ImageHeader
        title='Overview'
        backgroundImage={OverviewData?.BgImage}
        showBackgroundImage={!!OverviewData?.BgImage}
      />{' '}
      {/* All three overview components for Portable EV Charging */}
      <OverviewSection
        overviewData={{
          ...OverviewData,
          category: 'portableEVCharging',
          image: OverviewData?.image || portableEvChargingProductImages.main
        }}
      />      <OverviewFeatureasandideal
        overviewData={{
          ...OverviewData,
          category: 'portableEVCharging',
          IdealandFeaturesImage:
            OverviewData?.IdealandFeaturesImage ||
            portableEvChargingProductImages.feature
        }}
      />{' '}
      <OverviewAdvantage
        overviewData={{ ...OverviewData, category: 'portableEVCharging' }}
      />
      <Specifications
        productImage={portableEvChargingProductImages.specifications}
        category='portableEVCharging'
      />
      <Models
        category='portableEVCharging'
        modelsData={portableEvChargingData.modelsData}
      />
      <DownloadButton 
        productCategory='portableEVCharging' 
        downloadData={portableEvChargingConfig.downloads}
      />
    </div>
    </>
  )
}

export default PortableEVCharging
