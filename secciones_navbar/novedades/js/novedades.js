// Sample product data con imágenes reales
const products = [
    {
        id: 1,
        name: 'iPhone 15 Pro',
        brand: 'Apple',
        originalPrice: 999.99,
        currentPrice: 899.99,
        category: 'smartphones',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROs-ICmyRyJnrs5Tt4ZWJ-Qsj9eO7yrRqxoQ&s',
        connectivity: ['5g', 'wifi6', 'nfc', 'gps'],
        capacity: ['128gb', '256gb', '512gb'],
        os: 'ios',
        color: 'black',
        availability: 'stock'
    },
    {
        id: 2,
        name: 'MacBook Pro 16"',
        brand: 'Apple',
        originalPrice: 2499.99,
        currentPrice: 2299.99,
        category: 'laptops',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
        connectivity: ['wifi6', 'bluetooth'],
        capacity: ['512gb', '16gb'],
        os: 'macos',
        color: 'gray',
        availability: 'stock'
    },
    {
        id: 3,
        name: 'AirPods Pro 2',
        brand: 'Apple',
        originalPrice: 249.99,
        currentPrice: 199.99,
        category: 'audio',
        image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=400&fit=crop',
        connectivity: ['bluetooth'],
        os: 'ios',
        color: 'white',
        availability: 'stock'
    },
    {
        id: 4,
        name: 'Apple Watch Series 9',
        brand: 'Apple',
        originalPrice: 399.99,
        currentPrice: 349.99,
        category: 'wearables',
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop',
        connectivity: ['bluetooth', 'wifi6', 'gps'],
        os: 'ios',
        color: 'black',
        availability: 'stock'
    },
    {
        id: 5,
        name: 'Razer BlackWidow V4',
        brand: 'HyperX',
        originalPrice: 179.99,
        currentPrice: 139.99,
        category: 'gaming',
        image: 'https://m.media-amazon.com/images/I/41wPKx3yBzL._AC_.jpg',
        connectivity: ['bluetooth'],
        color: 'black',
        availability: 'stock'
    },
    {
        id: 6,
        name: 'Samsung Odyssey G9',
        brand: 'Samsung',
        originalPrice: 1499.99,
        currentPrice: 1299.99,
        category: 'gaming',
        image: 'https://rimage.ripley.com.pe/home.ripley/Attachment/MKP/3278/PMP20000439480/full_image-1.jpeg',
        connectivity: ['bluetooth'],
        color: 'black',
        availability: 'stock'
    },
    {
        id: 7,
        name: 'Samsung T7 SSD 2TB',
        brand: 'Samsung',
        originalPrice: 199.99,
        currentPrice: 159.99,
        category: 'laptops',
        image: 'https://m.media-amazon.com/images/I/91eUq8LtTDL._AC_SL1500_.jpg',
        capacity: ['1tb'],
        color: 'blue',
        availability: 'stock'
    },
    {
        id: 8,
        name: 'ASUS ROG Router',
        brand: 'Dell',
        originalPrice: 599.99,
        currentPrice: 499.99,
        category: 'gaming',
        image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400&h=400&fit=crop',
        connectivity: ['wifi6'],
        color: 'black',
        availability: 'stock'
    },
    {
        id: 9,
        name: 'Samsung Galaxy Tab S9',
        brand: 'Samsung',
        originalPrice: 899.99,
        currentPrice: 749.99,
        category: 'smartphones',
        image: 'https://media.falabella.com/falabellaPE/124864457_02/w=800,h=800,fit=pad',
        connectivity: ['5g', 'wifi6', 'bluetooth'],
        capacity: ['256gb', '8gb'],
        os: 'android',
        color: 'gray',
        availability: 'stock'
    },
    {
        id: 10,
        name: 'Logitech G Pro X Superlight',
        brand: 'Logitech',
        originalPrice: 159.99,
        currentPrice: 129.99,
        category: 'gaming',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
        connectivity: ['bluetooth'],
        color: 'white',
        availability: 'stock'
    },
    {
        id: 11,
        name: 'Logitech StreamCam',
        brand: 'Logitech',
        originalPrice: 169.99,
        currentPrice: 129.99,
        category: 'laptops',
        image: 'https://coolboxpe.vtexassets.com/arquivos/ids/365831/Logitech-StreamCam_1.jpg?v=638515621652430000',
        connectivity: ['bluetooth'],
        color: 'black',
        availability: 'stock'
    },
    {
        id: 12,
        name: 'Sony SRS-XB43',
        brand: 'Sony',
        originalPrice: 249.99,
        currentPrice: 199.99,
        category: 'audio',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCWN96CqgRVAPHA_5EiJ3qO-rA-oVAds3Hdw&s',
        connectivity: ['bluetooth'],
        color: 'black',
        availability: 'stock'
    },
    {
        id: 13,
        name: 'Dell XPS 15',
        brand: 'Dell',
        originalPrice: 1899.99,
        currentPrice: 1599.99,
        category: 'laptops',
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop',
        connectivity: ['wifi6', 'bluetooth'],
        capacity: ['512gb', '16gb'],
        os: 'windows',
        color: 'gray',
        availability: 'stock'
    },
    {
        id: 14,
        name: 'HP Pavilion Gaming',
        brand: 'HP',
        originalPrice: 1299.99,
        currentPrice: 999.99,
        category: 'laptops',
        image: 'https://pe-media.hptiendaenlinea.com/catalog/product/3/Y/3Y7A8LA-1_T1679065411.png',
        connectivity: ['wifi6', 'bluetooth'],
        capacity: ['512gb', '8gb'],
        os: 'windows',
        color: 'black',
        availability: 'stock'
    },
    {
        id: 15,
        name: 'Sony WH-1000XM5',
        brand: 'Sony',
        originalPrice: 399.99,
        currentPrice: 329.99,
        category: 'audio',
        image: 'https://rimage.ripley.com.pe/home.ripley/Attachment/MKP/1179/PMP00003418711/full_image-1.jpeg',
        connectivity: ['bluetooth', 'nfc'],
        color: 'black',
        availability: 'stock'
    }
];

// Estado global de filtros
let currentFilters = {
    products: [],
    brands: [],
    minPrice: 0,
    maxPrice: Infinity,
    connectivity: [],
    capacity: [],
    os: [],
    colors: [],
    availability: []
};

// Load products on page load
document.addEventListener('DOMContentLoaded', () => {
    loadProducts(products);
    initializeFilters();
    initializePagination();
    initializeSorting();
    initializePerfilButton();
});

// Initialize perfil button to open login modal or redirect to profile
function initializePerfilButton() {
    const perfilBtn = document.getElementById('perfil-btn');
    const perfilText = document.getElementById('perfil-text');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (perfilBtn) {
        // Remover cualquier evento previo clonando el elemento
        const newPerfilBtn = perfilBtn.cloneNode(true);
        perfilBtn.parentNode.replaceChild(newPerfilBtn, perfilBtn);
        
        // Obtener referencia al nuevo span de texto
        const newPerfilText = newPerfilBtn.querySelector('#perfil-text') || document.getElementById('perfil-text');
        
        if (currentUser) {
            // Si hay usuario logueado, mostrar nombre y permitir navegación a perfil
            if (newPerfilText) {
                newPerfilText.textContent = currentUser.nombreCompleto ? currentUser.nombreCompleto.split(' ')[0] : 'Perfil';
            }
            newPerfilBtn.href = '../../main/perfil.html';
            // No agregar onclick, dejar que el href funcione normalmente
        } else {
            // Si no hay usuario, abrir modal de login
            if (newPerfilText) {
                newPerfilText.textContent = 'Perfil';
            }
            newPerfilBtn.href = '#';
            newPerfilBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (typeof openLoginModal === 'function') {
                    openLoginModal();
                } else {
                    const modal = document.getElementById('login-modal');
                    if (modal) modal.classList.add('active');
                }
            });
        }
    }
}

// Load products to grid
function loadProducts(productsList) {
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

    // Update results count
    updateResultsCount(productsList.length);
    initializeAddToCart();
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <span class="new-badge">NUEVO</span>
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x400?text=Producto'">
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

// Update results count
function updateResultsCount(count) {
    const resultsText = document.querySelector('.products-header p');
    if (resultsText) {
        resultsText.textContent = `Mostrando 1-${count} de ${count} resultados`;
    }
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
        clearBtn.addEventListener('click', clearAllFilters);
    }

    // Apply filters button
    const applyBtn = document.querySelector('.apply-filters-btn');
    if (applyBtn) {
        applyBtn.addEventListener('click', applyFilters);
    }

    // Real-time filter on checkbox change
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    // Price range filters
    const minPrice = document.getElementById('min-price');
    const maxPrice = document.getElementById('max-price');
    
    if (minPrice) {
        minPrice.addEventListener('change', applyFilters);
    }
    if (maxPrice) {
        maxPrice.addEventListener('change', applyFilters);
    }
}

// Clear all filters
function clearAllFilters() {
    // Clear all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Clear price inputs
    const minPrice = document.getElementById('min-price');
    const maxPrice = document.getElementById('max-price');
    if (minPrice) minPrice.value = '';
    if (maxPrice) maxPrice.value = '';
    
    // Reset filter state
    currentFilters = {
        products: [],
        brands: [],
        minPrice: 0,
        maxPrice: Infinity,
        connectivity: [],
        capacity: [],
        os: [],
        colors: [],
        availability: []
    };
    
    loadProducts(products);
}

// Apply filters function (mejorada)
function applyFilters() {
    // Update current filters state
    currentFilters.products = Array.from(document.querySelectorAll('input[name="product"]:checked'))
        .map(cb => cb.value);
    
    currentFilters.brands = Array.from(document.querySelectorAll('input[name="brand"]:checked'))
        .map(cb => cb.value);
    
    currentFilters.connectivity = Array.from(document.querySelectorAll('input[name="connectivity"]:checked'))
        .map(cb => cb.value);
    
    currentFilters.capacity = Array.from(document.querySelectorAll('input[name="capacity"]:checked'))
        .map(cb => cb.value);
    
    currentFilters.os = Array.from(document.querySelectorAll('input[name="os"]:checked'))
        .map(cb => cb.value);
    
    currentFilters.colors = Array.from(document.querySelectorAll('input[name="color"]:checked'))
        .map(cb => cb.value);
    
    currentFilters.availability = Array.from(document.querySelectorAll('input[name="availability"]:checked'))
        .map(cb => cb.value);
    
    // Get price range
    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;
    currentFilters.minPrice = minPrice;
    currentFilters.maxPrice = maxPrice;

    // Apply all filters
    let filteredProducts = products.filter(product => {
        // Filter by product type
        if (currentFilters.products.length > 0 && !currentFilters.products.includes(product.category)) {
            return false;
        }

        // Filter by brand
        if (currentFilters.brands.length > 0) {
            const brandMatch = currentFilters.brands.some(brand => 
                product.brand.toLowerCase().includes(brand.toLowerCase())
            );
            if (!brandMatch) return false;
        }

        // Filter by price range
        if (product.currentPrice < currentFilters.minPrice || product.currentPrice > currentFilters.maxPrice) {
            return false;
        }

        // Filter by connectivity
        if (currentFilters.connectivity.length > 0 && product.connectivity) {
            const hasConnectivity = currentFilters.connectivity.some(conn => 
                product.connectivity.includes(conn)
            );
            if (!hasConnectivity) return false;
        }

        // Filter by capacity
        if (currentFilters.capacity.length > 0 && product.capacity) {
            const hasCapacity = currentFilters.capacity.some(cap => 
                product.capacity.includes(cap)
            );
            if (!hasCapacity) return false;
        }

        // Filter by OS
        if (currentFilters.os.length > 0 && product.os) {
            if (!currentFilters.os.includes(product.os)) return false;
        }

        // Filter by color
        if (currentFilters.colors.length > 0 && product.color) {
            if (!currentFilters.colors.includes(product.color)) return false;
        }

        // Filter by availability
        if (currentFilters.availability.length > 0 && product.availability) {
            if (!currentFilters.availability.includes(product.availability)) return false;
        }

        return true;
    });

    loadProducts(filteredProducts);
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
            
            // Get current filtered products or all products
            let productsToSort = [...products];
            
            // Check if there are active filters
            const hasActiveFilters = 
                currentFilters.products.length > 0 ||
                currentFilters.brands.length > 0 ||
                currentFilters.minPrice > 0 ||
                currentFilters.maxPrice < Infinity ||
                currentFilters.connectivity.length > 0 ||
                currentFilters.capacity.length > 0 ||
                currentFilters.os.length > 0 ||
                currentFilters.colors.length > 0 ||
                currentFilters.availability.length > 0;

            // If filters are active, apply them first
            if (hasActiveFilters) {
                productsToSort = products.filter(product => {
                    if (currentFilters.products.length > 0 && !currentFilters.products.includes(product.category)) {
                        return false;
                    }
                    if (currentFilters.brands.length > 0) {
                        const brandMatch = currentFilters.brands.some(brand => 
                            product.brand.toLowerCase().includes(brand.toLowerCase())
                        );
                        if (!brandMatch) return false;
                    }
                    if (product.currentPrice < currentFilters.minPrice || product.currentPrice > currentFilters.maxPrice) {
                        return false;
                    }
                    if (currentFilters.connectivity.length > 0 && product.connectivity) {
                        const hasConnectivity = currentFilters.connectivity.some(conn => 
                            product.connectivity.includes(conn)
                        );
                        if (!hasConnectivity) return false;
                    }
                    if (currentFilters.capacity.length > 0 && product.capacity) {
                        const hasCapacity = currentFilters.capacity.some(cap => 
                            product.capacity.includes(cap)
                        );
                        if (!hasCapacity) return false;
                    }
                    if (currentFilters.os.length > 0 && product.os) {
                        if (!currentFilters.os.includes(product.os)) return false;
                    }
                    if (currentFilters.colors.length > 0 && product.color) {
                        if (!currentFilters.colors.includes(product.color)) return false;
                    }
                    if (currentFilters.availability.length > 0 && product.availability) {
                        if (!currentFilters.availability.includes(product.availability)) return false;
                    }
                    return true;
                });
            }

            // Apply sorting
            switch(sortValue) {
                case 'price-low':
                    productsToSort.sort((a, b) => a.currentPrice - b.currentPrice);
                    break;
                case 'price-high':
                    productsToSort.sort((a, b) => b.currentPrice - a.currentPrice);
                    break;
                case 'newest':
                    productsToSort.sort((a, b) => b.id - a.id);
                    break;
                default:
                    // Relevance - keep original order
                    break;
            }

            loadProducts(productsToSort);
        });
    }
}

// Initialize add to cart functionality
function initializeAddToCart() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartButtons.forEach(btn => {
        // Remove old listeners by cloning
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', (e) => {
            const productId = parseInt(newBtn.getAttribute('data-product-id'));
            const product = products.find(p => p.id === productId);
            
            if (product) {
                // Add animation
                newBtn.innerHTML = '<i class="fas fa-check"></i> ¡Añadido!';
                newBtn.style.backgroundColor = '#27ae60';
                
                setTimeout(() => {
                    newBtn.innerHTML = '<i class="fas fa-shopping-cart"></i> Añadir al Carrito';
                    newBtn.style.backgroundColor = '#2c5f6f';
                }, 2000);

                console.log('Producto añadido al carrito:', product);
            }
        });
    });
}

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

// Mobile menu responsiveness
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && navMenu.style.display === 'flex') {
            navMenu.style.display = 'none';
        }
    }
});