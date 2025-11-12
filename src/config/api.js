/**
 * API Configuration
 * 
 * This file centralizes all API endpoint configurations for the application.
 * 
 * PRODUCTION DEPLOYMENT (Hostinger):
 * - API is served from the same domain as the frontend
 * - No VITE_API_URL needed - uses relative paths
 * - PHP backend files are in /public/api/ directory
 * - Example: https://yourdomain.com/api/contact.php
 * 
 * DEVELOPMENT/LOCAL:
 * - Set VITE_API_URL in .env.local to point to your local PHP server
 * - Example: VITE_API_URL=http://localhost:8000
 * 
 * Environment Variables:
 * - VITE_API_URL: Optional. Base URL for API endpoints (default: empty string for same domain)
 */

// Get API base URL from environment variable, or use empty string for same-domain requests
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const apiConfig = {
  baseUrl: API_BASE_URL,
  endpoints: {
    // Contact form endpoint - Points to PHP script in public/api/
    // Using Microsoft Graph API with OAuth 2.0 authentication
    // In production: /api/contact-graph.php (relative to site root)
    // In development: ${VITE_API_URL}/api/contact-graph.php (if VITE_API_URL is set)
    contact: `${API_BASE_URL}/api/contact-graph.php`
  }
};

/**
 * Helper function to make API calls with consistent configuration
 * 
 * @param {string} endpoint - API endpoint (full URL or path)
 * @param {object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise<Response>} - Fetch response object
 * 
 * Usage:
 *   const response = await apiCall('/api/contact.php', {
 *     method: 'POST',
 *     body: JSON.stringify(data)
 *   });
 */
export const apiCall = async (endpoint, options = {}) => {
  // Build full URL: use endpoint as-is if it starts with http, otherwise prepend base URL
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  // Make fetch request with default JSON headers
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',  // Default content type
      ...options.headers  // Allow override with custom headers
    }
  });

  return response;
};
