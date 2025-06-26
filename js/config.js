/**
 * Accudent Dental Lab - Configuration File
 * 
 * This file contains environment-specific configuration settings.
 * Edit this file before deployment to configure API endpoints and other settings.
 */

// Global configuration object
window.ACCUDENT_CONFIG = {
    // API URL - Change this when deploying
    // Development: http://localhost:3001
    // Production: The Google Cloud Run service URL
    API_URL: window.location.hostname === 'localhost' ? 'http://localhost:3001' : 'https://accudent-backend-service-443391063980.us-central1.run.app',
    
    // Version information
    VERSION: '1.0.0',
    
    // Feature flags
    FEATURES: {
        ENABLE_TRACKING: false,
        ENABLE_NOTIFICATIONS: true
    }
};

console.log('Accudent configuration loaded:', window.ACCUDENT_CONFIG);
