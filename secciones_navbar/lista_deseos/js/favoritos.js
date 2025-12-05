// =============================================
// SISTEMA DE MODALS PERSONALIZADOS
// =============================================

// Crear el contenedor de modals si no existe
function createModalContainer() {
    if (!document.getElementById('modal-container')) {
        const container = document.createElement('div');
        container.id = 'modal-container';
        container.innerHTML = `
            <style>
                .custom-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(4px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 99999;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                }
                .custom-modal-overlay.active {
                    opacity: 1;
                    visibility: visible;
                }
                .custom-modal {
                    background: white;
                    border-radius: 16px;
                    padding: 30px;
                    max-width: 400px;
                    width: 90%;
                    text-align: center;
                    transform: scale(0.8) translateY(-20px);
                    transition: all 0.3s ease;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                }
                .custom-modal-overlay.active .custom-modal {
                    transform: scale(1) translateY(0);
                }
                .modal-icon {
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    font-size: 32px;
                }
                .modal-icon.success {
                    background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
                    color: #059669;
                }
                .modal-icon.warning {
                    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                    color: #d97706;
                }
                .modal-icon.error {
                    background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
                    color: #dc2626;
                }
                .modal-icon.info {
                    background: linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%);
                    color: #0891b2;
                }
                .modal-title {
                    font-size: 20px;
                    font-weight: 700;
                    color: #1f2937;
                    margin-bottom: 10px;
                }
                .modal-message {
                    font-size: 15px;
                    color: #6b7280;
                    margin-bottom: 25px;
                    line-height: 1.5;
                }
                .modal-buttons {
                    display: flex;
                    gap: 12px;
                    justify-content: center;
                }
                .modal-btn {
                    padding: 12px 28px;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: none;
                }
                .modal-btn.primary {
                    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
                    color: white;
                    box-shadow: 0 4px 15px rgba(23, 162, 184, 0.3);
                }
                .modal-btn.primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(23, 162, 184, 0.4);
                }
                .modal-btn.secondary {
                    background: #f3f4f6;
                    color: #374151;
                }
                .modal-btn.secondary:hover {
                    background: #e5e7eb;
                }
                .modal-btn.danger {
                    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                    color: white;
                    box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
                }
                .modal-btn.danger:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
                }
            </style>
        `;
        document.body.appendChild(container);
    }
}

// Mostrar notificación (toast)
function showNotification(message, type = 'success') {
    const existingNotifications = document.querySelectorAll('.toast-notification');
    existingNotifications.forEach(n => n.remove());
    
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    
    const colors = {
        success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        info: 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)'
    };
    
    const notification = document.createElement('div');
    notification.className = 'toast-notification';
    notification.innerHTML = `
        <span class="toast-icon">${icons[type]}</span>
        <span class="toast-message">${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 500;
        font-size: 15px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        z-index: 999999;
        transform: translateX(400px);
        transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// Mostrar modal de confirmación
function showConfirmModal(title, message, onConfirm, onCancel = null, type = 'warning') {
    createModalContainer();
    
    const icons = {
        success: '<i class="fas fa-check"></i>',
        warning: '<i class="fas fa-exclamation-triangle"></i>',
        error: '<i class="fas fa-times"></i>',
        info: '<i class="fas fa-info"></i>'
    };
    
    const overlay = document.createElement('div');
    overlay.className = 'custom-modal-overlay';
    overlay.innerHTML = `
        <div class="custom-modal">
            <div class="modal-icon ${type}">${icons[type]}</div>
            <h3 class="modal-title">${title}</h3>
            <p class="modal-message">${message}</p>
            <div class="modal-buttons">
                <button class="modal-btn secondary" id="modal-cancel">Cancelar</button>
                <button class="modal-btn ${type === 'error' ? 'danger' : 'primary'}" id="modal-confirm">Confirmar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    setTimeout(() => overlay.classList.add('active'), 10);
    
    const closeModal = () => {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
    };
    
    overlay.querySelector('#modal-confirm').addEventListener('click', () => {
        closeModal();
        if (onConfirm) onConfirm();
    });
    
    overlay.querySelector('#modal-cancel').addEventListener('click', () => {
        closeModal();
        if (onCancel) onCancel();
    });
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
            if (onCancel) onCancel();
        }
    });
}

// Mostrar modal de alerta
function showAlertModal(title, message, type = 'info') {
    createModalContainer();
    
    const icons = {
        success: '<i class="fas fa-check"></i>',
        warning: '<i class="fas fa-exclamation-triangle"></i>',
        error: '<i class="fas fa-times"></i>',
        info: '<i class="fas fa-info"></i>'
    };
    
    const overlay = document.createElement('div');
    overlay.className = 'custom-modal-overlay';
    overlay.innerHTML = `
        <div class="custom-modal">
            <div class="modal-icon ${type}">${icons[type]}</div>
            <h3 class="modal-title">${title}</h3>
            <p class="modal-message">${message}</p>
            <div class="modal-buttons">
                <button class="modal-btn primary" id="modal-ok">Aceptar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    setTimeout(() => overlay.classList.add('active'), 10);
    
    const closeModal = () => {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
    };
    
    overlay.querySelector('#modal-ok').addEventListener('click', closeModal);
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
}

// =============================================
// FUNCIONALIDAD DE FAVORITOS
// =============================================

// Remove product from favorites
document.querySelectorAll('.btn-remove').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const card = this.closest('.product-card');
        const productName = card.querySelector('.product-title').textContent;
        
        showConfirmModal(
            'Eliminar de Favoritos',
            `¿Estás seguro de que deseas eliminar "${productName}" de tus favoritos?`,
            () => {
                card.style.transform = 'scale(0)';
                card.style.opacity = '0';
                
                setTimeout(() => {
                    card.remove();
                    updateProductCount();
                    showNotification('Producto eliminado de favoritos', 'success');
                }, 300);
            },
            null,
            'error'
        );
    });
});

// Add to cart
document.querySelectorAll('.btn-add-cart').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('disabled')) {
            const card = this.closest('.product-card');
            const productName = card.querySelector('.product-title').textContent;
            
            // Actualizar contador del carrito
            addToCart(1);
            
        } else {
            showNotification('Este producto no está disponible', 'warning');
        }
    });
});

// Add all to cart
document.querySelector('.btn-filter.active')?.addEventListener('click', function() {
    const availableProducts = document.querySelectorAll('.stock-badge.in-stock').length;
    
    if (availableProducts > 0) {
        showConfirmModal(
            'Añadir al Carrito',
            `¿Deseas agregar ${availableProducts} producto${availableProducts > 1 ? 's disponibles' : ' disponible'} al carrito?`,
            () => {
                // Actualizar contador del carrito con todos los productos disponibles
                addToCart(availableProducts);
                showNotification(`${availableProducts} producto${availableProducts > 1 ? 's agregados' : ' agregado'} al carrito`, 'success');
            },
            null,
            'info'
        );
    } else {
        showAlertModal('Sin Productos', 'No hay productos disponibles para agregar al carrito', 'warning');
    }
});

// Sort products
document.getElementById('sort')?.addEventListener('change', function() {
    const sortValue = this.value;
    const grid = document.querySelector('.products-grid');
    const cards = Array.from(grid.querySelectorAll('.product-card'));
    
    cards.sort((a, b) => {
        if (sortValue === 'price') {
            const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
            const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));
            return priceA - priceB;
        } else if (sortValue === 'name') {
            const nameA = a.querySelector('.product-title').textContent;
            const nameB = b.querySelector('.product-title').textContent;
            return nameA.localeCompare(nameB);
        } else if (sortValue === 'brand') {
            const brandA = a.querySelector('.product-brand').textContent;
            const brandB = b.querySelector('.product-brand').textContent;
            return brandA.localeCompare(brandB);
        }
        return 0;
    });
    
    // Re-append sorted cards
    cards.forEach(card => grid.appendChild(card));
    
    showNotification('Productos ordenados', 'info');
});

// =============================================
// SISTEMA DE CARRITO
// =============================================

let cartItems = 0;

// Actualizar contador del carrito
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartItems;
        
        if (cartItems > 0) {
            cartCountElement.classList.remove('hidden');
            // Animación de rebote
            cartCountElement.style.animation = 'none';
            setTimeout(() => {
                cartCountElement.style.animation = 'pulse-cart 2s infinite';
            }, 10);
        } else {
            cartCountElement.classList.add('hidden');
        }
    }
}

// Agregar al carrito
function addToCart(quantity = 1) {
    cartItems += quantity;
    updateCartCount();
}

// Update product count
function updateProductCount() {
    const count = document.querySelectorAll('.product-card').length;
    const countElement = document.querySelector('.product-count');
    if (countElement) {
        countElement.textContent = `(${count} producto${count !== 1 ? 's' : ''})`;
    }
}

// Initialize
updateProductCount();
updateCartCount();