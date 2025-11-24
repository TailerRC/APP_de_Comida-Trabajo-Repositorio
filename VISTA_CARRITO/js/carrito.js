// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize cart
    initializeCart();

    // Quantity buttons
    const qtyButtons = document.querySelectorAll('.qty-btn');
    qtyButtons.forEach(button => {
        button.addEventListener('click', handleQuantityChange);
    });

    // Quantity inputs
    const qtyInputs = document.querySelectorAll('.qty-input');
    qtyInputs.forEach(input => {
        input.addEventListener('change', handleQuantityInputChange);
        input.addEventListener('blur', handleQuantityInputChange);
    });

    // Remove buttons
    const removeLinks = document.querySelectorAll('.action-link.remove');
    removeLinks.forEach(link => {
        link.addEventListener('click', handleRemoveItem);
    });

    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
});

// Handle quantity increase/decrease
function handleQuantityChange(e) {
    e.preventDefault();
    const button = e.currentTarget;
    const action = button.dataset.action;
    const qtyInput = button.parentElement.querySelector('.qty-input');
    let currentValue = parseInt(qtyInput.value);

    if (action === 'increase') {
        qtyInput.value = currentValue + 1;
    } else if (action === 'decrease' && currentValue > 1) {
        qtyInput.value = currentValue - 1;
    }

    updateCart();
}

// Handle direct input change
function handleQuantityInputChange(e) {
    const input = e.target;
    let value = parseInt(input.value);

    if (isNaN(value) || value < 1) {
        input.value = 1;
    }

    updateCart();
}

// Handle item removal
function handleRemoveItem(e) {
    e.preventDefault();
    
    const confirmed = confirm('¿Estás seguro de que deseas eliminar este producto del carrito?');
    
    if (confirmed) {
        const cartItem = e.target.closest('.cart-item');
        
        // Add fade out animation
        cartItem.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        cartItem.style.opacity = '0';
        cartItem.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            cartItem.remove();
            
            // Check if vendor section is empty
            const vendorSection = e.target.closest('.vendor-section');
            const remainingItems = vendorSection.querySelectorAll('.cart-item').length;
            
            if (remainingItems === 0) {
                vendorSection.style.transition = 'opacity 0.3s ease';
                vendorSection.style.opacity = '0';
                setTimeout(() => {
                    vendorSection.remove();
                    checkEmptyCart();
                }, 300);
            }
            
            updateCart();
            updatePageTitle();
            updateCartCount();
        }, 300);
    }
}

// Check if cart is empty
function checkEmptyCart() {
    const cartItems = document.querySelectorAll('.cart-item');
    
    if (cartItems.length === 0) {
        const cartItemsContainer = document.querySelector('.cart-items');
        cartItemsContainer.innerHTML = `
            <div class="vendor-section" style="text-align: center; padding: 60px 40px;">
                <i class="fas fa-shopping-cart" style="font-size: 80px; color: #ddd; margin-bottom: 25px;"></i>
                <h2 style="color: #666; margin-bottom: 15px; font-size: 24px;">Tu carrito está vacío</h2>
                <p style="color: #999; margin-bottom: 30px; font-size: 16px;">Agrega productos para comenzar a comprar</p>
                <a href="index.html" style="display: inline-block; padding: 14px 32px; background: #295467; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; transition: all 0.3s ease;">
                    Continuar comprando
                </a>
            </div>
        `;
        
        // Update cart count in header
        updateCartCount();
    }
}

// Update cart totals
function updateCart() {
    let subtotal = 0;
    let itemCount = 0;

    // Get all cart items
    const cartItems = document.querySelectorAll('.cart-item');
    
    cartItems.forEach(item => {
        const qtyInput = item.querySelector('.qty-input');
        const quantity = parseInt(qtyInput.value);
        const priceElement = item.querySelector('.current-price');
        const priceText = priceElement.textContent.replace('S/', '').replace(/,/g, '').trim();
        const price = parseFloat(priceText);
        
        subtotal += price * quantity;
        itemCount += quantity;
    });

    // Update summary
    const productsPrice = document.querySelector('.summary-details .summary-row:first-child span:last-child');
    const totalAmount = document.querySelector('.total-amount');
    
    if (productsPrice) {
        productsPrice.textContent = `S/ ${formatPrice(subtotal)}`;
    }
    
    if (totalAmount) {
        totalAmount.textContent = `S/ ${formatPrice(subtotal)}`;
    }

    updatePageTitle();
}

// Update page title with item count
function updatePageTitle() {
    const cartItems = document.querySelectorAll('.cart-item');
    const itemCount = cartItems.length;
    const pageTitle = document.querySelector('.page-title');
    
    if (pageTitle) {
        pageTitle.textContent = `Mi Carrito (${itemCount} ${itemCount === 1 ? 'producto' : 'productos'})`;
    }

    // Update vendor section titles
    const vendorSections = document.querySelectorAll('.vendor-section');
    vendorSections.forEach(section => {
        const items = section.querySelectorAll('.cart-item').length;
        const vendorName = section.querySelector('.vendor-name');
        
        if (vendorName && items > 0) {
            const vendorText = vendorName.textContent.split('(')[0].trim();
            vendorName.textContent = `${vendorText} (${items} ${items === 1 ? 'ítem' : 'ítems'})`;
        }
    });
}

// Update cart count in header
function updateCartCount() {
    const cartItems = document.querySelectorAll('.cart-item');
    const itemCount = cartItems.length;
    const cartCountElement = document.querySelector('.cart-count');
    
    if (cartCountElement) {
        cartCountElement.textContent = itemCount;
        
        if (itemCount === 0) {
            cartCountElement.style.display = 'none';
        } else {
            cartCountElement.style.display = 'block';
        }
    }
}

// Format price
function formatPrice(price) {
    return price.toLocaleString('es-PE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Handle checkout
function handleCheckout() {
    const cartItems = document.querySelectorAll('.cart-item');
    
    if (cartItems.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    // Get order summary
    const totalAmount = document.querySelector('.total-amount').textContent;
    
    // Show loading state
    const checkoutBtn = document.querySelector('.checkout-btn');
    const originalText = checkoutBtn.textContent;
    checkoutBtn.textContent = 'Procesando...';
    checkoutBtn.disabled = true;
    checkoutBtn.style.opacity = '0.7';
    
    // Simulate processing
    setTimeout(() => {
        alert(`Procediendo al pago...\nTotal: ${totalAmount}`);
        checkoutBtn.textContent = originalText;
        checkoutBtn.disabled = false;
        checkoutBtn.style.opacity = '1';
        
        // In a real application, this would redirect to checkout
        // window.location.href = '/checkout';
    }, 1500);
}

// Initialize cart on page load
function initializeCart() {
    updateCart();
    updateCartCount();
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Add animation on page load
window.addEventListener('load', function() {
    const cartItems = document.querySelectorAll('.cart-item');
    const orderSummary = document.querySelector('.order-summary');
    
    // Animate cart items
    cartItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Animate order summary
    if (orderSummary) {
        orderSummary.style.opacity = '0';
        orderSummary.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            orderSummary.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            orderSummary.style.opacity = '1';
            orderSummary.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Save cart to localStorage (optional feature for persistence)
function saveCartToStorage() {
    const cartData = [];
    const cartItems = document.querySelectorAll('.cart-item');
    
    cartItems.forEach(item => {
        const name = item.querySelector('.item-name').textContent;
        const description = item.querySelector('.item-description').textContent;
        const price = item.querySelector('.current-price').textContent;
        const quantity = item.querySelector('.qty-input').value;
        const originalPrice = item.querySelector('.original-price')?.textContent || null;
        
        cartData.push({ 
            name, 
            description, 
            price, 
            originalPrice,
            quantity 
        });
    });
    
    localStorage.setItem('techNowCart', JSON.stringify(cartData));
}

// Load cart from localStorage (optional feature for persistence)
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('techNowCart');
    if (savedCart) {
        return JSON.parse(savedCart);
    }
    return null;
}

// Clear cart
function clearCart() {
    const confirmed = confirm('¿Estás seguro de que deseas vaciar todo el carrito?');
    
    if (confirmed) {
        const cartItemsContainer = document.querySelector('.cart-items');
        const vendorSections = document.querySelectorAll('.vendor-section');
        
        vendorSections.forEach(section => {
            section.style.transition = 'opacity 0.3s ease';
            section.style.opacity = '0';
        });
        
        setTimeout(() => {
            checkEmptyCart();
        }, 300);
    }
}