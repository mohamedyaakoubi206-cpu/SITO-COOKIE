// ===== GLOBAL STATE =====
let currentLang = 'it';
let demoActive = false;
let currentPage = window.location.pathname.split('/').pop() || 'index.html';

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initApplication();
});

// ===== INITIALIZATION =====
function initApplication() {
    // Set active navigation links
    setActiveNavLink();
    setActiveSidebarLink();
    
    // Initialize all components
    initAnimations();
    initLanguageSwitcher();
    initThemeSwitcher();
    initMobileSidebar();
    initDemo();
    initModals();
    initToolFunctions();
    
    // Initialize scroll effects
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Initialize hash navigation
    initHashNavigation();
    
    // Show cookie banner after delay
    setTimeout(() => {
        simulateCookieBanner();
    }, 2000);
}

// ===== NAVIGATION =====
function setActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    if (!navLinks.length) return;
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

function setActiveSidebarLink() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    if (!sidebarLinks.length) return;
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const hash = window.location.hash;
    
    sidebarLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        // Check if link matches current page
        if (href && href.includes(currentPage)) {
            link.classList.add('active');
        }
        
        // Check if link matches hash
        if (hash && href && href.includes(hash)) {
            link.classList.add('active');
        }
    });
}

// ===== NAVBAR SCROLL EFFECT =====
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ===== LANGUAGE SWITCHER =====
function initLanguageSwitcher() {
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    
    if (!langBtn || !langDropdown) return;
    
    langBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        langDropdown.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
            langDropdown.classList.remove('show');
        }
    });
    
    // Handle language selection
    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
            langDropdown.classList.remove('show');
        });
    });
}

function changeLanguage(lang) {
    currentLang = lang;
    const flag = lang === 'it' ? '🇮🇹' : 
                lang === 'en' ? '🇬🇧' : 
                lang === 'fr' ? '🇫🇷' : '🇩🇪';
    
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.innerHTML = `
            <span class="lang-flag">${flag}</span>
            <span>${lang.toUpperCase()}</span>
            <i class="fas fa-chevron-down"></i>
        `;
    }
    
    showNotification(`Lingua cambiata in ${getLanguageName(lang)}`);
}

function getLanguageName(lang) {
    const names = {
        'it': 'Italiano',
        'en': 'English',
        'fr': 'Français',
        'de': 'Deutsch'
    };
    return names[lang] || lang;
}

// ===== THEME SWITCHER =====
function initThemeSwitcher() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    if (savedTheme === 'light') {
        themeToggle.checked = true;
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// ===== MOBILE SIDEBAR =====
function initMobileSidebar() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (!menuToggle || !sidebar) return;
    
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        sidebar.classList.toggle('active');
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 1200 && 
            sidebar && 
            !sidebar.contains(e.target) && 
            menuToggle && 
            !menuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });
    
    // Close sidebar when clicking on a link
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 1200) {
                sidebar.classList.remove('active');
            }
        });
    });
}

// ===== MODALS =====
function initModals() {
    // Close modal when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.show').forEach(modal => {
                closeModal(modal.id);
            });
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// ===== DEMO FUNCTIONS =====
function initDemo() {
    // Initialize demo if exists on page
    if (document.getElementById('demoViz')) {
        // Demo already initialized in HTML
    }
}

function startDemo() {
    const demoViz = document.getElementById('demoViz');
    if (!demoViz) return;
    
    demoActive = true;
    
    demoViz.innerHTML = `
        <div style="display: flex; height: 100%; align-items: center; justify-content: center;">
            <div style="text-align: center; max-width: 600px; padding: 2rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                    <div class="site" style="text-align: center;">
                        <div style="width: 80px; height: 80px; background: var(--primary); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-weight: bold;">A</div>
                        <div>Sito A</div>
                    </div>
                    <div style="font-size: 2rem; color: var(--primary);">→</div>
                    <div class="tracker" style="text-align: center;">
                        <div style="width: 80px; height: 80px; background: var(--secondary); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-weight: bold;">T</div>
                        <div>Tracker</div>
                    </div>
                    <div style="font-size: 2rem; color: var(--primary);">→</div>
                    <div class="site" style="text-align: center;">
                        <div style="width: 80px; height: 80px; background: var(--primary); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-weight: bold;">B</div>
                        <div>Sito B</div>
                    </div>
                </div>
                <div style="background: var(--dark-1); padding: 1rem; border-radius: var(--radius-sm); margin-top: 2rem; border: 1px solid rgba(255,255,255,0.1);">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                        <div style="width: 12px; height: 12px; background: var(--primary); border-radius: 50%;"></div>
                        <span>Cookie impostato su Sito A</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <div style="width: 12px; height: 12px; background: var(--secondary); border-radius: 50%;"></div>
                        <span>Cookie riconosciuto su Sito B</span>
                    </div>
                </div>
                <div style="margin-top: 2rem; padding: 1rem; background: rgba(99, 102, 241, 0.1); border-radius: var(--radius-sm);">
                    <p style="margin: 0; color: var(--primary);">🎯 Il tracker riconosce lo stesso utente su siti diversi!</p>
                </div>
            </div>
        </div>
    `;
    
    showNotification('Demo avviata! Osserva come il tracker riconosce lo stesso utente tra siti diversi.');
}

function resetDemo() {
    const demoViz = document.getElementById('demoViz');
    if (!demoViz) return;
    
    demoActive = false;
    demoViz.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; height: 100%; color: var(--light-3);">
            <div style="text-align: center;">
                <i class="fas fa-play-circle" style="font-size: 3rem; margin-bottom: 1rem; color: var(--primary);"></i>
                <p>Clicca "Avvia Demo" per vedere il funzionamento<br>del tracciamento cross-site</p>
            </div>
        </div>
    `;
}

function playDemoAnimation() {
    const demoAnimation = document.getElementById('demoAnimation');
    if (!demoAnimation) return;
    
    demoAnimation.innerHTML = `
        <div style="position: relative; height: 100%;">
            <div id="cookieAnimation" style="position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 40px; height: 40px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">🍪</div>
        </div>
    `;
    
    const cookie = document.getElementById('cookieAnimation');
    if (!cookie) return;
    
    let position = 0;
    const animation = setInterval(() => {
        position += 2;
        cookie.style.left = position + '%';
        
        if (position >= 80) {
            clearInterval(animation);
            cookie.innerHTML = '✅';
            setTimeout(() => {
                cookie.innerHTML = '🍪';
                cookie.style.left = '0%';
            }, 1000);
        }
    }, 20);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.custom-notification').forEach(n => n.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'error' ? 'var(--danger)' : type === 'success' ? 'var(--secondary)' : 'var(--primary)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-sm);
        box-shadow: var(--shadow-lg);
        z-index: 2000;
        animation: slideInRight 0.3s ease-out;
        max-width: 350px;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        border-left: 4px solid ${type === 'error' ? 'var(--danger-dark)' : type === 'success' ? 'var(--secondary-dark)' : 'var(--primary-dark)'};
    `;
    
    const icon = type === 'error' ? 'exclamation-circle' : 
                 type === 'success' ? 'check-circle' : 'info-circle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeIn 0.3s ease-out reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Add fade-in class to elements with delay
    document.querySelectorAll('.fade-in').forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add float animation to some elements
    document.querySelectorAll('.float').forEach(el => {
        el.style.animationDelay = `${Math.random() * 2}s`;
    });
}

// ===== HASH NAVIGATION =====
function initHashNavigation() {
    // Handle initial hash
    highlightCurrentSection();
    
    // Handle hash changes
    window.addEventListener('hashchange', highlightCurrentSection);
}

function highlightCurrentSection() {
    const hash = window.location.hash;
    if (hash) {
        const element = document.querySelector(hash);
        if (element) {
            // Scroll to element
            setTimeout(() => {
                element.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Add highlight
                const originalBackground = element.style.backgroundColor;
                element.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
                element.style.transition = 'background-color 0.3s ease';
                
                // Remove highlight after 2 seconds
                setTimeout(() => {
                    element.style.backgroundColor = originalBackground;
                }, 2000);
            }, 100);
        }
    }
}

// ===== BREADCRUMB =====
function updateBreadcrumb(pageName) {
    const breadcrumb = document.getElementById('breadcrumb');
    if (breadcrumb) {
        breadcrumb.innerHTML = `
            <a href="index.html" class="breadcrumb-item">
                <i class="fas fa-home"></i> Home
            </a>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-item">${pageName}</span>
        `;
    }
}

// ===== TOOL FUNCTIONS =====
function initToolFunctions() {
    // Initialize tool-related event listeners
    initScanTool();
    initCodeCopy();
}

function initScanTool() {
    const scanButton = document.getElementById('scanButton');
    if (scanButton) {
        scanButton.addEventListener('click', scanWebsite);
    }
    
    const scanInput = document.getElementById('scanUrl');
    if (scanInput) {
        scanInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                scanWebsite();
            }
        });
    }
}

function scanWebsite() {
    const urlInput = document.getElementById('scanUrl');
    const resultsDiv = document.getElementById('scanResults');
    
    if (!urlInput || !resultsDiv) return;
    
    const url = urlInput.value.trim();
    if (!url) {
        showNotification('Inserisci un URL valido', 'error');
        urlInput.focus();
        return;
    }
    
    // Validate URL format
    try {
        new URL(url);
    } catch (e) {
        showNotification('URL non valido. Usa il formato: https://example.com', 'error');
        return;
    }
    
    // Show loading state
    resultsDiv.innerHTML = `
        <div style="padding: 2rem; text-align: center;">
            <div class="spinner" style="width: 40px; height: 40px; border: 3px solid rgba(99, 102, 241, 0.3); border-top: 3px solid var(--primary); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
            <div style="color: var(--light-3);">Scansione in corso...</div>
            <div style="color: var(--light-3); font-size: 0.875rem; margin-top: 0.5rem;">Analisi di: ${url}</div>
        </div>
    `;
    
    // Simulate scan (in real app, this would be an API call)
    setTimeout(() => {
        showScanResults(url);
    }, 2000);
}

function showScanResults(url) {
    const resultsDiv = document.getElementById('scanResults');
    if (!resultsDiv) return;
    
    resultsDiv.innerHTML = `
        <div style="padding: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem;">
                <div>
                    <h4 style="color: white; margin-bottom: 0.5rem;">Risultati Scansione</h4>
                    <div style="color: var(--light-3); font-size: 0.875rem; word-break: break-all;">${url}</div>
                </div>
                <button class="btn" onclick="downloadScanReport()" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                    <i class="fas fa-download"></i>
                    <span>Scarica Report</span>
                </button>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                <div style="background: var(--dark-1); padding: 1.5rem; border-radius: var(--radius-sm); text-align: center;">
                    <div style="font-size: 2rem; color: var(--primary); font-weight: bold;">14</div>
                    <div style="color: var(--light-3); font-size: 0.875rem;">Cookie Totali</div>
                </div>
                <div style="background: var(--dark-1); padding: 1.5rem; border-radius: var(--radius-sm); text-align: center;">
                    <div style="font-size: 2rem; color: var(--danger); font-weight: bold;">9</div>
                    <div style="color: var(--light-3); font-size: 0.875rem;">Cookie Terze Parti</div>
                </div>
                <div style="background: var(--dark-1); padding: 1.5rem; border-radius: var(--radius-sm); text-align: center;">
                    <div style="font-size: 2rem; color: var(--warning); font-weight: bold;">5</div>
                    <div style="color: var(--light-3); font-size: 0.875rem;">Cookie Prime Parti</div>
                </div>
                <div style="background: var(--dark-1); padding: 1.5rem; border-radius: var(--radius-sm); text-align: center;">
                    <div style="font-size: 2rem; color: var(--info); font-weight: bold;">3</div>
                    <div style="color: var(--light-3); font-size: 0.875rem;">Tracker Rilevati</div>
                </div>
            </div>
            
            <div style="background: var(--dark-1); padding: 1.5rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem;">
                <h5 style="color: white; margin-bottom: 1rem;">
                    <i class="fas fa-shield-alt"></i> Valutazione Conformità
                </h5>
                <div style="color: var(--light-3); line-height: 1.6;">
                    <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                        <i class="fas fa-check-circle" style="color: var(--secondary); margin-right: 0.5rem;"></i>
                        <span>Banner cookie presente</span>
                    </div>
                    <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                        <i class="fas fa-times-circle" style="color: var(--danger); margin-right: 0.5rem;"></i>
                        <span>Consenso non granulare</span>
                    </div>
                    <div style="display: flex; align-items: center;">
                        <i class="fas fa-check-circle" style="color: var(--secondary); margin-right: 0.5rem;"></i>
                        <span>Informativa privacy accessibile</span>
                    </div>
                </div>
            </div>
            
            <div style="background: var(--dark-1); padding: 1.5rem; border-radius: var(--radius-sm);">
                <h5 style="color: white; margin-bottom: 1rem;">
                    <i class="fas fa-bullseye"></i> Tracker Identificati
                </h5>
                <div style="color: var(--light-3);">
                    <div style="margin-bottom: 0.5rem; padding: 0.5rem; background: rgba(239, 68, 68, 0.1); border-radius: var(--radius-sm);">
                        • Google Analytics (analytics.google.com)
                    </div>
                    <div style="margin-bottom: 0.5rem; padding: 0.5rem; background: rgba(239, 68, 68, 0.1); border-radius: var(--radius-sm);">
                        • Facebook Pixel (connect.facebook.net)
                    </div>
                    <div style="padding: 0.5rem; background: rgba(239, 68, 68, 0.1); border-radius: var(--radius-sm);">
                        • Google Tag Manager (googletagmanager.com)
                    </div>
                </div>
            </div>
        </div>
    `;
    
    showNotification('Scansione completata!', 'success');
}

function downloadScanReport() {
    showNotification('Report PDF generato e scaricato', 'success');
    // In a real app, this would generate and download a PDF report
}

function initCodeCopy() {
    // Initialize copy buttons
    document.querySelectorAll('[onclick*="copyCode"]').forEach(button => {
        const originalOnClick = button.getAttribute('onclick');
        button.removeAttribute('onclick');
        button.addEventListener('click', function() {
            const codeId = originalOnClick.match(/copyCode\('([^']+)'\)/)[1];
            copyCode(codeId);
        });
    });
}

function copyCode(codeId) {
    const codeElement = document.getElementById(codeId);
    if (!codeElement) return;
    
    const codeText = codeElement.textContent;
    
    navigator.clipboard.writeText(codeText).then(() => {
        showNotification('Codice copiato negli appunti!', 'success');
    }).catch(err => {
        showNotification('Errore nella copia del codice', 'error');
        console.error('Failed to copy:', err);
    });
}

// ===== COOKIE BANNER =====
function simulateCookieBanner() {
    // Check if banner already exists
    if (document.getElementById('cookieBanner')) return;
    
    // Don't show if user has already made a choice
    if (localStorage.getItem('cookieConsent')) return;
    
    const banner = document.createElement('div');
    banner.id = 'cookieBanner';
    banner.className = 'cookie-banner';
    banner.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--dark-2);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: var(--radius-lg);
        padding: 1.5rem;
        max-width: 500px;
        width: 90%;
        z-index: 1001;
        box-shadow: var(--shadow-2xl);
        animation: fadeIn 0.5s ease-out;
    `;
    
    banner.innerHTML = `
        <div style="display: flex; align-items: flex-start; gap: 1rem;">
            <div style="font-size: 1.5rem; color: var(--primary); flex-shrink: 0;">
                <i class="fas fa-cookie-bite"></i>
            </div>
            <div style="flex: 1;">
                <h4 style="margin-bottom: 0.5rem; color: white;">Gestione dei Cookie</h4>
                <p style="color: var(--light-3); font-size: 0.875rem; margin-bottom: 1.5rem; line-height: 1.5;">
                    Utilizziamo cookie tecnici e, previo tuo consenso, cookie di terze parti per analizzare il traffico.
                    Puoi gestire le tue preferenze nelle impostazioni.
                    <a href="privacy.html" style="color: var(--primary); text-decoration: none;">Maggiori informazioni</a>
                </p>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    <button onclick="acceptAllCookies()" class="btn" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                        <i class="fas fa-check"></i>
                        <span>Accetta tutti</span>
                    </button>
                    <button onclick="customizeCookies()" class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                        <i class="fas fa-sliders-h"></i>
                        <span>Personalizza</span>
                    </button>
                    <button onclick="rejectAllCookies()" style="padding: 0.5rem 1rem; font-size: 0.875rem; background: transparent; border: 1px solid var(--light-3); color: var(--light-3); border-radius: var(--radius-sm); cursor: pointer; transition: var(--transition);">
                        <i class="fas fa-times"></i>
                        <span>Rifiuta tutti</span>
                    </button>
                </div>
            </div>
            <button onclick="closeCookieBanner()" style="background: none; border: none; color: var(--light-3); cursor: pointer; flex-shrink: 0; padding: 0.25rem;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(banner);
}

function acceptAllCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentTimestamp', Date.now());
    showNotification('Preferenze cookie salvate: tutti accettati', 'success');
    closeCookieBanner();
}

function customizeCookies() {
    openModal('cookieSettingsModal');
}

function rejectAllCookies() {
    localStorage.setItem('cookieConsent', 'rejected');
    localStorage.setItem('cookieConsentTimestamp', Date.now());
    showNotification('Cookie di terze parti rifiutati', 'success');
    closeCookieBanner();
}

function closeCookieBanner() {
    const banner = document.getElementById('cookieBanner');
    if (banner) {
        banner.style.animation = 'fadeIn 0.3s ease-out reverse';
        setTimeout(() => {
            if (banner.parentNode) {
                banner.remove();
            }
        }, 300);
    }
}

// ===== UTILITY FUNCTIONS =====
function downloadPDF() {
    showNotification('Download PDF iniziato...', 'info');
    // In a real implementation, this would trigger a PDF download
}

function shareContent() {
    if (navigator.share) {
        navigator.share({
            title: 'Cookie Analytics Pro',
            text: 'Scopri tutto sui cookie di terze parti',
            url: window.location.href
        }).then(() => {
            showNotification('Contenuto condiviso con successo!', 'success');
        }).catch(err => {
            console.error('Errore nella condivisione:', err);
            copyToClipboard(window.location.href);
        });
    } else {
        copyToClipboard(window.location.href);
        showNotification('Link copiato! Condividilo manualmente.', 'info');
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copiato negli appunti!', 'success');
    }).catch(err => {
        showNotification('Errore nella copia', 'error');
        console.error('Failed to copy:', err);
    });
}

// ===== PAGE LOADING =====
function loadPageContent(page, section = '') {
    if (section) {
        window.location.href = `${page}#${section}`;
    } else {
        window.location.href = page;
    }
}

// ===== ADDITIONAL ANIMATIONS =====
// Add spin animation for spinners
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }
    
    .pulse {
        animation: pulse 2s ease-in-out infinite;
    }
`;
document.head.appendChild(style);

// ===== WINDOW RESIZE HANDLER =====
window.addEventListener('resize', function() {
    // Close sidebar on resize to desktop
    const sidebar = document.getElementById('sidebar');
    if (sidebar && window.innerWidth > 1200) {
        sidebar.classList.remove('active');
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    showNotification('Si è verificato un errore nell\'applicazione', 'error');
});

// ===== EXPORT FUNCTIONS FOR HTML ONCLICK =====
// Make functions available globally for onclick handlers
window.openModal = openModal;
window.closeModal = closeModal;
window.startDemo = startDemo;
window.resetDemo = resetDemo;
window.playDemoAnimation = playDemoAnimation;
window.acceptAllCookies = acceptAllCookies;
window.customizeCookies = customizeCookies;
window.rejectAllCookies = rejectAllCookies;
window.closeCookieBanner = closeCookieBanner;
window.scanWebsite = scanWebsite;
window.downloadScanReport = downloadScanReport;
window.copyCode = copyCode;
window.downloadPDF = downloadPDF;
window.shareContent = shareContent;
window.copyToClipboard = copyToClipboard;
window.loadPageContent = loadPageContent;

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApplication);
} else {
    initApplication();
}