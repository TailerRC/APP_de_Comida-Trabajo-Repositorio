// =============================================
// SISTEMA DE NOTIFICACIONES
// =============================================

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
        notification.style.transform = 'translateX(400px);';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// =============================================
// CARGAR DATOS DEL CARRITO
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    loadOrderData();
});

function loadOrderData() {
    // Cargar datos del carrito
    const cartData = JSON.parse(localStorage.getItem('cartData')) || { products: 2700, items: 3 };
    const deliveryCost = parseFloat(localStorage.getItem('deliveryCost')) || 0;
    const orderTotal = parseFloat(localStorage.getItem('orderTotal')) || cartData.products;
    
    // Actualizar resumen de compra
    const summaryItems = document.querySelectorAll('.summary-item');
    if (summaryItems.length >= 2) {
        summaryItems[0].querySelector('span:last-child').textContent = `S/ ${cartData.products.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
        
        if (deliveryCost === 0) {
            summaryItems[1].querySelector('span:last-child').innerHTML = '<span style="color: #27ae60; font-weight: 700;">GRATIS</span>';
        } else {
            summaryItems[1].querySelector('span:last-child').textContent = `S/ ${deliveryCost.toFixed(2)}`;
        }
    }
    
    // Actualizar total
    const totalElement = document.querySelector('.summary-total span:last-child');
    if (totalElement) {
        totalElement.textContent = `S/ ${orderTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    }
    
    // Actualizar contador del carrito
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cartData.items;
    }
    
    // Actualizar montos en los modales de QR y PayPal
    const qrAmount = document.querySelector('.payment-amount h3');
    const paypalAmount = document.querySelector('.payment-summary-paypal h3');
    
    if (qrAmount) qrAmount.textContent = `S/ ${orderTotal.toFixed(2)}`;
    if (paypalAmount) paypalAmount.textContent = `S/ ${orderTotal.toFixed(2)}`;
}

// =============================================
// MODAL DE VALIDACIÓN
// =============================================

// Modal de Validación Personalizado
function showValidationModal(message) {
    const modal = document.getElementById('validationModal');
    const messageEl = document.getElementById('validationMessage');
    messageEl.textContent = message;
    modal.classList.add('active');
}

function closeValidationModal() {
    const modal = document.getElementById('validationModal');
    modal.classList.remove('active');
}

// Cerrar modal al hacer clic fuera de él
document.getElementById('validationModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeValidationModal();
    }
});

// Toggle between Boleta and Factura forms
document.querySelectorAll('input[name="documentType"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const boletaForm = document.getElementById('boletaForm');
        const facturaForm = document.getElementById('facturaForm');
        
        if (this.value === 'boleta') {
            boletaForm.classList.add('active');
            facturaForm.classList.remove('active');
        } else {
            facturaForm.classList.add('active');
            boletaForm.classList.remove('active');
        }
    });
});

// Toggle payment method content
document.querySelectorAll('.payment-method-header').forEach(header => {
    header.addEventListener('click', function() {
        const paymentMethod = this.closest('.payment-method');
        const radio = this.querySelector('input[type="radio"]');
        
        // Remove active class from all payment methods
        document.querySelectorAll('.payment-method').forEach(method => {
            method.classList.remove('active');
        });
        
        // Add active class to clicked payment method
        paymentMethod.classList.add('active');
        radio.checked = true;
    });
});

// Format credit card number with spaces
const cardNumberInput = document.querySelector('input[placeholder="1234 5678 9012 3456"]');
if (cardNumberInput) {
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    });
}

// Format debit card number with spaces
const debitCardNumberInput = document.querySelector('.debit-card-number');
if (debitCardNumberInput) {
    debitCardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    });
}

// Format credit card expiration date
const expirationInput = document.querySelector('input[placeholder="MM/AA"]');
if (expirationInput) {
    expirationInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    });
}

// Format debit card expiration date
const debitExpirationInput = document.querySelector('.debit-expiration');
if (debitExpirationInput) {
    debitExpirationInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    });
}

// Copy payment code function
function copyPaymentCode() {
    const code = document.getElementById('paymentCode').textContent;
    navigator.clipboard.writeText(code).then(() => {
        showNotification('Código copiado: ' + code, 'success');
    }).catch(err => {
        console.error('Error al copiar:', err);
        showNotification('No se pudo copiar el código', 'error');
    });
}

// Modal Functions
const qrModal = document.getElementById('qrModal');
const paypalModal = document.getElementById('paypalModal');

// Close modal when clicking X
document.querySelectorAll('.close-modal').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
        qrModal.classList.remove('active');
        paypalModal.classList.remove('active');
    });
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === qrModal) {
        qrModal.classList.remove('active');
    }
    if (event.target === paypalModal) {
        paypalModal.classList.remove('active');
    }
});

// Wallet button handlers
document.querySelectorAll('.wallet-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const walletType = this.getAttribute('data-wallet');
        
        if (walletType === 'yape-plin') {
            qrModal.classList.add('active');
        } else if (walletType === 'paypal') {
            paypalModal.classList.add('active');
        }
    });
});

// Show Confirmation Modal
function showConfirmationModal() {
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
        confirmationModal.classList.add('active');
    }
}

// Confirm QR Payment
function confirmQRPayment() {
    qrModal.classList.remove('active');
    showConfirmationModal();
}

// Confirm PayPal Payment
function confirmPayPalPayment() {
    const email = document.querySelector('#paypalModal input[type="email"]').value;
    const password = document.querySelector('#paypalModal input[type="password"]').value;
    
    if (!email || !password) {
        showValidationModal('Por favor, completa todos los campos');
        return;
    }
    
    paypalModal.classList.remove('active');
    showConfirmationModal();
}

// Button handlers - Back button (now in order-summary)
document.querySelector('.order-summary .btn-secondary')?.addEventListener('click', function() {
    window.location.href = '../envio/envio.html';
});

// Button handlers - Confirm button (now in order-summary)
document.querySelector('.order-summary .btn-primary')?.addEventListener('click', function() {
    const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked')?.value;
    const selectedDocument = document.querySelector('input[name="documentType"]:checked')?.value;
    
    if (!selectedPayment) {
        showValidationModal('Por favor, selecciona un método de pago');
        return;
    }
    
    // Validar campos según el tipo de documento
    if (selectedDocument === 'boleta') {
        const dni = document.querySelector('#boletaForm input[placeholder="Ingresa tu DNI"]').value;
        const nombre = document.querySelector('#boletaForm input[placeholder="Ingresa tu nombre completo"]').value;
        
        if (!dni || !nombre) {
            showValidationModal('Por favor, completa todos los campos de la boleta');
            return;
        }
        
        if (dni.length !== 8) {
            showValidationModal('El DNI debe tener 8 dígitos');
            return;
        }
    } else {
        const ruc = document.querySelector('#facturaForm input[placeholder="Ingresa tu RUC"]').value;
        const razon = document.querySelector('#facturaForm input[placeholder="Ingresa la razón social"]').value;
        const direccion = document.querySelector('#facturaForm input[placeholder="Ingresa la dirección fiscal"]').value;
        
        if (!ruc || !razon || !direccion) {
            showValidationModal('Por favor, completa todos los campos de la factura');
            return;
        }
        
        if (ruc.length !== 11) {
            showValidationModal('El RUC debe tener 11 dígitos');
            return;
        }
    }
    
    // Validar campos según el método de pago
    if (selectedPayment === 'tarjeta') {
        const cardNumber = document.querySelector('.payment-method.active input[placeholder="1234 5678 9012 3456"]').value;
        const cardHolder = document.querySelector('.payment-method.active input[placeholder="Nombre completo"]').value;
        const expiration = document.querySelector('.payment-method.active input[placeholder="MM/AA"]').value;
        const cvv = document.querySelector('.payment-method.active input[placeholder="123"]').value;
        
        if (!cardNumber || !cardHolder || !expiration || !cvv) {
            showValidationModal('Por favor, completa todos los campos de la tarjeta de crédito');
            return;
        }
        
        if (cardNumber.replace(/\s/g, '').length < 13) {
            showValidationModal('Número de tarjeta inválido');
            return;
        }
    } else if (selectedPayment === 'debito') {
        const cardNumber = document.querySelector('.payment-method.active .debit-card-number').value;
        const cardHolder = document.querySelector('.payment-method.active input[placeholder="Nombre completo"]').value;
        const expiration = document.querySelector('.payment-method.active .debit-expiration').value;
        const cvv = document.querySelector('.payment-method.active input[placeholder="123"]').value;
        
        if (!cardNumber || !cardHolder || !expiration || !cvv) {
            showValidationModal('Por favor, completa todos los campos de la tarjeta de débito');
            return;
        }
        
        if (cardNumber.replace(/\s/g, '').length < 13) {
            showValidationModal('Número de tarjeta inválido');
            return;
        }
    } else if (selectedPayment === 'billeteras') {
        showValidationModal('Por favor, selecciona una billetera digital (Yape/Plin o PayPal) y completa el pago');
        return;
    }
    
    console.log('Método de pago:', selectedPayment);
    console.log('Tipo de documento:', selectedDocument);
    
    // Mostrar modal de confirmación para pagos con tarjeta
    showConfirmationModal();
});

// CVV tooltip
document.querySelectorAll('.fa-question-circle').forEach(icon => {
    icon.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        showNotification('El CVV es el código de 3 o 4 dígitos en la parte posterior de tu tarjeta', 'info');
    });
});

// Validación de solo números para DNI
document.querySelector('#boletaForm input[placeholder="Ingresa tu DNI"]')?.addEventListener('input', function(e) {
    this.value = this.value.replace(/\D/g, '');
});

// Validación de solo números para RUC
document.querySelector('#facturaForm input[placeholder="Ingresa tu RUC"]')?.addEventListener('input', function(e) {
    this.value = this.value.replace(/\D/g, '');
});

// Validación de solo números para CVV
document.querySelectorAll('input[placeholder="123"]').forEach(input => {
    input.addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, '');
    });
});