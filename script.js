// Script para animaciones de aparición al hacer scroll
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar el observador de animaciones
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elementsToAnimate = document.querySelectorAll('.fade-in-up');
    elementsToAnimate.forEach(el => observer.observe(el));

    // Script para el año actual en el footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Script para la barra de navegación
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link'); 
    const mobileNavLinks = document.querySelectorAll('.nav-link-mobile'); 
    const sections = document.querySelectorAll('section[id]');
    let initialNavbarTop = 0;
    if (navbar) initialNavbarTop = navbar.offsetTop;

    function updateActiveLink() {
        if (!navbar) return;
        let currentSectionId = '';
        const navbarHeight = navbar.classList.contains('fixed') ? navbar.offsetHeight : 0;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 70;
            if (pageYOffset >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active-nav-link-desktop', 'font-semibold');
        });

        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active-nav-link-desktop', 'font-semibold');
            }
        });

        mobileNavLinks.forEach(link => {
            link.classList.remove('bg-blue-100', 'text-blue-700', 'font-semibold');
            link.classList.add('text-gray-700');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('bg-blue-100', 'text-blue-700', 'font-semibold');
                link.classList.remove('text-gray-700');
            }
        });
        
        const heroLinkDesktop = document.querySelector('a.nav-link[href="#hero"]');
        const heroLinkMobile = document.querySelector('a.nav-link-mobile[href="#hero"]');

        if ((!currentSectionId && window.pageYOffset < (sections[0] ? sections[0].offsetTop - navbarHeight - 70 : window.innerHeight)) || currentSectionId === 'hero') {
            if(heroLinkDesktop) {
                navLinks.forEach(l => { if(l !== heroLinkDesktop) l.classList.remove('active-nav-link-desktop', 'font-semibold'); });
                heroLinkDesktop.classList.add('active-nav-link-desktop', 'font-semibold');
            }
            if(heroLinkMobile) {
                mobileNavLinks.forEach(l => { if(l !== heroLinkMobile) {l.classList.remove('bg-blue-100', 'text-blue-700', 'font-semibold'); l.classList.add('text-gray-700');}});
                heroLinkMobile.classList.add('bg-blue-100', 'text-blue-700', 'font-semibold');
                heroLinkMobile.classList.remove('text-gray-700');
            }
        }
    }

    window.onscroll = () => {
        if (!navbar) return;
        if (window.pageYOffset > initialNavbarTop) {
            if (!navbar.classList.contains('fixed')) {
                navbar.classList.add('fixed');
                document.body.style.paddingTop = navbar.offsetHeight + 'px';
            }
        } else {
            if (navbar.classList.contains('fixed')) {
                navbar.classList.remove('fixed');
                document.body.style.paddingTop = '0';
            }
        }
        updateActiveLink();
    };

    updateActiveLink();
    if (typeof Event === 'function') { window.dispatchEvent(new Event('scroll')); }
    else { const event = document.createEvent('Event'); event.initEvent('scroll', true, true); window.dispatchEvent(event); }

    // Funcionalidad del Menú Móvil
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');

    if (mobileMenuButton && mobileMenu && hamburgerIcon && closeIcon) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            mobileMenu.classList.toggle('opacity-0');
            mobileMenu.classList.toggle('-translate-y-2');
            hamburgerIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
            document.body.classList.toggle('overflow-hidden');
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenu.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                    mobileMenu.classList.add('opacity-0', '-translate-y-2');
                    hamburgerIcon.classList.remove('hidden');
                    closeIcon.classList.add('hidden');
                    document.body.classList.remove('overflow-hidden');
                }
            });
        });
    }

    // Inicializar el botón de IA
    initializeAIAgent();

    // Funcionalidad del Logo Modal
    const logo = document.querySelector('.company-logo');
    const logoModal = document.getElementById('logoModal');

    if (logo && logoModal) {
        logo.addEventListener('click', () => {
            logoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        logoModal.addEventListener('click', (e) => {
            if (e.target === logoModal) {
                logoModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && logoModal.classList.contains('active')) {
                logoModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

// Botón Agente IA
function initializeAIAgent() {
    const aiButton = document.getElementById('ai-agent-button');
    if (aiButton) {
        aiButton.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            // Remover modal existente si hay uno
            const existingModal = document.getElementById('ai-message-modal');
            const existingOverlay = document.getElementById('ai-modal-overlay');
            if (existingModal) existingModal.remove();
            if (existingOverlay) existingOverlay.remove();

            // Crear overlay
            const overlay = document.createElement('div');
            overlay.id = 'ai-modal-overlay';
            Object.assign(overlay.style, {
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: '1000'
            });

            // Crear modal
            const modal = document.createElement('div');
            modal.id = 'ai-message-modal';
            Object.assign(modal.style, { 
                position: 'fixed', 
                left: '50%', 
                top: '50%', 
                transform: 'translate(-50%, -50%)', 
                backgroundColor: 'white', 
                padding: '2rem', 
                borderRadius: '0.5rem', 
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
                zIndex: '1001',
                minWidth: '300px',
                maxWidth: '90%'
            });
            
            modal.innerHTML = `
                <div class="text-center">
                    <h3 class="text-xl font-semibold text-gray-800 mb-4">Contactando al Agente IA</h3>
                    <p class="text-gray-600 mb-4">Estamos preparando tu asistente virtual...</p>
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <button id="close-ai-modal" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Cerrar</button>
                </div>
            `;

            // Agregar al DOM
            document.body.appendChild(overlay);
            document.body.appendChild(modal);

            // Manejar cierre del modal
            const closeModal = () => {
                modal.remove();
                overlay.remove();
            };

            document.getElementById('close-ai-modal').onclick = closeModal;
            overlay.onclick = closeModal;

            // Cerrar con Escape
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeModal();
                }
            });
        });
    }
} 