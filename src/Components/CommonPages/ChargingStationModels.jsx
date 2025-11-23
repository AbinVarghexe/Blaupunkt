import React, { useState, useEffect, useRef } from 'react'
import ImageHeader from '../Common/ImageHeader'
import ModelCard from './ModelCard'
import { Entirepagedata } from '../../Data/index.js'

// Helper function to build WhatsApp link with product inquiry
const buildWhatsAppLink = (model, categoryName = '') => {
  const WHATSAPP_NUMBER = '971558882595' // Your WhatsApp number
  const productName = model.modelCode || 'Product'
  const specs = []
  
  if (model.maximumPower) specs.push(`Power: ${model.maximumPower}`)
  if (model.current) specs.push(`Current: ${model.current}`)
  if (model.phaseType) specs.push(`Phase: ${model.phaseType}`)
  
  const specText = specs.length > 0 ? `\nSpecifications: ${specs.join(', ')}` : ''
  const message = `Hello! I'm interested in the ${productName}${categoryName ? ` from ${categoryName}` : ''}.${specText}\n\nCould you please provide more information and pricing?`
  
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}

// Simple icon components
const ChevronDownIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

const RefreshIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
)

const ChargingStationModels = ({ category }) => {
  // Filter and sorting state
  const [sortBy, setSortBy] = useState('Popularity')
  const [chargingSpeed, setChargingSpeed] = useState('All')
  const [phaseType, setPhaseType] = useState('All')

  // Dropdown menus open/close state
  const [sortByOpen, setSortByOpen] = useState(false)
  const [chargingSpeedOpen, setChargingSpeedOpen] = useState(false)
  const [phaseTypeOpen, setPhaseTypeOpen] = useState(false)
  
  // Refs for dropdown management
  const sortByRef = useRef(null)
  const chargingSpeedRef = useRef(null)
  const phaseTypeRef = useRef(null)

  // Reset filters function
  const resetFilters = () => {
    setSortBy('Popularity')
    setChargingSpeed('All')
    setPhaseType('All')
  }

  // Handle model card click - redirect to WhatsApp
  const handleModelClick = (model) => {
    const categoryData = Entirepagedata[category] || {}
    const categoryName = categoryData.title || category
    const whatsappLink = buildWhatsAppLink(model, categoryName)
    window.open(whatsappLink, '_blank')
  }

  // Get models data from the page data based on the current category
  const categoryData = Entirepagedata[category] || {}
  const modelsData = categoryData.modelsData || { sections: [] }

  // Filter function
  const filterModels = (models) => {
    return models.filter(model => {
      // Phase Type Filter
      if (phaseType !== 'All') {
        if (phaseType === 'Single Phase' && !model.phaseType?.includes('Single')) return false
        if (phaseType === 'Three Phase' && !model.phaseType?.includes('Three')) return false
      }

      // Power/Speed Filter (based on maximumPower)
      if (chargingSpeed !== 'All') {
        const power = parseFloat(model.maximumPower)
        if (chargingSpeed === 'Slow' && power > 11) return false
        if (chargingSpeed === 'Fast' && (power <= 11 || power > 22)) return false
        if (chargingSpeed === 'Rapid' && power <= 22) return false
      }

      return true
    })
  }

  // Sort function
  const sortModels = (models) => {
    const sorted = [...models]
    switch (sortBy) {
      case 'Price: Low to High':
        return sorted.sort((a, b) => parseFloat(a.maximumPower) - parseFloat(b.maximumPower))
      case 'Price: High to Low':
        return sorted.sort((a, b) => parseFloat(b.maximumPower) - parseFloat(a.maximumPower))
      case 'Newest':
        return sorted.reverse()
      default: // Popularity
        return sorted
    }
  }

  // Process sections with filtering and sorting
  const processedSections = modelsData.sections?.map(section => ({
    ...section,
    categories: section.categories?.map(cat => ({
      ...cat,
      models: sortModels(filterModels(cat.models || []))
    })).filter(cat => cat.models.length > 0) // Only show categories with models after filtering
  })).filter(section => section.categories.length > 0) // Only show sections with categories after filtering

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortByRef.current && !sortByRef.current.contains(event.target)) {
        setSortByOpen(false)
      }
      if (chargingSpeedRef.current && !chargingSpeedRef.current.contains(event.target)) {
        setChargingSpeedOpen(false)
      }
      if (phaseTypeRef.current && !phaseTypeRef.current.contains(event.target)) {
        setPhaseTypeOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className='w-full'>
      {/* Desktop Layout - Single line with heading and filters */}
      <div className='hidden lg:block relative z-40'>
        <div className='container mx-auto px-8'>
          <div className='flex flex-row items-center justify-between py-4 relative'>
            {/* Models Title with optional additional text */}
            <div className="flex items-center gap-3">
              <h2 className='text-4xl font-semibold text-gray-800'>{modelsData.title || 'Models'}</h2>
              {modelsData.additionalText && (
                <span className='text-lg text-gray-600'>{modelsData.additionalText}</span>
              )}
            </div>

            {/* All filters as dropdown buttons in a single row */}
            <div className='flex items-center gap-4 relative z-50'>
              {/* Sort By Filter */}
              <div className='relative' ref={sortByRef}>
                <button
                  className='flex items-center gap-1.5 bg-blaupunkt-primary-darker hover:bg-blaupunkt-primary text-white py-2 px-3 rounded text-sm transition-colors duration-200'
                  onClick={() => setSortByOpen(!sortByOpen)}
                >
                  <span>Sort: {sortBy}</span>
                  <ChevronDownIcon className='w-3.5 h-3.5' />
                </button>
                {/* Dropdown Menu */}
                {sortByOpen && (
                  <div className='absolute z-50 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
                    <div className='py-1' role='menu' aria-orientation='vertical'>
                      {['Popularity', 'Price: Low to High', 'Price: High to Low', 'Newest'].map(option => (
                        <button
                          key={option}
                          className={`${
                            sortBy === option
                              ? 'bg-gray-100 text-blaupunkt-primary-darker'
                              : 'text-gray-700'
                          } block w-full text-left px-4 py-2 text-sm hover:bg-gray-100`}
                          onClick={() => {
                            setSortBy(option)
                            setSortByOpen(false)
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Charging Speed Filter */}
              <div className='relative' ref={chargingSpeedRef}>
                <button
                  className='flex items-center gap-1.5 bg-blaupunkt-primary-darker hover:bg-blaupunkt-primary text-white py-2 px-3 rounded text-sm transition-colors duration-200'
                  onClick={() => setChargingSpeedOpen(!chargingSpeedOpen)}
                >
                  <span>Speed: {chargingSpeed}</span>
                  <ChevronDownIcon className='w-3.5 h-3.5' />
                </button>
                {/* Dropdown Menu */}
                {chargingSpeedOpen && (
                  <div className='absolute z-50 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
                    <div className='py-1' role='menu' aria-orientation='vertical'>
                      {['All', 'Slow', 'Fast', 'Rapid'].map(option => (
                        <button
                          key={option}
                          className={`${
                            chargingSpeed === option
                              ? 'bg-gray-100 text-blaupunkt-primary-darker'
                              : 'text-gray-700'
                          } block w-full text-left px-4 py-2 text-sm hover:bg-gray-100`}
                          onClick={() => {
                            setChargingSpeed(option)
                            setChargingSpeedOpen(false)
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Phase Type Filter */}
              <div className='relative' ref={phaseTypeRef}>
                <button
                  className='flex items-center gap-1.5 bg-blaupunkt-primary-darker hover:bg-blaupunkt-primary text-white py-2 px-3 rounded text-sm transition-colors duration-200'
                  onClick={() => setPhaseTypeOpen(!phaseTypeOpen)}
                >
                  <span>Phase: {phaseType}</span>
                  <ChevronDownIcon className='w-3.5 h-3.5' />
                </button>
                {/* Dropdown Menu */}
                {phaseTypeOpen && (
                  <div className='absolute z-50 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
                    <div className='py-1' role='menu' aria-orientation='vertical'>
                      {['All', 'Single Phase', 'Three Phase'].map(option => (
                        <button
                          key={option}
                          className={`${
                            phaseType === option
                              ? 'bg-gray-100 text-blaupunkt-primary-darker'
                              : 'text-gray-700'
                          } block w-full text-left px-4 py-2 text-sm hover:bg-gray-100`}
                          onClick={() => {
                            setPhaseType(option)
                            setPhaseTypeOpen(false)
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Reset Filters Button */}
              <button
                onClick={resetFilters}
                className='flex items-center gap-1.5 bg-gray-500 hover:bg-gray-600 text-white py-2 px-3 rounded text-sm transition-colors duration-200'
                title='Reset all filters'
              >
                <RefreshIcon className='w-3.5 h-3.5' />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Header with ImageHeader */}
      <div className='block lg:hidden'>
        <ImageHeader
          title={modelsData.title || 'Models'}
          backgroundImage={categoryData?.OverviewData?.BgImage}
          showBackgroundImage={!!categoryData?.OverviewData?.BgImage}
        />
        {modelsData.additionalText && (
          <div className='px-4 py-2'>
            <span className='text-base text-gray-700'>{modelsData.additionalText}</span>
          </div>
        )}
      </div>
      <div className='max-w-7xl mx-auto py-8 sm:py-12 lg:py-16'>
        {/* Sections */}
        <div className='space-y-16 sm:space-y-20 lg:space-y-24'>
          {processedSections?.map((section, sectionIndex) => (
            <div key={sectionIndex} className='w-full'>
              {/* Section Title */}
              <div className='mb-8 sm:mb-12 lg:mb-16 px-4 sm:px-6 lg:px-8'>
                <h2 className='text-2xl sm:text-3xl lg:text-4xl font-semibold text-blaupunkt-dark mb-4 sm:mb-6'>
                  {section.name}
                </h2>
              </div>
              {/* Categories within section */}
              <div className='space-y-16 sm:space-y-24 lg:space-y-32'>
                {section.categories?.map((category, categoryIndex) => (
                  <div key={categoryIndex} className='w-full'>
                    {/* Category Header */}
                    <div className='mb-6 sm:mb-8 lg:mb-9 px-4 sm:px-6 lg:px-8'>
                      <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2'>
                        <h3 className='text-blaupunkt-primary-darker font-semibold text-lg sm:text-xl lg:text-2xl'>
                          {category.name}
                        </h3>
                        <p className='text-gray-700 sm:ml-2 text-base sm:text-lg lg:text-xl font-normal'>
                          {category.description}
                        </p>
                      </div>
                    </div>
                    {/* Models Grid */}
                    <div className='flex overflow-x-auto scrollbar-hide gap-4 pb-4 pl-4 pr-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6 lg:gap-8 sm:px-6 lg:px-8'>
                      {category.models?.map((model, modelIndex) => (
                        <div key={modelIndex} className='flex-shrink-0 w-72 sm:w-auto'>
                          <ModelCard
                            image={model.image}
                            modelCode={model.modelCode}
                            model={model}
                            onClick={handleModelClick}
                            customFields={[
                              { label: 'Maximum Power', value: model.maximumPower },
                              { label: 'Current', value: model.current },
                              section.name === 'Stations With Socket' 
                                ? { label: 'Socket Type', value: model.socketType }
                                : { label: 'Cable Length', value: model.cableLength },
                              { label: 'Phase Type', value: model.phaseType }
                            ]}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChargingStationModels
