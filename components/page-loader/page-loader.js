/**
 * ========================================
 * COMPONENTE: PAGE LOADER / TRANSICIÓN DE PÁGINA
 * Archivo: page-loader.js
 * 
 * Uso: Importar CSS y JS en las páginas donde se quiera usar
 * Excluye automáticamente: /carritopago/ y /admin/
 * ========================================
 */

class PageLoader {
    constructor() {
        this.overlay = null;
        this.excludedPaths = ['/admin/', 'admin/'];
        this.init();
    }

    init() {
        // No inicializar si estamos en una ruta excluida
        if (this.isExcludedPath()) {
            return;
        }

        this.createOverlay();
        this.handlePageLoad();
        this.interceptLinks();
    }

    isExcludedPath() {
        const currentPath = window.location.pathname;
        return this.excludedPaths.some(path => currentPath.includes(path));
    }

    isExcludedLink(href) {
        return this.excludedPaths.some(path => href.includes(path));
    }

    createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        overlay.innerHTML = `
            <div class="loader-particles">
                <div class="loader-particle"></div>
                <div class="loader-particle"></div>
                <div class="loader-particle"></div>
                <div class="loader-particle"></div>
                <div class="loader-particle"></div>
                <div class="loader-particle"></div>
                <div class="loader-particle"></div>
                <div class="loader-particle"></div>
            </div>
            <div class="loader-container">
                <div class="loader-spinner"></div>
                <div class="loader-text">Cargando</div>
                <div class="loader-progress">
                    <div class="loader-progress-bar"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        this.overlay = overlay;
    }

    handlePageLoad() {
        // Animación de entrada de página
        window.addEventListener('load', () => {
            document.body.classList.add('page-entering');
            setTimeout(() => {
                document.body.classList.remove('page-entering');
            }, 500);
        });

        // Manejar navegación back/forward
        window.addEventListener('pageshow', (event) => {
            if (event.persisted) {
                this.hideOverlay();
                document.body.classList.add('page-entering');
                setTimeout(() => {
                    document.body.classList.remove('page-entering');
                }, 500);
            }
        });
    }

    interceptLinks() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            
            if (!link) return;
            
            const href = link.getAttribute('href');
            
            // Saltar si:
            // - No tiene href
            // - Es un ancla (#)
            // - Link externo
            // - JavaScript link
            // - Abre en nueva pestaña
            // - Es un trigger de modal
            // - Va a rutas excluidas (carritopago, admin)
            if (!href || 
                href.startsWith('#') || 
                href.startsWith('javascript:') ||
                href.startsWith('http://') ||
                href.startsWith('https://') ||
                link.target === '_blank' ||
                link.id === 'perfil-btn' ||
                link.classList.contains('modal-trigger') ||
                this.isExcludedLink(href)) {
                return;
            }

            // Si es un link de navegación interna
            if (href.endsWith('.html') || href.includes('/secciones_navbar/')) {
                e.preventDefault();
                this.navigateTo(href);
            }
        });
    }

    showOverlay() {
        if (this.overlay) {
            // Reiniciar animación de barra de progreso
            const progressBar = this.overlay.querySelector('.loader-progress-bar');
            if (progressBar) {
                progressBar.style.animation = 'none';
                progressBar.offsetHeight; // Trigger reflow
                progressBar.style.animation = 'progressShimmer 2s ease-in-out infinite, progressGrow 0.6s ease-out forwards';
            }
            
            this.overlay.classList.add('active');
            this.overlay.classList.remove('fade-out');
        }
    }

    hideOverlay() {
        if (this.overlay) {
            this.overlay.classList.add('fade-out');
            this.overlay.classList.remove('active');
        }
    }

    navigateTo(url) {
        this.showOverlay();
        
        setTimeout(() => {
            window.location.href = url;
        }, 800);
    }
}

// Inicializar cuando el DOM esté listo
let pageLoader;
document.addEventListener('DOMContentLoaded', () => {
    pageLoader = new PageLoader();
});
