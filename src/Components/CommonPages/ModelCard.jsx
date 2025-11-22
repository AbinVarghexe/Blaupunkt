import React from 'react'

const ModelCard = ({
  image,
  modelCode = 'B1P16AT1',
  connectorType = 'Type 1',
  current = '16A',
  cableLength = '2 Meters',
  ipClass = '65',
  phaseType = 'Single - Phase',
  customFields = null, // New prop for custom field configurations
  onClick,
  model // Pass the full model object for WhatsApp message
}) => {
  return (
    <div 
      className='relative w-full max-w-[320px] transition-all duration-300 mx-auto h-full overflow-hidden cursor-pointer hover:scale-105'
      onClick={() => onClick && onClick(model || { modelCode })}
    >
      {/* Outer container with light blue border */}
      <div className='rounded-xl h-full overflow-hidden'>
        {/* White inner container */}
        <div className='bg-white rounded-lg overflow-hidden h-full flex flex-col'>
          {/* Product Image Container */}
          <div className='w-full flex items-center justify-center border-2 border-blaupunkt-primary rounded-2xl flex-shrink-0 overflow-hidden'>
            {image ? (
              <img
                src={image}
                alt={`${modelCode} charging cable`}
                className='w-full h-full object-cover rounded-lg'
                loading='lazy'
                width='320'
                height='320'
              />
            ) : (
              // Default charging cable illustration
              <div className='w-32 h-32 flex items-center justify-center'>
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Charging cable illustration */}
                  <circle cx="60" cy="60" r="45" stroke="#22C55E" strokeWidth="6" fill="none" />
                  <path
                    d="M25 45 C25 35, 35 35, 45 45 L45 55 C45 65, 55 65, 65 55 L65 45 C65 35, 75 35, 85 45"
                    stroke="#1F2937"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <circle cx="25" cy="45" r="8" fill="#1F2937" />
                  <circle cx="85" cy="45" r="8" fill="#1F2937" />
                  <rect x="20" y="40" width="10" height="10" rx="2" fill="#22C55E" />
                  <rect x="80" y="40" width="10" height="10" rx="2" fill="#22C55E" />
                </svg>
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div className='pt-6 pb-6 px-4 flex-1 flex flex-col overflow-hidden'>
            {/* Model Code - Primary heading */}
            <h3 className='text-lg font-semibold text-blaupunkt-primary-darker mb-4 text-left leading-tight truncate'>
              {modelCode}
            </h3>
            {/* Specifications List */}
            <div className='space-y-2 text-sm flex-1 overflow-hidden'>
              {customFields ? (
                // Use custom fields if provided
                customFields.map((field, index) => (
                  <div key={index} className='flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2'>
                    <span className='font-medium text-gray-700 min-w-0 flex-shrink-0 sm:w-1/3'>
                      {field.label}:
                    </span>
                    <span className='text-gray-900 font-normal min-w-0 flex-1 break-words'>
                      {field.value}
                    </span>
                  </div>
                ))
              ) : (
                // Use default fields for charging cables
                <>
                  <div className='flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2'>
                    <span className='font-medium text-gray-700 min-w-0 flex-shrink-0 sm:w-1/3'>
                      Connector:
                    </span>
                    <span className='text-gray-900 font-normal min-w-0 flex-1 break-words'>
                      {connectorType}
                    </span>
                  </div>
                  <div className='flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2'>
                    <span className='font-medium text-gray-700 min-w-0 flex-shrink-0 sm:w-1/3'>
                      Current:
                    </span>
                    <span className='text-gray-900 font-normal min-w-0 flex-1 break-words'>
                      {current}
                    </span>
                  </div>
                  <div className='flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2'>
                    <span className='font-medium text-gray-700 min-w-0 flex-shrink-0 sm:w-1/3'>
                      Cable Length:
                    </span>
                    <span className='text-gray-900 font-normal min-w-0 flex-1 break-words'>
                      {cableLength}
                    </span>
                  </div>
                  <div className='flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2'>
                    <span className='font-medium text-gray-700 min-w-0 flex-shrink-0 sm:w-1/3'>
                      IP Class:
                    </span>
                    <span className='text-gray-900 font-normal min-w-0 flex-1 break-words'>
                      {ipClass}
                    </span>
                  </div>
                  <div className='flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2'>
                    <span className='font-medium text-gray-700 min-w-0 flex-shrink-0 sm:w-1/3'>
                      Phase Type:
                    </span>
                    <span className='text-gray-900 font-normal min-w-0 flex-1 break-words'>
                      {phaseType}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModelCard