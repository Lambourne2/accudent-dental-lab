const fs = require('fs');
const path = require('path');

// Configuration
const rootDir = __dirname;
const footerPath = path.join(rootDir, 'templates', 'footer.html');
const htmlFiles = [];

// Find all HTML files in the project
getAllFiles(rootDir, htmlFiles, '.html');

// Process each HTML file
htmlFiles.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Skip if already processed
        if (content.includes('data-include="footer"')) {
            console.log(`Skipping already processed file: ${file}`);
            return;
        }
        
        // Find the footer section
        const footerRegex = /<footer[\s\S]*?<\/footer>/i;
        const hasFooter = footerRegex.test(content);
        
        if (hasFooter) {
            // Replace existing footer with our template include
            content = content.replace(footerRegex, '<div data-include="footer"></div>');
            
            // Add the footer script just before the closing body tag if not present
            if (!content.includes('data-include="footer"')) {
                const bodyCloseTag = '</body>';
                const footerScript = `
    <!-- Load Footer -->
    <script>
        // Load footer into all elements with data-include="footer"
        document.addEventListener('DOMContentLoaded', function() {
            const footerElements = document.querySelectorAll('[data-include="footer"]');
            if (footerElements.length > 0) {
                fetch('/templates/footer.html')
                    .then(response => response.text())
                    .then(html => {
                        footerElements.forEach(element => {
                            element.outerHTML = html;
                        });
                    })
                    .catch(error => {
                        console.error('Error loading footer:', error);
                    });
            }
        });
    </script>
`;
                content = content.replace(bodyCloseTag, footerScript + '\n' + bodyCloseTag);
            }
            
            // Save the updated file
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Updated footer in: ${file}`);
        } else {
            console.log(`No footer found in: ${file}`);
        }
    } catch (error) {
        console.error(`Error processing file ${file}:`, error);
    }
});

console.log('Footer update complete!');

// Helper function to get all files with a specific extension recursively
function getAllFiles(dir, fileList, extension) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            // Skip node_modules and .git directories
            if (file !== 'node_modules' && !file.startsWith('.') && file !== 'templates') {
                getAllFiles(filePath, fileList, extension);
            }
        } else if (file.endsWith(extension)) {
            fileList.push(filePath);
        }
    });
}
