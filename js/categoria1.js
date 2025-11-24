// ========================================
// JAVASCRIPT COMPLETO PARA PÁGINA DE CATEGORÍA
// Archivo: categoria1.js
// Descripción: Incluye navbar, modal y lógica de categoría
// ========================================

// ========================================
// AUTENTICACIÓN Y SESIÓN
// ========================================
function checkUserSession() {
    const userName = localStorage.getItem('userName');
    const userLink = document.querySelector('.icon-link[href="#login"]');
    
    if (userName && userLink) {
        userLink.innerHTML = `<i class="fas fa-user-circle"></i> ${userName}`;
        userLink.href = "#perfil";
        userLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('¿Deseas cerrar sesión?')) {
                localStorage.removeItem('userName');
                location.reload();
            }
        });
    }
}

// ========================================
// MANEJO DEL MODAL DE LOGIN
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const loginModal = document.getElementById('login-modal');
    const loginLinks = document.querySelectorAll('a[href="#login"]');
    const modalClose = document.querySelector('.modal-close');
    const loginForm = document.getElementById('login-form');
    const togglePassword = document.querySelector('.toggle-password');

    // Abrir modal
    loginLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal?.classList.add('active');
        });
    });

    // Cerrar modal
    modalClose?.addEventListener('click', () => {
        loginModal?.classList.remove('active');
    });

    loginModal?.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
    });

    // Submit login
    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email')?.value;
        const password = document.getElementById('login-password')?.value;
        
        if (email && password) {
            const userName = email.split('@')[0];
            localStorage.setItem('userName', userName);
            loginModal?.classList.remove('active');
            checkUserSession();
            showNotification('¡Inicio de sesión exitoso!');
        }
    });

    // Toggle password visibility
    togglePassword?.addEventListener('click', function() {
        const passwordInput = document.getElementById('login-password');
        const type = passwordInput?.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput?.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });

    // Verificar sesión al cargar
    checkUserSession();
});

// ========================================
// FUNCIONES DE NOTIFICACIÓN
// ========================================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10001;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================================
// LÓGICA DE FILTROS DE CATEGORÍA
// ========================================

class CategoryFilters {
    constructor() {
        this.filters = {
            brand: '',
            processor: '',
            ram: '',
            storage: '',
            screen: '',
            priceMin: '',
            priceMax: ''
        };
        this.sortBy = 'relevance';
        this.currentPage = 1;
        this.init();
    }

    init() {
        // Listeners para filtros
        document.getElementById('filter-brand')?.addEventListener('change', (e) => {
            this.filters.brand = e.target.value;
        });

        document.getElementById('filter-processor')?.addEventListener('change', (e) => {
            this.filters.processor = e.target.value;
        });

        document.getElementById('filter-ram')?.addEventListener('change', (e) => {
            this.filters.ram = e.target.value;
        });

        document.getElementById('filter-storage')?.addEventListener('change', (e) => {
            this.filters.storage = e.target.value;
        });

        document.getElementById('filter-screen')?.addEventListener('change', (e) => {
            this.filters.screen = e.target.value;
        });

        document.getElementById('price-min')?.addEventListener('input', (e) => {
            this.filters.priceMin = e.target.value;
        });

        document.getElementById('price-max')?.addEventListener('input', (e) => {
            this.filters.priceMax = e.target.value;
        });

        // Listener para ordenamiento
        document.getElementById('sort-by')?.addEventListener('change', (e) => {
            this.sortBy = e.target.value;
            this.applySort();
        });

        // Botones de filtros
        document.querySelector('.apply-filters')?.addEventListener('click', () => {
            this.applyFilters();
        });

        document.querySelector('.clear-filters')?.addEventListener('click', () => {
            this.clearFilters();
        });

        // Paginación
        this.initPagination();
    }

    applyFilters() {
        const activeFilters = [];
        
        if (this.filters.brand) activeFilters.push(`Marca: ${this.filters.brand}`);
        if (this.filters.processor) activeFilters.push(`Procesador: ${this.filters.processor}`);
        if (this.filters.ram) activeFilters.push(`RAM: ${this.filters.ram}`);
        if (this.filters.storage) activeFilters.push(`Almacenamiento: ${this.filters.storage}`);
        if (this.filters.screen) activeFilters.push(`Pantalla: ${this.filters.screen}`);
        if (this.filters.priceMin || this.filters.priceMax) {
            const min = this.filters.priceMin || '0';
            const max = this.filters.priceMax || '∞';
            activeFilters.push(`Precio: $${min} - $${max}`);
        }

        if (activeFilters.length > 0) {
            this.showNotification(
                `Filtros aplicados: ${activeFilters.join(', ')}`,
                'success'
            );
        } else {
            this.showNotification('No se han seleccionado filtros', 'info');
        }

        // Aquí iría la lógica real de filtrado de productos
        console.log('Filtros aplicados:', this.filters);
    }

    clearFilters() {
        // Resetear todos los filtros
        this.filters = {
            brand: '',
            processor: '',
            ram: '',
            storage: '',
            screen: '',
            priceMin: '',
            priceMax: ''
        };

        // Resetear elementos del DOM
        document.getElementById('filter-brand').value = '';
        document.getElementById('filter-processor').value = '';
        document.getElementById('filter-ram').value = '';
        document.getElementById('filter-storage').value = '';
        document.getElementById('filter-screen').value = '';
        document.getElementById('price-min').value = '';
        document.getElementById('price-max').value = '';

        this.showNotification('Filtros limpiados', 'info');
        
        // Aquí iría la lógica para mostrar todos los productos
        console.log('Filtros limpiados');
    }

    applySort() {
        const sortLabels = {
            'relevance': 'Más Relevante',
            'price-low': 'Precio: Menor a Mayor',
            'price-high': 'Precio: Mayor a Menor',
            'rating': 'Mejor Valorados',
            'newest': 'Más Recientes'
        };

        this.showNotification(
            `Ordenando por: ${sortLabels[this.sortBy]}`,
            'info'
        );

        // Aquí iría la lógica real de ordenamiento
        console.log('Ordenar por:', this.sortBy);
    }

    initPagination() {
        const paginationBtns = document.querySelectorAll('.pagination-btn');
        
        paginationBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const btnText = e.target.textContent.trim();
                
                if (btnText === 'Anterior') {
                    this.previousPage();
                } else if (btnText === 'Siguiente') {
                    this.nextPage();
                } else if (!isNaN(btnText)) {
                    this.goToPage(parseInt(btnText));
                }
            });
        });
    }

    goToPage(pageNum) {
        this.currentPage = pageNum;
        
        // Actualizar botones activos
        document.querySelectorAll('.pagination-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.trim() === String(pageNum)) {
                btn.classList.add('active');
            }
        });

        // Scroll al inicio de productos
        document.querySelector('.products-area')?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });

        this.showNotification(`Página ${pageNum}`, 'info');
        
        // Aquí iría la lógica para cargar productos de la página
        console.log('Ir a página:', pageNum);
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.goToPage(this.currentPage - 1);
        }
    }

    nextPage() {
        const maxPages = 10; // Este valor vendría del backend
        if (this.currentPage < maxPages) {
            this.goToPage(this.currentPage + 1);
        }
    }

    showNotification(message, type = 'info') {
        // Remover notificación existente
        const existingNotification = document.querySelector('.category-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Crear notificación
        const notification = document.createElement('div');
        notification.className = `category-notification notification-${type}`;
        notification.textContent = message;

        // Estilos de notificación
        const bgColors = {
            'success': '#10b981',
            'info': '#3b82f6',
            'warning': '#f59e0b',
            'error': '#ef4444'
        };

        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${bgColors[type] || bgColors.info};
            color: white;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            font-weight: 500;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Clase para manejo de productos en la categoría
class CategoryProducts {
    constructor() {
        this.init();
    }

    init() {
        // Listeners para botones de productos
        const viewDetailsBtns = document.querySelectorAll('.add-to-cart-btn');
        viewDetailsBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productCard = e.target.closest('.product-card');
                const productName = productCard.querySelector('.product-name')?.textContent;
                this.viewProductDetails(productName);
            });
        });

        // Listeners para vista rápida y favoritos (reutilizando de main.js)
        const quickViewBtns = document.querySelectorAll('.action-btn .fa-eye');
        quickViewBtns.forEach(btn => {
            btn.parentElement.addEventListener('click', (e) => {
                e.preventDefault();
                const productCard = e.target.closest('.product-card');
                const productName = productCard.querySelector('.product-name')?.textContent;
                this.showNotification(`Vista rápida: ${productName}`, 'info');
            });
        });
    }

    viewProductDetails(productName) {
        this.showNotification(`Abriendo detalles de: ${productName}`, 'info');
        // Aquí iría la redirección a la página de detalles del producto
        console.log('Ver detalles de:', productName);
    }

    showNotification(message, type = 'info') {
        const bgColors = {
            'success': '#10b981',
            'info': '#3b82f6',
            'warning': '#f59e0b',
            'error': '#ef4444'
        };

        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${bgColors[type]};
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

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar filtros de categoría
    new CategoryFilters();
    
    // Inicializar productos de categoría
    new CategoryProducts();
    
    console.log('Página de categoría cargada exitosamente! 🛍️');
});
