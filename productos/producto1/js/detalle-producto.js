const productData = {
    id: 1,
    title: 'iPhone 17 Pro',
    price: 6199.00  ,
    model: 'iPhone 17 Pro',
    stock: 8,
    features: [
        'Chip: Apple A19 Pro',
        'Memoria interna: 12GB RAM unificada',
'Almacenamiento: 1TB SSD NVMe',
'Pantalla: 6.7" Super Retina XDR ProMotion',
'Sistema Operativo: iOS 19'
    ]
};

// Storage en memoria
let memoryStorage = {
    cart: [],
    wishlist: []
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeProductPage();
    initializeImageGallery();
    initializeQuantityControls();
    initializeWishlist();
    initializeActionButtons();
    initializeSpecifications();
    initializeRatingSystem();
    updateCartCount();
});

// Initialize product page with data
function initializeProductPage() {
    document.getElementById('product-title').textContent = productData.title;
    document.getElementById('product-model').textContent = productData.model;
    document.getElementById('product-price').textContent = `S/. ${productData.price.toFixed(2)}`;
    
    const stockInfo = document.getElementById('stock-info');
    if (productData.stock < 10) {
        stockInfo.textContent = `¡Menos de ${productData.stock} unidades disponibles!`;
        stockInfo.style.color = '#ff6b35';
    } else {
        stockInfo.textContent = 'En stock';
        stockInfo.style.color = '#27ae60';
    }
    
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
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            
            indicators.forEach(ind => ind.classList.remove('active'));
            indicators[index].classList.add('active');
            
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
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            thumbnails[index].click();
        });
    });
    
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
    
    quantityInput.addEventListener('keypress', (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    });
}

// Update quantity display
function updateQuantityDisplay() {
    const quantityInput = document.getElementById('quantity-input');
    quantityInput.style.transform = 'scale(1.1)';
    setTimeout(() => {
        quantityInput.style.transform = 'scale(1)';
    }, 200);
}

// Wishlist functionality
function initializeWishlist() {
    const wishlistBtn = document.getElementById('wishlist-btn');
    let isInWishlist = false;
    
    const wishlist = getFromStorage('wishlist', []);
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
        
        wishlistBtn.style.transform = 'scale(1.3)';
        setTimeout(() => {
            wishlistBtn.style.transform = 'scale(1)';
        }, 300);
    });
}

// Add to wishlist
function addToWishlist(productId) {
    let wishlist = getFromStorage('wishlist', []);
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        saveToStorage('wishlist', wishlist);
    }
}

// Remove from wishlist
function removeFromWishlist(productId) {
    let wishlist = getFromStorage('wishlist', []);
    wishlist = wishlist.filter(id => id !== productId);
    saveToStorage('wishlist', wishlist);
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
    let cart = getFromStorage('cart', []);
    
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: quantity,
            image: product.images ? product.images[0] : ''
        });
    }
    
    saveToStorage('cart', cart);
    
    // Mostrar notificación
    showNotification(`Producto agregado al carrito`, 'success');
    
    // Cambiar botón temporalmente
    const btn = document.getElementById('add-to-cart-main');
    const originalText = btn.textContent;
    
    btn.textContent = '¡Agregado!';
    btn.style.backgroundColor = '#27ae60';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = '#e74c3c';
        btn.disabled = false;
    }, 2000);
    
    updateCartCount();
}

// Buy now function
function buyNow(product, quantity) {
    addToCart(product, quantity);
    
    console.log(`Comprando ahora ${quantity} unidad(es) de ${product.title}`);
    showNotification('Redirigiendo al checkout...', 'info');
    
    setTimeout(() => {
        alert('Función de checkout en desarrollo. Redirigiendo a la página de pago...');
    }, 1500);
}

// Update cart count
function updateCartCount() {
    const cart = getFromStorage('cart', []);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
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
            
            const productDetails = document.querySelector('.product-details');
            productDetails.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remover notificaciones existentes
    const existingNotifications = document.querySelectorAll('.cart-notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Crear nueva notificación
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    
    let bgColor = '#27ae60';
    if (type === 'success') bgColor = '#27ae60';
    
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: ${bgColor};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 99999;
        font-weight: 500;
        font-size: 16px;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Storage helpers (usando variables en memoria)
function saveToStorage(key, data) {
    memoryStorage[key] = data;
}

function getFromStorage(key, defaultValue = null) {
    return memoryStorage[key] !== undefined ? memoryStorage[key] : defaultValue;
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

// Log product view (analytics)
console.log('Producto visualizado:', productData);

// ============================================
// SISTEMA DE VALORACIÓN DEL PRODUCTO
// ============================================

function initializeRatingSystem() {
    const rateProductBtn = document.getElementById('rate-product-btn');
    const ratingModal = document.getElementById('rating-modal');
    const closeRatingModal = document.getElementById('close-rating-modal');
    const cancelRating = document.getElementById('cancel-rating');
    const submitRating = document.getElementById('submit-rating');
    const ratingStarsInput = document.querySelectorAll('.rating-stars-input i');
    const ratingText = document.querySelector('.rating-text');
    const thankYouModal = document.getElementById('thank-you-modal');
    const closeThankYou = document.getElementById('close-thank-you');
    
    let selectedRating = 0;
    
    const ratingTexts = {
        1: '😞 Muy malo',
        2: '😕 Malo',
        3: '😐 Regular',
        4: '😊 Bueno',
        5: '🤩 ¡Excelente!'
    };
    
    // Abrir modal de valoración
    rateProductBtn.addEventListener('click', () => {
        openRatingModal();
    });
    
    // Cerrar modal de valoración
    closeRatingModal.addEventListener('click', () => {
        closeRatingModalFunc();
    });
    
    cancelRating.addEventListener('click', () => {
        closeRatingModalFunc();
    });
    
    // Cerrar al hacer clic fuera
    ratingModal.addEventListener('click', (e) => {
        if (e.target === ratingModal) {
            closeRatingModalFunc();
        }
    });
    
    // Manejo de estrellas
    ratingStarsInput.forEach((star, index) => {
        // Hover effect
        star.addEventListener('mouseenter', () => {
            highlightStars(index + 1);
            ratingText.textContent = ratingTexts[index + 1];
        });
        
        star.addEventListener('mouseleave', () => {
            highlightStars(selectedRating);
            if (selectedRating === 0) {
                ratingText.textContent = 'Selecciona tu puntuación';
            } else {
                ratingText.textContent = ratingTexts[selectedRating];
            }
        });
        
        // Click para seleccionar
        star.addEventListener('click', () => {
            selectedRating = index + 1;
            highlightStars(selectedRating);
            ratingText.textContent = ratingTexts[selectedRating];
            submitRating.disabled = false;
            
            // Animación de selección
            star.style.transform = 'scale(1.3)';
            setTimeout(() => {
                star.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // Enviar valoración
    submitRating.addEventListener('click', () => {
        if (selectedRating > 0) {
            const comment = document.getElementById('rating-comment').value;
            
            // Guardar valoración (simulado)
            saveRating(selectedRating, comment);
            
            // Cerrar modal de valoración
            closeRatingModalFunc();
            
            // Mostrar modal de agradecimiento
            setTimeout(() => {
                openThankYouModal();
            }, 300);
        }
    });
    
    // Cerrar modal de agradecimiento
    closeThankYou.addEventListener('click', () => {
        closeThankYouModal();
    });
    
    thankYouModal.addEventListener('click', (e) => {
        if (e.target === thankYouModal) {
            closeThankYouModal();
        }
    });
    
    // Funciones auxiliares
    function highlightStars(count) {
        ratingStarsInput.forEach((star, index) => {
            if (index < count) {
                star.classList.remove('far');
                star.classList.add('fas', 'selected');
            } else {
                star.classList.remove('fas', 'selected');
                star.classList.add('far');
            }
        });
    }
    
    function openRatingModal() {
        ratingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeRatingModalFunc() {
        ratingModal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset
        selectedRating = 0;
        highlightStars(0);
        ratingText.textContent = 'Selecciona tu puntuación';
        document.getElementById('rating-comment').value = '';
        submitRating.disabled = true;
    }
    
    function openThankYouModal() {
        thankYouModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeThankYouModal() {
        thankYouModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function saveRating(rating, comment) {
        // Simular guardado de valoración
        const ratingData = {
            productId: productData.id,
            rating: rating,
            comment: comment,
            date: new Date().toISOString()
        };
        
        // Obtener valoraciones existentes
        let ratings = getFromStorage('productRatings', []);
        ratings.push(ratingData);
        saveToStorage('productRatings', ratings);
        
        console.log('Valoración guardada:', ratingData);
        
        // Actualizar visualización de estrellas en la página
        updateProductRatingDisplay(rating);
    }
    
    function updateProductRatingDisplay(newRating) {
        // Actualizar el score mostrado (simulación simple)
        const ratingScore = document.querySelector('.rating-score');
        const ratingCount = document.querySelector('.rating-count');
        
        if (ratingScore && ratingCount) {
            // Simular promedio
            const currentScore = parseFloat(ratingScore.textContent);
            const currentCount = parseInt(ratingCount.textContent.match(/\d+/)[0]);
            const newCount = currentCount + 1;
            const newAverage = ((currentScore * currentCount) + newRating) / newCount;
            
            ratingScore.textContent = newAverage.toFixed(1);
            ratingCount.textContent = `(${newCount} valoraciones)`;
            
            // Animación
            ratingScore.style.transform = 'scale(1.2)';
            ratingScore.style.color = '#27ae60';
            setTimeout(() => {
                ratingScore.style.transform = 'scale(1)';
                ratingScore.style.color = '#333';
            }, 500);
        }
    }
}

// Cerrar modales con tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const ratingModal = document.getElementById('rating-modal');
        const thankYouModal = document.getElementById('thank-you-modal');
        
        if (ratingModal && ratingModal.classList.contains('active')) {
            ratingModal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        if (thankYouModal && thankYouModal.classList.contains('active')) {
            thankYouModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});