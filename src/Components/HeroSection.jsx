import React, { useState } from 'react'
import { IoChevronDown } from 'react-icons/io5'
import heroVideoSrc from '../assets/Videos/HeoIntro.mp4'
import { createLogger } from '../utils/logger'
// import heroImageSrc from '../assets/Images/HeroImage.png' // File doesn't exist - commented out

const logger = createLogger('HeroSection')

const HeroSection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const handleVideoLoaded = () => {
    setIsVideoLoaded(true)
    // Longer delay for smoother transition
    setTimeout(() => setShowVideo(true), 300)
  }
  return (
    <div className='w-full bg-white min-h-screen'>
      {/* Container */}
      <div className='max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-12'>
        {/* Breadcrumb Navigation */}{' '}
        <div className='flex items-center justify-center mb-12 lg:mb-16'>
          <div className='flex items-center gap-2 text-sm font-myriad'>
            <span className='text-blaupunkt-secondary-light hover:text-blaupunkt-secondary transition-colors cursor-pointer'>
              Home
            </span>
            <span className='text-blaupunkt-secondary-light'>/</span>
            <span className='text-blaupunkt-secondary font-medium'>
              Electric Vehicle Charging Equipment
            </span>
          </div>
        </div>{' '}
        {/* Hero Background Video Container */}
        <div className='w-full mb-12 lg:mb-16'>
          <div className='w-full h-[50vh] lg:h-[525px] rounded-2xl relative overflow-hidden shadow-xl bg-gray-100'>            {/* Hero Image Placeholder */}
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='525' viewBox='0 0 800 525'%3E%3Crect width='800' height='525' fill='%2396B2D1'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' fill='%23ffffff' font-size='24' font-family='Arial, sans-serif'%3EEV Charging Equipment%3C/text%3E%3C/svg%3E"
              alt='Electric Vehicle Charging'
              width='800'
              height='525'
              className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ease-in-out ${
                showVideo ? 'opacity-0' : 'opacity-100'
              }`}
              style={{ zIndex: 2 }}
            />

            {/* Video with lazy loading */}
            <video
              src={heroVideoSrc}
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ease-in-out ${
                showVideo ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ zIndex: 1 }}
              onError={e => {
                logger.error('Video failed to load:', e)
                // Keep showing the image if video fails
                setShowVideo(false)
              }}
              onLoadStart={() => logger.debug('Video loading started')}
              onCanPlay={handleVideoLoaded}
              onLoadedData={handleVideoLoaded}
            >
              Your browser does not support the video tag.
            </video>

            {/* Loading indicator (optional) */}
            {!isVideoLoaded && (
              <div className='absolute top-4 right-4 z-10 opacity-70'>
                <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
              </div>
            )}
          </div>
        </div>{' '}
        {/* Main Content */}
        <div className='flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-32 px-4'>
          {/* Left Content - Text */}
          <div className='flex-1 max-w-4xl text-left'>
            <div className='space-y-8'>
              {/* Main Heading */}
              <h1 className='text-4xl lg:text-4xl xl:text-5xl font-myriad font-semibold text-blaupunkt-dark leading-tight'>
                Power Your Journey with Precision
              </h1>{' '}
              {/* Description */}
              <p className='text-lg lg:text-xl font-myriad font-light text-blaupunkt-primary-dark leading-relaxed max-w-3xl mx-auto lg:mx-0'>
                Explore Blaupunkt's range of high-quality EV charging cables
                <br className='hidden lg:block' /> engineered for safety, speed, and seamless compatibility with
                leading electric vehicles.
              </p>
            </div>
          </div>
          {/* Right Content - Navigation Controls */}
          <div className='flex flex-col items-center gap-8 lg:gap-20'>
            {' '}
            {/* Menu Button */}
            <div className='w-12 h-12 lg:w-16 lg:h-16 hidden lg:flex bg-blaupunkt-secondary rounded-xl lg:rounded-2xl items-center justify-center cursor-pointer hover:bg-blaupunkt-secondary-light transition-all duration-300 hover:scale-105'>
              <div className='flex flex-col items-center gap-1'>
                {/* Dropdown arrow - hidden on mobile */}
                <div className='hidden lg:flex justify-center mt-1'>
                  <IoChevronDown
                    size={20}
                    className='text-blaupunkt-primary-darker lg:text-2xl'
                  />
                </div>
              </div>
            </div>
            {/* Navigation bar */}
            <div className='flex gap-1.5'>
              <div className='w-16 lg:w-24 h-1 lg:h-1.25 bg-blaupunkt-primary rounded-2xl cursor-pointer hover:scale-110 transition-transform'></div>
              <div className='w-8 lg:w-10 h-1 lg:h-1.25 bg-blaupunkt-secondary-light rounded-2xl cursor-pointer hover:scale-110 transition-transform hover:bg-blaupunkt-secondary'></div>
              <div className='w-8 lg:w-10 h-1 lg:h-1.25 bg-blaupunkt-secondary-light rounded-2xl cursor-pointer hover:scale-110 transition-transform hover:bg-blaupunkt-secondary'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
