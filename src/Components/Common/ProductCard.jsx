import React from 'react'

const ProductCard = ({
  image,
  title,
  specifications,
  productCode,
  addBorder = false,
  onClick
}) => {
  return (
    <div
      className='relative rounded-3xl w-full max-w-[320px] sm:max-w-[320px] h-[420px] sm:h-[450px] cursor-pointer transition-all duration-300 hover:scale-105 group mx-auto sm:shadow-[0px_12px_27px_0px_rgba(34,34,34,0.1),0px_49px_49px_0px_rgba(34,34,34,0.09),0px_111px_67px_0px_rgba(34,34,34,0.05),0px_198px_79px_0px_rgba(34,34,34,0.01),0px_309px_86px_0px_rgba(34,34,34,0)]'
      onClick={onClick}
    >
      {/* Rectangle 74 - White Background Container */}
      <div
        className={`absolute inset-0 bg-white ${
          addBorder
            ? 'sm:border-0 border-2 border-blaupunkt-primary-darker'
            : ''
        }`}
        style={{ borderRadius: '15px' }}
      >
        {' '}
        {/* Rectangle 73 - Product Image Container */}
        <div
          className='absolute top-1 left-1 right-1 h-[300px] sm:h-[320px] bg-cover object-cover bg-center bg-no-repeat border border-white'
          style={{
            backgroundImage: image ? `url(${image})` : 'none',
            backgroundColor: '#D9D9D9',
            borderRadius: '13px',
            objectFit: 'cover'
          }}
        />{' '}
        {/* Text Content Container */}
        <div className='absolute bottom-2 sm:bottom-6 left-2 sm:left-6 right-2 sm:right-6'>
          {/* Product Title and Code - Same Line */}
          <div className='flex justify-between items-start mb-2 sm:mb-3'>
            <h3
              className='flex-1 mr-3'
              style={{
                fontFamily: '"Myriad Pro", Arial, sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(14px, 2.5vw, 16px)',
                lineHeight: '3em',
                color: '#18161A',
                textAlign: 'left'
              }}
            >
              {title || 'EV Charging Cables'}
            </h3>

            <span
              className='flex-shrink-0'
              style={{
                fontFamily: '"Myriad Pro", Arial, sans-serif',
                fontWeight: 300,
                fontSize: 'clamp(9px, 1.8vw, 10px)',
                lineHeight: '1.3em',
                color: '#18161A',
                textAlign: 'right'
              }}
            >
              {productCode || 'A3P32AT2'}
            </span>
          </div>

          {/* Product Specifications */}
          <p
            className='mb-0 mt-1'
            style={{
              fontFamily: '"Myriad Pro", Arial, sans-serif',
              fontWeight: 300,
              fontSize: 'clamp(10px, 2vw, 12px)',
              lineHeight: '1.4em',
              color: '#18161A',
              textAlign: 'left'
            }}
          >
            {specifications || '22 kWh | 8 Meter | 3 Phase | Type 2'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
