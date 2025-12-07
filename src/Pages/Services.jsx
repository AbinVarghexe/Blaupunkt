import React from 'react'
import { Link } from 'react-router-dom'
import { Servicepage } from '../Data/assets.js'
import ImageHeader from '../Components/Common/ImageHeader'
import Breadcrumb from '../Components/Common/Breadcrumb'
import { createSimpleBreadcrumbs } from '../Data/Common/utilities'
import SEO from '../Components/Common/SEO'

const Services = () => {
  const breadcrumbItems = createSimpleBreadcrumbs('Services')

  // Service sections data
  const serviceItems = [
    {
      id: 1,
      title: 'Charging Solutions',
      description:
        'Blaupunkt offers a wide range of high-performance EV charging products tailored for homes, businesses, and public spaces. From portable chargers to DC fast charging stations, our solutions are built for efficiency, safety, and seamless user experience.',
      image: Servicepage.Chargbg,
      showLearnMore: true
    },
    {
      id: 2,
      title: 'Installation Services',
      description:
        "Our certified partners provide professional installation services to ensure your EV charging setup is safe, compliant, and optimized for performance. We handle everything from site inspection to final setup—whether it's a home garage or a commercial lot.",
      image: Servicepage.Installbg,
      showLearnMore: false
    },
    {
      id: 3,
      title: 'Maintenance & Support',
      description:
        'Blaupunkt stands by your side even after installation. Our maintenance services include regular inspections, system updates, and on-call support to ensure uninterrupted performance and peace of mind.',
      image: Servicepage.Mainbg,
      showLearnMore: false
    }
  ]

  return (
    <>
      <SEO 
        title="EV Charger Installation UAE | Blaupunkt Services"
        description="Professional EV charger installation for homes and businesses in the UAE. DEWA-approved technicians and certified charging solutions."
        keywords="EV charger installation UAE, EV charger installer UAE, DEWA approved EV installation, home EV charger installation, commercial EV charger installation, Blaupunkt services"
        canonical="https://blaupunkt-ev.com/services"
        ogTitle="EV Charger Installation Services"
        ogDescription="Certified home and commercial EV charger installation."
        twitterTitle="EV Charger Installation Services"
        twitterDescription="Certified home and commercial EV charger installation."
        ogImage={Servicepage.ServicesPageImg}
        ogType="website"
      />
      <div className='bg-white relative w-full py-8'>
      <h1 className="sr-only">EV Charger Installation UAE — Blaupunkt Services</h1>
      <h2 className="sr-only">Home EV charger installation by certified technicians</h2>
      <h2 className="sr-only">Commercial EV charger installation and DEWA approvals</h2>
      {/* Breadcrumb */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Services Header */}
      <div className=' text-3xl md:text-5xl font-semibold items-center justify-center flex py-6 md:py-14'>
        <div>Our Services</div>
      </div>

      {/* Subtitle */}
      <div className='container mx-auto px-6 mb-8 md:mb-25'>
        <p className='text-blaupunkt-primary-darker text-sm md:text-lg text-center max-w-[600px] mx-auto'>
          From reliable EV chargers to expert installation and ongoing support,
          Blaupunkt offers end-to-end solutions to power your electric journey.
        </p>
      </div>

      {/* Mobile View - Service Items stacked vertically */}
      <div className='md:hidden'>
        {serviceItems.map(service => (
          <div key={service.id} className='mb-5'>
            {/* Service Image */}
            <div className='relative h-25 mb-2'>
              <img
                src={service.image}
                alt={service.title}
                className='w-full h-full object-cover'
                loading='lazy'
              />
              <div className='absolute inset-0 bg-black/40 flex items-center justify-center'>
                <h2 className='text-xl font-semibold text-white'>
                  {service.title}
                </h2>
              </div>
            </div>

            {/* Service Description */}
            <div className='px-6 py-6'>
              <p className='text-md font-normal text-blaupunkt-primary-darker mb-4'>
                {service.description}
              </p>
              <div className='flex gap-2 py-4'>
                <Link to='/contact' className='border-2 border-blaupunkt-primary-darker rounded-xl px-4 py-2 text-blaupunkt-primary-darker font-medium text-md cursor-pointer hover:bg-blaupunkt-primary-darker hover:text-white transition-colors'>
                  Contact
                </Link>
                {service.showLearnMore && (
                  <Link to='/' className='border-2 border-blaupunkt-primary-darker rounded-xl px-4 py-2 text-blaupunkt-primary-darker font-medium text-md cursor-pointer hover:bg-blaupunkt-primary-darker hover:text-white transition-colors'>
                    Learn More
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View - Two-column layout */}
      <div className='hidden md:block container mx-auto px-6'>
        <div className='flex flex-col lg:flex-row gap-6 justify-between'>
          {/* Left Column - Service descriptions */}
          <div className='flex-1 flex flex-col gap-20 max-w-[600px]'>
            {/* Charging Solutions */}
            <div className='relative gap-y-12'>
              <h2 className='text-2xl md:text-3xl font-semibold text-blaupunkt-blue mb-8'>
                {serviceItems[0].title}
              </h2>
              <p className='text-base md:text-lg font-normal text-blaupunkt-primary-darker mb-4'>
                {serviceItems[0].description}
              </p>
              <div className='flex gap-3 py-4'>
                <Link to='/contact' className='border-2 items-center justify-center border-blaupunkt-primary-darker rounded-xl px-5 py-2 text-blaupunkt-primary-darker font-medium text-md cursor-pointer hover:bg-blaupunkt-primary-darker hover:text-white transition-colors'>
                  Contact
                </Link>
                {serviceItems[0].showLearnMore && (
                  <Link to='/' className='border-2 border-blaupunkt-primary-darker rounded-xl px-4 py-1.5 text-blaupunkt-primary-darker font-medium text-md cursor-pointer hover:bg-blaupunkt-primary-darker hover:text-white transition-colors'>
                    Learn More
                  </Link>
                )}
              </div>
            </div>

            {/* Installation Services */}
            <div className='relative'>
              <h2 className='text-2xl md:text-3xl font-semibold text-blaupunkt-blue mb-8'>
                {serviceItems[1].title}
              </h2>
              <p className='text-base md:text-lg font-normal text-blaupunkt-primary-darker mb-4'>
                {serviceItems[0].description}
              </p>
              <div className='flex gap-3'>
                <Link to='/contact' className='border-2 items-center justify-center border-blaupunkt-primary-darker rounded-xl px-5 py-2 text-blaupunkt-primary-darker font-medium text-md cursor-pointer hover:bg-blaupunkt-primary-darker hover:text-white transition-colors'>
                  Contact
                </Link>
              </div>
            </div>

            {/* Maintenance & Support */}
            <div className='relative'>
              <h2 className='text-2xl md:text-3xl font-semibold text-blaupunkt-blue mb-8'>
                {serviceItems[2].title}
              </h2>
              <p className='text-base md:text-lg font-normal text-blaupunkt-primary-darker mb-4'>
                {serviceItems[2].description}
              </p>
              <div className='flex gap-3'>
                <Link to='/contact' className='border-2 items-center justify-center border-blaupunkt-primary-darker rounded-xl px-5 py-2 text-blaupunkt-primary-darker font-medium text-md cursor-pointer hover:bg-blaupunkt-primary-darker hover:text-white transition-colors'>
                  Contact
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className='lg:w-[360px]'>
            <div className='rounded-xl h-full w-full overflow-hidden bg-gray-200'>
              <img
                src={Servicepage.ServicesPageImg}
                alt='Blaupunkt EV Charging Station'
                className='w-full h-full object-cover'
                loading='lazy'
              />
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Services
