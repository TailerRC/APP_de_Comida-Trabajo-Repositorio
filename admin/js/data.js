// ==================== ADMIN ACCESS ====================
// Acceso libre al panel de admin (frontend only)
console.log('✓ Panel de admin accesible');

// ==================== DATA STORAGE ====================
let products = [
    { id: 1, sku: 'SKU001', name: 'Laptop UltraBook X1', category: 'Laptops', brand: 'Sony', price: 1200.00, stock: 150, active: true, sales: 245 },
    { id: 2, sku: 'SKU002', name: 'Smartphone Pro Max', category: 'Smartphones', brand: 'Samsung', price: 800.00, stock: 25, active: true, sales: 189 },
    { id: 3, sku: 'SKU003', name: 'Auriculares Inalámbricos', category: 'Audio', brand: 'Sony', price: 150.00, stock: 0, active: false, sales: 156 },
    { id: 4, sku: 'SKU004', name: 'Monitor Curvo 27"', category: 'Gaming', brand: 'Samsung', price: 350.00, stock: 80, active: true, sales: 134 },
    { id: 5, sku: 'SKU005', name: 'Teclado Mecánico RGB', category: 'Gaming', brand: 'Xiaomi', price: 90.00, stock: 10, active: true, sales: 98 },
    { id: 6, sku: 'SKU006', name: 'MacBook Air M2', category: 'Laptops', brand: 'Apple', price: 1500.00, stock: 45, active: true, sales: 178 },
    { id: 7, sku: 'SKU007', name: 'iPhone 15 Pro', category: 'Smartphones', brand: 'Apple', price: 1200.00, stock: 60, active: true, sales: 203 },
    { id: 8, sku: 'SKU008', name: 'Tablet Galaxy Tab S9', category: 'Smartphones', brand: 'Samsung', price: 700.00, stock: 35, active: true, sales: 87 },
    { id: 9, sku: 'SKU009', name: 'Mouse Gaming Pro', category: 'Gaming', brand: 'Xiaomi', price: 45.00, stock: 120, active: true, sales: 156 },
    { id: 10, sku: 'SKU010', name: 'Webcam 4K Ultra HD', category: 'Audio', brand: 'Sony', price: 180.00, stock: 0, active: false, sales: 67 }
];

let users = [
    { id: 1, name: 'Juan Pérez', email: 'juan.perez@example.com', lastLogin: '2023-10-26 10:30', orders: 5, active: true },
    { id: 2, name: 'María García', email: 'maria.garcia@example.com', lastLogin: '2023-10-25 14:00', orders: 12, active: true },
    { id: 3, name: 'Carlos Ruiz', email: 'carlos.ruiz@example.com', lastLogin: '2023-10-20 09:00', orders: 3, active: false },
    { id: 4, name: 'Ana López', email: 'ana.lopez@example.com', lastLogin: '2023-10-26 11:45', orders: 8, active: true },
    { id: 5, name: 'Pedro Sánchez', email: 'pedro.sanchez@example.com', lastLogin: '2023-10-24 16:15', orders: 1, active: true },
    { id: 6, name: 'Laura Martínez', email: 'laura.martinez@example.com', lastLogin: '2023-10-26 09:20', orders: 15, active: true },
    { id: 7, name: 'Diego Torres', email: 'diego.torres@example.com', lastLogin: '2023-10-23 13:40', orders: 7, active: true },
    { id: 8, name: 'Sofia Ramírez', email: 'sofia.ramirez@example.com', lastLogin: '2023-10-22 10:10', orders: 4, active: false }
];

let brands = [
    { id: 1, name: 'Sony', description: 'Líder en audio de alta fidelidad.', category: 'Audio', visible: true, products: 0 },
    { id: 2, name: 'Samsung', description: 'Innovación en tecnología móvil y pantallas.', category: 'Tecnología', visible: false, products: 0 },
    { id: 3, name: 'Apple', description: 'Diseño premium y ecosistema integrado.', category: 'Tecnología', visible: true, products: 0 },
    { id: 4, name: 'Xiaomi', description: 'Tecnología asequible y de alto rendimiento.', category: 'Tecnología', visible: true, products: 0 }
];

let activities = [];
let tickets = [
    { id: 'TN-001', createdAt: '2023-10-26', client: 'Ana García', subject: 'Problema con el envío del pedido #12345', type: 'Reclamo', status: 'Escalado', lastActivity: 'Hace 10 min', slaMinutes: 135 },
    { id: 'TN-002', createdAt: '2023-10-25', client: 'Juan Pérez', subject: 'Consulta sobre garantía de producto X', type: 'Consulta', status: 'En Proceso', lastActivity: 'Hace 30 min', slaMinutes: 160 },
    { id: 'TN-003', createdAt: '2023-10-24', client: 'María López', subject: 'Solicitud de devolución para artículo defectuoso', type: 'Devolución', status: 'Cerrado', lastActivity: 'Ayer', slaMinutes: 95 },
    { id: 'TN-004', createdAt: '2023-10-26', client: 'Carlos Ruiz', subject: 'Problema técnico con software de producto Y', type: 'Problema Técnico', status: 'Nuevo', lastActivity: 'Hace 5 min', slaMinutes: 120 },
    { id: 'TN-005', createdAt: '2023-10-23', client: 'Laura Martínez', subject: 'Reclamo por retraso en la entrega', type: 'Reclamo', status: 'En Proceso', lastActivity: 'Hace 2 h', slaMinutes: 200 },
    { id: 'TN-006', createdAt: '2023-10-22', client: 'Diego Torres', subject: 'Consulta: compatibilidad de accesorios', type: 'Consulta', status: 'Cerrado', lastActivity: 'Hace 3 días', slaMinutes: 80 }
];
let orders = [
    { id: 'ORD001', date: '2023-10-26', client: 'Juan Pérez', total: 150.00, orderStatus: 'Pendiente', paymentStatus: 'Pagado' },
    { id: 'ORD002', date: '2023-10-25', client: 'María García', total: 230.50, orderStatus: 'Enviado', paymentStatus: 'Pagado' },
    { id: 'ORD003', date: '2023-10-24', client: 'Carlos Ruiz', total: 85.00, orderStatus: 'Entregado', paymentStatus: 'Pagado' },
    { id: 'ORD004', date: '2023-10-23', client: 'Ana López', total: 320.00, orderStatus: 'Cancelado', paymentStatus: 'Rechazado' },
    { id: 'ORD005', date: '2023-10-22', client: 'Pedro Gómez', total: 99.99, orderStatus: 'Procesando', paymentStatus: 'Pendiente de Pago' },
    { id: 'ORD006', date: '2023-10-21', client: 'Laura Martínez', total: 180.00, orderStatus: 'Pendiente', paymentStatus: 'Pendiente de Pago' },
    { id: 'ORD007', date: '2023-10-20', client: 'Diego Torres', total: 249.90, orderStatus: 'Enviado', paymentStatus: 'Pagado' }
];
let campaigns = [
    { id: 'CUPON123', name: 'Descuento Verano', type: 'Descuento %', expires: '31/08/2024', uses: 500, revenue: 5000, status: 'Activa' },
    { id: 'ENVIOFREE', name: 'Envío Gratis Navidad', type: 'Envío Gratis', expires: '25/12/2023', uses: 1200, revenue: 7200, status: 'Expirada' },
    { id: '2X1PROMO', name: 'Promo Black Friday', type: '2x1', expires: '29/11/2024', uses: 80, revenue: 3030, status: 'Programada' }
];
let transactions = [
    { id: 'TX-001', date: '2023-10-01', description: 'Venta ORD001', type: 'Ingreso', amount: 150.00, status: 'Pagado' },
    { id: 'TX-002', date: '2023-10-02', description: 'Compra de Stock', type: 'Gasto', amount: 320.00, status: 'Pagado' },
    { id: 'TX-003', date: '2023-10-03', description: 'Reembolso ORD004', type: 'Gasto', amount: 50.00, status: 'Pagado' },
    { id: 'TX-004', date: '2023-10-10', description: 'Venta ORD003', type: 'Ingreso', amount: 85.00, status: 'Pagado' },
    { id: 'TX-005', date: '2023-10-15', description: 'Servicios de Marketing', type: 'Gasto', amount: 200.00, status: 'Pendiente' },
    { id: 'TX-006', date: '2023-10-20', description: 'Venta ORD007', type: 'Ingreso', amount: 249.90, status: 'Pagado' }
];
let currentPage = { products: 1, users: 1, brands: 1, tickets: 1, orders: 1, campaigns: 1, finances: 1 };
const itemsPerPage = 5;

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    calculateBrandProducts();
    initNavigation();
    initExpandableMenus();
    updateDashboard();
    renderProductsTable();
    renderUsersTable();
    renderBrandsTable();
    renderTicketsTable();
    renderOrdersTable();
    renderCampaignsTable();
    renderFinanceTable();
    drawFinanceChart();
    initModals();
    initFilters();
    setupFinanceChartActivation();
    setupFinanceResizeObserver();
    setupFinanceIntersectionObserver();
    ensureFinanceChartReady();
    addActivity('Sistema iniciado correctamente');
});
// Redraw finance chart when the page becomes active to avoid zoom dependency
function setupFinanceChartActivation() {
    const finPage = document.getElementById('finanzas-page');
    if (!finPage) return;
    const observer = new MutationObserver(() => {
        if (finPage.classList.contains('active')) {
            // Defer to ensure layout finalized
            requestAnimationFrame(() => {
                drawFinanceChart();
                // Extra delayed draw to catch late layout/style settles
                setTimeout(drawFinanceChart, 150);
            });
        }
    });
    observer.observe(finPage, { attributes: true, attributeFilter: ['class'] });
}

// ==================== NAVIGATION ====================
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-page]');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
            
            const pageId = this.getAttribute('data-page') + '-page';
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');
                
                // Update page-specific data
                if (pageId === 'dashboard-page') updateDashboard();
                if (pageId === 'productos-page') renderProductsTable();
                if (pageId === 'usuarios-page') renderUsersTable();
                if (pageId === 'marca-page') renderBrandsTable();
                if (pageId === 'atencion-page') renderTicketsTable();
                if (pageId === 'ventas-page') renderOrdersTable();
                if (pageId === 'marketing-page') renderCampaignsTable();
                if (pageId === 'finanzas-page') {
                    renderFinanceTable();
                    updateFinanceStats();
                    // Defer chart draw to ensure layout has settled
                    requestAnimationFrame(() => {
                        setTimeout(() => { drawFinanceChart(); }, 50);
                    });
                }
            }
        });
    });
}

function initExpandableMenus() {
    const expandableItems = document.querySelectorAll('.nav-item.expandable');
    
    expandableItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const submenu = this.nextElementSibling;
            const arrow = this.querySelector('.arrow');
            
            if (submenu && submenu.classList.contains('submenu')) {
                submenu.classList.toggle('active');
                if (arrow) {
                    arrow.style.transform = submenu.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
                }
            }
        });
    });
}

// ==================== DASHBOARD ====================
let chartData = {
    period: 'month',
    salesData: [],
    trafficData: [],
    labels: []
};

function updateDashboard() {
    // Calculate stats
    const totalRevenue = products.reduce((sum, p) => sum + (p.price * p.sales), 0);
    const pendingOrders = Math.floor(Math.random() * 30) + 20;
    const activeUsers = users.filter(u => u.active).length;
    const outOfStock = products.filter(p => p.stock === 0).length;
    
    // Update stat cards
    document.getElementById('stat-ingresos').textContent = `${totalRevenue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('stat-ingresos-change').textContent = '↑ 12%';
    
    document.getElementById('stat-ordenes').textContent = pendingOrders;
    document.getElementById('stat-ordenes-change').textContent = '↓ 5%';
    
    document.getElementById('stat-usuarios').textContent = activeUsers;
    document.getElementById('stat-usuarios-change').textContent = '↑ 8%';
    
    document.getElementById('stat-agotados').textContent = outOfStock;
    document.getElementById('stat-agotados-change').textContent = '↓ 1%';
    
    // Update top products
    const topProducts = [...products].sort((a, b) => b.sales - a.sales).slice(0, 5);
    const tbody = document.getElementById('top-products-tbody');
    tbody.innerHTML = topProducts.map(p => `
        <tr>
            <td>${p.name}</td>
            <td>${p.sales}</td>
        </tr>
    `).join('');
    
    // Update activity list
    const activityList = document.getElementById('activity-list');
    activityList.innerHTML = activities.slice(-4).reverse().map(a => `
        <div class="activity-item">${a}</div>
    `).join('');
    
    // Initialize chart
    initChartFilters();
    generateChartData('month');
    drawSalesChart();
}

function initChartFilters() {
    const chartSection = document.querySelector('.chart-section');
    const existingFilters = chartSection.querySelector('.chart-filters');
    
    if (!existingFilters) {
        const filtersHTML = `
            <div class="chart-filters">
                <button class="chart-filter-btn active" data-period="week">Última Semana</button>
                <button class="chart-filter-btn" data-period="month">Último Mes</button>
                <button class="chart-filter-btn" data-period="year">Último Año</button>
            </div>
        `;
        
        const titleElement = chartSection.querySelector('.section-title');
        titleElement.insertAdjacentHTML('afterend', filtersHTML);
        
        // Add event listeners
        document.querySelectorAll('.chart-filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.chart-filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const period = this.getAttribute('data-period');
                generateChartData(period);
                drawSalesChart();
            });
        });
    }
}

function generateChartData(period) {
    chartData.period = period;
    
    if (period === 'week') {
        chartData.labels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
        chartData.salesData = [45, 52, 48, 65, 70, 85, 78];
        chartData.trafficData = [30, 35, 32, 48, 55, 65, 60];
    } else if (period === 'month') {
        chartData.labels = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'];
        chartData.salesData = [60, 75, 85, 90];
        chartData.trafficData = [40, 50, 60, 70];
    } else if (period === 'year') {
        chartData.labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        chartData.salesData = [];
        chartData.trafficData = [];
        for (let i = 0; i < 12; i++) {
            chartData.salesData.push(Math.floor(Math.random() * 40) + 60);
            chartData.trafficData.push(Math.floor(Math.random() * 30) + 40);
        }
    }
}

// ==================== DRAW SALES CHART - MODERN DESIGN ====================
function drawSalesChart() {
    const canvas = document.getElementById('salesChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.offsetWidth;
    const height = 280;
    
    canvas.width = width;
    canvas.height = height;
    
    const padding = 60;
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;
    const maxValue = 100;
    
    ctx.clearRect(0, 0, width, height);
    
    // Draw subtle grid with gradient
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (graphHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
        
        // Y-axis labels with better styling
        ctx.fillStyle = '#95a5a6';
        ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'right';
        const value = maxValue - (maxValue / 5) * i;
        ctx.fillText(value.toFixed(0), padding - 15, y + 5);
    }
    
    // Area bajo las líneas eliminada - diseño más limpio
    
    // Draw straight lines
    function drawStraightLine(data, color, lineWidth) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.beginPath();
        
        const points = [];
        data.forEach((value, index) => {
            const x = padding + (graphWidth / (data.length - 1)) * index;
            const y = padding + graphHeight - (value / maxValue) * graphHeight;
            points.push({ x, y, value, label: chartData.labels[index] });
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Draw enhanced dots with hover effect
        points.forEach((point, index) => {
            // Outer glow
            ctx.beginPath();
            ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
            ctx.fillStyle = color + '20';
            ctx.fill();
            
            // Main dot
            ctx.beginPath();
            ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            
            // White inner circle
            ctx.beginPath();
            ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
        });
        
        return points;
    }
    
    const salesPoints = drawStraightLine(chartData.salesData, '#3498db', 3.5);
    const trafficPoints = drawStraightLine(chartData.trafficData, '#95a5a6', 3);
    
    // Draw x-axis labels with modern styling
    ctx.fillStyle = '#7f8c8d';
    ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    chartData.labels.forEach((label, index) => {
        const x = padding + (graphWidth / (chartData.labels.length - 1)) * index;
        ctx.fillText(label, x, height - 20);
    });
    
    // Draw modern legend - positioned at top right, outside graph area
    const legendX = width - 180;
    const legendY = 15;
    const legendSpacing = 100; // Horizontal spacing between legend items
    
    // Sales legend
    const salesLegendX = legendX;
    ctx.fillStyle = '#3498db';
    ctx.fillRect(salesLegendX, legendY, 18, 18);
    
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(salesLegendX, legendY, 18, 18);
    
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Ventas', salesLegendX + 26, legendY + 13);
    
    // Traffic legend - positioned next to sales legend
    const trafficLegendX = salesLegendX + legendSpacing;
    ctx.fillStyle = '#95a5a6';
    ctx.fillRect(trafficLegendX, legendY, 18, 18);
    
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(trafficLegendX, legendY, 18, 18);
    
    ctx.fillStyle = '#2c3e50';
    ctx.fillText('Tráfico', trafficLegendX + 26, legendY + 13);
    
    // Store points for hover detection
    canvas.salesPoints = salesPoints;
    canvas.trafficPoints = trafficPoints;
    canvas.padding = padding;
    canvas.graphHeight = graphHeight;
    canvas.maxValue = maxValue;
}

// Enhanced tooltip with modern design
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('salesChart');
    if (!canvas) return;
    
    // Create modern tooltip
    const tooltip = document.createElement('div');
    tooltip.id = 'chart-tooltip';
    tooltip.style.cssText = `
        position: absolute;
        background: linear-gradient(135deg, rgba(44, 62, 80, 0.98), rgba(52, 73, 94, 0.98));
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        font-size: 14px;
        pointer-events: none;
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1000;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        transform: translateY(10px);
    `;
    document.body.appendChild(tooltip);
    
    // Create tooltip arrow
    const arrow = document.createElement('div');
    arrow.style.cssText = `
        position: absolute;
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid rgba(44, 62, 80, 0.98);
    `;
    tooltip.appendChild(arrow);
    
    canvas.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        let foundPoint = null;
        let pointType = '';
        let pointColor = '';
        
        // Check sales points
        if (canvas.salesPoints) {
            canvas.salesPoints.forEach(point => {
                const distance = Math.sqrt(Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2));
                if (distance < 12) {
                    foundPoint = point;
                    pointType = 'Ventas';
                    pointColor = '#3498db';
                }
            });
        }
        
        // Check traffic points
        if (!foundPoint && canvas.trafficPoints) {
            canvas.trafficPoints.forEach(point => {
                const distance = Math.sqrt(Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2));
                if (distance < 12) {
                    foundPoint = point;
                    pointType = 'Tráfico';
                    pointColor = '#95a5a6';
                }
            });
        }
        
        if (foundPoint) {
            canvas.style.cursor = 'pointer';
            tooltip.innerHTML = `
                <div style="font-weight: 700; font-size: 15px; margin-bottom: 6px; color: #fff;">
                    ${foundPoint.label}
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <div style="width: 12px; height: 12px; background: ${pointColor}; border-radius: 3px; box-shadow: 0 2px 8px ${pointColor}50;"></div>
                    <span style="color: rgba(255, 255, 255, 0.9); font-weight: 600;">
                        ${pointType}: <span style="color: #fff; font-size: 16px;">${foundPoint.value.toFixed(0)}</span>
                    </span>
                </div>
                <div style="position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid rgba(44, 62, 80, 0.98);"></div>
            `;
            tooltip.style.left = (e.clientX) + 'px';
            tooltip.style.top = (e.clientY - 80) + 'px';
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(0)';
        } else {
            canvas.style.cursor = 'default';
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateY(10px)';
        }
    });
    
    canvas.addEventListener('mouseleave', function() {
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateY(10px)';
        canvas.style.cursor = 'default';
    });
});

// ==================== PRODUCTS ====================
function renderProductsTable() {
    updateProductStats();
    
    const filtered = getFilteredProducts();
    const paginated = paginate(filtered, currentPage.products, itemsPerPage);
    
    const tbody = document.getElementById('products-tbody');
    tbody.innerHTML = paginated.map(p => `
        <tr data-id="${p.id}">
            <td>${p.sku}</td>
            <td>${p.name}</td>
            <td>${p.category}</td>
            <td>$${p.price.toFixed(2)}</td>
            <td><span class="stock-badge ${getStockClass(p.stock)}">${p.stock}</span></td>
            <td>${p.active ? 'Activo' : 'Inactivo'}</td>
            <td>
                <button class="icon-btn edit" onclick="editProduct(${p.id})" title="Editar">
                    <svg viewBox="0 0 24 24">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                </button>
                <button class="icon-btn view" onclick="viewProduct(${p.id})" title="Ver">
                    <svg viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                </button>
                <button class="icon-btn delete" onclick="deleteProduct(${p.id})" title="Eliminar">
                    <svg viewBox="0 0 24 24">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                    </svg>
                </button>
            </td>
        </tr>
    `).join('');
    
    updatePagination('products', filtered.length);
}

function updateProductStats() {
    const totalProducts = products.filter(p => p.active).length;
    const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
    const outOfStock = products.filter(p => p.stock === 0).length;
    
    document.getElementById('productos-publicados').textContent = totalProducts;
    document.getElementById('stock-total').textContent = totalStock.toLocaleString();
    document.getElementById('productos-sin-stock').textContent = outOfStock;
}

function getStockClass(stock) {
    if (stock === 0) return 'red';
    if (stock <= 50) return 'yellow';
    return 'green';
}

function getFilteredProducts() {
    const search = document.getElementById('product-search').value.toLowerCase();
    const category = document.getElementById('filter-categoria').value;
    const brand = document.getElementById('filter-marca').value;
    const estado = document.getElementById('filter-estado').value;
    
    return products.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(search) || p.sku.toLowerCase().includes(search);
        const matchCategory = !category || p.category === category;
        const matchBrand = !brand || p.brand === brand;
        const matchEstado = !estado || 
            (estado === 'alto' && p.stock > 50) ||
            (estado === 'bajo' && p.stock > 0 && p.stock <= 50) ||
            (estado === 'sin' && p.stock === 0);
        
        return matchSearch && matchCategory && matchBrand && matchEstado;
    });
}

// ==================== PRODUCTS ACTIONS ====================
function selectProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    showNotification(`Producto "${product.name}" seleccionado`, 'success');
    // Aquí puedes agregar lógica adicional para selección múltiple
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    // Llenar el formulario con los datos actuales
    document.getElementById('input-sku').value = product.sku;
    document.getElementById('input-nombre').value = product.name;
    document.getElementById('input-categoria').value = product.category;
    document.getElementById('input-marca-producto').value = product.brand;
    document.getElementById('input-precio').value = product.price;
    document.getElementById('input-stock').value = product.stock;
    
    // Cambiar el título del modal
    const modal = document.getElementById('modal-producto');
    const modalTitle = modal.querySelector('h2');
    modalTitle.innerHTML = `
        <div class="modal-header">
            <span>Editar Producto</span>
            <span class="modal-badge edit">Editando</span>
        </div>
    `;
    
    // Cambiar el comportamiento del formulario
    const form = document.getElementById('form-producto');
    form.onsubmit = (e) => {
        e.preventDefault();
        
        // Actualizar el producto
        product.sku = document.getElementById('input-sku').value;
        product.name = document.getElementById('input-nombre').value;
        product.category = document.getElementById('input-categoria').value;
        product.brand = document.getElementById('input-marca-producto').value;
        product.price = parseFloat(document.getElementById('input-precio').value);
        product.stock = parseInt(document.getElementById('input-stock').value);
        
        addActivity(`Producto "${product.name}" actualizado`);
        renderProductsTable();
        updateDashboard();
        modal.style.display = 'none';
        form.reset();
        showNotification('Producto actualizado exitosamente', 'success');
        
        // Restaurar el comportamiento para crear nuevo producto
        resetProductForm();
    };
    
    modal.style.display = 'block';
}

function viewProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    const modal = document.getElementById('modal-producto');
    const modalContent = modal.querySelector('.modal-content');
    
    // Llenar el formulario con los datos
    document.getElementById('input-sku').value = product.sku;
    document.getElementById('input-nombre').value = product.name;
    document.getElementById('input-categoria').value = product.category;
    document.getElementById('input-marca-producto').value = product.brand;
    document.getElementById('input-precio').value = product.price;
    document.getElementById('input-stock').value = product.stock;
    
    // Cambiar el título del modal
    const modalTitle = modal.querySelector('h2');
    modalTitle.innerHTML = `
        <div class="modal-header">
            <span>Ver Producto</span>
            <span class="modal-badge view">Solo Lectura</span>
        </div>
    `;
    
    // Hacer que todos los campos sean de solo lectura
    modalContent.classList.add('read-only');
    document.querySelectorAll('#modal-producto input, #modal-producto select').forEach(input => {
        input.disabled = true;
    });
    
    modal.style.display = 'block';
    
    // Restaurar al cerrar
    modal.querySelector('.close').onclick = function() {
        resetProductForm();
        modal.style.display = 'none';
    };
}

function deleteProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    if (confirm(`¿Estás seguro de eliminar el producto "${product.name}"?`)) {
        products = products.filter(p => p.id !== id);
        addActivity(`Producto "${product.name}" eliminado`);
        renderProductsTable();
        updateDashboard();
        showNotification('Producto eliminado correctamente', 'success');
    }
}

function resetProductForm() {
    const modal = document.getElementById('modal-producto');
    const modalContent = modal.querySelector('.modal-content');
    const modalTitle = modal.querySelector('h2');
    
    modalTitle.innerHTML = 'Nuevo Producto';
    modalContent.classList.remove('read-only');
    
    document.querySelectorAll('#modal-producto input, #modal-producto select').forEach(input => {
        input.disabled = false;
    });
    
    // Restaurar el comportamiento original del formulario
    document.getElementById('form-producto').onsubmit = (e) => {
        e.preventDefault();
        
        const newProduct = {
            id: products.length + 1,
            sku: document.getElementById('input-sku').value,
            name: document.getElementById('input-nombre').value,
            category: document.getElementById('input-categoria').value,
            brand: document.getElementById('input-marca-producto').value,
            price: parseFloat(document.getElementById('input-precio').value),
            stock: parseInt(document.getElementById('input-stock').value),
            active: true,
            sales: 0
        };
        
        products.push(newProduct);
        addActivity(`Nuevo producto "${newProduct.name}" creado`);
        renderProductsTable();
        updateDashboard();
        modal.style.display = 'none';
        document.getElementById('form-producto').reset();
        showNotification('Producto creado exitosamente', 'success');
    };
}

// ==================== USERS ====================
function renderUsersTable() {
    const filtered = getFilteredUsers();
    const paginated = paginate(filtered, currentPage.users, itemsPerPage);
    
    const tbody = document.getElementById('users-tbody');
    tbody.innerHTML = paginated.map(u => `
        <tr data-id="${u.id}">
            <td>${u.id}</td>
            <td>${u.name}</td>
            <td>${u.email}</td>
            <td>${u.lastLogin}</td>
            <td>${u.orders}</td>
            <td><span class="status-badge ${u.active ? 'active' : 'inactive'}">${u.active ? 'Activo' : 'Inactivo'}</span></td>
            <td>
                <button class="icon-btn edit" onclick="editUser(${u.id})" title="Editar">
                    <svg viewBox="0 0 24 24">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                </button>
                <button class="icon-btn view" onclick="viewUser(${u.id})" title="Ver">
                    <svg viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                </button>
                <button class="icon-btn delete" onclick="deleteUser(${u.id})" title="Eliminar">
                    <svg viewBox="0 0 24 24">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                    </svg>
                </button>
            </td>
        </tr>
    `).join('');
    
    document.getElementById('users-count-info').textContent = `Mostrando ${filtered.length} de ${users.length} Usuarios`;
    updatePagination('users', filtered.length);
}

function getFilteredUsers() {
    const search = document.getElementById('user-search').value.toLowerCase();
    return users.filter(u => 
        u.name.toLowerCase().includes(search) || u.email.toLowerCase().includes(search)
    );
}

function editUser(id) {
    const user = users.find(u => u.id === id);
    if (!user) return;
    
    document.getElementById('input-nombre-usuario').value = user.name;
    document.getElementById('input-email').value = user.email;
    
    const modal = document.getElementById('modal-usuario');
    const modalTitle = modal.querySelector('h2');
    modalTitle.innerHTML = `
        <div class="modal-header">
            <span>Editar Usuario</span>
            <span class="modal-badge edit">Editando</span>
        </div>
    `;
    
    const form = document.getElementById('form-usuario');
    form.onsubmit = (e) => {
        e.preventDefault();
        
        user.name = document.getElementById('input-nombre-usuario').value;
        user.email = document.getElementById('input-email').value;
        
        addActivity(`Usuario "${user.name}" actualizado`);
        renderUsersTable();
        updateDashboard();
        modal.style.display = 'none';
        form.reset();
        showNotification('Usuario actualizado exitosamente', 'success');
        
        resetUserForm();
    };
    
    modal.style.display = 'block';
}

function viewUser(id) {
    const user = users.find(u => u.id === id);
    if (!user) return;
    
    const modal = document.getElementById('modal-usuario');
    const modalContent = modal.querySelector('.modal-content');
    
    document.getElementById('input-nombre-usuario').value = user.name;
    document.getElementById('input-email').value = user.email;
    
    const modalTitle = modal.querySelector('h2');
    modalTitle.innerHTML = `
        <div class="modal-header">
            <span>Ver Usuario</span>
            <span class="modal-badge view">Solo Lectura</span>
        </div>
    `;
    
    modalContent.classList.add('read-only');
    document.querySelectorAll('#modal-usuario input').forEach(input => {
        input.disabled = true;
    });
    
    modal.style.display = 'block';
    
    modal.querySelector('.close').onclick = function() {
        resetUserForm();
        modal.style.display = 'none';
    };
}

function deleteUser(id) {
    const user = users.find(u => u.id === id);
    if (!user) return;
    
    if (confirm(`¿Estás seguro de eliminar el usuario "${user.name}"?`)) {
        users = users.filter(u => u.id !== id);
        addActivity(`Usuario "${user.name}" eliminado`);
        renderUsersTable();
        updateDashboard();
        showNotification('Usuario eliminado correctamente', 'success');
    }
}

function resetUserForm() {
    const modal = document.getElementById('modal-usuario');
    const modalContent = modal.querySelector('.modal-content');
    const modalTitle = modal.querySelector('h2');
    
    modalTitle.innerHTML = 'Nuevo Usuario';
    modalContent.classList.remove('read-only');
    
    document.querySelectorAll('#modal-usuario input').forEach(input => {
        input.disabled = false;
    });
    
    document.getElementById('form-usuario').onsubmit = (e) => {
        e.preventDefault();
        
        const newUser = {
            id: users.length + 1,
            name: document.getElementById('input-nombre-usuario').value,
            email: document.getElementById('input-email').value,
            lastLogin: new Date().toISOString().slice(0, 16).replace('T', ' '),
            orders: 0,
            active: true
        };
        
        users.push(newUser);
        addActivity(`Nuevo usuario "${newUser.name}" registrado`);
        renderUsersTable();
        updateDashboard();
        modal.style.display = 'none';
        document.getElementById('form-usuario').reset();
        showNotification('Usuario creado exitosamente', 'success');
    };
}

// ==================== BRANDS ====================
function renderBrandsTable() {
    calculateBrandProducts();
    updateBrandStats();
    
    const filtered = getFilteredBrands();
    const paginated = paginate(filtered, currentPage.brands, itemsPerPage);
    
    const tbody = document.getElementById('brands-tbody');
    tbody.innerHTML = paginated.map(b => `
        <tr data-id="${b.id}">
            <td><div class="logo-placeholder">🏷️</div></td>
            <td>${b.name}</td>
            <td>${b.description}</td>
            <td>${b.products}</td>
            <td>
                <label class="toggle">
                    <input type="checkbox" ${b.visible ? 'checked' : ''} onchange="toggleBrandVisibility(${b.id})">
                    <span class="slider"></span>
                </label>
            </td>
            <td>
                <button class="icon-btn edit" onclick="editBrand(${b.id})" title="Editar">
                    <svg viewBox="0 0 24 24">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                </button>
                <button class="icon-btn view" onclick="viewBrand(${b.id})" title="Ver">
                    <svg viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                </button>
                <button class="icon-btn delete" onclick="deleteBrand(${b.id})" title="Eliminar">
                    <svg viewBox="0 0 24 24">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                    </svg>
                </button>
            </td>
        </tr>
    `).join('');
    
    updatePagination('brands', filtered.length);
}

function calculateBrandProducts() {
    brands.forEach(brand => {
        brand.products = products.filter(p => p.brand === brand.name).length;
    });
}

function updateBrandStats() {
    document.getElementById('total-marcas').textContent = brands.length;
    
    const productsWithoutBrand = products.filter(p => !brands.some(b => b.name === p.brand)).length;
    document.getElementById('productos-sin-marca').textContent = productsWithoutBrand;
    
    const topBrand = [...brands].sort((a, b) => b.products - a.products)[0];
    document.getElementById('marca-top').textContent = topBrand ? topBrand.name : '-';
}

function getFilteredBrands() {
    const search = document.getElementById('brand-search').value.toLowerCase();
    const visibility = document.getElementById('filter-visibilidad').value;
    const category = document.getElementById('filter-categoria-marca').value;
    
    return brands.filter(b => {
        const matchSearch = b.name.toLowerCase().includes(search);
        const matchVisibility = !visibility || 
            (visibility === 'visible' && b.visible) ||
            (visibility === 'oculto' && !b.visible);
        const matchCategory = !category || b.category === category;
        
        return matchSearch && matchVisibility && matchCategory;
    });
}

function toggleBrandVisibility(id) {
    const brand = brands.find(b => b.id === id);
    brand.visible = !brand.visible;
    addActivity(`Visibilidad de "${brand.name}" ${brand.visible ? 'activada' : 'desactivada'}`);
    showNotification(`${brand.name} ahora está ${brand.visible ? 'visible' : 'oculto'}`, 'success');
}

function editBrand(id) {
    const brand = brands.find(b => b.id === id);
    if (!brand) return;
    
    document.getElementById('input-nombre-marca').value = brand.name;
    document.getElementById('input-descripcion').value = brand.description;
    document.getElementById('input-categoria-marca').value = brand.category;
    
    const modal = document.getElementById('modal-marca');
    const modalTitle = modal.querySelector('h2');
    modalTitle.innerHTML = `
        <div class="modal-header">
            <span>Editar Marca</span>
            <span class="modal-badge edit">Editando</span>
        </div>
    `;
    
    const form = document.getElementById('form-marca');
    form.onsubmit = (e) => {
        e.preventDefault();
        
        brand.name = document.getElementById('input-nombre-marca').value;
        brand.description = document.getElementById('input-descripcion').value;
        brand.category = document.getElementById('input-categoria-marca').value;
        
        addActivity(`Marca "${brand.name}" actualizada`);
        renderBrandsTable();
        modal.style.display = 'none';
        form.reset();
        showNotification('Marca actualizada exitosamente', 'success');
        
        resetBrandForm();
    };
    
    modal.style.display = 'block';
}

function viewBrand(id) {
    const brand = brands.find(b => b.id === id);
    if (!brand) return;
    
    const modal = document.getElementById('modal-marca');
    const modalContent = modal.querySelector('.modal-content');
    
    document.getElementById('input-nombre-marca').value = brand.name;
    document.getElementById('input-descripcion').value = brand.description;
    document.getElementById('input-categoria-marca').value = brand.category;
    
    const modalTitle = modal.querySelector('h2');
    modalTitle.innerHTML = `
        <div class="modal-header">
            <span>Ver Marca</span>
            <span class="modal-badge view">Solo Lectura</span>
        </div>
    `;
    
    modalContent.classList.add('read-only');
    document.querySelectorAll('#modal-marca input, #modal-marca select, #modal-marca textarea').forEach(input => {
        input.disabled = true;
    });
    
    modal.style.display = 'block';
    
    modal.querySelector('.close').onclick = function() {
        resetBrandForm();
        modal.style.display = 'none';
    };
}

function deleteBrand(id) {
    const brand = brands.find(b => b.id === id);
    if (!brand) return;
    
    if (confirm(`¿Estás seguro de eliminar la marca "${brand.name}"?`)) {
        brands = brands.filter(b => b.id !== id);
        addActivity(`Marca "${brand.name}" eliminada`);
        renderBrandsTable();
        showNotification('Marca eliminada correctamente', 'success');
    }
}

function resetBrandForm() {
    const modal = document.getElementById('modal-marca');
    const modalContent = modal.querySelector('.modal-content');
    const modalTitle = modal.querySelector('h2');
    
    modalTitle.innerHTML = 'Nueva Marca';
    modalContent.classList.remove('read-only');
    
    document.querySelectorAll('#modal-marca input, #modal-marca select, #modal-marca textarea').forEach(input => {
        input.disabled = false;
    });
    
    document.getElementById('form-marca').onsubmit = (e) => {
        e.preventDefault();
        
        const newBrand = {
            id: brands.length + 1,
            name: document.getElementById('input-nombre-marca').value,
            description: document.getElementById('input-descripcion').value,
            category: document.getElementById('input-categoria-marca').value,
            visible: true,
            products: 0
        };
        
        brands.push(newBrand);
        addActivity(`Nueva marca "${newBrand.name}" registrada`);
        renderBrandsTable();
        modal.style.display = 'none';
        document.getElementById('form-marca').reset();
        showNotification('Marca creada exitosamente', 'success');
    };
}

// ==================== PAGINATION ====================
function paginate(items, page, perPage) {
    const start = (page - 1) * perPage;
    return items.slice(start, start + perPage);
}

function updatePagination(type, totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const container = document.getElementById(`${type}-pagination`);
    const info = document.getElementById(`${type}-pagination-info`);
    
    const start = ((currentPage[type] - 1) * itemsPerPage) + 1;
    const end = Math.min(currentPage[type] * itemsPerPage, totalItems);
    const label = type === 'products' ? 'productos' :
                  type === 'users' ? 'usuarios' :
                  type === 'brands' ? 'Marcas' :
                  type === 'tickets' ? 'tickets' :
                  type === 'orders' ? 'pedidos' :
                  type === 'campaigns' ? 'campañas' :
                  'transacciones';
    info.textContent = `Mostrando ${totalItems === 0 ? 0 : start} a ${totalItems === 0 ? 0 : end} de ${totalItems} ${label}`;
    
    let html = `<button class="page-btn" onclick="changePage('${type}', ${currentPage[type] - 1})" ${currentPage[type] === 1 ? 'disabled' : ''}>Anterior</button>`;
    
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage[type] - 1 && i <= currentPage[type] + 1)) {
            html += `<button class="page-btn ${i === currentPage[type] ? 'active' : ''}" onclick="changePage('${type}', ${i})">${i}</button>`;
        } else if (i === currentPage[type] - 2 || i === currentPage[type] + 2) {
            html += `<span>...</span>`;
        }
    }
    
    html += `<button class="page-btn" onclick="changePage('${type}', ${currentPage[type] + 1})" ${currentPage[type] === totalPages ? 'disabled' : ''}>Siguiente</button>`;
    
    container.innerHTML = html;
}

function changePage(type, page) {
    const filtered = type === 'products' ? getFilteredProducts() : 
                     type === 'users' ? getFilteredUsers() : 
                     type === 'brands' ? getFilteredBrands() :
                     type === 'tickets' ? getFilteredTickets() :
                     type === 'orders' ? getFilteredOrders() :
                     type === 'campaigns' ? getFilteredCampaigns() :
                     getFilteredTransactions();
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    
    if (page < 1 || page > totalPages) return;
    
    currentPage[type] = page;
    
    if (type === 'products') renderProductsTable();
    if (type === 'users') renderUsersTable();
    if (type === 'brands') renderBrandsTable();
    if (type === 'tickets') renderTicketsTable();
    if (type === 'orders') renderOrdersTable();
    if (type === 'campaigns') renderCampaignsTable();
    if (type === 'finances' || type === 'transactions') renderFinanceTable();
}

// ==================== MODALS ====================
function initModals() {
    // Close modals
    document.querySelectorAll('.close').forEach(btn => {
        btn.onclick = function() {
            this.closest('.modal').style.display = 'none';
        }
    });
    
    window.onclick = function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    }
    
    // New Product
    document.getElementById('btn-nuevo-producto').onclick = () => {
        document.getElementById('modal-producto').style.display = 'block';
    };
    
    document.getElementById('form-producto').onsubmit = (e) => {
        e.preventDefault();
        
        const newProduct = {
            id: products.length + 1,
            sku: document.getElementById('input-sku').value,
            name: document.getElementById('input-nombre').value,
            category: document.getElementById('input-categoria').value,
            brand: document.getElementById('input-marca-producto').value,
            price: parseFloat(document.getElementById('input-precio').value),
            stock: parseInt(document.getElementById('input-stock').value),
            active: true,
            sales: 0
        };
        
        products.push(newProduct);
        addActivity(`Nuevo producto "${newProduct.name}" creado`);
        renderProductsTable();
        updateDashboard();
        document.getElementById('modal-producto').style.display = 'none';
        document.getElementById('form-producto').reset();
        showNotification('Producto creado exitosamente', 'success');
    };
    
    // New User
    document.getElementById('btn-nuevo-usuario').onclick = () => {
        document.getElementById('modal-usuario').style.display = 'block';
    };
    
    document.getElementById('form-usuario').onsubmit = (e) => {
        e.preventDefault();
        
        const newUser = {
            id: users.length + 1,
            name: document.getElementById('input-nombre-usuario').value,
            email: document.getElementById('input-email').value,
            lastLogin: new Date().toISOString().slice(0, 16).replace('T', ' '),
            orders: 0,
            active: true
        };
        
        users.push(newUser);
        addActivity(`Nuevo usuario "${newUser.name}" registrado`);
        renderUsersTable();
        updateDashboard();
        document.getElementById('modal-usuario').style.display = 'none';
        document.getElementById('form-usuario').reset();
        showNotification('Usuario creado exitosamente', 'success');
    };
    
    // New Brand
    document.getElementById('btn-nueva-marca').onclick = () => {
        document.getElementById('modal-marca').style.display = 'block';
    };
    
    document.getElementById('form-marca').onsubmit = (e) => {
        e.preventDefault();
        
        const newBrand = {
            id: brands.length + 1,
            name: document.getElementById('input-nombre-marca').value,
            description: document.getElementById('input-descripcion').value,
            category: document.getElementById('input-categoria-marca').value,
            visible: true,
            products: 0
        };
        
        brands.push(newBrand);
        addActivity(`Nueva marca "${newBrand.name}" registrada`);
        renderBrandsTable();
        document.getElementById('modal-marca').style.display = 'none';
        document.getElementById('form-marca').reset();
        showNotification('Marca creada exitosamente', 'success');
    };
}

// ==================== FILTERS ====================
function initFilters() {
    document.getElementById('product-search').oninput = () => {
        currentPage.products = 1;
        renderProductsTable();
    };
    
    document.getElementById('filter-categoria').onchange = () => {
        currentPage.products = 1;
        renderProductsTable();
    };
    
    document.getElementById('filter-marca').onchange = () => {
        currentPage.products = 1;
        renderProductsTable();
    };
    
    document.getElementById('filter-estado').onchange = () => {
        currentPage.products = 1;
        renderProductsTable();
    };
    
    document.getElementById('user-search').oninput = () => {
        currentPage.users = 1;
        renderUsersTable();
    };
    
    document.getElementById('brand-search').oninput = () => {
        currentPage.brands = 1;
        renderBrandsTable();
    };
    
    document.getElementById('filter-visibilidad').onchange = () => {
        currentPage.brands = 1;
        renderBrandsTable();
    };
    
    document.getElementById('filter-categoria-marca').onchange = () => {
        currentPage.brands = 1;
        renderBrandsTable();
    };

    // Tickets filters
    const ticketSearch = document.getElementById('ticket-search');
    if (ticketSearch) ticketSearch.oninput = () => { currentPage.tickets = 1; renderTicketsTable(); };
    const ticketStatus = document.getElementById('filter-ticket-status');
    if (ticketStatus) ticketStatus.onchange = () => { currentPage.tickets = 1; renderTicketsTable(); };
    const ticketType = document.getElementById('filter-ticket-type');
    if (ticketType) ticketType.onchange = () => { currentPage.tickets = 1; renderTicketsTable(); };

    // Orders filters
    const orderSearch = document.getElementById('order-search');
    if (orderSearch) orderSearch.oninput = () => { currentPage.orders = 1; renderOrdersTable(); };
    const orderStatus = document.getElementById('filter-order-status');
    if (orderStatus) orderStatus.onchange = () => { currentPage.orders = 1; renderOrdersTable(); };
    const paymentStatus = document.getElementById('filter-payment-status');
    if (paymentStatus) paymentStatus.onchange = () => { currentPage.orders = 1; renderOrdersTable(); };

    // Marketing filters
    const mkSearch = document.getElementById('mk-search');
    if (mkSearch) mkSearch.oninput = () => { currentPage.campaigns = 1; renderCampaignsTable(); };
    const mkTipo = document.getElementById('mk-filter-tipo');
    if (mkTipo) mkTipo.onchange = () => { currentPage.campaigns = 1; renderCampaignsTable(); };
    const mkEstado = document.getElementById('mk-filter-estado');
    if (mkEstado) mkEstado.onchange = () => { currentPage.campaigns = 1; renderCampaignsTable(); };

    // Finance filters
    const finSearch = document.getElementById('fin-search');
    if (finSearch) finSearch.oninput = () => { currentPage.finances = 1; renderFinanceTable(); };
    const finTipo = document.getElementById('fin-filter-tipo');
    if (finTipo) finTipo.onchange = () => { currentPage.finances = 1; renderFinanceTable(); };
    const finEstado = document.getElementById('fin-filter-estado');
    if (finEstado) finEstado.onchange = () => { currentPage.finances = 1; renderFinanceTable(); };
}

// ==================== SUPPORT / TICKETS ====================
function renderTicketsTable() {
    updateTicketStats();

    const filtered = getFilteredTickets();
    const paginated = paginate(filtered, currentPage.tickets, itemsPerPage);

    const tbody = document.getElementById('tickets-tbody');
    if (!tbody) return;
    tbody.innerHTML = paginated.map(t => `
        <tr data-id="${t.id}">
            <td>${t.id}</td>
            <td>${t.createdAt}</td>
            <td>${t.client}</td>
            <td>${t.subject}</td>
            <td><span class="status-badge active">${t.type}</span></td>
            <td><span class="status-badge ${ticketStatusClass(t.status)}">${t.status}</span></td>
            <td>${t.lastActivity}</td>
            <td>
                <button class="icon-btn view" title="Ver" onclick="viewTicket('${t.id}')">
                    <svg viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                </button>
            </td>
        </tr>
    `).join('');

    updatePagination('tickets', filtered.length);
}

function updateTicketStats() {
    const abiertos = tickets.filter(t => t.status !== 'Cerrado').length;
    const cerradosHoy = tickets.filter(t => t.status === 'Cerrado').length; // dummy: total cerrados
    const avgMinutes = Math.round(tickets.reduce((s, t) => s + t.slaMinutes, 0) / (tickets.length || 1));
    const hours = Math.floor(avgMinutes / 60);
    const minutes = avgMinutes % 60;

    const elAbiertos = document.getElementById('tickets-abiertos');
    const elCerrados = document.getElementById('tickets-cerrados-hoy');
    const elSla = document.getElementById('sla-promedio');
    if (elAbiertos) elAbiertos.textContent = abiertos.toString();
    if (elCerrados) elCerrados.textContent = cerradosHoy.toString();
    if (elSla) elSla.textContent = `${hours > 0 ? hours + 'h ' : ''}${minutes}m`;
}

function getFilteredTickets() {
    const search = (document.getElementById('ticket-search')?.value || '').toLowerCase();
    const status = (document.getElementById('filter-ticket-status')?.value || '');
    const type = (document.getElementById('filter-ticket-type')?.value || '');

    return tickets.filter(t => {
        const matchSearch = !search || t.id.toLowerCase().includes(search) || t.client.toLowerCase().includes(search) || t.subject.toLowerCase().includes(search);
        const matchStatus = !status || t.status === status;
        const matchType = !type || t.type === type;
        return matchSearch && matchStatus && matchType;
    });
}

function ticketStatusClass(status) {
    if (status === 'Cerrado') return 'success';
    if (status === 'Escalado') return 'danger';
    if (status === 'En Proceso') return 'warning';
    return 'active'; // Nuevo
}

function viewTicket(id) {
    const t = tickets.find(x => x.id === id);
    if (!t) return;
    showNotification(`Ticket ${t.id}: ${t.subject}`, 'success');
}

// ==================== SALES / ORDERS ====================
function renderOrdersTable() {
    updateOrderStats();

    const filtered = getFilteredOrders();
    const paginated = paginate(filtered, currentPage.orders, itemsPerPage);

    const tbody = document.getElementById('orders-tbody');
    if (!tbody) return;

    tbody.innerHTML = paginated.map(o => `
        <tr data-id="${o.id}">
            <td>${o.id}</td>
            <td>${o.date}</td>
            <td>${o.client}</td>
            <td>$${o.total.toFixed(2)}</td>
            <td><span class="status-badge ${orderStatusClass(o.orderStatus)}">${o.orderStatus}</span></td>
            <td><span class="status-badge ${paymentStatusClass(o.paymentStatus)}">${o.paymentStatus}</span></td>
            <td>
                <button class="icon-btn view" title="Ver" onclick="viewOrder('${o.id}')">
                    <svg viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                </button>
            </td>
        </tr>
    `).join('');

    updatePagination('orders', filtered.length);
}

function updateOrderStats() {
    const today = new Date('2023-10-26'); // dummy anchor
    const ordersToday = orders.filter(o => o.date === '2023-10-26');
    const pedidosHoy = ordersToday.length;
    const ingresosHoy = ordersToday.reduce((s, o) => s + o.total, 0);
    const pendientesEnvio = orders.filter(o => o.orderStatus === 'Pendiente' || o.orderStatus === 'Procesando').length;
    const aov = orders.length ? (orders.reduce((s, o) => s + o.total, 0) / orders.length) : 0;

    const elHoy = document.getElementById('ventas-pedidos-hoy');
    const elIng = document.getElementById('ventas-ingresos-hoy');
    const elPen = document.getElementById('ventas-pendientes-envio');
    const elAov = document.getElementById('ventas-aov');
    if (elHoy) elHoy.textContent = pedidosHoy.toString();
    if (elIng) elIng.textContent = `$${ingresosHoy.toFixed(2)}`;
    if (elPen) elPen.textContent = pendientesEnvio.toString();
    if (elAov) elAov.textContent = `$${aov.toFixed(2)}`;
}

function getFilteredOrders() {
    const search = (document.getElementById('order-search')?.value || '').toLowerCase();
    const status = (document.getElementById('filter-order-status')?.value || '');
    const pay = (document.getElementById('filter-payment-status')?.value || '');

    return orders.filter(o => {
        const matchSearch = !search || o.id.toLowerCase().includes(search) || o.client.toLowerCase().includes(search);
        const matchStatus = !status || o.orderStatus === status;
        const matchPay = !pay || o.paymentStatus === pay;
        return matchSearch && matchStatus && matchPay;
    });
}

function orderStatusClass(s) {
    if (s === 'Entregado') return 'success';
    if (s === 'Enviado') return 'active';
    if (s === 'Procesando') return 'warning';
    if (s === 'Pendiente') return 'warning';
    if (s === 'Cancelado') return 'danger';
    return 'active';
}

function paymentStatusClass(s) {
    if (s === 'Pagado') return 'success';
    if (s === 'Pendiente de Pago') return 'warning';
    if (s === 'Rechazado') return 'danger';
    return 'active';
}

function viewOrder(id) {
    const o = orders.find(x => x.id === id);
    if (!o) return;
    showNotification(`Pedido ${o.id}: ${o.client} — $${o.total.toFixed(2)}`, 'success');
}

// ==================== MARKETING / CAMPAIGNS ====================
function renderCampaignsTable() {
    updateMarketingStats();

    const filtered = getFilteredCampaigns();
    const paginated = paginate(filtered, currentPage.campaigns, itemsPerPage);

    const tbody = document.getElementById('mk-tbody');
    if (!tbody) return;

    tbody.innerHTML = paginated.map(c => `
        <tr data-id="${c.id}">
            <td>${c.id}</td>
            <td>${c.name}</td>
            <td>${c.type}</td>
            <td>${c.expires}</td>
            <td>${c.uses}</td>
            <td>$${c.revenue.toLocaleString()}</td>
            <td><span class="status-badge ${campaignStatusClass(c.status)}">${c.status}</span></td>
            <td>
                <button class="icon-btn view" title="Ver" onclick="viewCampaign('${c.id}')">
                    <svg viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                </button>
            </td>
        </tr>
    `).join('');

    updatePagination('campaigns', filtered.length);
}

function updateMarketingStats() {
    const activos = campaigns.filter(c => c.status === 'Activa').length;
    const ingresos = campaigns.reduce((s, c) => s + c.revenue, 0);
    const usos = campaigns.reduce((s, c) => s + c.uses, 0);
    const tasaUso = campaigns.length ? Math.min(99, Math.round((usos / (campaigns.length * 1000)) * 100)) : 0; // dummy calc

    const elActivos = document.getElementById('mk-cupones-activos');
    const elIngresos = document.getElementById('mk-ingresos-promos');
    const elTasa = document.getElementById('mk-tasa-uso');
    if (elActivos) elActivos.textContent = activos.toString();
    if (elIngresos) elIngresos.textContent = `$${ingresos.toLocaleString()}`;
    if (elTasa) elTasa.textContent = `${tasaUso}%`;
}

function getFilteredCampaigns() {
    const search = (document.getElementById('mk-search')?.value || '').toLowerCase();
    const tipo = (document.getElementById('mk-filter-tipo')?.value || '');
    const estado = (document.getElementById('mk-filter-estado')?.value || '');

    return campaigns.filter(c => {
        const matchSearch = !search || c.name.toLowerCase().includes(search) || c.id.toLowerCase().includes(search);
        const matchTipo = !tipo || c.type === tipo;
        const matchEstado = !estado || c.status === estado;
        return matchSearch && matchTipo && matchEstado;
    });
}

function campaignStatusClass(s) {
    if (s === 'Activa') return 'success';
    if (s === 'Expirada') return 'danger';
    if (s === 'Programada') return 'warning';
    return 'active';
}

function viewCampaign(id) {
    const c = campaigns.find(x => x.id === id);
    if (!c) return;
    showNotification(`Campaña ${c.id}: ${c.name} — ${c.type}`, 'success');
}

// ==================== FINANCES / TRANSACTIONS ====================
function renderFinanceTable() {
    updateFinanceStats();
    const filtered = getFilteredTransactions();
    const paginated = paginate(filtered, currentPage.finances, itemsPerPage);

    const tbody = document.getElementById('fin-tbody');
    if (!tbody) return;

    tbody.innerHTML = paginated.map(t => `
        <tr data-id="${t.id}">
            <td>${t.id}</td>
            <td>${t.date}</td>
            <td>${t.description}</td>
            <td><span class="status-badge ${t.type === 'Ingreso' ? 'success' : 'danger'}">${t.type}</span></td>
            <td>$${t.amount.toFixed(2)}</td>
            <td><span class="status-badge ${t.status === 'Pagado' ? 'success' : 'warning'}">${t.status}</span></td>
            <td>
                <button class="icon-btn view" title="Ver" onclick="viewTransaction('${t.id}')">
                    <svg viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                </button>
            </td>
        </tr>
    `).join('');

    updatePagination('transactions', filtered.length);
}

function getFilteredTransactions() {
    const search = (document.getElementById('fin-search')?.value || '').toLowerCase();
    const tipo = (document.getElementById('fin-filter-tipo')?.value || '');
    const estado = (document.getElementById('fin-filter-estado')?.value || '');

    return transactions.filter(t => {
        const matchSearch = !search || t.id.toLowerCase().includes(search) || t.description.toLowerCase().includes(search);
        const matchTipo = !tipo || t.type === tipo;
        const matchEstado = !estado || t.status === estado;
        return matchSearch && matchTipo && matchEstado;
    });
}

function updateFinanceStats() {
    const ingresos = transactions.filter(t => t.type === 'Ingreso').reduce((s, t) => s + t.amount, 0);
    const gastos = transactions.filter(t => t.type === 'Gasto').reduce((s, t) => s + t.amount, 0);
    const neta = ingresos - gastos;
    const reembolsosRate = Math.round((transactions.filter(t => t.description.toLowerCase().includes('reembolso')).length / (transactions.length || 1)) * 1000) / 10; // % aprox
    const margen = ingresos ? Math.round(((ingresos - gastos) / ingresos) * 1000) / 10 : 0;

    const elNeta = document.getElementById('fin-ganancia-neta');
    const elCogs = document.getElementById('fin-cogs');
    const elReem = document.getElementById('fin-reembolsos');
    const elMargen = document.getElementById('fin-margen');
    if (elNeta) elNeta.textContent = `$${neta.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (elCogs) elCogs.textContent = `$${gastos.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (elReem) elReem.textContent = `${reembolsosRate}%`;
    if (elMargen) elMargen.textContent = `${margen}%`;
}

function drawFinanceChart() {
    const canvas = document.getElementById('financeChart');
    if (!canvas) return;
    // Simplificación: usar mismo enfoque que salesChart (sin DPR transform) para descartar problema de escala
    const container = canvas.parentElement || canvas;
    const width = container.clientWidth || canvas.offsetWidth || 800;
    const height = 320;
    const finPageActive = document.getElementById('finanzas-page')?.classList.contains('active');
    console.log('[FinanceChart] START', { finPageActive, width, clientWidth: container.clientWidth, offsetWidth: canvas.offsetWidth, rectWidth: container.getBoundingClientRect().width });
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = '100%';
    canvas.style.height = height + 'px';

    const padding = 70; // more room for labels
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;

    const labels = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    const ingresos = labels.map(() => Math.floor(Math.random() * 35) + 65);
    const egresos = labels.map(() => Math.floor(Math.random() * 30) + 35);
    const maxValue = Math.max(...ingresos, ...egresos, 100);

    ctx.clearRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (graphHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();

        ctx.fillStyle = '#95a5a6';
        ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'right';
        const value = maxValue - (maxValue / 5) * i;
        ctx.fillText(value.toFixed(0), padding - 15, y + 5);
    }

    function drawLine(data, color, lineWidth) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();

        const points = [];
        data.forEach((value, index) => {
            const x = padding + (graphWidth / (data.length - 1)) * index;
            const y = padding + graphHeight - (value / maxValue) * graphHeight;
            points.push({ x, y, value, label: labels[index] });
            if (index === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        });
        ctx.stroke();

        points.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
            ctx.fillStyle = color + '20';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
        });

        return points;
    }

    const ingresosPoints = drawLine(ingresos, '#3498db', 3.5);
    const egresosPoints = drawLine(egresos, '#95a5a6', 3);

    // X labels
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    labels.forEach((label, index) => {
        const x = padding + (graphWidth / (labels.length - 1)) * index;
        ctx.fillText(label, x, height - 22);
    });

    // Legend
    const legendX = Math.max(width - 200, 120);
    const legendY = 15;
    const legendSpacing = 120;

    ctx.fillStyle = '#3498db';
    ctx.fillRect(legendX, legendY, 18, 18);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(legendX, legendY, 18, 18);
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Ingresos', legendX + 26, legendY + 13);

    const egX = legendX + legendSpacing;
    ctx.fillStyle = '#95a5a6';
    ctx.fillRect(egX, legendY, 18, 18);
    ctx.strokeStyle = '#ffffff';
    ctx.strokeRect(egX, legendY, 18, 18);
    ctx.fillStyle = '#2c3e50';
    ctx.fillText('Egresos', egX + 26, legendY + 13);

    // Store points (por si agregamos tooltip luego)
    canvas.ingresosPoints = ingresosPoints;
    canvas.egresosPoints = egresosPoints;
    console.log('[FinanceChart] END', { drawnWidth: width, ingresosPoints: ingresosPoints.length, egresosPoints: egresosPoints.length });
}

// Hook: Redibujar al terminar animación de aparición de la página Finanzas
function setupFinanceAnimationHook() {
    const finPage = document.getElementById('finanzas-page');
    if (!finPage) return;
    finPage.addEventListener('animationend', (e) => {
        if (e.animationName === 'fadeInUp' || finPage.classList.contains('active')) {
            setTimeout(() => drawFinanceChart(), 50);
            setTimeout(() => drawFinanceChart(), 400); // segundo intento tras terminar la transición visual
        }
    });
}

// Añadir overlay de depuración para corroborar presencia del canvas incluso si no se ve contenido
function ensureFinanceDebugOverlay() {
    const canvas = document.getElementById('financeChart');
    if (!canvas) return;
    if (!canvas.parentElement.querySelector('.finance-chart-overlay-debug')) {
        const overlay = document.createElement('div');
        overlay.className = 'finance-chart-overlay-debug';
        overlay.textContent = 'Canvas presente (debug)';
        canvas.parentElement.style.position = 'relative';
        canvas.parentElement.appendChild(overlay);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setupFinanceAnimationHook();
    ensureFinanceDebugOverlay();
});

// Observe container size changes to redraw when width becomes available
function setupFinanceResizeObserver() {
    const canvas = document.getElementById('financeChart');
    const finPage = document.getElementById('finanzas-page');
    if (!canvas || !canvas.parentElement) return;
    const ro = new ResizeObserver(entries => {
        for (const entry of entries) {
            const cr = entry.contentRect;
            // Only redraw when visible and has a positive width
            if (cr.width > 0 && finPage && finPage.classList.contains('active')) {
                requestAnimationFrame(() => drawFinanceChart());
            }
        }
    });
    ro.observe(canvas.parentElement);
}

// Redraw when finance canvas enters the viewport
function setupFinanceIntersectionObserver() {
    const canvas = document.getElementById('financeChart');
    if (!canvas || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => drawFinanceChart());
            }
        });
    }, { root: null, threshold: 0.1 });
    io.observe(canvas);
}

// Fallback: Poll briefly until canvas has width when Finanzas is active
function ensureFinanceChartReady() {
    const finPage = document.getElementById('finanzas-page');
    const canvas = document.getElementById('financeChart');
    if (!finPage || !canvas) return;
    let attempts = 0;
    const maxAttempts = 20; // ~2s if interval is 100ms
    const timer = setInterval(() => {
        attempts++;
        const container = canvas.parentElement || canvas;
        const width = container.getBoundingClientRect().width || container.clientWidth || canvas.offsetWidth;
        const isActive = finPage.classList.contains('active');
        if (isActive && width > 20) {
            try { drawFinanceChart(); } catch {}
            clearInterval(timer);
        }
        if (attempts >= maxAttempts) {
            clearInterval(timer);
        }
    }, 100);
}

function viewTransaction(id) {
    const t = transactions.find(x => x.id === id);
    if (!t) return;
    showNotification(`${t.type} ${t.id}: ${t.description} — $${t.amount.toFixed(2)}`, 'success');
}

// ==================== NOTIFICATIONS ====================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== RESIZE ====================
window.addEventListener('resize', function(){
    drawSalesChart();
    // Redraw finance chart on resize if canvas exists
    const finCanvas = document.getElementById('financeChart');
    if (finCanvas && finCanvas.offsetParent !== null) {
        drawFinanceChart();
    }
});

console.log('✓ Sistema de administración cargado correctamente');

// ==================== FIX PARA CENTRAR MODALES ====================
// Función para abrir modales centrados
function openModalCentered(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Función para cerrar modales
function closeModalCentered(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Sobrescribir los event listeners originales
document.addEventListener('DOMContentLoaded', function() {
    // Botón nuevo producto
    const btnNuevoProducto = document.getElementById('btn-nuevo-producto');
    if (btnNuevoProducto) {
        btnNuevoProducto.onclick = () => {
            resetProductForm();
            openModalCentered('modal-producto');
        };
    }
    
    // Botón nuevo usuario
    const btnNuevoUsuario = document.getElementById('btn-nuevo-usuario');
    if (btnNuevoUsuario) {
        btnNuevoUsuario.onclick = () => {
            resetUserForm();
            openModalCentered('modal-usuario');
        };
    }
    
    // Botón nueva marca
    const btnNuevaMarca = document.getElementById('btn-nueva-marca');
    if (btnNuevaMarca) {
        btnNuevaMarca.onclick = () => {
            resetBrandForm();
            openModalCentered('modal-marca');
        };
    }
    
    // Actualizar botones de cerrar
    document.querySelectorAll('.close').forEach(btn => {
        btn.onclick = function() {
            const modal = this.closest('.modal');
            if (modal) {
                closeModalCentered(modal.id);
                if (modal.id === 'modal-producto') resetProductForm();
                if (modal.id === 'modal-usuario') resetUserForm();
                if (modal.id === 'modal-marca') resetBrandForm();
            }
        };
    });
    
    // Cerrar al hacer click fuera
    window.onclick = function(e) {
        if (e.target.classList.contains('modal')) {
            closeModalCentered(e.target.id);
            if (e.target.id === 'modal-producto') resetProductForm();
            if (e.target.id === 'modal-usuario') resetUserForm();
            if (e.target.id === 'modal-marca') resetBrandForm();
        }
    };
});

// Sobrescribir funciones de editar y ver para usar openModalCentered
const originalEditProduct = window.editProduct;
window.editProduct = function(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    document.getElementById('input-sku').value = product.sku;
    document.getElementById('input-nombre').value = product.name;
    document.getElementById('input-categoria').value = product.category;
    document.getElementById('input-marca-producto').value = product.brand;
    document.getElementById('input-precio').value = product.price;
    document.getElementById('input-stock').value = product.stock;
    
    const modal = document.getElementById('modal-producto');
    const modalTitle = modal.querySelector('h2');
    modalTitle.innerHTML = `
        <div class="modal-header">
            <span>Editar Producto</span>
            <span class="modal-badge edit">Editando</span>
        </div>
    `;
    
    const form = document.getElementById('form-producto');
    form.onsubmit = (e) => {
        e.preventDefault();
        product.sku = document.getElementById('input-sku').value;
        product.name = document.getElementById('input-nombre').value;
        product.category = document.getElementById('input-categoria').value;
        product.brand = document.getElementById('input-marca-producto').value;
        product.price = parseFloat(document.getElementById('input-precio').value);
        product.stock = parseInt(document.getElementById('input-stock').value);
        
        addActivity(`Producto "${product.name}" actualizado`);
        renderProductsTable();
        updateDashboard();
        closeModalCentered('modal-producto');
        form.reset();
        showNotification('Producto actualizado exitosamente', 'success');
        resetProductForm();
    };
    
    openModalCentered('modal-producto');
};

const originalViewProduct = window.viewProduct;
window.viewProduct = function(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    const modal = document.getElementById('modal-producto');
    const modalContent = modal.querySelector('.modal-content');
    
    document.getElementById('input-sku').value = product.sku;
    document.getElementById('input-nombre').value = product.name;
    document.getElementById('input-categoria').value = product.category;
    document.getElementById('input-marca-producto').value = product.brand;
    document.getElementById('input-precio').value = product.price;
    document.getElementById('input-stock').value = product.stock;
    
    const modalTitle = modal.querySelector('h2');
    modalTitle.innerHTML = `
        <div class="modal-header">
            <span>Ver Producto</span>
            <span class="modal-badge view">Solo Lectura</span>
        </div>
    `;
    
    modalContent.classList.add('read-only');
    document.querySelectorAll('#modal-producto input, #modal-producto select').forEach(input => {
        input.disabled = true;
    });
    
    openModalCentered('modal-producto');
};

const originalEditUser = window.editUser;
window.editUser = function(id) {
    const user = users.find(u => u.id === id);
    if (!user) return;
    
    document.getElementById('input-nombre-usuario').value = user.name;
    document.getElementById('input-email').value = user.email;
    
    const modal = document.getElementById('modal-usuario');
    const modalTitle = modal.querySelector('h2');
    modalTitle.innerHTML = `
        <div class="modal-header">
            <span>Editar Usuario</span>
            <span class="modal-badge edit">Editando</span>
        </div>
    `;
    
    const form = document.getElementById('form-usuario');
    form.onsubmit = (e) => {
        e.preventDefault();
        user.name = document.getElementById('input-nombre-usuario').value;
        user.email = document.getElementById('input-email').value;
        
        addActivity(`Usuario "${user.name}" actualizado`);
        renderUsersTable();
        updateDashboard();
        closeModalCentered('modal-usuario');
        form.reset();
        showNotification('Usuario actualizado exitosamente', 'success');
        resetUserForm();
    };
    
    openModalCentered('modal-usuario');
};

const originalViewUser = window.viewUser;
window.viewUser = function(id) {
    const user = users.find(u => u.id === id);
    if (!user) return;
    
    const modal = document.getElementById('modal-usuario');
    const modalContent = modal.querySelector('.modal-content');
    
    document.getElementById('input-nombre-usuario').value = user.name;
    document.getElementById('input-email').value = user.email;
    
    const modalTitle = modal.querySelector('h2');
    modalTitle.innerHTML = `
        <div class="modal-header">
            <span>Ver Usuario</span>
            <span class="modal-badge view">Solo Lectura</span>
        </div>
    `;
    
    modalContent.classList.add('read-only');
    document.querySelectorAll('#modal-usuario input').forEach(input => {
        input.disabled = true;
    });
    
    openModalCentered('modal-usuario');
};

const originalEditBrand = window.editBrand;
window.editBrand = function(id) {
    const brand = brands.find(b => b.id === id);
    if (!brand) return;
    
    document.getElementById('input-nombre-marca').value = brand.name;
    document.getElementById('input-descripcion').value = brand.description;
    document.getElementById('input-categoria-marca').value = brand.category;
    
    const modal = document.getElementById('modal-marca');
    const modalTitle = modal.querySelector('h2');
    modalTitle.innerHTML = `
        <div class="modal-header">
            <span>Editar Marca</span>
            <span class="modal-badge edit">Editando</span>
        </div>
    `;
    
    const form = document.getElementById('form-marca');
    form.onsubmit = (e) => {
        e.preventDefault();
        brand.name = document.getElementById('input-nombre-marca').value;
        brand.description = document.getElementById('input-descripcion').value;
        brand.category = document.getElementById('input-categoria-marca').value;
        
        addActivity(`Marca "${brand.name}" actualizada`);
        renderBrandsTable();
        closeModalCentered('modal-marca');
        form.reset();
        showNotification('Marca actualizada exitosamente', 'success');
        resetBrandForm();
    };
    
    openModalCentered('modal-marca');
};

const originalViewBrand = window.viewBrand;
window.viewBrand = function(id) {
    const brand = brands.find(b => b.id === id);
    if (!brand) return;
    
    const modal = document.getElementById('modal-marca');
    const modalContent = modal.querySelector('.modal-content');
    
    document.getElementById('input-nombre-marca').value = brand.name;
    document.getElementById('input-descripcion').value = brand.description;
    document.getElementById('input-categoria-marca').value = brand.category;
    
    const modalTitle = modal.querySelector('h2');
    modalTitle.innerHTML = `
        <div class="modal-header">
            <span>Ver Marca</span>
            <span class="modal-badge view">Solo Lectura</span>
        </div>
    `;
    
    modalContent.classList.add('read-only');
    document.querySelectorAll('#modal-marca input, #modal-marca select, #modal-marca textarea').forEach(input => {
        input.disabled = true;
    });
    
    openModalCentered('modal-marca');
};

console.log('✅ Sistema de modales centrados cargado correctamente');

window.addEventListener('load', function() {
    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            window.location.href = '../main.html';
        });
    }
});