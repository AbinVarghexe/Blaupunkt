import React, { useState } from 'react'
import Breadcrumb from '../Common/Breadcrumb'

const HeroSection = ({
  title,
  description,
  breadcrumbs,
  buttonText,
  mainImage,
  imageAlt,
  thumbnails,
  thumbnailObjectFit = 'object-cover', // New prop with default value
  mainImageObjectFit = 'object-contain' // New prop for main image with default value
}) => {
  const [activeThumbIndex, setActiveThumbIndex] = useState(0)
  // Get currently displayed image from thumbnails or use main image
  const currentDisplayImage =
    thumbnails && thumbnails.length > activeThumbIndex
      ? thumbnails[activeThumbIndex].image
      : mainImage
  // Get alt text for current image
  const currentAltText =
    thumbnails && thumbnails.length > activeThumbIndex
      ? thumbnails[activeThumbIndex].alt || imageAlt || 'Product Image'
      : imageAlt || 'Product Image'

  // Build WhatsApp contact link for the Connect button
  const waNumber = (import.meta.env?.VITE_WHATSAPP_NUMBER || '971558882595').replace(/[^\d]/g, '')
  const waMessage = import.meta.env?.VITE_WHATSAPP_MESSAGE || `Hello! I would like to know more about ${title}.`
  const waHref = waNumber
    ? `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`
    : '/contact'

  return (
    <div className='w-full bg-white py-16 px-6 lg:py-0'>
      {/* Container */}
      <div className='max-w-md mx-auto space-y-6 sm:max-w-2xl lg:max-w-6xl xl:max-w-7xl'>
        {' '}
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={breadcrumbs} className="lg:mt-16" />
        
        {/* Main Content - Desktop Flex Layout */}
        <div className='flex flex-col lg:flex-row lg:gap-12 lg:items-start space-y-6 lg:space-y-0'>
          {' '}
          {/* Text Content Section */}
          <div className='lg:flex-1 lg:max-w-2xl h-full flex'>
            {/* Main Content Card */}{' '}
            <div className='border-2 border-blaupunkt-secondary-light rounded-2xl p-6 lg:p-8 h-[300px] lg:h-[500px] xl:h-[500px] flex flex-col justify-between w-full'>
              <div>
                {' '}
                {/* Main Heading */}
                <h1 className='text-[32px] lg:text-5xl xl:text-6xl font-semibold font-myriad text-blaupunkt-dark leading-[1.2] lg:leading-[1.1] mb-8  w-[230px] lg:w-[350px]'>
                  {title}
                </h1>{' '}
                {/* Description */}{' '}
                <p className='text-[15px] lg:text-lg xl:text-xl font-light font-myriad text-blaupunkt-primary-darker leading-[1.4] lg:leading-[1.6] w-[230px] lg:w-[350px]'>
                  {description}
                </p>
              </div>
              {/* Connect Button */}
              <div className='flex justify-start mt-auto'>
                <a
                  href={waHref}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-blaupunkt-primary-darker text-white px-6 py-3 lg:px-8 lg:py-4 rounded-2xl font-semibold font-myriad text-[14px] lg:text-base xl:text-lg leading-[1.2] hover:bg-blaupunkt-primary transition-all duration-500 ease-out hover:scale-105 hover:shadow-lg transform'
                  aria-label='Connect via WhatsApp'
                >
                  {buttonText || 'Connect'}
                </a>
              </div>
            </div>
          </div>
          {/* Product Image Section */}
          <div className='lg:flex-1 lg:max-w-2xl'>
            <div className='relative w-full h-[350px] lg:h-[500px] xl:h-[500px] bg-white rounded-2xl overflow-hidden shadow-lg'>
              {' '}
              {/* Product Image Background with animation */}
              <div className='w-full h-full bg-white relative overflow-hidden'>
                {' '}                <img
                  src={currentDisplayImage}
                  alt={currentAltText}
                  className={`w-full h-full ${mainImageObjectFit} transition-all duration-700 ease-out hover:scale-105`}
                  style={{ animation: 'fadeIn 0.8s ease-out' }}
                  width='800'
                  height='500'
                />
                <style jsx='true'>{`
                  @keyframes fadeIn {
                    0% {
                      opacity: 0.6;
                      transform: scale(0.95);
                    }
                    100% {
                      opacity: 1;
                      transform: scale(1);
                    }
                  }
                `}</style>
              </div>
              {/* Gradient Overlay at Bottom */}
              <div className='absolute bottom-0 left-0 right-0 h-[189px] lg:h-[250px] bg-gradient-to-t from-white to-transparent pointer-events-none'></div>{' '}
              {/*Sub images at bottom area*/}
              <div className='absolute bottom-0 left-0 right-0 flex justify-center items-center gap-4 lg:gap-6 p-4 lg:p-6'>
                {thumbnails && thumbnails.length > 0
                  ? thumbnails.map((thumb, index) => (
                      <div
                        key={index}
                        className={`relative ${
                          activeThumbIndex === index
                            ? 'z-10 transform scale-110'
                            : ''
                        }`}
                      >                        <img
                          src={thumb.image || mainImage}
                          alt={thumb.alt || `Thumbnail ${index + 1}`}
                          className={`w-[60px] h-[60px] lg:w-[60px] lg:h-[60px] xl:w-[60px] xl:h-[60px] ${thumbnailObjectFit} rounded-lg shadow-md hover:scale-110 transition-all duration-400 ease-out cursor-pointer 
                          ${
                            activeThumbIndex === index
                              ? 'border-2 border-blaupunkt-primary-darker shadow-lg'
                              : 'opacity-80 hover:opacity-100 hover:shadow-lg'
                          }`}
                          loading='lazy'
                          width='60'
                          height='60'
                          onClick={() => setActiveThumbIndex(index)}
                          onKeyDown={e =>
                            e.key === 'Enter' && setActiveThumbIndex(index)
                          }
                          tabIndex={0}
                          role='button'
                          aria-label={`View ${
                            thumb.alt || `image ${index + 1}`
                          }`}
                        />
                        {activeThumbIndex === index && (
                          <div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-blaupunkt-primary-darker rounded-full'></div>
                        )}
                      </div>
                    ))
                  : // Default thumbnails if none provided
                    Array(5)
                      .fill(null)
                      .map((_, index) => (
                        <div
                          key={index}
                          className={`relative ${
                            activeThumbIndex === index
                              ? 'z-10 transform scale-110'
                              : ''
                          }`}
                        >                          <img
                            src={mainImage}
                            alt={`Thumbnail ${index + 1}`}
                            className={`w-[60px] h-[60px] lg:w-[60px] lg:h-[60px] xl:w-[60px] xl:h-[60px] ${thumbnailObjectFit} rounded-lg shadow-md hover:scale-110 transition-all duration-400 ease-out cursor-pointer
                          ${
                            activeThumbIndex === index
                              ? 'border-2 border-blaupunkt-primary-darker shadow-lg'
                              : 'opacity-80 hover:opacity-100 hover:shadow-lg'
                          }`}
                            loading='lazy'
                            width='60'
                            height='60'
                            onClick={() => setActiveThumbIndex(index)}
                            onKeyDown={e =>
                              e.key === 'Enter' && setActiveThumbIndex(index)
                            }
                            tabIndex={0}
                            role='button'
                            aria-label={`View image ${index + 1}`}
                          />
                          {activeThumbIndex === index && (
                            <div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-blaupunkt-primary-darker rounded-full'></div>
                          )}
                        </div>
                      ))}
              </div>
            </div>{' '}
          </div>
        </div>
        <hr className='hidden lg:block border-blaupunkt-primary-darker border-t-2 my-32 mx-4' />
      </div>
    </div>
  )
}

export default HeroSection
