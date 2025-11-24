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

// Format card number with spaces
const cardNumberInput = document.querySelector('input[placeholder="1234 5678 9012 3456"]');
if (cardNumberInput) {
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    });
}

// Format expiration date
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

// Handle document type change
document.querySelectorAll('input[name="documentType"]').forEach(radio => {
    radio.addEventListener('change', function() {
        console.log('Tipo de documento seleccionado:', this.value);
    });
});

// Button handlers
document.querySelector('.btn-secondary')?.addEventListener('click', function() {
    window.history.back();
});

document.querySelector('.btn-primary')?.addEventListener('click', function() {
    const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked')?.value;
    const selectedDocument = document.querySelector('input[name="documentType"]:checked')?.value;
    
    if (!selectedPayment) {
        alert('Por favor, selecciona un método de pago');
        return;
    }
    
    console.log('Método de pago:', selectedPayment);
    console.log('Tipo de documento:', selectedDocument);
    alert('Procesando pago...');
});

// CVV tooltip
document.querySelector('.fa-question-circle')?.addEventListener('click', function(e) {
    e.preventDefault();
    alert('El CVV es el código de 3 o 4 dígitos en la parte posterior de tu tarjeta');
});