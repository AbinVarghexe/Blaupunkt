// =============================================================================
// CONSOLIDATED ASSETS
// =============================================================================
// Central asset management replacing the original assets.js
// This file imports and re-exports all product assets in a structured way
// =============================================================================

// Service Page
//================================================================================
import ServicesPageImg from "../assets/Images/ServicesPage/ServicesPage.webp";
import Mainbg from "../assets/Images/ServicesPage/Mainbg.webp";
import Installbg from "../assets/Images/ServicesPage/Installbg.webp";
import Chargbg from "../assets/Images/ServicesPage/Chargbg.webp";

// Company Page Images
//================================================================================
import picture1 from "../assets/Images/companyPage/Picture1.webp";
import picture2 from "../assets/Images/companyPage/Picture2.webp";
import picture3 from "../assets/Images/companyPage/Picture3.webp";
import picture6 from "../assets/Images/companyPage/Picture6.webp";
import picture7 from "../assets/Images/companyPage/Picture7.webp";
import picture12 from "../assets/Images/companyPage/Picture12.webp";
import picture13 from "../assets/Images/companyPage/Picture13.webp";
import t2T2 from "../assets/Images/companyPage/T2-T2.webp";

export const Servicepage = {
  ServicesPageImg,
  Mainbg,
  Installbg,
  Chargbg,
};

export const companyPageImgs = {
  picture1,
  picture2,
  picture3,
  picture6,
  picture7,
  picture12,
  picture13,
  t2T2,
  image: t2T2, // alias for main historical image
};

//================================================================================

// Import all product assets
import {
  chargingCableImages,
  chargingCableBgImages,
  chargingCableProductImages,
} from "./ChargingCables/assets.js";
import {
  chargingStationImages,
  chargingStationBgImages,
  chargingStationProductImages,
} from "./ChargingStations/assets.js";
import {
  dcChargingStationImages,
  dcChargingStationBgImages,
  dcChargingStationProductImages,
} from "./DCChargingStation/assets.js";
import {
  dcSuperFastChargingStationImages,
  dcSuperFastChargingStationBgImages,
  dcSuperFastChargingStationProductImages,
} from "./DCSuperFastChargingStation/assets.js";
import {
  portableEvChargingImages,
  portableEvChargingBgImages,
  portableEvChargingProductImages,
} from "./PortableEVCharging/assets.js";

// Import common assets
import logoWhiteUrl from "../assets/Images/Logo_white.svg";

// =============================================================================
// HERO SECTION VIDEOS
// =============================================================================

export const heroVids = {
  heroSection: "/src/assets/Videos/HeoIntro.mp4",
};

// =============================================================================
// LOGO AND BRAND ASSETS
// =============================================================================

export const logos = {
  main: "/Logo.svg",
  white: logoWhiteUrl,
};

// =============================================================================
// HOME SECTION IMAGES
// =============================================================================

export const homeImgs = {
  logoWhite: logoWhiteUrl,
  logo: "/Logo.svg",
  evCharging: chargingCableImages.main,
};

// =============================================================================
// CHARGING IMAGES (All Categories)
// =============================================================================

export const chargingImgs = {
  stations: chargingStationImages.main,
  dcStation: dcChargingStationImages.main,
  dcSuperFast: dcSuperFastChargingStationImages.main,
  portable: portableEvChargingImages.main,
  evGeneral: chargingCableImages.main,
  productImage: chargingCableImages.main,
};

// =============================================================================
// EV CHARGING CABLES IMAGES
// =============================================================================

export const evCableImgs = {
  main: chargingCableImages.main,
  charger: chargingStationImages.main,
  cable1: chargingCableImages.cable1,
  cable2: chargingCableImages.cable2,
  cable3: chargingCableImages.cable3,
  cable4: chargingCableImages.cable4,
  cableMid: chargingCableImages.cableMid,
  cableMidRight: chargingCableImages.cableMidRight,
  cablePd1: chargingCableImages.cablePd1,
  cablePd2: chargingCableImages.cablePd2,
};

// =============================================================================
// PRODUCT IMAGES FOR PRODUCT PAGES
// =============================================================================

export const productImgs = {
  chargingCables: chargingCableImages.main,
  chargingStations: chargingStationImages.main,
  dcCharging: dcChargingStationImages.main,
  dcSuperFastCharging: dcSuperFastChargingStationImages.main,
  portableCharging: portableEvChargingImages.main,
  evCharging: chargingCableImages.main,
  charger: chargingStationImages.main,

  // EV Charging Cable variations
  evCab1: chargingCableImages.cable1,
  evCab2: chargingCableImages.cable2,
  evCab3: chargingCableImages.cable3,
  evCab4: chargingCableImages.cable4,
  evCabMid: chargingCableImages.cableMid,
  evCabMidRight: chargingCableImages.cableMidRight,
  evCabPd1: chargingCableImages.cablePd1,
  evCabPd2: chargingCableImages.cablePd2,

  // DC Charging Product Images
  dcPd1: dcChargingStationImages.dcPd1,
  dcPd2: dcChargingStationImages.dcPd2,

  // Super Fast Charging Product Images
  superFastPd1: dcSuperFastChargingStationImages.fastPd1,

  // Portable EV Charging Product Images
  portEvPd1: portableEvChargingImages.portEvPd1,

  // Station Product Images
  stationPd1: chargingStationImages.stationPd1,
  stationPd2: chargingStationImages.stationPd2,
};

// =============================================================================
// BACKGROUND IMAGES FOR TEXT BACKGROUNDS AND OVERVIEW SECTIONS
// =============================================================================

export const bgImgs = {
  evChargingCables: chargingCableBgImages.overview,
  chargingStations: chargingStationBgImages.overview,
  dcChargingStation: dcChargingStationBgImages.overview,
  dcSuperFastChargingStation: dcSuperFastChargingStationBgImages.overview,
  portableEVCharging: portableEvChargingBgImages.overview,
  evCharging: chargingCableImages.main,
};

// =============================================================================
// OVERVIEW SECTION SPECIFIC IMAGES
// =============================================================================

export const overviewImgs = {
  chargingCables: {
    main: chargingCableProductImages.main,
    feature: chargingCableProductImages.feature,
    ideal: chargingCableProductImages.ideal,
    background: chargingCableProductImages.background,
  },
  chargingStations: {
    main: chargingStationProductImages.main,
    feature: chargingStationProductImages.feature,
    ideal: chargingStationProductImages.ideal,
    background: chargingStationProductImages.background,
  },
  dcChargingStation: {
    main: dcChargingStationProductImages.main,
    feature: dcChargingStationProductImages.feature,
    ideal: dcChargingStationProductImages.ideal,
    background: dcChargingStationProductImages.background,
  },
  dcSuperFastChargingStation: {
    main: dcSuperFastChargingStationProductImages.main,
    feature: dcSuperFastChargingStationProductImages.feature,
    ideal: dcSuperFastChargingStationProductImages.ideal,
    background: dcSuperFastChargingStationProductImages.background,
  },
  portableEVCharging: {
    main: portableEvChargingProductImages.main,
    feature: portableEvChargingProductImages.feature,
    ideal: portableEvChargingProductImages.ideal,
    background: portableEvChargingProductImages.background,
  },
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get video source with error handling
 * @param {string} videoKey - Video key
 * @param {string} category - Video category (default: 'heroVids')
 * @returns {string} Video source path
 */
export const getVideoSrc = (videoKey, category = "heroVids") => {
  const videoMaps = { heroVids };
  const videoMap = videoMaps[category];

  if (!videoMap || !videoMap[videoKey]) {
    console.warn(`Video not found: ${category}.${videoKey}`);
    return "";
  }

  return videoMap[videoKey];
};

/**
 * Get image source with error handling
 * @param {string} imageKey - Image key
 * @param {string} category - Image category (default: 'homeImgs')
 * @returns {string} Image source path
 */
export const getImageSrc = (imageKey, category = "homeImgs") => {
  const imageMaps = {
    logos,
    homeImgs,
    chargingImgs,
    evCableImgs,
    productImgs,
    overviewImgs,
    bgImgs,
  };
  const imageMap = imageMaps[category];

  if (!imageMap || !imageMap[imageKey]) {
    console.warn(`Image not found: ${category}.${imageKey}`);
    return "";
  }

  return imageMap[imageKey];
};

/**
 * Preload video for better performance
 * @param {string} videoSrc - Video source path
 */
export const preloadVideo = (videoSrc) => {
  if (!videoSrc) return;

  const video = document.createElement("video");
  video.preload = "metadata";
  video.src = videoSrc;
  video.load();
};

/**
 * Preload multiple videos
 * @param {Array} videoSources - Array of video source paths
 */
export const preloadVideos = (videoSources) => {
  videoSources.forEach((src) => preloadVideo(src));
};

// =============================================================================
// HELPER EXPORTS FOR EASY ACCESS
// =============================================================================

export const EVCableImages = {
  main: evCableImgs.main,
  cable1: evCableImgs.cable1,
  cable2: evCableImgs.cable2,
  cable3: evCableImgs.cable3,
  cable4: evCableImgs.cable4,
  cableMid: evCableImgs.cableMid,
  cableMidRight: evCableImgs.cableMidRight,
  cablePd1: evCableImgs.cablePd1,
  cablePd2: evCableImgs.cablePd2,
  charger: evCableImgs.charger,
};

// =============================================================================
// COMMON EXPORTS
// =============================================================================

export const footerImage = homeImgs.footerImage || ""; // No footer image found
export const whiteLogo = logos.white;

// =============================================================================
// STRUCTURED PRODUCT ASSETS (New organized structure)
// =============================================================================

export const ProductAssets = {
  chargingCables: {
    images: chargingCableImages,
    backgrounds: chargingCableBgImages,
    products: chargingCableProductImages,
  },
  chargingStations: {
    images: chargingStationImages,
    backgrounds: chargingStationBgImages,
    products: chargingStationProductImages,
  },
  dcChargingStation: {
    images: dcChargingStationImages,
    backgrounds: dcChargingStationBgImages,
    products: dcChargingStationProductImages,
  },
  dcSuperFastChargingStation: {
    images: dcSuperFastChargingStationImages,
    backgrounds: dcSuperFastChargingStationBgImages,
    products: dcSuperFastChargingStationProductImages,
  },
  portableEVCharging: {
    images: portableEvChargingImages,
    backgrounds: portableEvChargingBgImages,
    products: portableEvChargingProductImages,
  },
};

/**
 * Get product assets by product name
 * @param {string} productName - Name of the product
 * @returns {Object} Product assets including images, backgrounds, and products
 */
export const getProductAssets = (productName) => {
  return ProductAssets[productName] || null;
};

// =============================================================================
// EXPORT ALL INDIVIDUAL PRODUCT ASSETS
// =============================================================================

export {
  chargingCableImages,
  chargingCableBgImages,
  chargingCableProductImages,
  chargingStationImages,
  chargingStationBgImages,
  chargingStationProductImages,
  dcChargingStationImages,
  dcChargingStationBgImages,
  dcChargingStationProductImages,
  dcSuperFastChargingStationImages,
  dcSuperFastChargingStationBgImages,
  dcSuperFastChargingStationProductImages,
  portableEvChargingImages,
  portableEvChargingBgImages,
  portableEvChargingProductImages,
};
