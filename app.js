// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize smooth animations
    initSmoothAnimations();
    
    // Initialize smooth scrolling for navigation links
    initSmoothScroll();
    
    // Initialize package buttons
    initPackageButtons();
    
    // Initialize service buttons (botões únicos)
    initServiceButtons();
    
    // Initialize mobile menu
    initMobileMenu();

    // Initialize icon rotations
    initIconRotations();

    // Add scroll indicator
    addScrollIndicator();
    
    // Initialize smooth page loading
    initSmoothPageLoad();
});

// Função para animações suaves sem "piscar"
function initSmoothAnimations() {
    const animatedElements = document.querySelectorAll('.smooth-fade-in, .smooth-slide-left, .smooth-slide-right');
    
    // Usar Intersection Observer para melhor performance
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -5% 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = parseInt(element.getAttribute('data-delay')) || 0;
                
                // Aplicar animação com delay suave
                setTimeout(() => {
                    element.style.animationPlayState = 'running';
                }, delay * 1000);
                
                // Parar de observar após animar
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observar todos os elementos
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Animar elementos do hero imediatamente
    setTimeout(() => {
        document.querySelectorAll('.hero .smooth-fade-in, .hero .smooth-slide-left').forEach(element => {
            element.style.animationPlayState = 'running';
        });
    }, 200);
}

// Função para scrolling suave
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link, a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Só interceptar links internos
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    // Fechar menu mobile se aberto
                    closeMobileMenu();
                    
                    // Scroll suave
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Função para botões de pacotes
function initPackageButtons() {
    const packageButtons = document.querySelectorAll('.package-btn');
    
    packageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageName = this.getAttribute('data-package');
            contactPackage(packageName);
            
            // Efeito visual de clique
            addClickEffect(this);
        });
    });
}

// Função para botões de serviços únicos
function initServiceButtons() {
    const serviceButtons = document.querySelectorAll('.service-unified-btn');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceName = this.getAttribute('data-service');
            contactService(serviceName);
            
            // Efeito visual de clique
            addClickEffect(this);
        });
    });
}

// Função para rotação suave dos ícones
function initIconRotations() {
    // Ícones dos serviços principais
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        const icon = card.querySelector('.service-icon');
        if (icon) {
            card.addEventListener('mouseenter', () => {
                icon.style.transform = 'rotate(360deg)';
            });
            
            card.addEventListener('mouseleave', () => {
                icon.style.transform = 'rotate(0deg)';
            });
        }
    });
    
    // Ícones dos serviços avulsos
    const serviceCategories = document.querySelectorAll('.service-category');
    serviceCategories.forEach(category => {
        const icon = category.querySelector('.service-category-icon');
        if (icon) {
            category.addEventListener('mouseenter', () => {
                icon.style.transform = 'rotate(360deg)';
            });
            
            category.addEventListener('mouseleave', () => {
                icon.style.transform = 'rotate(0deg)';
            });
        }
    });
}

// Função para contato de pacotes
function contactPackage(packageName) {
    const packages = {
        'START': {
            name: 'PLANO START',
            videos: '1 vídeo mensal',
            artes: '4 artes mensais', 
            fotos: '10 fotos mensais',
            valor: 'R$ 497/mês'
        },
        'GROWTH': {
            name: 'PLANO GROWTH',
            videos: '2 vídeos mensais',
            artes: '4 artes mensais',
            fotos: '10 fotos mensais', 
            valor: 'R$ 697/mês'
        },
        'PRO': {
            name: 'PLANO PRO',
            videos: '4 vídeos mensais',
            artes: '4 artes mensais',
            fotos: '10 fotos mensais',
            valor: 'R$ 897/mês'
        },
        'ELITE': {
            name: 'PLANO ELITE', 
            videos: '8 vídeos mensais',
            artes: '4 artes mensais',
            fotos: '10 fotos mensais',
            valor: 'R$ 1.297/mês'
        },
        'MASTER': {
            name: 'PLANO MASTER',
            videos: '12 vídeos mensais', 
            artes: '8 artes mensais',
            fotos: '10 fotos mensais',
            valor: 'R$ 1.997/mês'
        }
    };
    
    const selectedPackage = packages[packageName];
    if (selectedPackage) {
        const message = encodeURIComponent(
            `Olá! Tenho interesse no ${selectedPackage.name}:\n\n` +
            `📹 ${selectedPackage.videos}\n` +
            `🎨 ${selectedPackage.artes}\n` +
            `📸 ${selectedPackage.fotos}\n` +
            `💰 ${selectedPackage.valor}\n\n` +
            `Gostaria de mais informações sobre este pacote.`
        );
        const whatsappLink = `https://wa.me/5588996320934?text=${message}`;
        window.open(whatsappLink, '_blank');
    }
}

// Função para contato de serviços
function contactService(serviceName) {
    const message = encodeURIComponent(`Olá! Tenho interesse no serviço: ${serviceName}. Gostaria de mais informações.`);
    const whatsappLink = `https://wa.me/5588996320934?text=${message}`;
    window.open(whatsappLink, '_blank');
}

// Função para menu mobile
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            const isActive = nav.classList.contains('active');
            
            if (isActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
}

function openMobileMenu() {
    const nav = document.querySelector('.nav');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (nav && menuToggle) {
        nav.classList.add('active');
        menuToggle.innerHTML = '<i class="fas fa-times"></i>';
    }
}

function closeMobileMenu() {
    const nav = document.querySelector('.nav');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (nav && menuToggle) {
        nav.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
}

// Função para efeito de clique
function addClickEffect(element) {
    element.style.transform = 'scale(0.98)';
    setTimeout(() => {
        element.style.transform = '';
    }, 200);
}

// Parallax suave para hero
let ticking = false;
function updateParallax() {
    const scrollY = window.scrollY;
    const heroImg = document.querySelector('.hero-img');
    
    if (heroImg && scrollY < window.innerHeight) {
        heroImg.style.transform = `translateY(${scrollY * 0.01}px)`;
    }
    
    ticking = false;
}

function requestParallaxTick() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestParallaxTick);

// Indicador de scroll
function addScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        width: 0%;
        background: var(--gradient-primary);
        z-index: 9999;
        transition: width 0.2s var(--ease-smooth);
        pointer-events: none;
    `;
    document.body.appendChild(indicator);
    
    let scrollTicking = false;
    function updateScrollIndicator() {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        indicator.style.width = Math.min(scrolled, 100) + '%';
        scrollTicking = false;
    }
    
    function requestScrollTick() {
        if (!scrollTicking) {
            requestAnimationFrame(updateScrollIndicator);
            scrollTicking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollTick);
}

// Navegação ativa
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < (sectionTop + sectionHeight)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Throttled scroll handler para navegação
let navTicking = false;
function requestNavTick() {
    if (!navTicking) {
        requestAnimationFrame(updateActiveNavigation);
        navTicking = true;
    }
}

window.addEventListener('scroll', requestNavTick);

// Animação de números (contadores)
function animateNumbers() {
    const numbers = document.querySelectorAll('.price-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                const match = text.match(/R\$\s*(\d+(?:\.\d+)?)/);
                
                if (match && match[1]) {
                    const finalValue = parseInt(match[1].replace(/\./g, ''));
                    let currentValue = 0;
                    const duration = 1000;
                    const startTime = performance.now();
                    
                    function updateCounter(timestamp) {
                        const elapsed = timestamp - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        // Função de easing para suavidade
                        const easedProgress = 1 - Math.pow(1 - progress, 3);
                        currentValue = Math.floor(easedProgress * finalValue);
                        
                        element.textContent = text.replace(/(\d+(?:\.\d+)?)/, formatNumber(currentValue));
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            element.textContent = text; // Garantir valor final correto
                        }
                    }
                    
                    requestAnimationFrame(updateCounter);
                }
                
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    numbers.forEach(number => {
        observer.observe(number);
    });
}

// Formatar números com separador de milhares
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Carregamento suave da página
function initSmoothPageLoad() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s var(--ease-smooth)';
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
}

// Preload de imagens para melhor performance
function preloadImages() {
    const images = [
        'https://raw.githubusercontent.com/alissonsantosfreire/website2/refs/heads/main/Imagem%20principal.webp',
        'https://raw.githubusercontent.com/alissonsantosfreire/website2/refs/heads/main/Imagem%20secundária%201.webp',
        'https://raw.githubusercontent.com/alissonsantosfreire/website2/refs/heads/main/Imagem%20secundária%202.webp',
        'https://raw.githubusercontent.com/alissonsantosfreire/website2/refs/heads/main/Logo%20azul.svg',
        'https://raw.githubusercontent.com/alissonsantosfreire/website2/refs/heads/main/Logo.svg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Hover effects para cards
function initHoverEffects() {
    // Package cards
    const packageCards = document.querySelectorAll('.package-card');
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = 'var(--shadow-xl)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Contact methods
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach(method => {
        const icon = method.querySelector('.contact-icon');
        
        method.addEventListener('mouseenter', function() {
            if (icon) {
                icon.style.transform = 'scale(1.05) rotate(5deg)';
            }
        });
        
        method.addEventListener('mouseleave', function() {
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // WhatsApp float button
    const whatsappFloat = document.querySelector('.whatsapp-float a');
    if (whatsappFloat) {
        whatsappFloat.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.animationPlayState = 'paused';
        });
        
        whatsappFloat.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.animationPlayState = 'running';
        });
    }
    
    // Buttons click effect
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            addClickEffect(this);
        });
    });
}

// Handle resize events
function handleResize() {
    const nav = document.querySelector('.nav');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (window.innerWidth > 768) {
        if (nav && nav.classList.contains('active')) {
            closeMobileMenu();
        }
    }
}

window.addEventListener('resize', handleResize);

// Initialize everything after page load
window.addEventListener('load', function() {
    preloadImages();
    animateNumbers();
    initHoverEffects();
});

// Performance optimization: use passive listeners where possible
window.addEventListener('scroll', requestParallaxTick, { passive: true });
window.addEventListener('scroll', requestScrollTick, { passive: true });
window.addEventListener('scroll', requestNavTick, { passive: true });

// Focus management for accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('using-keyboard');
});

// Add custom styles for animations and effects
const style = document.createElement('style');
style.textContent = `
    .using-keyboard .btn:focus,
    .using-keyboard .nav-link:focus {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
    }
    
    .service-icon,
    .service-category-icon {
        will-change: transform;
    }
    
    .package-card,
    .service-card,
    .service-category,
    .term-item,
    .specialty-item {
        will-change: transform, box-shadow;
    }
    
    .contact-icon {
        will-change: transform;
    }
`;
document.head.appendChild(style);