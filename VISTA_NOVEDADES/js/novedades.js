// Sample product data
const products = [
    {
        id: 1,
        name: 'Smartphone X Pro',
        brand: 'TechNow',
        originalPrice: 599.99,
        currentPrice: 399.99,
        discount: 33,
        category: 'smartphones'
    },
    {
        id: 2,
        name: 'Laptop Ultra Delgado',
        brand: 'Innova',
        originalPrice: 1299.99,
        currentPrice: 1020.00,
        discount: 22,
        category: 'laptops'
    },
    {
        id: 3,
        name: 'Auriculares Bluetooth',
        brand: 'SoundWave',
        originalPrice: 89.99,
        currentPrice: 63.99,
        discount: 29,
        category: 'audio'
    },
    {
        id: 4,
        name: 'Smartwatch FitPro',
        brand: 'HealthTech',
        originalPrice: 249.99,
        currentPrice: 199.99,
        discount: 20,
        category: 'wearables'
    },
    {
        id: 5,
        name: 'Teclado Mecánico RGB',
        brand: 'GamePro',
        originalPrice: 129.99,
        currentPrice: 80.99,
        discount: 38,
        category: 'gaming'
    },
    {
        id: 6,
        name: 'Monitor Curvo 27"',
        brand: 'ViewTech',
        originalPrice: 399.99,
        currentPrice: 289.99,
        discount: 28,
        category: 'gaming'
    },
    {
        id: 7,
        name: 'Disco Duro Externo 1TB',
        brand: 'DataStore',
        originalPrice: 89.99,
        currentPrice: 62.39,
        discount: 31,
        category: 'laptops'
    },
    {
        id: 8,
        name: 'Router Wi-Fi 6',
        brand: 'NetConnect',
        originalPrice: 149.99,
        currentPrice: 98.39,
        discount: 34,
        category: 'gaming'
    },
    {
        id: 9,
        name: 'Tablet Pro 11"',
        brand: 'TechNow',
        originalPrice: 699.99,
        currentPrice: 489.99,
        discount: 30,
        category: 'smartphones'
    },
    {
        id: 10,
        name: 'Mouse Gaming RGB',
        brand: 'GamePro',
        originalPrice: 79.99,
        currentPrice: 51.99,
        discount: 35,
        category: 'gaming'
    },
    {
        id: 11,
        name: 'Cámara Web 4K',
        brand: 'ViewTech',
        originalPrice: 159.99,
        currentPrice: 111.99,
        discount: 30,
        category: 'laptops'
    },
    {
        id: 12,
        name: 'Altavoz Bluetooth',
        brand: 'SoundWave',
        originalPrice: 129.99,
        currentPrice: 90.99,
        discount: 30,
        category: 'audio'
    }
];

// Load products on page load
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    initializeFilters();
    initializePagination();
    initializeSorting();
    initializeAddToCart();
});

// Load products to grid
function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <span class="discount-badge">${product.discount}% OFF</span>
        <div class="product-image">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <line x1="20" y1="20" x2="180" y2="180" stroke-width="2" />
                <line x1="180" y1="20" x2="20" y2="180" stroke-width="2" />
            </svg>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-brand">Marca: ${product.brand}</p>
            <div class="product-pricing">
                <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                <span class="current-price">$${product.currentPrice.toFixed(2)}</span>
            </div>
            <button class="add-to-cart-btn" data-product-id="${product.id}">
                <i class="fas fa-shopping-cart"></i>
                Añadir al Carrito
            </button>
        </div>
    `;

    return card;
}

// Initialize filter toggles
function initializeFilters() {
    const filterSections = document.querySelectorAll('.filter-section');
    
    filterSections.forEach(section => {
        const toggleBtn = section.querySelector('.toggle-btn i');
        const content = section.nextElementSibling;
        
        // Set initial state
        if (content && content.classList.contains('filter-content')) {
            content.style.display = 'flex';
            toggleBtn.style.transform = 'rotate(0deg)';
        }
        
        section.addEventListener('click', () => {
            const content = section.nextElementSibling;
            const toggleBtn = section.querySelector('.toggle-btn i');
            
            if (content && content.classList.contains('filter-content')) {
                if (content.style.display === 'none') {
                    content.style.display = 'flex';
                    toggleBtn.style.transform = 'rotate(0deg)';
                } else {
                    content.style.display = 'none';
                    toggleBtn.style.transform = 'rotate(-90deg)';
                }
            }
        });
    });

    // Clear filters button
    const clearBtn = document.querySelector('.clear-filters-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            const minPrice = document.getElementById('min-price');
            const maxPrice = document.getElementById('max-price');
            if (minPrice) minPrice.value = '';
            if (maxPrice) maxPrice.value = '';
            
            loadProducts();
        });
    }

    // Apply filters button
    const applyBtn = document.querySelector('.apply-filters-btn');
    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            applyFilters();
        });
    }

    // Real-time filter on checkbox change
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            // Optional: apply filters in real-time
            // applyFilters();
        });
    });
}

// Apply filters function
function applyFilters() {
    let filteredProducts = [...products];

    // Filter by product type
    const selectedProducts = Array.from(document.querySelectorAll('input[name="product"]:checked'))
        .map(cb => cb.value);
    if (selectedProducts.length > 0) {
        filteredProducts = filteredProducts.filter(p => selectedProducts.includes(p.category));
    }

    // Filter by brand
    const selectedBrands = Array.from(document.querySelectorAll('input[name="brand"]:checked'))
        .map(cb => cb.value.toLowerCase());
    if (selectedBrands.length > 0) {
        filteredProducts = filteredProducts.filter(p => 
            selectedBrands.some(brand => p.brand.toLowerCase().includes(brand))
        );
    }

    // Filter by price range
    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;
    filteredProducts = filteredProducts.filter(p => 
        p.currentPrice >= minPrice && p.currentPrice <= maxPrice
    );

    // Filter by discount
    const selectedDiscounts = Array.from(document.querySelectorAll('input[name="discount"]:checked'))
        .map(cb => cb.value);
    if (selectedDiscounts.length > 0) {
        filteredProducts = filteredProducts.filter(p => {
            if (selectedDiscounts.includes('10-20')) {
                return p.discount >= 10 && p.discount <= 20;
            }
            if (selectedDiscounts.includes('20-40')) {
                return p.discount >= 20 && p.discount <= 40;
            }
            if (selectedDiscounts.includes('40')) {
                return p.discount > 40;
            }
            return true;
        });
    }

    updateProductsGrid(filteredProducts);
    
    // Update results count
    const resultsText = document.querySelector('.products-header p');
    if (resultsText) {
        resultsText.textContent = `Mostrando 1-${filteredProducts.length} de ${filteredProducts.length} resultados`;
    }
}

// Initialize pagination
function initializePagination() {
    const pageButtons = document.querySelectorAll('.page-btn:not(#prev-btn):not(#next-btn)');
    
    pageButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            pageButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const activeBtn = document.querySelector('.page-btn.active');
            const allBtns = Array.from(pageButtons);
            const currentIndex = allBtns.indexOf(activeBtn);
            
            if (currentIndex > 0) {
                pageButtons.forEach(b => b.classList.remove('active'));
                allBtns[currentIndex - 1].classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const activeBtn = document.querySelector('.page-btn.active');
            const allBtns = Array.from(pageButtons);
            const currentIndex = allBtns.indexOf(activeBtn);
            
            if (currentIndex < allBtns.length - 1) {
                pageButtons.forEach(b => b.classList.remove('active'));
                allBtns[currentIndex + 1].classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
}

// Initialize sorting
function initializeSorting() {
    const sortSelect = document.getElementById('sort-select');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const sortValue = e.target.value;
            let sortedProducts = [...products];

            switch(sortValue) {
                case 'price-low':
                    sortedProducts.sort((a, b) => a.currentPrice - b.currentPrice);
                    break;
                case 'price-high':
                    sortedProducts.sort((a, b) => b.currentPrice - a.currentPrice);
                    break;
                case 'discount':
                    sortedProducts.sort((a, b) => b.discount - a.discount);
                    break;
                case 'newest':
                    sortedProducts.sort((a, b) => b.id - a.id);
                    break;
                default:
                    // Relevance - keep original order
                    break;
            }

            updateProductsGrid(sortedProducts);
        });
    }
}

// Update products grid
function updateProductsGrid(productsList) {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';

    if (productsList.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">No se encontraron productos con los filtros seleccionados.</p>';
        return;
    }

    productsList.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });

    // Re-initialize add to cart buttons
    initializeAddToCart();
}

// Initialize add to cart functionality
function initializeAddToCart() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(btn.getAttribute('data-product-id'));
            const product = products.find(p => p.id === productId);
            
            if (product) {
                // Add animation
                btn.innerHTML = '<i class="fas fa-check"></i> ¡Añadido!';
                btn.style.backgroundColor = '#27ae60';
                
                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-shopping-cart"></i> Añadir al Carrito';
                    btn.style.backgroundColor = '#2c5f6f';
                }, 2000);

                // Here you would typically add to cart logic
                console.log('Producto añadido al carrito:', product);
            }
        });
    });
}

// Mobile menu toggle (if needed)
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            // Add mobile menu functionality here if needed
        }
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
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