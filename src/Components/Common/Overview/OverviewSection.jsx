import React from 'react'

const OverviewSection = ({ overviewData }) => {
  if (!overviewData) {
    return (
      <div className='w-full py-4'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <p className='text-center text-gray-500'>
            No overview data available.
          </p>
        </div>
      </div>
    )
  }
  return (    <div className='w-full py-4'>
      {/* Mobile View - Original Layout */}
      <div className='md:hidden max-w-7xl mx-auto px-8'>
        {/* Render paragraphs if para is active */}
        {overviewData?.para?.active && overviewData.para.data.length > 0 && (
          <div className='mb-8'>
            {overviewData.para.data.map((item, index) => (
              <div key={index} className='mb-6'>
                {/* Render subheading if it exists */}
                {typeof item === 'object' && item.subheading && (
                  <h3 className='text-2xl font-semibold text-black mb-6'>
                    {item.subheading}
                  </h3>
                )}
                <p className='text-lg text-gray-700 leading-relaxed'>
                  {typeof item === 'object' ? item.text : item}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Render list if list is active */}
        {overviewData?.list?.active && overviewData.list.data.length > 0 && (
          <div className='mb-8'>
            <ul className='space-y-3'>
              {overviewData.list.data.map((item, index) => (
                <li key={index} className='flex items-start'>
                  <span className='text-black mr-3 mt-1 text-xl'>•</span>
                  <span className='text-lg text-gray-700 leading-relaxed'>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Render image if available */}
        {overviewData?.image && (
          <div className='flex justify-center'>
            <img
              src={overviewData.image}
              alt='Overview'
              className='max-w-full h-auto rounded-lg shadow-lg'
              loading='lazy'
            />
          </div>
        )}
      </div>{' '}
      {/* Desktop View - Flex Row Layout */}
      <div className='hidden md:flex md:items-stretch max-w-7xl mx-auto px-8 py-4 gap-12'>
        {/* Image - Left Side (60% width) */}
        <div className='flex-[4] flex items-start justify-center object-contain'>
          {overviewData?.image && (
            <img
              src={overviewData.image}
              alt='Product Overview'
              className='w-full h-full rounded-lg object-cover'
              loading='lazy'
              style={{
                maxHeight: overviewData.imageHeight?.overview?.desktop || '500px',
                minHeight: overviewData.imageMinHeight?.overview?.desktop || '400px'
              }}
            />
          )}
        </div>
        {/* Text Content - Right Side (40% width) */}
        <div className='flex-[2] flex flex-col justify-center pl-4'>
          {/* Render paragraphs if para is active */}
          {overviewData?.para?.active && overviewData.para.data.length > 0 && (
            <div className='mb-6'>
              {overviewData.para.data
                .filter(
                  item =>
                    !(
                      typeof item === 'object' &&
                      item.subheading?.includes('Monta Backend Integration')
                    )
                )
                .map((item, index) => (
                  <div key={index} className='mb-6'>
                    {/* Render subheading if it exists */}
                    {typeof item === 'object' && item.subheading && (
                      <h3 className='text-xl font-semibold text-black mb-6'>
                        {item.subheading}
                      </h3>
                    )}
                    <p className='text-lg text-left text-black leading-relaxed'>
                      {typeof item === 'object' ? item.text : item}
                    </p>
                  </div>
                ))}
            </div>
          )}
          {/* Render list if list is active */}
          {overviewData?.list?.active && overviewData.list.data.length > 0 && (
            <div>
              <ul className='space-y-4'>
                {overviewData.list.data.map((item, index) => (
                  <li key={index} className='flex items-start'>
                    <span className='text-black mr-3 mt-1 text-xl'>•</span>
                    <span className='text-lg text-gray-700 leading-relaxed'>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Fallback message if neither para nor list is active or has data */}
          {(!overviewData?.para?.active ||
            overviewData.para.data.length === 0) &&
            (!overviewData?.list?.active ||
              overviewData.list.data.length === 0) && (
              <p className='text-base text-left text-gray-500 py-4'>
                No overview data available.
              </p>
            )}
        </div>
      </div>
    </div>
  )
}

export default OverviewSection
