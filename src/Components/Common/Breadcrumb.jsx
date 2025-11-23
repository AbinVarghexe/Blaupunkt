import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Breadcrumb Component - Reusable breadcrumb navigation
 * @param {Array} items - Array of breadcrumb items
 * @param {string} className - Additional CSS classes
 */
const Breadcrumb = ({ items = [], className = '' }) => {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <nav 
      className={`flex items-center justify-center mb-4 md:mb-6 lg:mb-8 ${className}`}
      aria-label="Breadcrumb"
    >
      <div className='flex items-center gap-2 text-xs sm:text-sm overflow-x-auto'>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <span className='text-blaupunkt-gray font-myriad'>/</span>
            )}
            {item.active || index === items.length - 1 ? (
              <span className='text-blaupunkt-primary-darker font-myriad whitespace-nowrap'>
                {item.text || item.label}
              </span>
            ) : (
              <Link
                to={item.path || item.href}
                className='text-blaupunkt-primary-darker font-myriad whitespace-nowrap hover:text-blaupunkt-primary transition-colors duration-200'
              >
                {item.text || item.label}
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  )
}

export default Breadcrumb
