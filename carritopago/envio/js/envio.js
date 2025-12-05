// =============================================
// SISTEMA DE MODALS PERSONALIZADOS
// =============================================

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
                    max-width: 500px;
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
                .modal-input {
                    width: 100%;
                    padding: 12px 16px;
                    border: 2px solid #e5e7eb;
                    border-radius: 8px;
                    font-size: 15px;
                    margin-bottom: 15px;
                    transition: border-color 0.3s;
                    box-sizing: border-box;
                }
                .modal-input:focus {
                    outline: none;
                    border-color: #17a2b8;
                }
                .modal-form-group {
                    text-align: left;
                    margin-bottom: 15px;
                }
                .modal-form-group label {
                    display: block;
                    font-size: 14px;
                    font-weight: 600;
                    color: #374151;
                    margin-bottom: 6px;
                }
                .modal-form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                }
            </style>
        `;
        document.body.appendChild(container);
    }
}

// Mostrar notificación (toast) - ABAJO
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

// Modal de alerta
function showAlertModal(title, message, type = 'warning') {
    createModalContainer();
    
    const icons = {
        success: '<i class="fas fa-check"></i>',
        warning: '<i class="fas fa-exclamation-triangle"></i>',
        error: '<i class="fas fa-times-circle"></i>',
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
                <button class="modal-btn primary" id="modal-ok">Entendido</button>
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

// Modal para cambiar dirección
function showAddressModal(currentAddress, onSave) {
    createModalContainer();
    
    const overlay = document.createElement('div');
    overlay.className = 'custom-modal-overlay';
    overlay.innerHTML = `
        <div class="custom-modal" style="max-width: 550px;">
            <div class="modal-icon info"><i class="fas fa-map-marker-alt"></i></div>
            <h3 class="modal-title">Cambiar Dirección de Envío</h3>
            
            <div class="modal-form-group">
                <label>Dirección completa</label>
                <input type="text" class="modal-input" id="modal-address" value="${currentAddress}" placeholder="Av. Principal 123">
            </div>
            
            <div class="modal-form-row">
                <div class="modal-form-group">
                    <label>Ciudad</label>
                    <input type="text" class="modal-input" id="modal-city" placeholder="Lima">
                </div>
                <div class="modal-form-group">
                    <label>Distrito</label>
                    <input type="text" class="modal-input" id="modal-district" placeholder="Miraflores">
                </div>
            </div>
            
            <div class="modal-form-row">
                <div class="modal-form-group">
                    <label>Código Postal</label>
                    <input type="text" class="modal-input" id="modal-postal" placeholder="15074">
                </div>
                <div class="modal-form-group">
                    <label>Referencia</label>
                    <input type="text" class="modal-input" id="modal-reference" placeholder="Cerca al parque">
                </div>
            </div>
            
            <div class="modal-form-group">
                <label>Teléfono de contacto</label>
                <input type="tel" class="modal-input" id="modal-phone" placeholder="+51 999 999 999">
            </div>
            
            <div class="modal-buttons">
                <button class="modal-btn secondary" id="modal-cancel">Cancelar</button>
                <button class="modal-btn primary" id="modal-save">Guardar Dirección</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.classList.add('active');
        overlay.querySelector('#modal-address').focus();
    }, 10);
    
    const closeModal = () => {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
    };
    
    overlay.querySelector('#modal-save').addEventListener('click', () => {
        const address = overlay.querySelector('#modal-address').value.trim();
        const city = overlay.querySelector('#modal-city').value.trim();
        const district = overlay.querySelector('#modal-district').value.trim();
        const postal = overlay.querySelector('#modal-postal').value.trim();
        const reference = overlay.querySelector('#modal-reference').value.trim();
        const phone = overlay.querySelector('#modal-phone').value.trim();
        
        if (!address) {
            showNotification('Por favor ingresa una dirección', 'error');
            return;
        }
        
        const fullAddress = {
            address,
            city,
            district,
            postal,
            reference,
            phone
        };
        
        closeModal();
        if (onSave) onSave(fullAddress);
    });
    
    overlay.querySelector('#modal-cancel').addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
}

// =============================================
// FUNCIONALIDAD DE ENVÍO
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    createModalContainer();
    
    // Cargar datos del carrito
    loadCartData();
    
    // Inicializar página
    initializeShipping();

    // Store pickup radio buttons
    const storeRadios = document.querySelectorAll('input[name="pickup-store"]');
    storeRadios.forEach(radio => {
        radio.addEventListener('change', handleStoreSelection);
    });

    // Delivery type radio buttons
    const deliveryRadios = document.querySelectorAll('input[name="delivery-type"]');
    deliveryRadios.forEach(radio => {
        radio.addEventListener('change', handleDeliverySelection);
    });

    // Confirm button
    const confirmBtn = document.getElementById('confirmBtn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', handleConfirm);
    }

    // Date input for scheduled delivery
    const dateInput = document.querySelector('.date-input');
    if (dateInput) {
        dateInput.addEventListener('change', handleDateChange);
        setMinDate(dateInput);
    }
    
    // Cambiar dirección link
    const changeAddressLink = document.querySelector('.change-link');
    if (changeAddressLink) {
        changeAddressLink.addEventListener('click', handleChangeAddress);
    }
});

// Cargar datos del carrito
function loadCartData() {
    // Obtener datos guardados del carrito o usar valores por defecto
    let cartData = JSON.parse(localStorage.getItem('cartData')) || null;
    
    if (!cartData) {
        // Valores por defecto del carrito (sincronizados con carrito.html)
        cartData = {
            products: 2700.00,
            items: 3,
            deliveryCost: 0
        };
    }
    
    // Guardar para uso posterior
    window.cartData = cartData;
    
    // Actualizar UI con datos del carrito
    updateSummaryFromCart(cartData);
}

// Actualizar resumen desde el carrito
function updateSummaryFromCart(cartData) {
    const productsRow = document.querySelector('.summary-row span:last-child');
    const deliveryCost = document.querySelector('.delivery-cost');
    const totalAmount = document.querySelector('.total-amount');
    const cartCount = document.getElementById('cart-count');
    
    if (productsRow) {
        productsRow.textContent = `S/ ${cartData.products.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    }
    
    if (deliveryCost) {
        deliveryCost.innerHTML = '<span class="free" style="color: #27ae60; font-weight: 700;">GRATIS</span>';
    }
    
    if (totalAmount) {
        totalAmount.textContent = `S/ ${cartData.products.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    }
    
    if (cartCount) {
        cartCount.textContent = cartData.items;
    }
}

// Manejar cambio de dirección
function handleChangeAddress(e) {
    e.preventDefault();
    
    const currentAddressElement = document.querySelector('.address-text');
    const currentAddress = currentAddressElement ? currentAddressElement.textContent : '';
    
    showAddressModal(currentAddress, (newAddress) => {
        // Actualizar la dirección mostrada
        let displayAddress = newAddress.address;
        if (newAddress.district) displayAddress += `, ${newAddress.district}`;
        if (newAddress.city) displayAddress += `, ${newAddress.city}`;
        
        if (currentAddressElement) {
            currentAddressElement.textContent = displayAddress;
        }
        
        // Guardar en localStorage
        localStorage.setItem('shippingAddress', JSON.stringify(newAddress));
        
        showNotification('Dirección actualizada correctamente', 'success');
    });
}

// Inicializar página de envío
function initializeShipping() {
    // Verificar si hay dirección guardada
    const savedAddress = JSON.parse(localStorage.getItem('shippingAddress'));
    if (savedAddress) {
        const addressElement = document.querySelector('.address-text');
        if (addressElement) {
            let displayAddress = savedAddress.address;
            if (savedAddress.district) displayAddress += `, ${savedAddress.district}`;
            if (savedAddress.city) displayAddress += `, ${savedAddress.city}`;
            addressElement.textContent = displayAddress;
        }
    }
    
    // Verificar opción de envío guardada
    const savedOption = localStorage.getItem('shippingOption');
    if (savedOption) {
        const radio = document.querySelector(`input[value="${savedOption}"]`);
        if (radio) {
            radio.checked = true;
            highlightSelectedOption(radio);
            if (savedOption === 'scheduled') {
                showDatePicker();
            }
        }
    }
}

// Manejar selección de tienda
function handleStoreSelection(e) {
    const selectedStore = e.target.value;
    
    // Desmarcar opciones de envío a domicilio
    const deliveryRadios = document.querySelectorAll('input[name="delivery-type"]');
    deliveryRadios.forEach(radio => {
        radio.checked = false;
    });

    // Ocultar date picker
    hideDatePicker();

    // Actualizar costo de envío (gratis para pickup)
    updateDeliveryCost(0);

    // Guardar selección
    localStorage.setItem('shippingOption', selectedStore);
    localStorage.setItem('shippingType', 'pickup');

    // Resaltar opción seleccionada
    highlightSelectedOption(e.target);
    
    showNotification('Tienda seleccionada', 'success');
}

// Manejar selección de envío a domicilio
function handleDeliverySelection(e) {
    const selectedDelivery = e.target.value;
    
    // Desmarcar opciones de tienda
    const storeRadios = document.querySelectorAll('input[name="pickup-store"]');
    storeRadios.forEach(radio => {
        radio.checked = false;
    });

    // Mostrar/ocultar date picker
    if (selectedDelivery === 'scheduled') {
        showDatePicker();
        updateDeliveryCost(7.50);
        showNotification('Entrega programada seleccionada', 'info');
    } else if (selectedDelivery === 'morning') {
        hideDatePicker();
        updateDeliveryCost(5.00);
        showNotification('Envío rápido seleccionado', 'info');
    }

    // Guardar selección
    localStorage.setItem('shippingOption', selectedDelivery);
    localStorage.setItem('shippingType', 'delivery');

    // Resaltar opción seleccionada
    highlightSelectedOption(e.target);
}

// Mostrar date picker
function showDatePicker() {
    const datePicker = document.getElementById('datePicker');
    if (datePicker) {
        datePicker.style.display = 'block';
        setTimeout(() => {
            datePicker.style.opacity = '1';
        }, 10);
    }
}

// Ocultar date picker
function hideDatePicker() {
    const datePicker = document.getElementById('datePicker');
    if (datePicker) {
        datePicker.style.display = 'none';
    }
}

// Establecer fecha mínima
function setMinDate(input) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');
    
    input.min = `${year}-${month}-${day}`;
}

// Manejar cambio de fecha
function handleDateChange(e) {
    const selectedDate = e.target.value;
    localStorage.setItem('deliveryDate', selectedDate);
    showNotification(`Fecha seleccionada: ${formatDate(selectedDate)}`, 'success');
}

// Actualizar costo de envío
function updateDeliveryCost(cost) {
    const deliveryCostElement = document.querySelector('.delivery-cost');
    const totalElement = document.querySelector('.total-amount');
    
    if (deliveryCostElement && totalElement && window.cartData) {
        const productCost = window.cartData.products;
        const newTotal = productCost + cost;
        
        if (cost === 0) {
            deliveryCostElement.innerHTML = '<span class="free" style="color: #27ae60; font-weight: 700;">GRATIS</span>';
        } else {
            deliveryCostElement.textContent = `S/ ${cost.toFixed(2)}`;
        }
        
        totalElement.textContent = `S/ ${newTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
        
        // Animar cambio
        totalElement.style.transform = 'scale(1.1)';
        totalElement.style.transition = 'transform 0.2s ease';
        setTimeout(() => {
            totalElement.style.transform = 'scale(1)';
        }, 200);
        
        // Guardar total para la página de pago
        localStorage.setItem('orderTotal', newTotal);
        localStorage.setItem('deliveryCost', cost);
    }
}

// Resaltar opción seleccionada
function highlightSelectedOption(radio) {
    // Quitar resaltado de todas las opciones
    document.querySelectorAll('.store-option, .delivery-option').forEach(option => {
        option.style.borderColor = '#e0e0e0';
        option.style.backgroundColor = 'white';
    });

    // Agregar resaltado a la opción seleccionada
    const parentOption = radio.closest('.store-option, .delivery-option');
    if (parentOption) {
        parentOption.style.borderColor = '#17a2b8';
        parentOption.style.backgroundColor = '#f0fbfc';
    }
}

// Manejar confirmación
function handleConfirm(e) {
    e.preventDefault();
    
    const storeSelected = document.querySelector('input[name="pickup-store"]:checked');
    const deliverySelected = document.querySelector('input[name="delivery-type"]:checked');
    
    if (!storeSelected && !deliverySelected) {
        showAlertModal(
            'Selecciona una opción',
            'Por favor, selecciona una opción de envío: retiro en tienda o envío a domicilio.',
            'warning'
        );
        return;
    }

    if (deliverySelected && deliverySelected.value === 'scheduled') {
        const dateInput = document.querySelector('.date-input');
        if (!dateInput.value) {
            showAlertModal(
                'Fecha requerida',
                'Por favor, selecciona una fecha para la entrega programada.',
                'warning'
            );
            return;
        }
    }

    // Mostrar estado de carga
    const confirmBtn = document.getElementById('confirmBtn');
    const originalText = confirmBtn.textContent;
    confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
    confirmBtn.disabled = true;
    confirmBtn.style.opacity = '0.7';

    // Simular procesamiento
    setTimeout(() => {
        // Guardar información de envío
        const shippingInfo = {
            type: storeSelected ? 'pickup' : 'delivery',
            option: storeSelected ? storeSelected.value : deliverySelected.value,
            date: deliverySelected && deliverySelected.value === 'scheduled' ? document.querySelector('.date-input').value : null,
            address: JSON.parse(localStorage.getItem('shippingAddress')) || null
        };
        
        localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
        
        showNotification('Información de envío guardada', 'success');
        
        // Redirigir a página de pago
        setTimeout(() => {
            window.location.href = '../pago/pago.html';
        }, 800);
        
    }, 1000);
}

// Formatear fecha
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}
