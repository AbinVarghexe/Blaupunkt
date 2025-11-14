import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Components/Common/Navbar'
import Breadcrumb from '../Components/Common/Breadcrumb'
import SEO from '../Components/Common/SEO'

const NotFound = () => {
  const breadcrumbItems = [
    { text: 'Home', path: '/' },
    { text: 'Page Not Found', active: true }
  ]

  return (
    <>
      <SEO 
        title="Page Not Found - Blaupunkt EV Charging"
        description="The page you are looking for could not be found. Return to Blaupunkt EV Charging Solutions homepage."
        noindex={true}
      />
      <div className='min-h-screen bg-white'>
      <Navbar />

      {/* Main Content */}
      <main className='pt-24 lg:pt-28'>
        {/* Breadcrumb */}
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Error Content */}
        <div className='flex flex-col items-center justify-center px-4 sm:px-6 py-6 sm:py-8 max-w-6xl mx-auto min-h-[60vh]'>
          {/* Error message container */}
          <div className='text-center w-full flex flex-col items-center gap-8 sm:space-y-12'>
            {/* 404 Error text */}
            <div className='flex flex-col items-center gap-2 sm:flex-row sm:items-start sm:justify-center sm:gap-4 md:gap-6'>
              <div className='flex items-center'>
                <span className='text-blaupunkt-primary text-[37px] sm:text-5xl md:text-6xl lg:text-7xl xl:text-6xl font-semibold leading-tight italic'>
                  ERROR
                </span>
              </div>
              <div className='flex items-center justify-center'>
                <span className='text-blaupunkt-primary-dark text-[125px] sm:text-7xl md:text-9xl lg:text-9xl xl:text-[12rem] font-semibold leading-tight italic'>
                  <span className='text-blaupunkt-primary'>4</span>
                  <span className='text-blaupunkt-primary-darker'>0</span>
                  <span className='text-blaupunkt-dark'>4</span>
                  <span className='text-blaupunkt-dark'>!</span>
                </span>
              </div>
            </div>

            {/* Error description */}
            <div className='w-full max-w-[226px] sm:max-w-2xl'>
              <p className='text-[13px] sm:text-lg md:text-xl lg:text-xl font-medium text-blaupunkt-dark leading-relaxed'>
                Sorry, We're unable to find that page...
              </p>
            </div>

            {/* Call to action button */}
            <div className=''>
              <Link
                to='/'
                className='inline-flex items-center justify-center bg-blaupunkt-primary text-white px-[30px] py-[11px] sm:px-6 sm:py-3 rounded-[11px] sm:rounded-xl text-[15px] sm:text-base md:text-lg font-normal hover:bg-blaupunkt-primary-darker transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
              >
                Go Back Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
    </>
  )
}

export default NotFound
