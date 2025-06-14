// Universal Navigation System for Accudent Dental Lab
(function() {
    // Configuration
    const config = {
        basePath: '/accudent-dental-lab', // Base path for GitHub Pages
        isLocal: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
        pages: {
            home: { path: '/html/index.html', title: 'Home' },
            upload: { path: '/html/upload.html', title: 'Send a Case' },
            materials: { path: '/html/materials.html', title: 'Materials' },
            contact: { path: '/html/contact.html', title: 'Contact Us' },
            login: { path: '/html/auth/login.html', title: 'Login' },
            // Material subpages
            emax: { path: '/html/materials/emax.html', title: 'e.max' },
            bruxzirFull: { path: '/html/materials/bruxzir-full.html', title: 'BruxZir Full Strength' },
            bruxzirEsthetic: { path: '/html/materials/bruxzir-esthetic.html', title: 'BruxZir Esthetic' },
            zirconia3d: { path: '/html/materials/3d-zirconia.html', title: '3D Zirconia' },
            translucentZirconia: { path: '/html/materials/translucent-zirconia.html', title: 'Translucent Zirconia' },
            noritakeCzr: { path: '/html/materials/noritake-czr.html', title: 'Noritake CZR' },
            customAbutments: { path: '/html/materials/custom-abutments.html', title: 'Custom Implant Abutments' }
        }
    };

    // Get current page
    function getCurrentPage() {
        const path = window.location.pathname;
        const page = Object.entries(config.pages).find(([_, page]) => 
            path.endsWith(page.path) || 
            (path.endsWith('/') && page.path === 'index.html') ||
            path.includes(page.path.replace('.html', '/'))
        );
        return page ? page[0] : null;
    }

    // Generate correct URL for navigation
    function getUrl(path) {
        // Handle empty or root path
        if (!path || path === '/' || path === './' || path === '.') {
            return config.isLocal ? '/html/index.html' : `${config.basePath}/`;
        }
        
        // Handle index.html specifically
        if (path === 'index.html' || path.endsWith('/index.html')) {
            return config.isLocal ? '/html/index.html' : `${config.basePath}/`;
        }
        
        // Handle hash links
        if (path.startsWith('#')) {
            return path;
        }
        
        // Handle absolute URLs (http/https)
        if (path.startsWith('http') || path.startsWith('//')) {
            return path;
        }
        
        // For local development
        if (config.isLocal) {
            // If path already starts with /html/, use as is
            if (path.startsWith('/html/')) {
                return path;
            }
            
            // Handle root-relative paths (starting with /)
            if (path.startsWith('/')) {
                return path;
            }
            
            // Handle parent directory references
            if (path.startsWith('../')) {
                return path;
            }
            
            // For other paths, make them root-relative
            return `/html/${path}`.replace(/\/+/g, '/');
        }
        
        // For GitHub Pages (production)
        if (path.startsWith('/')) {
            return `${config.basePath}${path}`.replace(/\/+/g, '/');
        }
        
        // For relative paths in production
        return `${config.basePath}/${path}`.replace(/\/+/g, '/');
    }

    // Create navigation HTML
    function createNavigation() {
        const currentPage = getCurrentPage();
        const isMaterialsSection = currentPage && currentPage !== 'materials' && 
            ['emax', 'bruxzirFull', 'bruxzirEsthetic', 'zirconia3d', 'translucentZirconia', 'noritakeCzr', 'customAbutments'].includes(currentPage);

        return `
        <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
            <div class="container">
                <a class="navbar-brand d-flex align-items-center" href="${getUrl('index.html')}">
                    <img src="${config.isLocal ? '..' : ''}/images/AccudentLogoBlackTransparent.png" 
                         alt="Accudent Dental Lab" height="60" class="me-2" onerror="this.onerror=null; this.src='${config.isLocal ? '..' : ''}/images/AccudentLogoBlackTransparent.png';">
                    <div class="d-none d-md-block">
                        <div class="fw-bold">Accudent Dental Lab</div>
                        <div class="small text-muted">West Jordan, UT</div>
                    </div>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="mainNavbar">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link ${currentPage === 'home' ? 'active' : ''}" 
                               href="${getUrl('index.html')}">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link ${currentPage === 'upload' ? 'active' : ''}" 
                               href="${getUrl(config.pages.upload.path)}">Send a Case</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle ${isMaterialsSection || currentPage === 'materials' ? 'active' : ''}" 
                               href="#" id="materialsDropdown" role="button" data-bs-toggle="dropdown" 
                               aria-expanded="false">Materials</a>
                            <ul class="dropdown-menu" aria-labelledby="materialsDropdown">
                                <li><a class="dropdown-item ${currentPage === 'materials' ? 'active' : ''}" 
                                      href="${getUrl(config.pages.materials.path)}">Overview</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item ${currentPage === 'emax' ? 'active' : ''}" 
                                      href="${getUrl(config.pages.emax.path)}">e.max</a></li>
                                <li><a class="dropdown-item ${currentPage === 'bruxzirFull' ? 'active' : ''}" 
                                      href="${getUrl(config.pages.bruxzirFull.path)}">BruxZir Full Strength</a></li>
                                <li><a class="dropdown-item ${currentPage === 'bruxzirEsthetic' ? 'active' : ''}" 
                                      href="${getUrl(config.pages.bruxzirEsthetic.path)}">BruxZir Esthetic</a></li>
                                <li><a class="dropdown-item ${currentPage === 'zirconia3d' ? 'active' : ''}" 
                                      href="${getUrl(config.pages.zirconia3d.path)}">3D Zirconia</a></li>
                                <li><a class="dropdown-item ${currentPage === 'translucentZirconia' ? 'active' : ''}" 
                                      href="${getUrl(config.pages.translucentZirconia.path)}">Translucent Zirconia</a></li>
                                <li><a class="dropdown-item ${currentPage === 'noritakeCzr' ? 'active' : ''}" 
                                      href="${getUrl(config.pages.noritakeCzr.path)}">Noritake CZR</a></li>
                                <li><a class="dropdown-item ${currentPage === 'customAbutments' ? 'active' : ''}" 
                                      href="${getUrl(config.pages.customAbutments.path)}">Custom Implant Abutments</a></li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link ${currentPage === 'contact' ? 'active' : ''}" 
                               href="${getUrl(config.pages.contact.path)}">Contact Us</a>
                        </li>
                        <li class="nav-item ms-2 d-flex align-items-center">
                            <a class="btn btn-outline-primary" 
                               href="${getUrl(config.pages.login.path)}">
                                <i class="fas fa-user me-1"></i> Login
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>`;
    }

    // Add navigation to the page
    function initNavigation() {
        // Check if navigation already exists
        const existingNav = document.querySelector('nav.navbar');
        if (existingNav) {
            return; // Navigation already exists, don't add it again
        }
        
        // Create or get navigation container
        let navContainer = document.getElementById('navigation-container');
        if (!navContainer) {
            navContainer = document.createElement('div');
            navContainer.id = 'navigation-container';
            document.body.insertBefore(navContainer, document.body.firstChild);
        }
        
        // Add navigation HTML
        navContainer.innerHTML = createNavigation();
        
        // Add styles if not already added
        if (!document.getElementById('nav-styles')) {
            const style = document.createElement('style');
            style.id = 'nav-styles';
            style.textContent = `
                .navbar {
                    padding: 0.5rem 0;
                }
                .navbar-brand {
                    padding: 0;
                    margin-right: 1.5rem;
                }
                .nav-link {
                    font-weight: 500;
                    padding: 0.5rem 1rem !important;
                    transition: color 0.2s;
                }
                .nav-link:hover, .nav-link:focus {
                    color: var(--primary) !important;
                }
                .nav-link.active {
                    color: var(--primary) !important;
                    font-weight: 600;
                    position: relative;
                }
                .nav-link.active:after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 1rem;
                    right: 1rem;
                    height: 2px;
                    background-color: var(--primary);
                }
                .dropdown-menu {
                    border: none;
                    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
                    border-radius: 0.5rem;
                    padding: 0.5rem 0;
                    margin-top: 0.5rem;
                }
                .dropdown-item {
                    padding: 0.5rem 1.5rem;
                    transition: all 0.2s;
                }
                .dropdown-item:hover, .dropdown-item:focus {
                    background-color: rgba(13, 110, 253, 0.05);
                    color: var(--primary);
                }
                .dropdown-item.active, .dropdown-item:active {
                    background-color: var(--primary);
                }
                .btn-outline-primary {
                    border-width: 2px;
                    font-weight: 500;
                    transition: all 0.2s;
                }
                .btn-outline-primary:hover {
                    background-color: var(--primary);
                    border-color: var(--primary);
                }
                @media (max-width: 991.98px) {
                    .navbar-collapse {
                        padding: 1rem 0;
                    }
                    .nav-item {
                        margin: 0.25rem 0;
                    }
                    .btn-outline-primary {
                        margin-top: 0.5rem;
                        width: 100%;
                    }
                    .nav-link.active:after {
                        display: none;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Initialize navigation and footer when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize navigation
        initNavigation();
        
        // Load footer if the container exists
        const footerContainer = document.querySelector('[data-include="footer"]');
        if (footerContainer) {
            const templatePath = '/templates/footer.html';
            fetch(templatePath)
                .then(response => {
                    if (!response.ok) throw new Error('Failed to load footer');
                    return response.text();
                })
                .then(html => {
                    footerContainer.outerHTML = html;
                })
                .catch(error => {
                    console.error('Error loading footer:', error);
                    // Fallback footer
                    footerContainer.outerHTML = `
                        <footer class="bg-dark text-white py-3 text-center">
                            <div class="container">
                                <p class="mb-0">&copy; 2025 Accudent Dental Lab. All rights reserved.</p>
                            </div>
                        </footer>`;
                });
        }
    });
})();
