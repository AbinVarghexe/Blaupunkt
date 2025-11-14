import React from 'react'
import { Helmet } from 'react-helmet-async'
import PropTypes from 'prop-types'

const SEO = ({
  title = 'Blaupunkt - EV Charging Solutions',
  description = 'Blaupunkt offers premium EV charging stations, DC fast chargers, portable charging solutions, and charging cables for electric vehicles.',
  keywords = 'EV charging, electric vehicle charger, DC fast charger, charging station, portable EV charger, charging cables, Blaupunkt',
  ogImage = '/images/og-image.jpg',
  ogType = 'website',
  canonical,
  noindex = false,
}) => {
  const siteUrl = 'https://www.blaupunkt-ev.com' // Update with your actual domain
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : `${siteUrl}${window.location.pathname}`
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:site_name" content="Blaupunkt EV Charging" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* Additional SEO Tags */}
      <meta name="author" content="Blaupunkt" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
    </Helmet>
  )
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  ogImage: PropTypes.string,
  ogType: PropTypes.string,
  canonical: PropTypes.string,
  noindex: PropTypes.bool,
}

export default SEO
