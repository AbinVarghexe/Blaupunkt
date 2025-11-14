import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

const SEO = ({
  title = 'Blaupunkt EV Charging Solutions',
  description = 'Premium electric vehicle charging solutions from Blaupunkt. Discover our range of EV chargers, charging cables, and charging stations for home and commercial use.',
  keywords = 'EV charger, electric vehicle charging, EV charging station, charging cable, Blaupunkt, DC fast charging, portable EV charger',
  ogImage = '/Logo.svg',
  canonical = null,
}) => {
  const location = useLocation()
  const siteUrl = window.location.origin
  const currentUrl = canonical || `${siteUrl}${location.pathname}`

  useEffect(() => {
    // Update document title
    document.title = title

    // Update or create meta tags
    const updateMetaTag = (name, content, attribute = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    // Standard meta tags
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)

    // Open Graph meta tags
    updateMetaTag('og:title', title, 'property')
    updateMetaTag('og:description', description, 'property')
    updateMetaTag('og:url', currentUrl, 'property')
    updateMetaTag('og:type', 'website', 'property')
    updateMetaTag('og:image', `${siteUrl}${ogImage}`, 'property')

    // Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', `${siteUrl}${ogImage}`)

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', currentUrl)
  }, [title, description, keywords, ogImage, currentUrl, siteUrl])

  return null
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  ogImage: PropTypes.string,
  canonical: PropTypes.string,
}

export default SEO
