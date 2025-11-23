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
  ogTitle,
  ogDescription,
  twitterTitle,
  twitterDescription,
}) => {
  const siteUrl = 'https://blaupunkt-ev.com'

  let fullCanonical
  if (canonical) {
    fullCanonical = canonical.startsWith('http')
      ? canonical
      : `${siteUrl}${canonical}`
  } else if (typeof window !== 'undefined') {
    fullCanonical = `${siteUrl}${window.location.pathname}`
  } else {
    fullCanonical = siteUrl
  }

  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`

  const finalOgTitle = ogTitle || title
  const finalOgDescription = ogDescription || description
  const finalTwitterTitle = twitterTitle || finalOgTitle
  const finalTwitterDescription = twitterDescription || finalOgDescription

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
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:site_name" content="Blaupunkt EV Charging" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={finalTwitterTitle} />
      <meta name="twitter:description" content={finalTwitterDescription} />
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
  ogTitle: PropTypes.string,
  ogDescription: PropTypes.string,
  twitterTitle: PropTypes.string,
  twitterDescription: PropTypes.string,
}

export default SEO
