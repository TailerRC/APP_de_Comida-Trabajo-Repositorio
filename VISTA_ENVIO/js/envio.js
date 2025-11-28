
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize page
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
});

// Initialize shipping page
function initializeShipping() {
    // Check if there's a saved shipping option
    const savedOption = localStorage.getItem('shippingOption');
    if (savedOption) {
        const radio = document.querySelector(`input[value="${savedOption}"]`);
        if (radio) {
            radio.checked = true;
            if (savedOption === 'scheduled') {
                showDatePicker();
            }
        }
    }

    // Animate elements on load
    animateOnLoad();
}

// Handle store selection
function handleStoreSelection(e) {
    const selectedStore = e.target.value;
    console.log('Store selected:', selectedStore);
    
    // Uncheck delivery options
    const deliveryRadios = document.querySelectorAll('input[name="delivery-type"]');
    deliveryRadios.forEach(radio => {
        radio.checked = false;
    });

    // Hide date picker
    hideDatePicker();

    // Update delivery cost
    updateDeliveryCost(0);

    // Save selection
    localStorage.setItem('shippingOption', selectedStore);
    localStorage.setItem('shippingType', 'pickup');

    // Highlight selected option
    highlightSelectedOption(e.target);
}

// Handle delivery selection
function handleDeliverySelection(e) {
    const selectedDelivery = e.target.value;
    console.log('Delivery selected:', selectedDelivery);
    
    // Uncheck store options
    const storeRadios = document.querySelectorAll('input[name="pickup-store"]');
    storeRadios.forEach(radio => {
        radio.checked = false;
    });

    // Show/hide date picker
    if (selectedDelivery === 'scheduled') {
        showDatePicker();
        updateDeliveryCost(7.50);
    } else if (selectedDelivery === 'morning') {
        hideDatePicker();
        updateDeliveryCost(5.00);
    }

    // Save selection
    localStorage.setItem('shippingOption', selectedDelivery);
    localStorage.setItem('shippingType', 'delivery');

    // Highlight selected option
    highlightSelectedOption(e.target);
}

// Show date picker
function showDatePicker() {
    const datePicker = document.getElementById('datePicker');
    if (datePicker) {
        datePicker.style.display = 'block';
        // Animate in
        setTimeout(() => {
            datePicker.style.opacity = '1';
        }, 10);
    }
}

// Hide date picker
function hideDatePicker() {
    const datePicker = document.getElementById('datePicker');
    if (datePicker) {
        datePicker.style.display = 'none';
    }
}

// Set minimum date for date input
function setMinDate(input) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');
    
    input.min = `${year}-${month}-${day}`;
}

// Handle date change
function handleDateChange(e) {
    const selectedDate = e.target.value;
    console.log('Delivery date selected:', selectedDate);
    localStorage.setItem('deliveryDate', selectedDate);
}

// Update delivery cost
function updateDeliveryCost(cost) {
    const deliveryCostElement = document.querySelector('.delivery-cost');
    const totalElement = document.querySelector('.total-amount');
    
    if (deliveryCostElement && totalElement) {
        const productCost = 150.00;
        const newTotal = productCost + cost;
        
        if (cost === 0) {
            deliveryCostElement.innerHTML = '<span class="free" style="color: #27ae60; font-weight: 700;">GRATIS</span>';
        } else {
            deliveryCostElement.textContent = `$${cost.toFixed(2)}`;
        }
        
        totalElement.textContent = `$${newTotal.toFixed(2)}`;
        
        // Animate the change
        totalElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            totalElement.style.transform = 'scale(1)';
        }, 200);
    }
}

// Highlight selected option
function highlightSelectedOption(radio) {
    // Remove highlight from all options
    document.querySelectorAll('.store-option, .delivery-option').forEach(option => {
        option.style.borderColor = '#e0e0e0';
        option.style.backgroundColor = 'white';
    });

    // Add highlight to selected option
    const parentOption = radio.closest('.store-option, .delivery-option');
    if (parentOption) {
        parentOption.style.borderColor = '#295467';
        parentOption.style.backgroundColor = '#f8fbfd';
    }
}

// Handle confirm button
function handleConfirm() {
    const storeSelected = document.querySelector('input[name="pickup-store"]:checked');
    const deliverySelected = document.querySelector('input[name="delivery-type"]:checked');
    
    if (!storeSelected && !deliverySelected) {
        alert('Por favor, selecciona una opción de envío');
        return;
    }

    if (deliverySelected && deliverySelected.value === 'scheduled') {
        const dateInput = document.querySelector('.date-input');
        if (!dateInput.value) {
            alert('Por favor, selecciona una fecha de entrega');
            return;
        }
    }

    // Show loading state
    const confirmBtn = document.getElementById('confirmBtn');
    const originalText = confirmBtn.textContent;
    confirmBtn.textContent = 'Procesando...';
    confirmBtn.disabled = true;
    confirmBtn.style.opacity = '0.7';

    // Simulate processing
    setTimeout(() => {
        // Save shipping information
        const shippingInfo = {
            type: storeSelected ? 'pickup' : 'delivery',
            option: storeSelected ? storeSelected.value : deliverySelected.value,
            date: deliverySelected && deliverySelected.value === 'scheduled' ? document.querySelector('.date-input').value : null
        };
        
        localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));

        // Redirect to payment page
        alert('Información de envío guardada. Redirigiendo a método de pago...');
        
        // In a real application, redirect to payment page
        // window.location.href = 'pago.html';
        
        confirmBtn.textContent = originalText;
        confirmBtn.disabled = false;
        confirmBtn.style.opacity = '1';
    }, 1500);
}

// Animate elements on load
function animateOnLoad() {
    const cards = document.querySelectorAll('.section-card');
    const summary = document.querySelector('.order-summary-sticky');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    if (summary) {
        summary.style.opacity = '0';
        summary.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            summary.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            summary.style.opacity = '1';
            summary.style.transform = 'translateX(0)';
        }, 300);
    }
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

// Calculate delivery date
function calculateDeliveryDate(days = 1) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
}

// Update progress step
function updateProgressStep(stepNumber) {
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        if (index + 1 < stepNumber) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (index + 1 === stepNumber) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('completed', 'active');
        }
    });
}

