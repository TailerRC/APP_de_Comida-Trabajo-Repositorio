
// ===== Carousel Functions =====
function carouselPrev() {
    const slide1 = document.getElementById('slide1');
    const slide2 = document.getElementById('slide2');
    const slide3 = document.getElementById('slide3');

    if (slide1.checked) {
        slide3.checked = true;
    } else if (slide2.checked) {
        slide1.checked = true;
    } else if (slide3.checked) {
        slide2.checked = true;
    }
}

function carouselNext() {
    const slide1 = document.getElementById('slide1');
    const slide2 = document.getElementById('slide2');
    const slide3 = document.getElementById('slide3');

    if (slide1.checked) {
        slide2.checked = true;
    } else if (slide2.checked) {
        slide3.checked = true;
    } else if (slide3.checked) {
        slide1.checked = true;
    }
}

// ===== Authentication Functions =====
function checkUserSession() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const perfilBtn = document.getElementById('perfil-btn');
    const perfilText = document.getElementById('perfil-text');
    
    if (currentUser) {
        // Usuario logueado
        if (perfilText) {
            perfilText.textContent = currentUser.nombreCompleto.split(' ')[0];
        }
        if (perfilBtn) {
            perfilBtn.href = 'perfil.html';
            perfilBtn.onclick = null; // Permitir navegación normal
        }
    } else {
        // Usuario no logueado
        if (perfilText) {
            perfilText.textContent = 'Perfil';
        }
        if (perfilBtn) {
            perfilBtn.href = '#';
            perfilBtn.onclick = function(e) {
                e.preventDefault();
                const modal = document.getElementById('login-modal');
                if (modal) modal.classList.add('active');
                return false;
            };
        }
    }
}


// Product Card Interactions
class ProductCards {
    constructor() {
        this.init();
    }
    
    init() {
        // Add to cart buttons
        const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.addToCart(e));
        });
        
        // Wishlist buttons
        const wishlistBtns = document.querySelectorAll('.action-btn:nth-child(2)');
        wishlistBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.toggleWishlist(e));
        });
        
        // Quick view buttons
        const quickViewBtns = document.querySelectorAll('.action-btn:nth-child(1)');
        quickViewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.quickView(e));
        });
    }
    
    addToCart(e) {
        const button = e.currentTarget;
        const originalText = button.textContent;
        
        // Animation
        button.textContent = '✓ Añadido';
        button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        // Show notification
        this.showNotification('Producto añadido al carrito', 'success');
        
        // Reset button after 2 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }, 2000);
    }
    
    toggleWishlist(e) {
        const button = e.currentTarget;
        const icon = button.querySelector('i');
        
        if (icon.classList.contains('fas')) {
            icon.classList.remove('fas');
            icon.classList.add('far');
            button.style.color = '#667eea';
            this.showNotification('Eliminado de favoritos', 'info');
        } else {
            icon.classList.remove('far');
            icon.classList.add('fas');
            button.style.color = '#ef4444';
            this.showNotification('Añadido a favoritos', 'success');
        }
    }
    
    quickView(e) {
        this.showNotification('Vista rápida disponible próximamente', 'info');
    }
    
    showNotification(message, type) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style notification
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#10b981' : type === 'info' ? '#3b82f6' : '#ef4444'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            font-weight: 500;
        `;
        
        // Add animation styles
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Newsletter Form
class Newsletter {
    constructor() {
        this.form = document.querySelector('.newsletter-form');
        this.input = this.form.querySelector('input');
        this.button = this.form.querySelector('.subscribe-btn');
        this.init();
    }
    
    init() {
        this.button.addEventListener('click', (e) => this.subscribe(e));
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.subscribe(e);
            }
        });
    }
    
    subscribe(e) {
        e.preventDefault();
        const email = this.input.value.trim();
        
        if (!this.validateEmail(email)) {
            this.showMessage('Por favor, introduce un correo válido', 'error');
            return;
        }
        
        // Simulate subscription
        this.button.textContent = 'Suscribiendo...';
        this.button.disabled = true;
        
        setTimeout(() => {
            this.showMessage('¡Gracias por suscribirte!', 'success');
            this.input.value = '';
            this.button.textContent = 'Suscribirse';
            this.button.disabled = false;
        }, 1500);
    }
    
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    showMessage(message, type) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        // Smooth scroll with header offset
        const header = document.querySelector('.header');
        const getHeaderOffset = () => (header ? header.offsetHeight : 0) + 8; // small extra gap

        const scrollToElement = (el) => {
            if (!el) return;
            const headerOffset = getHeaderOffset();
            const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = Math.max(elementPosition - headerOffset, 0);

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        };

        // Intercept anchor clicks
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href && href !== '#' && href !== '') {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        // Update URL without jumping
                        history.pushState(null, '', href);
                        scrollToElement(target);
                    }
                }
            });
        });

        // If page loads with a hash, adjust scroll after layout
        window.addEventListener('load', () => {
            const hash = window.location.hash;
            if (hash) {
                const target = document.querySelector(hash);
                if (target) setTimeout(() => scrollToElement(target), 50);
            }
        });

        // Handle programmatic hash changes
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash;
            if (hash) {
                const target = document.querySelector(hash);
                if (target) scrollToElement(target);
            }
        });
    }
}

// Category Cards Animation
class CategoryCards {
    constructor() {
        this.init();
    }
    
    init() {
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                const categoryName = card.querySelector('h3').textContent;
                this.showCategoryMessage(categoryName);
            });
        });
    }
    
    showCategoryMessage(category) {
        const notification = document.createElement('div');
        notification.textContent = `Explorando categoría: ${category}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 2500);
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements
        const animatedElements = document.querySelectorAll(
            '.feature-card, .category-card, .product-card, .brand-logo'
        );
        
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
            observer.observe(el);
        });
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check session at start
    checkUserSession();
    
    // Initialize product cards
    new ProductCards();
    
    // Initialize newsletter
    new Newsletter();
    
    // Initialize smooth scroll
    new SmoothScroll();
    
    // Initialize category cards
    new CategoryCards();
    
    // Initialize scroll animations
    new ScrollAnimations();
    
    // Login modal handlers
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorDiv = document.getElementById('login-error');
            
            const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
            const user = usuarios.find(u => u.email === email && u.password === password);
            
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                checkUserSession();
                
                // Close modal and redirect
                const modal = document.getElementById('login-modal');
                modal.classList.remove('active');
                
                alert('¡Sesión iniciada! Accediendo a tu perfil...');
                setTimeout(() => {
                    window.location.href = 'perfil.html';
                }, 500);
                
                loginForm.reset();
                if (errorDiv) errorDiv.style.display = 'none';
            } else {
                if (errorDiv) {
                    errorDiv.textContent = 'Correo electrónico o contraseña incorrectos.';
                    errorDiv.style.display = 'block';
                }
            }
        });
    }
    
    // Modal close handlers
    const modalClose = document.querySelector('.modal-close');
    const modal = document.getElementById('login-modal');
    
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
    
    // Toggle password visibility
    const togglePassword = document.querySelector('.modal .toggle-password');
    const passwordInput = document.getElementById('password');
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    }
    
    console.log('TechNow Landing Page Loaded Successfully! 🚀');
});

// Add scroll-to-top button
window.addEventListener('scroll', () => {
    let scrollButton = document.querySelector('.scroll-to-top');
    
    if (!scrollButton) {
        scrollButton = document.createElement('button');
        scrollButton.className = 'scroll-to-top';
        scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollButton.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #17a2b8 0%, #00d4ff 100%);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.2rem;
            cursor: pointer;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            transition: all 0.3s;
            opacity: 0;
            pointer-events: none;
        `;
        
        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(scrollButton);
    }
    
    if (window.scrollY > 300) {
        scrollButton.style.opacity = '1';
        scrollButton.style.pointerEvents = 'all';
    } else {
        scrollButton.style.opacity = '0';
        scrollButton.style.pointerEvents = 'none';
    }
});


