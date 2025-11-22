import React from 'react'
import ImageHeader from '../Common/ImageHeader'
import { chargingStationsConfig } from '../../Data/ChargingStations/index.js'
import { chargingCablesConfig } from '../../Data/ChargingCables/index.js'
import { dcChargingStationConfig } from '../../Data/DCChargingStation/index.js'
import { dcSuperFastChargingStationConfig } from '../../Data/DCSuperFastChargingStation/index.js'
import { portableEvChargingConfig } from '../../Data/PortableEVCharging/index.js'

const Specifications = ({ productImage, category }) => {
  // Get specifications data based on category
  const getSpecificationsData = category => {
    // Use ChargingStations specific data when category is chargingStations
    if (category === 'chargingStations') {
      return {
        title: chargingStationsConfig.specifications.title,
        specs: chargingStationsConfig.specifications.specs,
        backgroundImage:
          chargingStationsConfig.backgroundImages.chargingStationspecbg,
        imageHeight: chargingStationsConfig.overview?.imageHeight
      }
    }

    // Use ChargingCables specific data when category is chargingCables
    if (category === 'chargingCables') {
      return {
        title: chargingCablesConfig.specifications.title,
        specs: chargingCablesConfig.specifications.specs,
        backgroundImage: chargingCablesConfig.backgroundImages.evspecmob,
        imageHeight: chargingCablesConfig.overview?.imageHeight
      }
    }

    // Use DCChargingStation specific data when category is dcChargingStation
    if (category === 'dcChargingStation') {
      return {
        title: dcChargingStationConfig.specifications.title,
        specs: dcChargingStationConfig.specifications.specs,
        backgroundImage: dcChargingStationConfig.backgroundImages.dccharspecbg,
        imageHeight: dcChargingStationConfig.overview?.imageHeight
      }
    }

    // Use DCSuperFastChargingStation specific data when category is dcSuperFastChargingStation
    if (category === 'dcSuperFastChargingStation') {
      return {
        title: dcSuperFastChargingStationConfig.specifications.title,
        specs: dcSuperFastChargingStationConfig.specifications.specs,
        backgroundImage: dcSuperFastChargingStationConfig.backgroundImages.overview,
        imageHeight: dcSuperFastChargingStationConfig.overview?.imageHeight
      }
    }

    // Use PortableEVCharging specific data when category is portableEvCharging
    if (category === 'portableEVCharging') {
      return {
        title: portableEvChargingConfig.specifications.title,
        specs: portableEvChargingConfig.specifications.specs,
        backgroundImage: portableEvChargingConfig.backgroundImages.overview,
        imageHeight: portableEvChargingConfig.overview?.imageHeight
      }
    } // Default specifications data if category not found
    return {
      title: 'Technical Specifications',
      imageHeight: {
        mobile: '200px',
        desktop: '700px'
      },
      specs: [
        { label: 'Working Voltage:', value: '110V – 250V' },
        { label: 'Rated Current:', value: 'Up to 32A' },
        { label: 'Insulation Resistance:', value: '>1000 MΩ' },
        { label: 'Dielectric Strength:', value: '2000V' },
        { label: 'Contact Resistance:', value: '< 0.5 mΩ' },
        { label: 'Insertion & Extraction Force:', value: '80N – 100N' },
        {
          label: 'Main Materials:',
          value: 'Thermoplastic, Silicon Rubber, Copper Alloy'
        },
        { label: 'Cable Specification:', value: '3×2.5mm² + 2×0.5mm²' },
        { label: 'Cable Length:', value: '8 meters' },
        { label: 'Fire Rating:', value: 'UL94 V-0 (Flame Retardant)' },
        { label: 'Operating Temperature:', value: '-30°C to +50°C' },
        { label: 'Net Weight:', value: '1.8 kg' }
      ]
    }
  }
  const specificationsInfo = getSpecificationsData(category)
  const specsToDisplay = specificationsInfo.specs
  const imageToDisplay = productImage

  return (
    <div className='w-full py-6 lg:pb-40'>
      {' '}
      <ImageHeader
        title={specificationsInfo.title || 'Specifications'}
        backgroundImage={specificationsInfo.backgroundImage}
        textColor={{
          mobile: 'text-white',
          desktop: 'text-gray-800'
        }}
        className='font-bold'
        desktopClassName='py-0'
        mobileClassName='py-0'
      />
      <div className='max-w-7xl mx-auto px-6'>
        <div className='grid lg:grid-cols-2 gap-8 lg:gap-36 items-center'>
          {/* Specifications Table */}
          <div className='w-full overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-4 text-base text-gray-700 font-semibold text-left'>
                      Specification
                    </th>
                    <th className='px-6 py-4 text-base text-gray-900 font-semibold text-left'>
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {specsToDisplay.map((spec, index) => (
                    <tr key={index}>
                      <td className='px-6 py-4 text-base text-gray-700 font-normal'>
                        {spec.label}
                      </td>
                      <td className='px-6 py-4 text-base text-gray-900 font-normal'>
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>{' '}          {/* Product Image */}
          <div className='flex justify-center lg:justify-end w-full h-full'>
            <div className='relative rounded-2xl flex items-center justify-center'>
              <img
                src={imageToDisplay}
                alt='Product Specifications'
                className='w-full object-cover rounded-xl hidden'
                loading='lazy'
                style={{
                  height: specificationsInfo.imageHeight.spec?.mobile || '200px'
                }}
              />
              <img
                src={imageToDisplay}
                alt='Product Specifications'
                className= 'w-full object-cover rounded-xl  hidden lg:block'
                loading='lazy'
                style={{
                  height: specificationsInfo.imageHeight.spec?.desktop || '500px'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Specifications
