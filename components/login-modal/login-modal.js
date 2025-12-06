(function() {
    'use strict';

    // Función para verificar sesión de usuario y actualizar UI
    function checkUserSession() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        const perfilBtn = document.getElementById('perfil-btn');
        const perfilText = document.getElementById('perfil-text');
        
        if (currentUser) {
            // Actualizar texto del botón de perfil
            if (perfilText) {
                perfilText.textContent = currentUser.nombreCompleto ? currentUser.nombreCompleto.split(' ')[0] : 'Perfil';
            }
            // Actualizar href para navegar a perfil
            if (perfilBtn) {
                perfilBtn.href = getBasePath() + 'perfil.html';
                perfilBtn.onclick = null; // Permitir navegación normal
            }
        } else {
            // Si no hay sesión, el botón de perfil debe abrir el modal
            if (perfilBtn) {
                perfilBtn.href = '#';
                perfilBtn.onclick = function(e) {
                    e.preventDefault();
                    openLoginModal();
                };
            }
        }
    }

    // Función para inicializar el login modal
    function initLoginModal() {
        const loginForm = document.getElementById('login-form');
        const modalClose = document.querySelector('#login-modal .modal-close');
        const modal = document.getElementById('login-modal');
        const togglePasswordBtn = document.querySelector('#login-modal .toggle-password');
        const passwordInput = document.getElementById('password');

        // Si no existe el modal, no continuar
        if (!modal) return;

        // Handler del formulario de login
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const errorDiv = document.getElementById('login-error');
                
                // Verificar credenciales admin
                if (email === 'admin@gmail.com' && password === '12345') {
                    const adminUser = { 
                        nombreCompleto: 'Administrador', 
                        email: 'admin@gmail.com',
                        isAdmin: true 
                    };
                    localStorage.setItem('currentUser', JSON.stringify(adminUser));
                    
                    // Cerrar modal y redirigir a admin
                    modal.classList.remove('active');
                    
                    setTimeout(() => {
                        window.location.href = getAdminPath() + 'admin.html';
                    }, 300);
                    
                    loginForm.reset();
                    if (errorDiv) errorDiv.style.display = 'none';
                    return;
                }
                
                // Verificar usuarios registrados
                const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
                const user = usuarios.find(u => u.email === email && u.password === password);
                
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    checkUserSession();
                    
                    // Cerrar modal y redirigir
                    modal.classList.remove('active');
                    
                    setTimeout(() => {
                        window.location.href = getBasePath() + 'perfil.html';
                    }, 300);
                    
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
        
        // Handler para cerrar modal con el botón X
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }
        
        // Handler para cerrar modal al hacer click fuera
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
        
        // Handler para cerrar modal con tecla Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        });
        
        // Toggle password visibility
        if (togglePasswordBtn && passwordInput) {
            togglePasswordBtn.addEventListener('click', function() {
                const icon = this.querySelector('i') || this;
                
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    if (icon.classList) {
                        icon.classList.remove('fa-eye');
                        icon.classList.add('fa-eye-slash');
                    }
                } else {
                    passwordInput.type = 'password';
                    if (icon.classList) {
                        icon.classList.remove('fa-eye-slash');
                        icon.classList.add('fa-eye');
                    }
                }
            });
        }
    }

    // Función para obtener la ruta base (útil cuando se usa desde subcarpetas)
    function getBasePath() {
        const path = window.location.pathname;
        
        // Si estamos en promociones_categorias/html (3 niveles abajo)
        if (path.includes('/secciones_navbar/promociones_categorias/html/')) {
            return '../../../main/';
        }
        // Si estamos en novedades (2 niveles abajo)
        if (path.includes('/secciones_navbar/novedades/')) {
            return '../../main/';
        }
        // Si estamos en lista_deseos (2 niveles abajo)
        if (path.includes('/secciones_navbar/lista_deseos/')) {
            return '../../main/';
        }
        // Si estamos en una subcarpeta de novedades
        if (path.includes('/novedades/')) {
            return '../main/';
        }
        // Si estamos en carritopago (2 niveles abajo)
        if (path.includes('/carritopago/')) {
            return '../../main/';
        }
        // Si estamos en admin
        if (path.includes('/admin/')) {
            return '../main/';
        }
        // Si estamos en la raíz (index.html)
        return 'main/';
    }

    // Función para obtener la ruta base para admin
    function getAdminPath() {
        const path = window.location.pathname;
        
        if (path.includes('/secciones_navbar/promociones_categorias/html/')) {
            return '../../../admin/';
        }
        if (path.includes('/secciones_navbar/novedades/')) {
            return '../../admin/';
        }
        if (path.includes('/secciones_navbar/lista_deseos/')) {
            return '../../admin/';
        }
        if (path.includes('/novedades/')) {
            return '../admin/';
        }
        if (path.includes('/carritopago/')) {
            return '../../admin/';
        }
        if (path.includes('/admin/')) {
            return '';
        }
        return 'admin/';
    }

    // Función para abrir el modal de login
    function openLoginModal() {
        const modal = document.getElementById('login-modal');
        if (modal) {
            modal.classList.add('active');
        }
    }

    // Exponer función globalmente para poder llamarla desde otros scripts
    window.openLoginModal = openLoginModal;
    window.initLoginModal = initLoginModal;
    window.checkUserSession = checkUserSession;

    // Auto-inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initLoginModal();
            checkUserSession();
        });
    } else {
        initLoginModal();
        checkUserSession();
    }
})();
