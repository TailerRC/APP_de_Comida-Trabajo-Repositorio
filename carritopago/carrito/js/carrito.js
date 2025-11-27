// Funcionalidad del carrito
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los botones de cantidad
    const qtyButtons = document.querySelectorAll('.qty-btn');
    const removeLinks = document.querySelectorAll('.action-link.remove');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
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
    }
    
    // Función para actualizar el contador de productos
    function updateProductCount() {
        const cartItems = document.querySelectorAll('.cart-item');
        const pageTitle = document.querySelector('.page-title');
        const itemsHeader = document.querySelector('.items-header span');
        
        const count = cartItems.length;
        
        if (pageTitle) {
            pageTitle.textContent = `Mi Carrito (${count} producto${count !== 1 ? 's' : ''})`;
        }
        
        if (itemsHeader) {
            itemsHeader.textContent = `(${count} items)`;
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
            } else if (action === 'decrease' && currentValue > 1) {
                qtyInput.value = currentValue - 1;
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
            
            if (confirm('¿Estás seguro de que quieres eliminar este producto del carrito?')) {
                const cartItem = this.closest('.cart-item');
                cartItem.style.opacity = '0';
                cartItem.style.transform = 'translateX(-20px)';
                cartItem.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    cartItem.remove();
                    updateCartTotal();
                    
                    // Si no quedan productos, mostrar mensaje
                    const remainingItems = document.querySelectorAll('.cart-item');
                    if (remainingItems.length === 0) {
                        showEmptyCart();
                    }
                }, 300);
            }
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
                <a href="index.html" style="display: inline-block; padding: 12px 30px; background: #2c5f7c; color: white; text-decoration: none; border-radius: 6px;">Ir a la tienda</a>
            </div>
        `;
    }
    
    // Manejar botón de checkout
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const cartItems = document.querySelectorAll('.cart-item');
            if (cartItems.length === 0) {
                alert('Tu carrito está vacío. Agrega productos para continuar.');
                return;
            }
            
            // Aquí puedes redirigir a la página de checkout
            alert('Redirigiendo al proceso de pago...');
            // window.location.href = 'checkout.html';
        });
    }
    
    // Manejar enlace de cupón
    const addCouponLink = document.querySelector('.add-coupon');
    if (addCouponLink) {
        addCouponLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const coupon = prompt('Ingresa tu código de cupón:');
            if (coupon) {
                // Aquí puedes validar el cupón
                alert('Cupón aplicado correctamente: ' + coupon);
                // Actualizar el total con el descuento
            }
        });
    }
    
    // Inicializar el total al cargar la página
    updateCartTotal();
});