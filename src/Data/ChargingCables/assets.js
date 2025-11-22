// =============================================================================
// CHARGING CABLES ASSETS
// =============================================================================
// Image and asset imports specific to EV Charging Cables
// =============================================================================

// Import EV Charging Cable Images
import evCab1Url from '../../assets/Images/EvCables/EVCab-1.webp'
import evCab2Url from '../../assets/Images/EvCables/EVCab-2.webp'
import evCab3Url from '../../assets/Images/EvCables/EVCab-3.webp'
import evCab4Url from '../../assets/Images/EvCables/EVCab-4.webp'
import evCabMidUrl from '../../assets/Images/EvCables/EVCab-Mid.webp'
import evCabMidRightUrl from '../../assets/Images/EvCables/EVCab-Mid-Right.webp'
import evmoboverbg from '../../assets/Images/EvCables/EVOverviewBgmob.webp'
import evmodelbg from '../../assets/Images/EvCables/EVOModelBgmob.webp'
import evspecmob from '../../assets/Images/EvCables/EVSpecBgmob.webp'

// Import Product Images for Charging Cables
import evCabPd1 from '../../assets/Images/pdImages/EVCab-Pd-1.webp'
import evCabPd2 from '../../assets/Images/pdImages/EVCab-pd-2.webp'

// Main charging cable images
export const chargingCableImages = {
  main: evCabMidUrl,
  cable1: evCab1Url,
  cable2: evCab2Url,
  cable3: evCab3Url,
  cable4: evCab4Url,
  cableMid: evCabMidUrl,
  cableMidRight: evCabMidRightUrl,
  cablePd1: evCabPd1,
  cablePd2: evCabPd2,
}

// Background images for overview sections
export const chargingCableBgImages = {
  overview: evCabMidRightUrl,
  hero: evCabMidUrl,
  features: evCab3Url,
  specifications: evCabMidRightUrl,
  ideal: evCab4Url,
  evmoboverbg: evmoboverbg,
  evmodelbg: evmodelbg,
  evspecmob: evspecmob
}

// Product images for different views
export const chargingCableProductImages = {
  main: evCabMidUrl,
  feature: evCab3Url,
  overview: evCabMidUrl,
  specifications: evCabMidRightUrl,
  ideal: evCab4Url,
  background: evCabMidRightUrl,
  pd1: evCabPd1,
  pd2: evCabPd2,
}

/**
 * Creates EV charging cable thumbnails with different images
 * @returns {Array} Array of EV cable thumbnail objects
 */
export const createEVCableThumbnails = () => [
  {
    image: chargingCableImages.cable1,
    alt: 'EV Charging Cable - Cable 1'
  },
  {
    image: chargingCableImages.cable2,
    alt: 'EV Charging Cable - Cable 2'
  },
  {
    image: chargingCableImages.cable3,
    alt: 'EV Charging Cable - Cable 3'
  },
  {
    image: chargingCableImages.cable4,
    alt: 'EV Charging Cable - Cable 4'
  }
]

// Easy access exports
export const CHARGING_CABLES_IMAGES = {
  MAIN: chargingCableImages.main,
  THUMBNAILS: createEVCableThumbnails(),
  BACKGROUND: chargingCableBgImages.overview,
  FEATURE: chargingCableProductImages.feature,
  IDEAL: chargingCableProductImages.ideal
}

// Image paths for backward compatibility
export const IMAGE_PATHS = {
  main: '/src/assets/Images/EvCables/EVCab-Mid.webp',
  cable1: '/src/assets/Images/EvCables/EVCab-1.webp',
  cable2: '/src/assets/Images/EvCables/EVCab-2.webp',
  cable3: '/src/assets/Images/EvCables/EVCab-3.webp',
  cable4: '/src/assets/Images/EvCables/EVCab-4.webp',
  cableMidRight: '/src/assets/Images/EvCables/EVCab-Mid-Right.webp',
  cablePd1: '/src/assets/Images/pdImages/EVCab-Pd-1.webp',
  cablePd2: '/src/assets/Images/pdImages/EVCab-pd-2.webp'
}
