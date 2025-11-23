import React, { useState, useEffect, useRef, useMemo } from 'react'
import ImageHeader from '../Common/ImageHeader'
import FiltersContainer from '../Products/FiltersContainer'
import ModelCard from './ModelCard'
import { Entirepagedata } from '../../Data/index.js'
import { chargingStationsConfig } from '../../Data/ChargingStations/index.js'
import { chargingCablesConfig } from '../../Data/ChargingCables/index.js'
import { dcChargingStationConfig } from '../../Data/DCChargingStation/index.js'
import { dcSuperFastChargingStationConfig } from '../../Data/DCSuperFastChargingStation/index.js'
import { portableEvChargingConfig } from '../../Data/PortableEVCharging/index.js'
// import { filterProducts } from '../../utils/productExclusions.js' // TODO: Fix import issue
import { createLogger } from '../../utils/logger'

const logger = createLogger('Models')

// Helper function to build WhatsApp link with product inquiry
const buildWhatsAppLink = (model, categoryName = '') => {
  const WHATSAPP_NUMBER = '971558882595' // Your WhatsApp number
  const productName = model.modelCode || model.name || 'Product'
  const specs = []
  
  if (model.maximumPower) specs.push(`Power: ${model.maximumPower}`)
  if (model.current || model.ratedCurrent) specs.push(`Current: ${model.current || model.ratedCurrent}`)
  if (model.phaseType || model.phase) specs.push(`Phase: ${model.phaseType || model.phase}`)
  if (model.cableLength) specs.push(`Cable Length: ${model.cableLength}`)
  
  const specText = specs.length > 0 ? `\nSpecifications: ${specs.join(', ')}` : ''
  const message = `Hello! I'm interested in the ${productName}${categoryName ? ` from ${categoryName}` : ''}.${specText}\n\nCould you please provide more information and pricing?`
  
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}

// Simple icon components
const ChevronDownIcon = ({ className }) => (
  <svg
    className={className}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M19 9l-7 7-7-7'
    />
  </svg>
)

const RefreshIcon = ({ className }) => (
  <svg
    className={className}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
    />
  </svg>
)

const Models = ({ productImage, category, modelsData: propModelsData }) => {
  // Filter and sorting state
  const [sortBy, setSortBy] = useState('Popularity')
  const [productType, setProductType] = useState('All')
  const [chargingSpeed, setChargingSpeed] = useState('All')
  const [connectorType, setConnectorType] = useState('All')
  const [phaseType, setPhaseType] = useState('All')
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Reset filters function
  const resetFilters = () => {
    setSortBy('Popularity')
    setProductType('All')
    setChargingSpeed('All')
    setConnectorType('All')
    setPhaseType('All')
  }

  // Handle model card click - redirect to WhatsApp
  const handleModelClick = (model) => {
    const categoryData = Entirepagedata[category] || {}
    const categoryName = categoryData.title || category
    const whatsappLink = buildWhatsAppLink(model, categoryName)
    window.open(whatsappLink, '_blank')
  }

  // Dropdown menus open/close state
  const [sortByOpen, setSortByOpen] = useState(false)
  const [productTypeOpen, setProductTypeOpen] = useState(false)
  const [chargingSpeedOpen, setChargingSpeedOpen] = useState(false)
  const [connectorTypeOpen, setConnectorTypeOpen] = useState(false)
  const [phaseTypeOpen, setPhaseTypeOpen] = useState(false)

  // Group models by section (for charging cables) or length
  const groupModelsByCableLength = models => {
    const groups = {}

    if (!models || models.length === 0) return groups

    models.forEach(model => {
      // Use the section property if available (for charging cables)
      if (model.section) {
        const sectionKey = model.section

        // Initialize the group if it doesn't exist
        if (!groups[sectionKey]) {
          groups[sectionKey] = []
        }

        // Add the model to its group
        groups[sectionKey].push(model)
        return
      }

      // Fallback to cable length if section is not available
      const cableLengthValue =
        model.cableLength || model.dimensions || model.length || ''

      // Extract just the numeric value with unit (e.g., "2 Meters")
      let lengthKey = 'Other'

      if (cableLengthValue) {
        // Try to extract the length value (e.g., "2 Meters" -> "2 Meter")
        const match = cableLengthValue.toString().match(/(\d+)\s*([A-Za-z]+)/)
        if (match) {
          const value = match[1]
          const unit = match[2].toLowerCase().startsWith('meter')
            ? 'Meter'
            : match[2]
          lengthKey = `${value} ${unit}`

          // Standardize to singular form for consistency in headers
          if (unit.toLowerCase().endsWith('s')) {
            lengthKey = `${value} ${unit.substring(0, unit.length - 1)}`
          }
        }
      }

      // Initialize the group if it doesn't exist
      if (!groups[lengthKey]) {
        groups[lengthKey] = []
      }

      // Add the model to its group
      groups[lengthKey].push(model)
    })

    return groups
  }

  // Group models by category (Basic, Smart, etc.)
  const groupModelsByCategory = models => {
    const groups = {}

    if (!models || models.length === 0) return groups

    models.forEach(model => {
      // Extract the category - could be stored in different properties
      const categoryValue = model.category || model.type || 'Basic'

      // Use default category if none specified
      const categoryKey = categoryValue || 'Basic'

      // Initialize the group if it doesn't exist
      if (!groups[categoryKey]) {
        groups[categoryKey] = []
      }

      // Add the model to its category group
      groups[categoryKey].push(model)
    })

    // Ensure "Basic" category comes first if it exists
    const orderedGroups = {}
    if (groups['Basic']) orderedGroups['Basic'] = groups['Basic']
    if (groups['Smart']) orderedGroups['Smart'] = groups['Smart']
    if (groups['Full']) orderedGroups['Full'] = groups['Full']

    // Add any other categories
    Object.keys(groups).forEach(key => {
      if (key !== 'Basic' && key !== 'Smart' && key !== 'Full') {
        orderedGroups[key] = groups[key]
      }
    })
    return orderedGroups
  }
  // Get models background image based on category
  const getModelsBackgroundImage = category => {
    try {
      switch (category) {
        case 'chargingCables':
          return chargingCablesConfig.backgroundImages?.evmodelbg
        case 'chargingStations':
          return chargingStationsConfig.backgroundImages?.overview
        case 'dcChargingStation':
          return dcChargingStationConfig.backgroundImages?.dccharoverbg
        case 'dcSuperFastChargingStation':
          return dcSuperFastChargingStationConfig.backgroundImages?.overview
        case 'portableEVCharging':
          return portableEvChargingConfig.backgroundImages?.overview
        default:
          return '/src/assets/Images/charger.jpg' // Fallback image
      }
    } catch (error) {
      logger.error('Error getting models background image:', error)
      return '/src/assets/Images/charger.jpg' // Fallback image
    }
  }

  // Get models data from the page data based on the current category
  const modelsData = useMemo(() => {
    // If modelsData is provided as prop, use it directly
    if (propModelsData) {
      // If it's an object with models property, use it as-is (preserves groupingMethod, sections, etc.)
      if (propModelsData.models && Array.isArray(propModelsData.models)) {
        return propModelsData
      }
      // If it's just an array, wrap it with default properties
      if (Array.isArray(propModelsData)) {
        return {
          models: propModelsData,
          groupingMethod: 'category',
          additionalText: ''
        }
      }
    }

    // Get models data based on category with error handling
    try {
      let pageData
      switch (category) {
        case 'chargingCables':
          pageData = Entirepagedata.chargingCables
          return {
            ...(pageData?.modelsData || { models: [] }),
            groupingMethod: pageData?.modelsData?.groupingMethod || 'length',
            additionalText: pageData?.modelsData?.additionalText || ''
          }
        case 'chargingStations':
          pageData = Entirepagedata.chargingStations
          return {
            ...(pageData?.modelsData || { models: [] }),
            groupingMethod: pageData?.modelsData?.groupingMethod || 'category',
            additionalText: pageData?.modelsData?.additionalText || ''
          }
        case 'dcChargingStation':
          pageData = Entirepagedata.dcChargingStation
          return {
            ...(pageData?.modelsData || { models: [] }),
            groupingMethod: pageData?.modelsData?.groupingMethod || 'category',
            additionalText: pageData?.modelsData?.additionalText || ''
          }
        case 'dcSuperFastChargingStation':
          pageData = Entirepagedata.dcSuperFastChargingStation
          return {
            ...(pageData?.modelsData || { models: [] }),
            groupingMethod: pageData?.modelsData?.groupingMethod || 'category',
            additionalText: pageData?.modelsData?.additionalText || ''
          }
        case 'portableEVCharging':
          pageData = Entirepagedata.portableEVCharging
          return {
            ...(pageData?.modelsData || { models: [] }),
            groupingMethod: pageData?.modelsData?.groupingMethod || 'category',
            additionalText: pageData?.modelsData?.additionalText || ''
          }
        default:
          return {
            models: [],
            groupingMethod: 'length',
            additionalText: ''
          }
      }
    } catch (error) {
      logger.error('Error getting models data:', error)
      return {
        models: [],
        groupingMethod: 'length',
        additionalText: ''
      }
    }
  }, [category, propModelsData])

  // Apply product exclusions to models data
  const filteredModelsData = useMemo(() => {
    if (!modelsData.models || !Array.isArray(modelsData.models)) {
      return modelsData
    }

    return {
      ...modelsData,
      models: modelsData.models // TODO: Apply filterProducts when import is fixed
    }
  }, [modelsData])

  const [filteredModels, setFilteredModels] = useState(filteredModelsData.models || [])
  const [groupedModels, setGroupedModels] = useState({})

  // Update filtered models when modelsData changes
  useEffect(() => {
    setFilteredModels(filteredModelsData.models || [])
  }, [filteredModelsData])

  // The grouping method is taken directly from modelsData

  // Update grouped models when filtered models change or grouping method changes
  useEffect(() => {
    if (
      filteredModelsData.groupingMethod === 'none' ||
      category === 'dcChargingStation' ||
      category === 'portableEVCharging'
    ) {
      // For 'none' grouping or specific categories, put all models under a single key to avoid categories
      setGroupedModels({ '': filteredModels })
    } else if (filteredModelsData.groupingMethod === 'category') {
      setGroupedModels(groupModelsByCategory(filteredModels))
    } else if (filteredModelsData.groupingMethod === 'section') {
      setGroupedModels(groupModelsByCableLength(filteredModels))
    } else {
      setGroupedModels(groupModelsByCableLength(filteredModels))
    }
  }, [filteredModels, filteredModelsData.groupingMethod, category])

  // Get unique filter options from current models data using useMemo
  const { connectorTypes, phaseTypes } = useMemo(() => {
    const models = filteredModelsData.models || []

    const connectorTypes = [
      'All',
      ...new Set(
        models
          .map(model => {
            // Prefer explicit connector type; for DC stations, fall back to connectorPin
            return (
              model.connectorType ||
              model.connector ||
              (category === 'dcChargingStation' ? model.connectorPin : undefined)
            )
          })
          .filter(Boolean)
      )
    ]

    const phaseTypes = [
      'All',
      ...new Set(
        models.map(model => model.phaseType || model.phase).filter(Boolean)
      )
    ]

    return { connectorTypes, phaseTypes }
  }, [filteredModelsData.models, category])

  // Filter models based on current filters
  useEffect(() => {
    setIsLoading(true)

    // Add a small delay to show loading state for better UX
    const filterTimeout = setTimeout(() => {
      let filtered = modelsData.models || []

      // Apply product type filter (for multi-category filtering)
      if (productType !== 'All') {
        switch (productType) {
          case 'Charging Cables':
            // Only show if current category is charging cables
            if (category !== 'chargingCables') {
              filtered = []
            }
            break
          case 'Charging Stations':
            // Only show if current category is charging stations
            if (
              ![
                'chargingStations',
                'dcChargingStation',
                'dcSuperFastChargingStation',
                'portableEVCharging'
              ].includes(category)
            ) {
              filtered = []
            }
            break
          case 'Portable Chargers':
            // Only show if current category is portable charging
            if (category !== 'portableEVCharging') {
              filtered = []
            }
            break
        }
      }

      // Apply connector type filter
      if (connectorType !== 'All') {
        filtered = filtered.filter(model => {
          const modelConnectorType =
            model.connectorType ||
            model.connector ||
            (category === 'dcChargingStation' ? model.connectorPin : '') ||
            ''
          return modelConnectorType
            .toLowerCase()
            .includes(connectorType.toLowerCase().replace('type ', ''))
        })
      }

      // Apply phase type filter
      if (phaseType !== 'All') {
        filtered = filtered.filter(model => {
          const modelPhaseType = model.phaseType || model.phase || ''
          return modelPhaseType
            .toLowerCase()
            .includes(
              phaseType
                .toLowerCase()
                .replace(' phase', '')
                .replace('-', '')
                .trim()
            )
        })
      }

      // Apply charging speed filter
      if (chargingSpeed !== 'All') {
        filtered = filtered.filter(model => {
          // Use ratedCurrent/current; for DC stations also consider ratedPower
          const current = parseInt(
            (model.current || model.ratedCurrent || '').toString()
              .replace(/[^\d]/g, '') || '0'
          )
          const power = parseInt(
            (model.power || model.maxPower || model.ratedPower || '')
              .toString()
              .replace(/[^\d]/g, '') || '0'
          )

          switch (chargingSpeed) {
            case 'Slow':
              return current <= 16 || power <= 11
            case 'Fast':
              return (
                (current > 16 && current <= 32) || (power > 11 && power <= 22)
              )
            case 'Rapid':
              return current > 32 || power > 22
            default:
              return true
          }
        })
      }

      // Sort by the selected criteria
      switch (sortBy) {
        case 'Price: Low to High':
          // Sort by current (lower current = lower price typically)
          filtered.sort((a, b) => {
            const currentA = parseInt(a.current || a.ratedCurrent || '0')
            const currentB = parseInt(b.current || b.ratedCurrent || '0')
            return currentA - currentB
          })
          break
        case 'Price: High to Low':
          // Sort by current (higher current = higher price typically)
          filtered.sort((a, b) => {
            const currentA = parseInt(a.current || a.ratedCurrent || '0')
            const currentB = parseInt(b.current || b.ratedCurrent || '0')
            return currentB - currentA
          })
          break
        case 'Newest':
          // Sort by model code (assuming newer models have higher codes)
          filtered.sort((a, b) => {
            if (a.popular && !b.popular) return -1
            if (!a.popular && b.popular) return 1
            const modelCodeA = a.modelCode || a.name || ''
            const modelCodeB = b.modelCode || b.name || ''
            return modelCodeB.localeCompare(modelCodeA)
          })
          break
        default: // Popularity
          filtered.sort((a, b) => {
            if (a.popular && !b.popular) return -1
            if (!a.popular && b.popular) return 1
            return 0
          })
      }

      setFilteredModels(filtered)
      setIsLoading(false)
    }, 200)

    return () => clearTimeout(filterTimeout)
  }, [
    modelsData.models,
    sortBy,
    productType,
    chargingSpeed,
    connectorType,
    phaseType,
    category
  ])

  // Close dropdowns when clicking outside
  const dropdownRefs = {
    sortBy: useRef(null),
    productType: useRef(null),
    chargingSpeed: useRef(null),
    connectorType: useRef(null),
    phaseType: useRef(null)
  }

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        sortByOpen &&
        dropdownRefs.sortBy.current &&
        !dropdownRefs.sortBy.current.contains(event.target)
      ) {
        setSortByOpen(false)
      }
      if (
        productTypeOpen &&
        dropdownRefs.productType.current &&
        !dropdownRefs.productType.current.contains(event.target)
      ) {
        setProductTypeOpen(false)
      }
      if (
        chargingSpeedOpen &&
        dropdownRefs.chargingSpeed.current &&
        !dropdownRefs.chargingSpeed.current.contains(event.target)
      ) {
        setChargingSpeedOpen(false)
      }
      if (
        connectorTypeOpen &&
        dropdownRefs.connectorType.current &&
        !dropdownRefs.connectorType.current.contains(event.target)
      ) {
        setConnectorTypeOpen(false)
      }
      if (
        phaseTypeOpen &&
        dropdownRefs.phaseType.current &&
        !dropdownRefs.phaseType.current.contains(event.target)
      ) {
        setPhaseTypeOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [
    sortByOpen,
    productTypeOpen,
    chargingSpeedOpen,
    connectorTypeOpen,
    phaseTypeOpen,
    dropdownRefs.sortBy,
    dropdownRefs.productType,
    dropdownRefs.chargingSpeed,
    dropdownRefs.connectorType,
    dropdownRefs.phaseType
  ])

  return (
    <div className='w-full py-6'>
      {/* Header and Filters Container */}
      <div className='w-full'>
        {/* Mobile Layout - Stacked */}
        <div className='block lg:hidden'>
          <div>
            {' '}
            <ImageHeader
              title='Models'
              backgroundImage={getModelsBackgroundImage(category)}
              showBackgroundImage={true}
              textColor={{
                mobile: 'text-white',
                desktop: 'text-gray-800'
              }}
              className='font-semibold md:text-left px-40'
              desktopClassName='py-0'
              mobileClassName='py-0'
            />
            {modelsData.additionalText && (
              <div className='px-4 py-2'>
                <span className='text-base text-gray-700'>
                  {modelsData.additionalText}
                </span>
              </div>
            )}
          </div>

          {/* Filters */}
          <FiltersContainer
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
          />
        </div>

        {/* Desktop Layout - Single line with heading and filters */}
        <div className='hidden lg:block relative z-40'>
          <div className='container mx-auto px-8'>
            <div className='flex flex-row items-center justify-between py-4 relative'>
              {/* Models Title with optional additional text */}
              <div className='flex items-center gap-3'>
                <h2 className='text-4xl font-semibold text-gray-800'>Models</h2>
                {modelsData.additionalText && (
                  <span className='text-lg text-gray-600'>
                    {modelsData.additionalText}
                  </span>
                )}
              </div>

              {/* All filters as dropdown buttons in a single row */}
              <div className='flex items-center gap-4 relative z-50'>
                {/* Sort By Filter */}
                <div className='relative' ref={dropdownRefs.sortBy}>
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
                      <div
                        className='py-1'
                        role='menu'
                        aria-orientation='vertical'
                      >
                        {[
                          'Popularity',
                          'Price: Low to High',
                          'Price: High to Low',
                          'Newest'
                        ].map(option => (
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

                {/* Product Type Filter */}
                <div className='relative' ref={dropdownRefs.productType}>
                  <button
                    className='flex items-center gap-1.5 bg-blaupunkt-primary-darker hover:bg-blaupunkt-primary text-white py-2 px-3 rounded text-sm transition-colors duration-200'
                    onClick={() => setProductTypeOpen(!productTypeOpen)}
                  >
                    <span>Type: {productType}</span>
                    <ChevronDownIcon className='w-3.5 h-3.5' />
                  </button>
                  {/* Dropdown Menu */}
                  {productTypeOpen && (
                    <div className='absolute z-50 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
                      <div
                        className='py-1'
                        role='menu'
                        aria-orientation='vertical'
                      >
                        {[
                          'All',
                          'Charging Stations',
                          'Charging Cables',
                          'Portable Chargers'
                        ].map(option => (
                          <button
                            key={option}
                            className={`${
                              productType === option
                                ? 'bg-gray-100 text-blaupunkt-primary-darker'
                                : 'text-gray-700'
                            } block w-full text-left px-4 py-2 text-sm hover:bg-gray-100`}
                            onClick={() => {
                              setProductType(option)
                              setProductTypeOpen(false)
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
                <div className='relative' ref={dropdownRefs.chargingSpeed}>
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
                      <div
                        className='py-1'
                        role='menu'
                        aria-orientation='vertical'
                      >
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

                {/* Connector Type Filter */}
                <div className='relative' ref={dropdownRefs.connectorType}>
                  <button
                    className='flex items-center gap-1.5 bg-blaupunkt-primary-darker hover:bg-blaupunkt-primary text-white py-2 px-3 rounded text-sm transition-colors duration-200'
                    onClick={() => setConnectorTypeOpen(!connectorTypeOpen)}
                  >
                    <span>Connector: {connectorType}</span>
                    <ChevronDownIcon className='w-3.5 h-3.5' />
                  </button>
                  {/* Dropdown Menu */}
                  {connectorTypeOpen && (
                    <div className='absolute z-50 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
                      <div
                        className='py-1'
                        role='menu'
                        aria-orientation='vertical'
                      >
                        {connectorTypes.map(option => (
                          <button
                            key={option}
                            className={`${
                              connectorType === option
                                ? 'bg-gray-100 text-blaupunkt-primary-darker'
                                : 'text-gray-700'
                            } block w-full text-left px-4 py-2 text-sm hover:bg-gray-100`}
                            onClick={() => {
                              setConnectorType(option)
                              setConnectorTypeOpen(false)
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
                <div className='relative' ref={dropdownRefs.phaseType}>
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
                      <div
                        className='py-1'
                        role='menu'
                        aria-orientation='vertical'
                      >
                        {phaseTypes.map(option => (
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
                  className='flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded text-sm transition-colors duration-200'
                >
                  <RefreshIcon className='w-3.5 h-3.5' />
                  Reset
                </button>
              </div>
            </div>

            {/* No view toggle, always use grouped view */}
          </div>

          {/* Hidden FiltersContainer to maintain state but not show the default UI */}
          <div className='hidden'>
            <FiltersContainer
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
            />
          </div>
        </div>
      </div>      {/* Product Grid */}
      <div className='container mx-auto py-8'>
        {' '}
        {isLoading ? (
          <div className={`grid gap-6 px-8 ${
            // Use custom grid layout for dcSuperFastChargingStation if configured
            category === 'dcSuperFastChargingStation' && modelsData.sectionConfig?.gridLayout 
              ? `${modelsData.sectionConfig.gridLayout.mobile || 'grid-cols-1'} md:${modelsData.sectionConfig.gridLayout.tablet || 'grid-cols-2'} lg:${modelsData.sectionConfig.gridLayout.desktop || 'grid-cols-3'}`
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          } overflow-hidden`}>
            {[...Array(8)].map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className='animate-pulse w-full overflow-hidden'
              >
                <div className='bg-gray-200 rounded-xl aspect-square mb-4'></div>
                <div className='space-y-2'>
                  <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                  <div className='h-3 bg-gray-200 rounded w-full'></div>
                  <div className='h-3 bg-gray-200 rounded w-5/6'></div>
                  <div className='h-3 bg-gray-200 rounded w-4/5'></div>
                </div>
              </div>
            ))}
          </div>        ) : filteredModels && filteredModels.length > 0 ? (
          <>
            <div className='mb-4 text-gray-600 px-8'>
              Showing {filteredModels.length} of{' '}
              {modelsData.models?.length || 0} models
            </div>

            {/* Always show Grouped View */}
            {Object.keys(groupedModels).length > 0 ? (
              <div className='space-y-12'>
                {Object.entries(groupedModels)
                  .sort(([keyA], [keyB]) => {
                    // For cable length or section, sort numerically
                    if (
                      filteredModelsData.groupingMethod === 'length' ||
                      filteredModelsData.groupingMethod === 'section'
                    ) {
                      const numA = parseInt(keyA.match(/^\d+/) || '999')
                      const numB = parseInt(keyB.match(/^\d+/) || '999')
                      return numA - numB
                    }
                    // For categories, keep the order (already sorted in groupModelsByCategory)
                    return 0
                  })
                  .map(([groupKey, models]) => (
                    <div
                      key={groupKey}
                      className={`${
                        category === 'dcChargingStation' ||
                        category === 'dcSuperFastChargingStation' ||
                        category === 'portableEVCharging'
                          ? ''
                          : 'mb-8'
                      }`}
                    >
                      {/* Category or Cable Length/Section Heading - Show for sectioned dcSuperFastChargingStation */}
                      {groupKey !== '' &&
                        !(
                          category === 'dcChargingStation' ||
                          category === 'portableEVCharging'
                        ) && (
                          <div className='flex items-baseline gap-3 mb-6 border-b border-gray-200 pb-2 px-8'>
                            <h2 className='text-2xl font-semibold text-blaupunkt-primary-darker'>
                              {groupKey}
                            </h2>
                            {category === 'chargingStations' &&
                              modelsData.categoryDescriptions && (
                                <span className='text-base text-gray-700 font-normal'>
                                  {modelsData.categoryDescriptions[groupKey]}
                                </span>
                              )}
                            {category === 'dcSuperFastChargingStation' &&
                              modelsData.sections && (
                                <span className='text-base text-gray-700 font-normal'>
                                  {modelsData.sections.find(s => s.name === groupKey)?.description}
                                </span>
                              )}
                          </div>
                        )}
                      {/* Products Grid for this category */}
                      <div className={`grid gap-6 px-8 ${
                        // Use custom grid layout for dcSuperFastChargingStation if configured
                        category === 'dcSuperFastChargingStation' && modelsData.sectionConfig?.gridLayout 
                          ? `${modelsData.sectionConfig.gridLayout.mobile || 'grid-cols-1'} md:${modelsData.sectionConfig.gridLayout.tablet || 'grid-cols-2'} lg:${modelsData.sectionConfig.gridLayout.desktop || 'grid-cols-3'}`
                          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                      } auto-rows-fr overflow-hidden`}>
                        {models.map((model, index) => (
                          <div
                            key={
                              model.modelCode ||
                              model.name ||
                              `model-${groupKey}-${index}`
                            }
                            className='w-full overflow-hidden'
                          >
                            <ModelCard
                              image={model.image || productImage}
                              modelCode={
                                model.modelCode ||
                                model.name ||
                                `Model ${index + 1}`
                              }
                              model={model}
                              onClick={handleModelClick}
                              connectorType={
                                model.connectorType || model.connector || 'N/A'
                              }
                              current={
                                model.current ||
                                model.ratedCurrent ||
                                model.amperage ||
                                'N/A'
                              }
                              cableLength={
                                model.cableLength ||
                                model.dimensions ||
                                model.length ||
                                'N/A'
                              }
                              ipClass={
                                model.ipClass ||
                                model.protection ||
                                model.ipRating ||
                                'N/A'
                              }
                              phaseType={
                                model.phaseType ||
                                model.phase ||
                                model.phases ||
                                'N/A'
                              }
                              customFields={
                                category === 'dcSuperFastChargingStation' ? [
                                  { label: 'Maximum Power', value: model.maximumPower || 'N/A' },
                                  { label: 'Connector Type', value: model.connectorType || 'N/A' },
                                  { label: 'Output Voltage', value: model.outputVoltage || 'N/A' },
                                  { label: 'Output Current', value: model.outputCurrent || 'N/A' },
                                  { label: 'Dimensions', value: model.dimensions || 'N/A' },
                                  { label: 'Weight', value: model.weight || 'N/A' },
                                  { label: 'Operating Temp', value: model.operatingTemp || 'N/A' },
                                  { label: 'Storage Temp', value: model.storageTemp || 'N/A' },
                                  { label: 'Protection Rating', value: model.protectionRating || 'N/A' },
                                  { label: 'Installation', value: model.installation || 'N/A' },
                                  { label: 'Start Mode', value: model.startMode || 'N/A' },
                                  { label: 'Communication', value: model.communication || 'N/A' },
                                  { label: 'Input Voltage', value: model.inputVoltage || 'N/A' },
                                  { label: 'Input Frequency', value: model.inputFrequency || 'N/A' },
                                  { label: 'Work Altitude', value: model.workAltitude || 'N/A' },
                                  { label: 'Charging Ports', value: model.chargingPorts || 'N/A' }
                                ] : category === 'dcChargingStation' ? [
                                  { label: 'Model Code', value: model.modelCode || 'N/A' },
                                  { label: 'Rated Power', value: model.ratedPower || 'N/A' },
                                  { label: 'Rated Current', value: model.ratedCurrent || 'N/A' },
                                  { label: 'Connector Pin', value: model.connectorPin || 'N/A' }
                                ] : null
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              /* Fallback to standard view if grouping doesn't work */
              <div className={`grid gap-6 px-8 ${
                // Use custom grid layout for dcSuperFastChargingStation if configured
                category === 'dcSuperFastChargingStation' && modelsData.sectionConfig?.gridLayout 
                  ? `${modelsData.sectionConfig.gridLayout.mobile || 'grid-cols-1'} md:${modelsData.sectionConfig.gridLayout.tablet || 'grid-cols-2'} lg:${modelsData.sectionConfig.gridLayout.desktop || 'grid-cols-3'}`
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              } auto-rows-fr overflow-hidden`}>
                {filteredModels.map((model, index) => (
                  <div
                    key={model.modelCode || model.name || `model-${index}`}
                    className='w-full overflow-hidden'
                  >
                    <ModelCard
                      image={model.image || productImage}
                      modelCode={
                        model.modelCode || model.name || `Model ${index + 1}`
                      }
                      model={model}
                      onClick={handleModelClick}
                      connectorType={
                        model.connectorType || model.connector || 'N/A'
                      }
                      current={
                        model.current ||
                        model.ratedCurrent ||
                        model.amperage ||
                        'N/A'
                      }
                      cableLength={
                        model.cableLength ||
                        model.dimensions ||
                        model.length ||
                        'N/A'
                      }
                      ipClass={
                        model.ipClass ||
                        model.protection ||
                        model.ipRating ||
                        'N/A'
                      }
                      phaseType={
                        model.phaseType || model.phase || model.phases || 'N/A'
                      }
                      customFields={
                        category === 'dcSuperFastChargingStation' ? [
                          { label: 'Maximum Power', value: model.maximumPower || 'N/A' },
                          { label: 'Connector Type', value: model.connectorType || 'N/A' },
                          { label: 'Output Voltage', value: model.outputVoltage || 'N/A' },
                          { label: 'Output Current', value: model.outputCurrent || 'N/A' },
                          { label: 'Dimensions', value: model.dimensions || 'N/A' },
                          { label: 'Weight', value: model.weight || 'N/A' },
                          { label: 'Operating Temp', value: model.operatingTemp || 'N/A' },
                          { label: 'Storage Temp', value: model.storageTemp || 'N/A' },
                          { label: 'Protection Rating', value: model.protectionRating || 'N/A' },
                          { label: 'Installation', value: model.installation || 'N/A' },
                          { label: 'Start Mode', value: model.startMode || 'N/A' },
                          { label: 'Communication', value: model.communication || 'N/A' },
                          { label: 'Input Voltage', value: model.inputVoltage || 'N/A' },
                          { label: 'Input Frequency', value: model.inputFrequency || 'N/A' },
                          { label: 'Work Altitude', value: model.workAltitude || 'N/A' },
                          { label: 'Charging Ports', value: model.chargingPorts || 'N/A' }
                        ] : category === 'dcChargingStation' ? [
                          { label: 'Model Code', value: model.modelCode || 'N/A' },
                          { label: 'Rated Power', value: model.ratedPower || 'N/A' },
                          { label: 'Rated Current', value: model.ratedCurrent || 'N/A' },
                          { label: 'Connector Pin', value: model.connectorPin || 'N/A' }
                        ] : null
                      }
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className='text-center py-12 px-8'>
            <div className='mb-4'>
              <svg
                className='w-16 h-16 text-gray-300 mx-auto'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1}
                  d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                />
              </svg>
            </div>
            <p className='text-gray-500 text-lg mb-2'>
              No models found matching your criteria
            </p>
            <p className='text-gray-400 text-sm'>
              Try adjusting your filters to see more results
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Models
