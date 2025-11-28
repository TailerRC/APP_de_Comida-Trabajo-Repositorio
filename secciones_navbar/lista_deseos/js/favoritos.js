// Remove product from favorites
document.querySelectorAll('.btn-remove').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const card = this.closest('.product-card');
        
        if (confirm('¿Estás seguro de que deseas eliminar este producto de tus favoritos?')) {
            card.style.transform = 'scale(0)';
            card.style.opacity = '0';
            
            setTimeout(() => {
                card.remove();
                updateProductCount();
            }, 300);
        }
    });
});

// Add to cart
document.querySelectorAll('.btn-add-cart').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('disabled')) {
            const card = this.closest('.product-card');
            const productName = card.querySelector('.product-title').textContent;
            const productPrice = card.querySelector('.product-price').textContent;
            
            alert(`${productName} agregado al carrito por ${productPrice}`);
            
            // Animation
            this.textContent = '✓ Agregado';
            this.style.backgroundColor = '#10b981';
            
            setTimeout(() => {
                this.textContent = 'Añadir al Carrito';
                this.style.backgroundColor = '';
            }, 2000);
        }
    });
});

// Add all to cart
document.querySelector('.btn-filter.active')?.addEventListener('click', function() {
    const availableProducts = document.querySelectorAll('.stock-badge.in-stock').length;
    
    if (availableProducts > 0) {
        if (confirm(`¿Deseas agregar ${availableProducts} productos disponibles al carrito?`)) {
            alert(`${availableProducts} productos agregados al carrito`);
        }
    } else {
        alert('No hay productos disponibles para agregar al carrito');
    }
});

// Compare list
document.querySelectorAll('.btn-filter-outline')[0]?.addEventListener('click', function() {
    alert('Función de comparación en desarrollo');
});

// Print list
document.querySelectorAll('.btn-filter-outline')[1]?.addEventListener('click', function() {
    window.print();
});

// Sort products
document.getElementById('sort')?.addEventListener('change', function() {
    const sortValue = this.value;
    const grid = document.querySelector('.products-grid');
    const cards = Array.from(grid.querySelectorAll('.product-card'));
    
    cards.sort((a, b) => {
        if (sortValue === 'price') {
            const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
            const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));
            return priceA - priceB;
        } else if (sortValue === 'name') {
            const nameA = a.querySelector('.product-title').textContent;
            const nameB = b.querySelector('.product-title').textContent;
            return nameA.localeCompare(nameB);
        }
        return 0;
    });
    
    // Re-append sorted cards
    cards.forEach(card => grid.appendChild(card));
});

// Update product count
function updateProductCount() {
    const count = document.querySelectorAll('.product-card').length;
    const countElement = document.querySelector('.product-count');
    if (countElement) {
        countElement.textContent = `(${count} producto${count !== 1 ? 's' : ''})`;
    }
}

// Initialize
updateProductCount();