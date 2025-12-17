/**
 * ECCOX Dashboard Viewer
 * Dashboard Page JavaScript
 */

// Hide loading overlay when iframe loads
window.addEventListener('load', function() {
    const iframe = document.getElementById('powerbiFrame');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const authOverlay = document.getElementById('authOverlay');
    
    if (iframe && loadingOverlay) {
        // Hide loading after initial attempt (10 seconds timeout)
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
        }, 10000);
        
        // Listen for iframe load
        iframe.addEventListener('load', function() {
            setTimeout(() => {
                loadingOverlay.classList.add('hidden');
            }, 500);
        });
        
        // Listen for iframe errors
        iframe.addEventListener('error', function() {
            loadingOverlay.classList.add('hidden');
            if (authOverlay) {
                authOverlay.style.display = 'flex';
            }
        });
    }
});

// Function to reload dashboard
function reloadDashboard() {
    const iframe = document.getElementById('powerbiFrame');
    const authOverlay = document.getElementById('authOverlay');
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    if (authOverlay) {
        authOverlay.style.display = 'none';
    }
    
    if (loadingOverlay) {
        loadingOverlay.classList.remove('hidden');
    }
    
    if (iframe) {
        iframe.src = iframe.src;
    }
}

// Fullscreen toggle functionality
function toggleFullscreen() {
    const container = document.querySelector('.dashboard-container');
    
    if (!document.fullscreenElement) {
        container.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
        container.classList.add('fullscreen');
    } else {
        document.exitFullscreen();
        container.classList.remove('fullscreen');
    }
}

// Listen for fullscreen changes
document.addEventListener('fullscreenchange', function() {
    const container = document.querySelector('.dashboard-container');
    
    if (!document.fullscreenElement) {
        container.classList.remove('fullscreen');
    }
});

// ESC key to exit fullscreen
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.fullscreenElement) {
        document.exitFullscreen();
    }
});

// Add keyboard shortcut (F for fullscreen)
document.addEventListener('keydown', function(e) {
    if (e.key === 'f' && !e.ctrlKey && !e.altKey && !e.metaKey) {
        const target = e.target;
        // Only trigger if not typing in an input
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            toggleFullscreen();
        }
    }
});

// Track dashboard viewing time (optional analytics)
let viewStartTime = Date.now();

window.addEventListener('beforeunload', function() {
    const viewDuration = Math.round((Date.now() - viewStartTime) / 1000);
    console.log(`Dashboard viewed for ${viewDuration} seconds`);
    // Add analytics tracking here if needed
});
