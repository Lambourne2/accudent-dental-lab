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
    // Production: https://your-backend-url
    API_URL: 'http://localhost:3001',
    
    // Version information
    VERSION: '1.0.0',
    
    // Feature flags
    FEATURES: {
        ENABLE_TRACKING: false,
        ENABLE_NOTIFICATIONS: true
    }
};

console.log('Accudent configuration loaded:', window.ACCUDENT_CONFIG);
