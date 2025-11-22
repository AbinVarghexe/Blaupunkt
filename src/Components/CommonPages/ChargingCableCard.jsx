import React from 'react'

const ChargingCableCard = ({
  modelCode = 'B1P16AT1',
  connectorType = 'Type 1',
  current = '16A',
  cableLength = '2 Meters',
  ipClass = '65',
  phaseType = 'Single - Phase',
  image,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden ${className}`}>
      {/* Product Image Container */}
      <div className="bg-gray-50 p-6 flex items-center justify-center aspect-square">
        {image ? (
          <img
            src={image}
            alt={`${modelCode} charging cable`}
            className="w-full h-full object-contain max-w-[200px] max-h-[200px]"
            loading='lazy'
            width='200'
            height='200'
          />
        ) : (
          // Default placeholder for charging cable
          <div className="w-32 h-32 flex items-center justify-center">
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
      <div className="p-6">
        {/* Model Code */}
        <h3 className="text-xl font-semibold text-[#1E3A8A] mb-4">
          {modelCode}
        </h3>

        {/* Specifications */}
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Connector:</span>
            <span>{connectorType}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Current:</span>
            <span>{current}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Cable Length:</span>
            <span>{cableLength}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">IP Class:</span>
            <span>{ipClass}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Phase Type:</span>
            <span>{phaseType}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChargingCableCard
