/**
 * Accudent Dental Lab Website - Main JavaScript
 * 
 * This file contains all the interactive functionality for the website.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // File upload interaction
    const fileUploadAreas = document.querySelectorAll('.upload-area');
    fileUploadAreas.forEach(area => {
        const input = area.querySelector('input[type="file"]');
        const preview = area.querySelector('.file-preview');
        
        if (!input) return;
        
        // Show file name when selected
        input.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                updateFilePreview(this.files[0], preview);
                area.classList.add('has-file');
            }
        });
        
        // Handle drag and drop
        area.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('drag-over');
        });
        
        area.addEventListener('dragleave', function() {
            this.classList.remove('drag-over');
        });
        
        area.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                input.files = e.dataTransfer.files;
                updateFilePreview(e.dataTransfer.files[0], preview);
                area.classList.add('has-file');
                
                // Trigger change event
                const event = new Event('change', { bubbles: true });
                input.dispatchEvent(event);
            }
        });
        
        // Click to select file
        area.addEventListener('click', function() {
            input.click();
        });
    });
    
    // Update STL upload wizard progress
    const wizardSteps = document.querySelectorAll('.wizard-step');
    if (wizardSteps.length > 0) {
        const progressBar = document.querySelector('.wizard-progress-bar');
        let activeIndex = -1;
        
        wizardSteps.forEach((step, index) => {
            if (step.classList.contains('active')) {
                activeIndex = index;
                
                // Mark all previous steps as completed
                for (let i = 0; i < index; i++) {
                    wizardSteps[i].classList.add('completed');
                }
                
                // Update progress bar
                if (progressBar) {
                    const progress = (index / (wizardSteps.length - 1)) * 100;
                    progressBar.style.width = `${progress}%`;
                }
            }
        });
    }
    
    // Form validation
    const forms = document.querySelectorAll('.needs-validation');
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            form.classList.add('was-validated');
        });
    });
});

/**
 * Updates the file preview area with file information
 */
function updateFilePreview(file, previewElement) {
    if (!previewElement) return;
    
    const maxSize = 100 * 1024 * 1024; // 100MB
    const fileName = file.name;
    const fileSize = file.size;
    const timestamp = new Date().toLocaleString();
    
    // Validate file type (STL only)
    const fileExtension = fileName.split('.').pop().toLowerCase();
    const isValidType = fileExtension === 'stl';
    
    // Validate file size
    const isValidSize = fileSize <= maxSize;
    
    // Create preview content
    let content = `
        <div class="text-start p-3 border rounded">
            <div class="d-flex align-items-center mb-2">
                <i class="fas fa-file-medical fa-lg me-2"></i>
                <h6 class="mb-0">${fileName}</h6>
            </div>
            <div class="small text-muted">
                <div>Size: ${formatFileSize(fileSize)}</div>
                <div>Added: ${timestamp}</div>
            </div>
            <div class="mt-2">
    `;
    
    if (!isValidType) {
        content += `<div class="alert alert-danger mb-0 py-1 px-2 small">Error: Only STL files are accepted.</div>`;
    } else if (!isValidSize) {
        content += `<div class="alert alert-danger mb-0 py-1 px-2 small">Error: File exceeds the 100MB limit.</div>`;
    } else {
        content += `<div class="text-success"><i class="fas fa-check-circle me-1"></i> File ready to upload</div>`;
    }
    
    content += `
            </div>
        </div>
    `;
    
    previewElement.innerHTML = content;
}

/**
 * Formats file size in a human-readable format
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
