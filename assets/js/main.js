/**
 * ECCOX Dashboards Gallery
 * Main JavaScript
 */

// Smooth scroll behavior
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth reveal animation to cards
    const cards = document.querySelectorAll('.dashboard-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        observer.observe(card);
    });
});

// Add hover effect enhancement
document.querySelectorAll('.dashboard-card:not(.card-placeholder)').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease';
    });
});

// Track analytics (optional - can be removed if not needed)
function trackDashboardView(dashboardName) {
    console.log(`Dashboard viewed: ${dashboardName}`);
    // Add Google Analytics or other tracking here if needed
}
