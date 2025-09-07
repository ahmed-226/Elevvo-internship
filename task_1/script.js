const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');
const collapseBtn = document.getElementById('collapseBtn');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const overlay = document.getElementById('overlay');


let isMobile = window.innerWidth <= 1024;
let sidebarOpen = true;


function initializeSidebar() {
    updateBreakpoint();
    
    if (isMobile) {
        
        sidebar.classList.remove('open', 'collapsed');
        mainContent.classList.remove('collapsed');
        sidebarOpen = false;
    } else {
        
        sidebar.classList.remove('open');
        sidebar.classList.remove('collapsed');
        mainContent.classList.remove('collapsed');
        sidebarOpen = true;
    }
}


function updateBreakpoint() {
    const wasMobile = isMobile;
    isMobile = window.innerWidth <= 1024;
    
    
    if (wasMobile !== isMobile) {
        if (isMobile) {
            
            sidebar.classList.remove('collapsed');
            sidebar.classList.remove('open');
            mainContent.classList.remove('collapsed');
            overlay.classList.remove('active');
            sidebarOpen = false;
        } else {
            
            sidebar.classList.remove('open');
            mainContent.classList.remove('collapsed');
            overlay.classList.remove('active');
            sidebarOpen = true;
        }
    }
}


function toggleSidebar() {
    if (isMobile) {
        
        if (sidebarOpen) {
            closeMobileSidebar();
        } else {
            openMobileSidebar();
        }
    } else {
        
        if (sidebarOpen) {
            collapseDesktopSidebar();
        } else {
            expandDesktopSidebar();
        }
    }
}


function openMobileSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    sidebarOpen = true;
    
    
    document.body.style.overflow = 'hidden';
}

function closeMobileSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    sidebarOpen = false;
    
    
    document.body.style.overflow = '';
}


function collapseDesktopSidebar() {
    sidebar.classList.add('collapsed');
    mainContent.classList.add('collapsed');
    sidebarOpen = false;
}

function expandDesktopSidebar() {
    sidebar.classList.remove('collapsed');
    mainContent.classList.remove('collapsed');
    sidebarOpen = true;
}


collapseBtn.addEventListener('click', toggleSidebar);
mobileMenuBtn.addEventListener('click', toggleSidebar);
overlay.addEventListener('click', closeMobileSidebar);


window.addEventListener('resize', () => {
    updateBreakpoint();
});


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMobile && sidebarOpen) {
        closeMobileSidebar();
    }
});


const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        
        navLinks.forEach(l => l.classList.remove('active'));
        
        
        link.classList.add('active');
        
        
        if (isMobile && sidebarOpen) {
            closeMobileSidebar();
        }
    });
});


let touchStartX = 0;
let touchEndX = 0;

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0 && touchStartX < 50) {
            
            if (isMobile && !sidebarOpen) {
                openMobileSidebar();
            }
        } else if (swipeDistance < 0 && sidebarOpen) {
            
            if (isMobile) {
                closeMobileSidebar();
            }
        }
    }
}

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});


function addAnimationTiming() {
    sidebar.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    mainContent.style.transition = 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
}


document.addEventListener('DOMContentLoaded', () => {
    initializeSidebar();
    addAnimationTiming();
    
    
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }
});


function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


const debouncedResize = debounce(() => {
    updateBreakpoint();
}, 250);

window.addEventListener('resize', debouncedResize);


function enhanceAccessibility() {
    
    collapseBtn.setAttribute('aria-label', 'Toggle sidebar');
    mobileMenuBtn.setAttribute('aria-label', 'Open navigation menu');
    sidebar.setAttribute('aria-label', 'Main navigation');
    
    
    navLinks.forEach((link, index) => {
        link.setAttribute('tabindex', '0');
        
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                link.click();
            }
            
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextLink = navLinks[index + 1] || navLinks[0];
                nextLink.focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevLink = navLinks[index - 1] || navLinks[navLinks.length - 1];
                prevLink.focus();
            }
        });
    });
}


enhanceAccessibility();


window.SidebarController = {
    toggle: toggleSidebar,
    open: isMobile ? openMobileSidebar : expandDesktopSidebar,
    close: isMobile ? closeMobileSidebar : collapseDesktopSidebar,
    isOpen: () => sidebarOpen,
    isMobileView: () => isMobile
};
