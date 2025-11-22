import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logos } from '../../Data/assets.js'
import { FiSearch } from 'react-icons/fi'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const navigate = useNavigate()
  const location = useLocation()

  const navigationLinks = [
    { href: '/products', label: 'Products' },
    { href: '/services', label: 'Services' },
    { href: '/company', label: 'Company' },
    { href: '/contact', label: 'Contact' }
  ]

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setIsMenuOpen(false)
      setTimeout(() => {
        setSearchQuery('')
      }, 100)
    }
  }

  // Handle search input keydown
  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e)
    }
  }

  // Check if current path is active
  const isActive = (path) => {
    return location.pathname === path
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [isMenuOpen])

  return (
    <>
      {/* Desktop Navigation */}
      <nav className='hidden lg:flex items-center px-16 py-6 bg-white shadow-md fixed top-0 left-0 right-0 z-50'>
        {/* Navigation Links - Left */}
        <div className='flex space-x-8 flex-1'>
          {navigationLinks.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className='text-blaupunkt-primary-dark hover:text-blaupunkt-primary transition-colors duration-300 font-normal text-base'
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Logo - Center */}
        <div className='h-auto w-42 cursor-pointer flex-shrink-0'>
          <Link to='/'>
            <img src={logos.main} alt='Blaupunkt' width='168' height='24' />
          </Link>
        </div>

        {/* Search and Menu - Right */}
        <div className='flex items-center space-x-6 flex-1 justify-end'>
          {/* Search Bar */}
          <form onSubmit={handleSearch} className='flex items-center bg-blaupunkt-secondary-light rounded-full px-4 py-2'>
            <button type="submit" className="mr-3">
              <FiSearch className='w-4 h-4 text-blaupunkt-primary-darker hover:text-blaupunkt-primary transition-colors cursor-pointer' />
            </button>
            <input
              type='text'
              placeholder='Search products...'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className='bg-transparent text-blaupunkt-primary-darker placeholder-blaupunkt-primary-darker focus:outline-none flex-1'
            />
          </form>

          {/* Menu Button */}
          <div
            className='cursor-pointer lg:hidden flex items-center justify-center w-8 h-8'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className='relative w-6 h-6'>
              <span
                className={`absolute h-0.5 w-full bg-blaupunkt-primary transition-all duration-300 ${
                  isMenuOpen ? 'top-2 rotate-45' : 'top-1'
                }`}
              ></span>
              <span
                className={`absolute h-0.5 w-full bg-blaupunkt-primary transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'top-2'
                }`}
              ></span>
              <span
                className={`absolute h-0.5 w-full bg-blaupunkt-primary transition-all duration-300 ${
                  isMenuOpen ? 'top-2 -rotate-45' : 'top-3'
                }`}
              ></span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className='lg:hidden items-center flex justify-between px-8 py-8 md:px-12 bg-white shadow-md fixed top-0 left-0 right-0 z-50'>
        {/* Empty div for spacing */}
        <div className='w-8'></div>
        
        <div className='h-auto w-40 md:w-24 cursor-pointer'>
          {/* Logo */}
          <Link to='/'>
            <img src={logos.main} alt='Blaupunkt' width='160' height='24' />
          </Link>
        </div>
        
        <div
          className='cursor-pointer'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className='relative w-6 h-4'>
            <span
              className={`absolute h-0.5 w-full bg-blaupunkt-primary transition-all duration-300 ${
                isMenuOpen ? 'top-2 rotate-45' : 'top-1'
              }`}
            ></span>
            <span
              className={`absolute h-0.5 w-full bg-blaupunkt-primary transition-all duration-300 ${
                isMenuOpen ? 'top-2 -rotate-45' : 'top-3'
              }`}
            ></span>
          </div>
        </div>
      </nav>

      {/* Full-screen navigation menu */}
      <div
        className={`fixed inset-0 bg-white z-40 transform transition-transform duration-500 ease-in-out overflow-hidden ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className='flex flex-col items-center justify-center h-full space-y-8 overflow-hidden'>
          {/* Close button */}
          <div
            className='absolute top-8 right-8 md:top-12 md:right-12 cursor-pointer'
            onClick={() => setIsMenuOpen(false)}
          >
            <div className='relative w-6 h-6'>
              <span className='absolute top-2.5 h-0.5 w-full bg-blaupunkt-primary rotate-45 transition-all duration-300'></span>
              <span className='absolute top-2.5 h-0.5 w-full bg-blaupunkt-primary -rotate-45 transition-all duration-300'></span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className='flex flex-col items-center space-y-14 text-xl md:text-3xl lg:text-4xl font-normal'>
            {navigationLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className='text-blaupunkt-primary-dark hover:text-blaupunkt-primary transition-colors duration-300'
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search bar */}
          <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2'>
            <form onSubmit={handleSearch} className='flex items-center bg-blaupunkt-secondary-light rounded-full px-4 py-2 w-64'>
              <button type="submit" className="mr-3">
                <svg
                  className='w-4 h-4 text-blaupunkt-primary-darker hover:text-blaupunkt-primary transition-colors cursor-pointer'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={1.5}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </button>
              <input
                type='text'
                placeholder='Search products...'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className='bg-[#96B2D1] text-blue-800 placeholder-blue-800 rounded-xl pr-10 pl-4 py-1.5 text-base font-normal focus:outline-none focus:ring-0 focus:ring-blue-500 focus:bg-blue-100 transition-colors duration-200 w-48'
              />
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                <FiSearch className='h-4 w-4 text-blue-800' />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar