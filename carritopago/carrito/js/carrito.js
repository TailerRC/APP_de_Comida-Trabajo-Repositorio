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
                .modal-input {
                    width: 100%;
                    padding: 12px 16px;
                    border: 2px solid #e5e7eb;
                    border-radius: 8px;
                    font-size: 15px;
                    margin-bottom: 20px;
                    transition: border-color 0.3s;
                }
                .modal-input:focus {
                    outline: none;
                    border-color: #17a2b8;
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
        <span style="font-size: 18px;">${icons[type]}</span>
        <span>${message}</span>
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
        error: '<i class="fas fa-trash-alt"></i>',
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

// Mostrar modal con input
function showInputModal(title, placeholder, onSubmit) {
    createModalContainer();
    
    const overlay = document.createElement('div');
    overlay.className = 'custom-modal-overlay';
    overlay.innerHTML = `
        <div class="custom-modal">
            <div class="modal-icon info"><i class="fas fa-tag"></i></div>
            <h3 class="modal-title">${title}</h3>
            <input type="text" class="modal-input" id="modal-input" placeholder="${placeholder}">
            <div class="modal-buttons">
                <button class="modal-btn secondary" id="modal-cancel">Cancelar</button>
                <button class="modal-btn primary" id="modal-submit">Aplicar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.classList.add('active');
        overlay.querySelector('#modal-input').focus();
    }, 10);
    
    const closeModal = () => {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
    };
    
    overlay.querySelector('#modal-submit').addEventListener('click', () => {
        const value = overlay.querySelector('#modal-input').value.trim();
        closeModal();
        if (value && onSubmit) onSubmit(value);
    });
    
    overlay.querySelector('#modal-cancel').addEventListener('click', closeModal);
    
    overlay.querySelector('#modal-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const value = overlay.querySelector('#modal-input').value.trim();
            closeModal();
            if (value && onSubmit) onSubmit(value);
        }
    });
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
}

// =============================================
// FUNCIONALIDAD DEL CARRITO
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los botones de cantidad
    const qtyButtons = document.querySelectorAll('.qty-btn');
    const removeLinks = document.querySelectorAll('.action-link.remove');
    
    // Función para actualizar el total del carrito
    function updateCartTotal() {
        let total = 0;
        const cartItems = document.querySelectorAll('.cart-item');
        
        cartItems.forEach(item => {
            const priceElement = item.querySelector('.current-price');
            const qtyInput = item.querySelector('.qty-input');
            
            if (priceElement && qtyInput) {
                const price = parseFloat(priceElement.textContent.replace('S/', '').replace(',', '').trim());
                const qty = parseInt(qtyInput.value);
                total += price * qty;
            }
        });
        
        // Actualizar el total en el resumen
        const totalAmount = document.querySelector('.total-amount');
        const productsAmount = document.querySelector('.summary-row span:last-child');
        
        if (totalAmount && productsAmount) {
            totalAmount.textContent = `S/ ${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
            productsAmount.textContent = `S/ ${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
        }
        
        // Actualizar contador de productos
        updateProductCount();
        
        // Guardar datos del carrito en localStorage para envío y pago
        const count = cartItems.length;
        const cartData = {
            products: total,
            items: count,
            deliveryCost: 0
        };
        localStorage.setItem('cartData', JSON.stringify(cartData));
    }
    
    // Función para actualizar el contador de productos
    function updateProductCount() {
        const cartItems = document.querySelectorAll('.cart-item');
        const pageTitle = document.querySelector('.page-title');
        const itemsHeader = document.querySelector('.items-header span');
        const cartCountNav = document.getElementById('cart-count');
        
        const count = cartItems.length;
        
        if (pageTitle) {
            pageTitle.textContent = `Mi Carrito (${count} producto${count !== 1 ? 's' : ''})`;
        }
        
        if (itemsHeader) {
            itemsHeader.textContent = `(${count} items)`;
        }
        
        if (cartCountNav) {
            cartCountNav.textContent = count;
        }
    }
    
    // Manejar clicks en botones de cantidad
    qtyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            const qtyInput = this.parentElement.querySelector('.qty-input');
            let currentValue = parseInt(qtyInput.value);
            
            if (action === 'increase') {
                qtyInput.value = currentValue + 1;
                showNotification('Cantidad actualizada', 'success');
            } else if (action === 'decrease' && currentValue > 1) {
                qtyInput.value = currentValue - 1;
                showNotification('Cantidad actualizada', 'success');
            }
            
            updateCartTotal();
        });
    });
    
    // Manejar input directo en cantidad
    const qtyInputs = document.querySelectorAll('.qty-input');
    qtyInputs.forEach(input => {
        input.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (isNaN(value) || value < 1) {
                this.value = 1;
            }
            updateCartTotal();
        });
    });
    
    // Manejar eliminación de productos
    removeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const cartItem = this.closest('.cart-item');
            const productName = cartItem.querySelector('.item-name').textContent;
            
            showConfirmModal(
                'Eliminar Producto',
                `¿Estás seguro de que quieres eliminar "${productName}" del carrito?`,
                () => {
                    cartItem.style.opacity = '0';
                    cartItem.style.transform = 'translateX(-20px)';
                    cartItem.style.transition = 'all 0.3s ease';
                    
                    setTimeout(() => {
                        cartItem.remove();
                        updateCartTotal();
                        showNotification('Producto eliminado del carrito', 'success');
                        
                        // Si no quedan productos, mostrar mensaje
                        const remainingItems = document.querySelectorAll('.cart-item');
                        if (remainingItems.length === 0) {
                            showEmptyCart();
                        }
                    }, 300);
                },
                null,
                'error'
            );
        });
    });
    
    // Función para mostrar carrito vacío
    function showEmptyCart() {
        const cartItems = document.querySelector('.cart-items');
        cartItems.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <i class="fas fa-shopping-cart" style="font-size: 64px; color: #ccc; margin-bottom: 20px;"></i>
                <h3 style="color: #666; margin-bottom: 10px;">Tu carrito está vacío</h3>
                <p style="color: #999; margin-bottom: 30px;">Agrega productos para comenzar tu compra</p>
                <a href="../../index.html" style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #17a2b8 0%, #138496 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">Ir a la tienda</a>
            </div>
        `;
    }
    
    // Manejar enlace de cupón
    const addCouponLink = document.querySelector('.add-coupon');
    if (addCouponLink) {
        addCouponLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            showInputModal(
                'Ingresa tu Cupón',
                'Código de cupón',
                (coupon) => {
                    showNotification(`Cupón "${coupon}" aplicado correctamente`, 'success');
                    // Aquí puedes validar el cupón y actualizar el total con el descuento
                }
            );
        });
    }
    
    // Inicializar el total al cargar la página
    updateCartTotal();
});