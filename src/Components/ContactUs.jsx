import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from './Common/Breadcrumb';
import { createSimpleBreadcrumbs } from '../Data/Common/utilities';
import { createLogger } from '../utils/logger';
import { apiConfig } from '../config/api';

const logger = createLogger('ContactUs');

const ContactUs = () => {
    const navigate = useNavigate();
    const breadcrumbItems = createSimpleBreadcrumbs('Contact');
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    /**
     * Handle contact form submission
     * @param {Event} e - Form submit event
     * 
     * IMPORTANT: This function handles the entire form submission flow including:
     * - Client-side validation (trim whitespace and check for empty fields)
     * - API call to PHP backend (contact.php)
     * - Response parsing (avoiding "Body already consumed" error)
     * - Success/error feedback to user via toast notifications
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Step 1: Trim whitespace from all form fields to prevent empty submissions
            // This prevents users from submitting spaces-only values
            const trimmedData = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                message: formData.message.trim()
            };

            // Step 2: Client-side validation - Check for empty fields after trimming
            // These checks provide immediate feedback before making API call
            if (!trimmedData.name) {
                toast.error('Please enter your name', { duration: 4000 });
                setLoading(false);
                return;
            }
            if (!trimmedData.email) {
                toast.error('Please enter your email', { duration: 4000 });
                setLoading(false);
                return;
            }
            if (!trimmedData.message) {
                toast.error('Please enter a message', { duration: 4000 });
                setLoading(false);
                return;
            }

            // Step 3: Log submission details (helpful for debugging)
            logger.info('Submitting form to:', apiConfig.endpoints.contact);
            logger.info('Form data:', trimmedData);

            // Step 4: Make API call to PHP backend
            // Endpoint: /api/contact.php (configured in src/config/api.js)
            const response = await fetch(apiConfig.endpoints.contact, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',  // Tell server we're sending JSON
                    'Accept': 'application/json'          // Tell server we expect JSON back
                },
                body: JSON.stringify(trimmedData)  // Convert JavaScript object to JSON string
            });

            // Step 5: Log response details for debugging
            logger.info('Response status:', response.status);
            logger.info('Response headers:', Object.fromEntries(response.headers.entries()));

            // Step 6: Read response body as text FIRST
            // CRITICAL: Response body can only be read ONCE!
            // We read as text first, then parse as JSON when needed
            // This prevents "Body has already been consumed" error
            const responseText = await response.text();
            logger.info('Raw response:', responseText);

            // Step 7: Handle non-OK responses (4xx, 5xx errors)
            if (!response.ok) {
                let errorDetails = '';
                try {
                    // Try to parse error response as JSON
                    const errorData = JSON.parse(responseText);
                    errorDetails = errorData.error || errorData.message || '';
                    logger.error('Server error details:', errorData);
                } catch (parseErr) {
                    // If not JSON, use raw text (first 100 chars)
                    errorDetails = responseText.substring(0, 100);
                    logger.error('Server error (non-JSON):', responseText);
                }
                
                throw new Error(`Server error: ${response.status}${errorDetails ? ' - ' + errorDetails : ''}`);
            }

            // Step 8: Parse successful response as JSON
            let data;
            try {
                data = JSON.parse(responseText);
                logger.info('Response data:', data);
            } catch (parseErr) {
                logger.error('Failed to parse JSON response:', responseText);
                throw new Error('Server returned invalid JSON response');
            }

            // Step 9: Handle success/failure based on response data
            if (data.success) {
                // Success: Show confirmation, clear form, redirect after 2 seconds
                toast.success('Message sent successfully!', { duration: 6000 });
                setFormData({ name: '', email: '', phone: '', message: '' });
                
                // Optional: Redirect to contact page after successful submission
                setTimeout(() => {
                    navigate('/contact');
                }, 2000);
            } else {
                // Server processed request but returned failure
                toast.error(data.message || 'Failed to send message. Please try again.', { duration: 6000 });
            }
        } catch (err) {
            // Step 10: Catch and handle any errors during the entire process
            logger.error('Contact form submission error:', err);
            
            // Provide user-friendly error messages based on error type
            let errorMessage = '⚠️ An error occurred. Please try again.';
            
            // Network errors (no internet, server unreachable)
            if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
                errorMessage = '⚠️ Cannot connect to server. Please check your internet connection.';
            } 
            // Server errors (500, 502, 503, etc.)
            else if (err.message.includes('500')) {
                errorMessage = '⚠️ Server error. The backend may not be properly configured. Please contact support.';
            } 
            // CORS errors (cross-origin request blocked)
            else if (err.message.includes('CORS')) {
                errorMessage = '⚠️ Access denied. Please ensure the backend allows requests from this domain.';
            } 
            // Use specific error message if available
            else if (err.message) {
                errorMessage = `⚠️ ${err.message}`;
            }
            
            // Display error to user
            toast.error(errorMessage, { duration: 8000 });
        } finally {
            // Always reset loading state, whether success or error
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            {/* Toast container */}
            <Toaster position="top-center" reverseOrder={false} />

            <div className="max-w-2xl mx-auto">
                {/* Breadcrumb */}
                <div className="mb-24 hidden md:block">
                    <Breadcrumb items={breadcrumbItems} />
                </div>

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight font-inter">Contact Us</h1>
                    <p className="text-blaupunkt-secondary font-medium text-md">
                        Have questions or need assistance? We're here to help.
                    </p>
                </div>

                {/* Contact Form */}
                <div className="rounded-2xl p-4 mb-12">
                    <form onSubmit={handleSubmit} className="space-y-2">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-5 py-2 border-2 border-blue-300 rounded-2xl focus:ring-0 focus:border-blue-400 placeholder-gray-400 text-gray-700 text-base font-normal transition-colors bg-blue-50/30"
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-5 py-2 border-2 border-blue-300 rounded-2xl focus:ring-0 focus:border-blue-400 placeholder-gray-400 text-gray-700 text-base font-normal transition-colors bg-blue-50/30"
                            required
                        />

                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="placeholder-blue-800 w-full px-5 py-2 border-2 border-blue-300 rounded-2xl focus:ring-0 focus:border-blue-400 text-gray-700 text-base font-normal transition-colors bg-blue-50/30"
                            required
                        />

                        <textarea
                            name="message"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={8}
                            className="placeholder-500 w-full px-5 py-2 border-2 border-blue-300 rounded-2xl focus:ring-0 focus:border-blue-400 placeholder-gray-400 text-gray-700 text-base font-normal resize-none transition-colors bg-blue-50/30"
                            required
                        />

                        <div className="flex justify-end pt-0">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-8 py-2 rounded-xl font-medium text-base shadow-sm transition-colors focus:ring-0 focus:outline-none 
                                    ${loading
                                        ? 'bg-blue-700 text-white cursor-not-allowed'
                                        : 'bg-blue-900 text-white hover:bg-blue-700'
                                    }`}
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <svg
                                            className="animate-spin h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                                            ></path>
                                        </svg>
                                        Sending...
                                    </div>
                                ) : (
                                    'Submit'
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Office Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:py-8 px-8 flex flex-col items-center md:items-start">
                        <h3 className="text-xl font-semibold text-blaupunkt-primary-darker mb-3 font-myriad">Head Office</h3>
                        <div className="space-y-3 text-blaupunkt-secondary text-sm text-center md:text-left">
                            <p>BLP EV Systems ApS<br />Ediths Allé 8<br />5250 Odense SV<br />Denmark</p>
                        </div>
                    </div>

                    <div className="md:py-8 px-8 flex flex-col items-center md:items-end">
                        <h3 className="text-xl font-semibold text-blaupunkt-primary-darker mb-3 font-myriad">UAE Office</h3>
                        <div className="space-y-3 text-blaupunkt-secondary text-sm text-center md:text-right">
                            <p>
                                BLP EV Systems – FZCO<br />
                                Building A1, Dubai Digital Park<br />
                                Dubai Silicon Oasis, Dubai<br />
                                United Arab Emirates
                            </p>
                        </div>
                        <div className="space-y-3 text-blaupunkt-secondary text-sm text-center md:text-right mt-2 font-myriad">
                            <p>
                                TEL: <a href="tel:+971558882595" className="text-blue-600 hover:underline">+971 55 888 2595</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
