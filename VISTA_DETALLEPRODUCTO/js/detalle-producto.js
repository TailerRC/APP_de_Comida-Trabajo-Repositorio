
const productData = {
    id: 1,
    title: 'Marca Modelo X 16GB RAM 512GB SSD, Negro',
    price: 1299.00,
    model: 'Modelo X',
    stock: 8,
    images: [
        'images/productos/laptop-1.jpg',
        'images/productos/laptop-2.jpg',
        'images/productos/laptop-3.jpg',
        'images/productos/laptop-4.jpg'
    ],
    features: [
        'Memoria interna: 16GB RAM',
        'Almacenamiento: 512GB SSD',
        'Pantalla: 15.6" Full HD',
        'Procesador: Intel Core i7 de 11ª generación'
    ]
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeProductPage();
    initializeImageGallery();
    initializeQuantityControls();
    initializeWishlist();
    initializeActionButtons();
    initializeSpecifications();
    addAnimationStyles();
});

// Initialize product page with data
function initializeProductPage() {
    // Set product title
    document.getElementById('product-title').textContent = productData.title;
    document.getElementById('product-model').textContent = productData.model;
    
    // Set price
    document.getElementById('product-price').textContent = `$${productData.price.toFixed(2)}`;
    
    // Set stock info
    const stockInfo = document.getElementById('stock-info');
    if (productData.stock < 10) {
        stockInfo.textContent = `¡Menos de ${productData.stock} unidades disponibles!`;
        stockInfo.style.color = '#ff6b35';
    } else {
        stockInfo.textContent = 'En stock';
        stockInfo.style.color = '#27ae60';
    }
    
    // Set features
    const featuresList = document.getElementById('product-features');
    featuresList.innerHTML = '';
    productData.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
}

// Image Gallery functionality
function initializeImageGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-product-image');
    const indicators = document.querySelectorAll('.indicator');
    
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            // Update active thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            
            // Update indicators
            indicators.forEach(ind => ind.classList.remove('active'));
            indicators[index].classList.add('active');
            
            // Update main image with fade effect
            mainImage.style.opacity = '0';
            setTimeout(() => {
                const img = thumb.querySelector('img');
                if (img) {
                    mainImage.src = img.src;
                }
                mainImage.style.opacity = '1';
            }, 200);
        });
    });
    
    // Indicator click functionality
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            thumbnails[index].click();
        });
    });
    
    // Keyboard navigation for gallery
    document.addEventListener('keydown', (e) => {
        const activeIndex = Array.from(thumbnails).findIndex(t => t.classList.contains('active'));
        
        if (e.key === 'ArrowLeft' && activeIndex > 0) {
            thumbnails[activeIndex - 1].click();
        } else if (e.key === 'ArrowRight' && activeIndex < thumbnails.length - 1) {
            thumbnails[activeIndex + 1].click();
        }
    });
}

// Quantity controls
function initializeQuantityControls() {
    const decreaseBtn = document.getElementById('decrease-btn');
    const increaseBtn = document.getElementById('increase-btn');
    const quantityInput = document.getElementById('quantity-input');
    
    decreaseBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
            updateQuantityDisplay();
        }
    });
    
    increaseBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        const maxStock = productData.stock;
        if (currentValue < maxStock) {
            quantityInput.value = currentValue + 1;
            updateQuantityDisplay();
        } else {
            showNotification(`Solo hay ${maxStock} unidades disponibles`, 'warning');
        }
    });
    
    // Prevent manual input beyond stock
    quantityInput.addEventListener('change', () => {
        let value = parseInt(quantityInput.value);
        if (isNaN(value) || value < 1) {
            quantityInput.value = 1;
        } else if (value > productData.stock) {
            quantityInput.value = productData.stock;
            showNotification(`Solo hay ${productData.stock} unidades disponibles`, 'warning');
        }
        updateQuantityDisplay();
    });
    
    // Prevent non-numeric input
    quantityInput.addEventListener('keypress', (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    });
}

// Update quantity display
function updateQuantityDisplay() {
    const quantityInput = document.getElementById('quantity-input');
    const quantity = parseInt(quantityInput.value);
    
    // You can add visual feedback here
    quantityInput.style.transform = 'scale(1.1)';
    setTimeout(() => {
        quantityInput.style.transform = 'scale(1)';
    }, 200);
}

// Wishlist functionality
function initializeWishlist() {
    const wishlistBtn = document.getElementById('wishlist-btn');
    let isInWishlist = false;
    
    // Check if product is already in wishlist (from localStorage)
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (wishlist.includes(productData.id)) {
        isInWishlist = true;
        wishlistBtn.classList.add('active');
        wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
    }
    
    wishlistBtn.addEventListener('click', () => {
        isInWishlist = !isInWishlist;
        
        if (isInWishlist) {
            wishlistBtn.classList.add('active');
            wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
            addToWishlist(productData.id);
            showNotification('Agregado a lista de deseos', 'success');
        } else {
            wishlistBtn.classList.remove('active');
            wishlistBtn.innerHTML = '<i class="far fa-heart"></i>';
            removeFromWishlist(productData.id);
            showNotification('Eliminado de lista de deseos', 'info');
        }
        
        // Animation
        wishlistBtn.style.transform = 'scale(1.3)';
        setTimeout(() => {
            wishlistBtn.style.transform = 'scale(1)';
        }, 300);
    });
}

// Add to wishlist
function addToWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
}

// Remove from wishlist
function removeFromWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    wishlist = wishlist.filter(id => id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Action buttons
function initializeActionButtons() {
    const addToCartBtn = document.getElementById('add-to-cart-main');
    const buyNowBtn = document.getElementById('buy-now-btn');
    const quantityInput = document.getElementById('quantity-input');
    
    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        addToCart(productData, quantity);
    });
    
    buyNowBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        buyNow(productData, quantity);
    });
}

// Add to cart function
function addToCart(product, quantity) {
    // Get existing cart or create new one
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already in cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
        // Update quantity
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Add new item
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: quantity,
            image: product.images[0]
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    console.log(`Agregando ${quantity} unidad(es) de ${product.title} al carrito`);
    
    // Visual feedback
    const btn = document.getElementById('add-to-cart-main');
    const originalText = btn.textContent;
    const originalBg = btn.style.backgroundColor;
    
    btn.textContent = '¡Agregado al Carrito!';
    btn.style.backgroundColor = '#27ae60';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = originalBg || '#e74c3c';
        btn.disabled = false;
    }, 2000);
    
    showNotification(`${quantity} producto(s) agregado(s) al carrito`, 'success');
    
    // Update cart count in header (if exists)
    updateCartCount();
}

// Buy now function
function buyNow(product, quantity) {
    // First add to cart
    addToCart(product, quantity);
    
    console.log(`Comprando ahora ${quantity} unidad(es) de ${product.title}`);
    showNotification('Redirigiendo al checkout...', 'info');
    
    // Simular redirección
    setTimeout(() => {
        // window.location.href = 'checkout.html';
        alert('Función de checkout en desarrollo. Redirigiendo a la página de pago...');
    }, 1500);
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update cart badge if exists
    const cartIcon = document.querySelector('.icon-link .fa-shopping-cart');
    if (cartIcon) {
        let badge = cartIcon.parentElement.querySelector('.cart-badge');
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'cart-badge';
            badge.style.cssText = `
                position: absolute;
                top: -5px;
                right: -10px;
                background-color: #ff4757;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 11px;
                font-weight: bold;
            `;
            cartIcon.parentElement.style.position = 'relative';
            cartIcon.parentElement.appendChild(badge);
        }
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Specifications toggle
function initializeSpecifications() {
    const seeAllBtn = document.getElementById('see-all-features');
    const fullSpecs = document.getElementById('full-specifications');
    
    seeAllBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (fullSpecs.style.display === 'none' || !fullSpecs.style.display) {
            fullSpecs.style.display = 'block';
            seeAllBtn.textContent = 'Ocultar características';
            
            // Smooth scroll with offset
            setTimeout(() => {
                const elementPosition = fullSpecs.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - 100;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        } else {
            fullSpecs.style.display = 'none';
            seeAllBtn.textContent = 'Ver todas las características';
            
            // Scroll back to product details
            const productDetails = document.querySelector('.product-details');
            productDetails.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Set color based on type
    let bgColor = '#2c5f6f';
    switch(type) {
        case 'success':
            bgColor = '#27ae60';
            break;
        case 'warning':
            bgColor = '#f39c12';
            break;
        case 'error':
            bgColor = '#e74c3c';
            break;
        case 'info':
        default:
            bgColor = '#2c5f6f';
    }
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${bgColor};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        font-weight: 500;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        #main-product-image {
            transition: opacity 0.3s ease;
        }
        
        #quantity-input {
            transition: transform 0.2s ease;
        }
        
        .wishlist-btn {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
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

// Initialize cart count on page load
updateCartCount();

// Handle browser back/forward
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        updateCartCount();
    }
});

// Log product view (analytics)
console.log('Producto visualizado:', productData);