/* eslint-disable */
import React from 'react'
import { FiFilter } from 'react-icons/fi'
import { motion } from 'framer-motion'
import MobileFilters from './MobileFilters'
import DesktopFilters from './DesktopFilters'

/**
 * FiltersContainer Component - Container for both mobile and desktop filters
 */
const FiltersContainer = ({
  showMobileFilters,
  setShowMobileFilters,
  sortBy,
  setSortBy,
  productType,
  setProductType,
  chargingSpeed,
  setChargingSpeed,
  connectorType,
  setConnectorType,
  phaseType,
  setPhaseType,
  productsPerPage,
  setProductsPerPage
}) => {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 relative z-30'>
      {/* Mobile Filter Button */}
      <div className='lg:hidden mb-4 flex justify-end'>
        <motion.button
          onClick={() => setShowMobileFilters(true)}
          className='border-2 border-blaupunkt-primary-darker text-blaupunkt-primary-darker bg-transparent px-4 py-2 rounded-lg font-myriad text-sm font-normal flex items-center gap-2  hover:bg-blaupunkt-primary-darker hover:text-white transition-colors'
          aria-label="Open filters panel"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <FiFilter className='w-5 h-5' />
          <span>Filters</span>
        </motion.button>
      </div>

      {/* Mobile Filters */}
      <MobileFilters
        showMobileFilters={showMobileFilters}
        setShowMobileFilters={setShowMobileFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
        productType={productType}
        setProductType={setProductType}
        chargingSpeed={chargingSpeed}
        setChargingSpeed={setChargingSpeed}
        connectorType={connectorType}
        setConnectorType={setConnectorType}
        phaseType={phaseType}
  setPhaseType={setPhaseType}
  productsPerPage={productsPerPage}
  setProductsPerPage={setProductsPerPage}
      />

      {/* Desktop Filters */}
      <DesktopFilters
        sortBy={sortBy}
        setSortBy={setSortBy}
        productType={productType}
        setProductType={setProductType}
        chargingSpeed={chargingSpeed}
        setChargingSpeed={setChargingSpeed}
        connectorType={connectorType}
        setConnectorType={setConnectorType}
        phaseType={phaseType}
        setPhaseType={setPhaseType}
      />
    </div>
  )
}

export default FiltersContainer
