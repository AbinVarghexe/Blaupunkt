import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { whiteLogo } from '../../Data/assets.js'
import { FiChevronDown } from 'react-icons/fi'

const REGIONS = [
  'International',
  'العربية (Arabic)',
  'Asia',
  'Australia',
  'Belgium',
  'China',
  'Eastern Europe',
  'France',
  'Germany',
  'India',
  'Latin America',
  'Middle East',
  'Netherlands',
  'Poland',
  'South Africa',
  'Spain',
  'Taiwan',
  'Thailand',
  'Türkiye',
  'United States',
  '대한민국 (South Korea)'
]

const FOOTER_LINKS = [
  { to: '/', text: 'International', external: false },
  { to: '/products?search=', text: 'Search', external: false },
  { to: 'https://blaupunkt.com/privacy-statement/?ls=1', text: 'Privacy Statement', external: true },
  { to: 'https://blaupunkt.com/imprint/', text: 'Imprint', external: true }
]

const Footer = () => {
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState('International')

  const toggleDropdown = () => setIsRegionDropdownOpen(!isRegionDropdownOpen)

  const selectRegion = regionName => {
    setSelectedRegion(regionName)
    setIsRegionDropdownOpen(false)
  }
  const getRegionButtonClass = (region, isSelected) => {
    const baseClass =
      'w-full px-3 py-1 text-left text-sm text-blaupunkt-secondary-light font-myriad transition-all duration-200 ease-in-out hover:bg-gray-700 hover:text-white hover:shadow-md'
    return isSelected ? `${baseClass} bg-gray-600` : baseClass
  }
  const RegionSelector = ({ isMobile = false }) => (
    <div className='flex flex-col'>
      <span
        className={`font-normal mb-2 text-blaupunkt-secondary-light font-myriad ${
          isMobile ? 'text-sm' : 'text-sm'
        }`}
      >
        Select region:
      </span>
      <div className='relative'>
        <button
          onClick={toggleDropdown}
          className={`flex items-center justify-between px-4 py-2 border border-blaupunkt-secondary-light text-blaupunkt-secondary-light rounded-lg bg-transparent font-myriad ${
            isMobile ? 'w-[180px] text-sm' : 'min-w-[140px] text-sm'
          }`}
        >
          <span>{selectedRegion}</span>{' '}
          <FiChevronDown
            className={`ml-2 transition-transform ${
              isRegionDropdownOpen ? 'rotate-180' : ''
            } ${isMobile ? 'w-4 h-4' : 'w-12 h-4'}`}
          />
        </button>

        {isRegionDropdownOpen && (
          <div className='absolute bottom-full left-0 mb-1 w-full border border-blaupunkt-secondary-light bg-blaupunkt-dark rounded-lg py-2 z-10'>
            {REGIONS.map((region, index) => (
              <button
                key={index}
                className={getRegionButtonClass(
                  region,
                  selectedRegion === region
                )}
                onClick={() => selectRegion(region)}
              >
                {region}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
  return (
    <footer className='relative text-white py-16 sm:py-16 bg-blaupunkt-dark'>
      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Mobile Layout */}
        <div className='block md:hidden'>
          <div className='flex justify-center mb-12'>
            <Link to='/'>
              <img
                src={whiteLogo}
                alt='Blaupunkt Logo'
                className='h-4 w-auto'
                loading='lazy'
                width='120'
                height='16'
              />
            </Link>
          </div>

          <div className='flex flex-row space-y-6 px-8'>
            <div className='flex-2'>
              <RegionSelector isMobile />
            </div>

            <div className='flex justify-end'>
              <div className='flex flex-col space-y-3'>
                {FOOTER_LINKS.map((link, index) => (
                  link.external ? (
                    <a
                      key={index}
                      href={link.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='text-sm text-blaupunkt-secondary-light hover:text-blaupunkt-white transition-colors duration-200 font-myriad text-right'
                    >
                      {link.text}
                    </a>
                  ) : (
                    <Link
                      key={index}
                      to={link.to}
                      className='text-sm text-blaupunkt-secondary-light hover:text-blaupunkt-white transition-colors duration-200 font-myriad text-right'
                    >
                      {link.text}
                    </Link>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className='hidden md:grid md:grid-cols-3 gap-8 items-center min-h-28'>
          <div className='flex justify-start'>
            <Link to='/'>
              <img
                src={whiteLogo}
                alt='Blaupunkt Logo'
                className='h-5 w-auto'
                loading='lazy'
                width='150'
                height='20'
              />
            </Link>
          </div>

          <div className='flex justify-center'>
            <RegionSelector />
          </div>

          <div className='flex justify-end'>
            {' '}
            <div className='grid grid-cols-2 gap-x-5 gap-y-2 md:gap-x-6 md:gap-y-3'>
              {FOOTER_LINKS.map((link, index) => (
                link.external ? (
                  <a
                    key={index}
                    href={link.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='text-base text-blaupunkt-secondary-light hover:text-blaupunkt-white transition-colors duration-200 font-myriad'
                  >
                    {link.text}
                  </a>
                ) : (
                  <Link
                    key={index}
                    to={link.to}
                    className='text-base text-blaupunkt-secondary-light hover:text-blaupunkt-white transition-colors duration-200 font-myriad'
                  >
                    {link.text}
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
