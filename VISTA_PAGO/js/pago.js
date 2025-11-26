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
        alert('Código copiado al portapapeles: ' + code);
    }).catch(err => {
        console.error('Error al copiar:', err);
        alert('No se pudo copiar el código');
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

// Confirm QR Payment
function confirmQRPayment() {
    qrModal.classList.remove('active');
    alert('¡Pago con Yape/Plin confirmado!\n\nTu pedido será procesado en las próximas horas.');
}

// Confirm PayPal Payment
function confirmPayPalPayment() {
    const email = document.querySelector('#paypalModal input[type="email"]').value;
    const password = document.querySelector('#paypalModal input[type="password"]').value;
    
    if (!email || !password) {
        alert('Por favor, completa todos los campos');
        return;
    }
    
    paypalModal.classList.remove('active');
    alert('¡Pago con PayPal confirmado!\n\nTu pedido será procesado.');
}

// Button handlers - Back button
document.querySelector('.btn-secondary')?.addEventListener('click', function() {
    window.history.back();
});

// Button handlers - Confirm button
document.querySelector('.btn-primary')?.addEventListener('click', function() {
    const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked')?.value;
    const selectedDocument = document.querySelector('input[name="documentType"]:checked')?.value;
    
    if (!selectedPayment) {
        alert('Por favor, selecciona un método de pago');
        return;
    }
    
    // Validar campos según el tipo de documento
    if (selectedDocument === 'boleta') {
        const dni = document.querySelector('#boletaForm input[placeholder="Ingresa tu DNI"]').value;
        const nombre = document.querySelector('#boletaForm input[placeholder="Ingresa tu nombre completo"]').value;
        
        if (!dni || !nombre) {
            alert('Por favor, completa todos los campos de la boleta');
            return;
        }
        
        if (dni.length !== 8) {
            alert('El DNI debe tener 8 dígitos');
            return;
        }
    } else {
        const ruc = document.querySelector('#facturaForm input[placeholder="Ingresa tu RUC"]').value;
        const razon = document.querySelector('#facturaForm input[placeholder="Ingresa la razón social"]').value;
        const direccion = document.querySelector('#facturaForm input[placeholder="Ingresa la dirección fiscal"]').value;
        
        if (!ruc || !razon || !direccion) {
            alert('Por favor, completa todos los campos de la factura');
            return;
        }
        
        if (ruc.length !== 11) {
            alert('El RUC debe tener 11 dígitos');
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
            alert('Por favor, completa todos los campos de la tarjeta de crédito');
            return;
        }
        
        if (cardNumber.replace(/\s/g, '').length < 13) {
            alert('Número de tarjeta inválido');
            return;
        }
    } else if (selectedPayment === 'debito') {
        const cardNumber = document.querySelector('.payment-method.active .debit-card-number').value;
        const cardHolder = document.querySelector('.payment-method.active input[placeholder="Nombre completo"]').value;
        const expiration = document.querySelector('.payment-method.active .debit-expiration').value;
        const cvv = document.querySelector('.payment-method.active input[placeholder="123"]').value;
        
        if (!cardNumber || !cardHolder || !expiration || !cvv) {
            alert('Por favor, completa todos los campos de la tarjeta de débito');
            return;
        }
        
        if (cardNumber.replace(/\s/g, '').length < 13) {
            alert('Número de tarjeta inválido');
            return;
        }
    } else if (selectedPayment === 'billeteras') {
        alert('Por favor, selecciona una billetera digital (Yape/Plin o PayPal) y completa el pago');
        return;
    }
    
    console.log('Método de pago:', selectedPayment);
    console.log('Tipo de documento:', selectedDocument);
    
    alert('¡Pago procesado con éxito!\n\nMétodo: ' + selectedPayment + '\nDocumento: ' + selectedDocument + '\n\nSerás redirigido a la confirmación...');
    
    // Aquí podrías redirigir a la página de confirmación
    // window.location.href = 'confirmacion.html';
});

// CVV tooltip
document.querySelectorAll('.fa-question-circle').forEach(icon => {
    icon.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        alert('El CVV es el código de 3 o 4 dígitos en la parte posterior de tu tarjeta');
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