const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Configuration
const rootDir = __dirname;
const checkedUrls = new Set();
const brokenLinks = [];

// Files to check (relative to rootDir)
const filesToCheck = [
    'index.html',
    'html/upload.html',
    'html/contact.html',
    'html/auth/login.html',
    'html/auth/register.html',
    'html/materials.html',
    'html/materials/emax.html',
    'html/materials/bruxzir-full.html',
    'html/materials/bruxzir-esthetic.html',
    'html/materials/3d-zirconia.html',
    'html/materials/translucent-zirconia.html',
    'html/materials/noritake-czr.html',
    'html/materials/custom-abutments.html'
];

// Normalize path for comparison
function normalizePath(p) {
    return p.replace(/\\/g, '/').toLowerCase();
}

// Check if a file exists
function fileExists(filePath) {
    try {
        return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
}

// Process a single HTML file
async function processFile(filePath) {
    if (!fileExists(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const baseUrl = 'file://' + path.resolve(filePath).replace(/\\/g, '/');
    const dom = new JSDOM(content, { url: baseUrl });
    const document = dom.window.document;

    // Check all links
    const links = document.querySelectorAll('a[href]');
    for (const link of links) {
        let href = link.getAttribute('href');
        
        // Skip external links, email, tel, and anchors
        if (!href || href.startsWith('http') || href.startsWith('mailto:') || 
            href.startsWith('tel:') || href.startsWith('#')) {
            continue;
        }

        // Create a cache key
        const cacheKey = `${filePath} -> ${href}`;
        if (checkedUrls.has(cacheKey)) continue;
        checkedUrls.add(cacheKey);

        // Resolve the path
        let targetPath;
        if (href.startsWith('/')) {
            // Absolute path from site root
            targetPath = path.join(rootDir, href.replace(/^\//, ''));
        } else {
            // Relative path
            targetPath = path.resolve(path.dirname(filePath), href);
        }

        // Normalize the path
        targetPath = path.normalize(targetPath);

        // Check if the file exists
        if (!fileExists(targetPath)) {
            console.error(`Broken link: ${href} in ${filePath}`);
            console.error(`  Resolved to: ${targetPath}`);
            brokenLinks.push({ 
                from: path.relative(rootDir, filePath), 
                to: href, 
                resolved: path.relative(rootDir, targetPath) 
            });
        }
    }
}

// Main function
async function main() {
    console.log('Checking links...');
    
    for (const file of filesToCheck) {
        const filePath = path.join(rootDir, file);
        const basePath = 'file://' + path.dirname(filePath).replace(/\\/g, '/') + '/';
        await processFile(filePath, basePath);
    }

    // Print summary
    console.log('\nLink check complete!');
    if (brokenLinks.length > 0) {
        console.log('\nBroken links found:');
        brokenLinks.forEach(link => {
            console.log(`- From: ${link.from}`);
            console.log(`  To: ${link.to}`);
            if (link.resolved) console.log(`  Resolved to: ${link.resolved}`);
            if (link.error) console.log(`  Error: ${link.error}`);
        });
    } else {
        console.log('No broken links found!');
    }
}

main().catch(console.error);
