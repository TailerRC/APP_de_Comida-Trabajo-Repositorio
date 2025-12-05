// ============================================
// PEDIDOS - JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    cargarPedidos();
});

// Datos de pedidos (simulados - en producción vendrían de una API)
let pedidosData = [];

// Cargar pedidos
function cargarPedidos() {
    // Intentar cargar pedidos del localStorage
    const pedidosGuardados = localStorage.getItem('pedidos');
    
    if (pedidosGuardados) {
        pedidosData = JSON.parse(pedidosGuardados);
    }
    
    actualizarVistaPedidos();
}

// Actualizar vista de pedidos
function actualizarVistaPedidos() {
    const emptyState = document.getElementById('emptyState');
    const pedidosList = document.getElementById('pedidosList');
    const pedidosCount = document.getElementById('pedidosCount');
    
    if (pedidosData.length === 0) {
        emptyState.style.display = 'block';
        pedidosList.style.display = 'none';
        pedidosCount.textContent = '0 pedidos';
    } else {
        emptyState.style.display = 'none';
        pedidosList.style.display = 'flex';
        pedidosCount.textContent = `${pedidosData.length} pedido${pedidosData.length !== 1 ? 's' : ''}`;
        renderizarPedidos(pedidosData);
    }
}

// Renderizar lista de pedidos
function renderizarPedidos(pedidos) {
    const pedidosList = document.getElementById('pedidosList');
    pedidosList.innerHTML = '';
    
    pedidos.forEach(pedido => {
        const card = crearPedidoCard(pedido);
        pedidosList.appendChild(card);
    });
}

// Crear tarjeta de pedido
function crearPedidoCard(pedido) {
    const div = document.createElement('div');
    div.className = 'pedido-card';
    div.innerHTML = `
        <div class="pedido-card-header">
            <div>
                <span class="pedido-numero">#${pedido.numero}</span>
                <span class="pedido-fecha">${formatearFecha(pedido.fecha)}</span>
            </div>
            <span class="pedido-estado ${pedido.estado}">
                <i class="${getIconoEstado(pedido.estado)}"></i>
                ${capitalizarPrimeraLetra(pedido.estado)}
            </span>
        </div>
        
        <div class="pedido-productos-preview">
            ${renderizarProductosPreview(pedido.productos)}
        </div>
        
        <div class="pedido-card-footer">
            <span class="pedido-total">S/ ${pedido.total.toFixed(2)}</span>
            <div class="pedido-actions">
                <button class="btn-ver-detalle" onclick="verDetallePedido('${pedido.id}')">
                    <i class="fas fa-eye"></i> Ver Detalle
                </button>
                ${pedido.estado === 'pendiente' || pedido.estado === 'procesando' ? `
                    <button class="btn-cancelar" onclick="cancelarPedido('${pedido.id}')">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                ` : ''}
            </div>
        </div>
    `;
    return div;
}

// Renderizar preview de productos
function renderizarProductosPreview(productos) {
    const maxVisible = 4;
    let html = '';
    
    productos.slice(0, maxVisible).forEach(producto => {
        html += `
            <div class="producto-mini">
                <img src="${producto.imagen || '../main/images/Landing/Imagen1.jpg'}" alt="${producto.nombre}">
            </div>
        `;
    });
    
    if (productos.length > maxVisible) {
        html += `<div class="producto-mini more">+${productos.length - maxVisible}</div>`;
    }
    
    return html;
}

// Obtener icono según estado
function getIconoEstado(estado) {
    const iconos = {
        'pendiente': 'fas fa-clock',
        'procesando': 'fas fa-cog fa-spin',
        'enviado': 'fas fa-truck',
        'entregado': 'fas fa-check-circle',
        'cancelado': 'fas fa-times-circle'
    };
    return iconos[estado] || 'fas fa-question';
}

// Formatear fecha
function formatearFecha(fecha) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-PE', options);
}

// Capitalizar primera letra
function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Aplicar filtros
function aplicarFiltros() {
    const estado = document.getElementById('filterEstado').value;
    const periodo = document.getElementById('filterFecha').value;
    
    let pedidosFiltrados = [...pedidosData];
    
    if (estado) {
        pedidosFiltrados = pedidosFiltrados.filter(p => p.estado === estado);
    }
    
    if (periodo) {
        const diasAtras = parseInt(periodo);
        const fechaLimite = new Date();
        fechaLimite.setDate(fechaLimite.getDate() - diasAtras);
        
        pedidosFiltrados = pedidosFiltrados.filter(p => new Date(p.fecha) >= fechaLimite);
    }
    
    if (pedidosFiltrados.length === 0) {
        document.getElementById('emptyState').style.display = 'block';
        document.getElementById('pedidosList').style.display = 'none';
        document.getElementById('pedidosCount').textContent = '0 pedidos';
    } else {
        document.getElementById('emptyState').style.display = 'none';
        document.getElementById('pedidosList').style.display = 'flex';
        document.getElementById('pedidosCount').textContent = `${pedidosFiltrados.length} pedido${pedidosFiltrados.length !== 1 ? 's' : ''}`;
        renderizarPedidos(pedidosFiltrados);
    }
    
    showNotification('Filtros aplicados', 'success');
}

// Ver detalle de pedido
function verDetallePedido(pedidoId) {
    const pedido = pedidosData.find(p => p.id === pedidoId);
    if (!pedido) return;
    
    // Llenar datos del modal
    document.getElementById('modalPedidoNumero').textContent = `#${pedido.numero}`;
    document.getElementById('modalPedidoFecha').textContent = formatearFecha(pedido.fecha);
    
    const estadoBadge = document.getElementById('modalPedidoEstado');
    estadoBadge.className = `pedido-estado-badge ${pedido.estado}`;
    estadoBadge.innerHTML = `<i class="${getIconoEstado(pedido.estado)}"></i> ${capitalizarPrimeraLetra(pedido.estado)}`;
    
    // Actualizar tracking
    actualizarTracking(pedido.estado);
    
    // Renderizar productos
    const productosHtml = pedido.productos.map(p => `
        <div class="producto-item">
            <img src="${p.imagen || '../main/images/Landing/Imagen1.jpg'}" alt="${p.nombre}">
            <div class="producto-info">
                <div class="producto-nombre">${p.nombre}</div>
                <div class="producto-cantidad">Cantidad: ${p.cantidad}</div>
            </div>
            <div class="producto-precio">S/ ${(p.precio * p.cantidad).toFixed(2)}</div>
        </div>
    `).join('');
    document.getElementById('modalProductosList').innerHTML = productosHtml;
    
    // Resumen
    const subtotal = pedido.productos.reduce((sum, p) => sum + (p.precio * p.cantidad), 0);
    const envio = pedido.envio || 0;
    document.getElementById('modalSubtotal').textContent = `S/ ${subtotal.toFixed(2)}`;
    document.getElementById('modalEnvio').textContent = envio === 0 ? 'Gratis' : `S/ ${envio.toFixed(2)}`;
    document.getElementById('modalTotal').textContent = `S/ ${pedido.total.toFixed(2)}`;
    
    // Dirección
    document.getElementById('modalDireccion').textContent = pedido.direccion || 'No especificada';
    
    abrirModal('modalDetallePedido');
}

// Actualizar tracking visual
function actualizarTracking(estado) {
    const steps = document.querySelectorAll('.tracking-step');
    const estados = ['pendiente', 'procesando', 'enviado', 'entregado'];
    const estadoIndex = estados.indexOf(estado);
    
    steps.forEach((step, index) => {
        step.classList.remove('completed', 'active');
        if (index < estadoIndex) {
            step.classList.add('completed');
        } else if (index === estadoIndex) {
            step.classList.add('active');
        }
    });
}

// Cancelar pedido
let pedidoACancelar = null;

function cancelarPedido(pedidoId) {
    pedidoACancelar = pedidoId;
    abrirModal('modalCancelarPedido');
}

function confirmarCancelacion() {
    const motivo = document.getElementById('motivoCancelacion').value;
    
    if (!motivo) {
        showNotification('Por favor selecciona un motivo de cancelación', 'warning');
        return;
    }
    
    // Actualizar estado del pedido
    const pedidoIndex = pedidosData.findIndex(p => p.id === pedidoACancelar);
    if (pedidoIndex !== -1) {
        pedidosData[pedidoIndex].estado = 'cancelado';
        localStorage.setItem('pedidos', JSON.stringify(pedidosData));
        actualizarVistaPedidos();
    }
    
    cerrarModal('modalCancelarPedido');
    showNotification('Pedido cancelado exitosamente. El reembolso se procesará en 3-5 días hábiles.', 'success');
    pedidoACancelar = null;
}

// Descargar factura
function descargarFactura() {
    showNotification('Descargando factura...', 'info');
    // Aquí iría la lógica para generar y descargar el PDF
    setTimeout(() => {
        showNotification('Factura descargada exitosamente', 'success');
    }, 1500);
}

// Funciones de Modal
function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Cerrar modal al hacer clic fuera
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Cerrar con Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
});

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    // Remover notificaciones existentes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const iconos = {
        success: 'fas fa-check-circle',
        error: 'fas fa-times-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
        <i class="${iconos[type]}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)' : 
                      type === 'error' ? 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)' :
                      type === 'warning' ? 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)' :
                      'linear-gradient(135deg, #17a2b8 0%, #00d4ff 100%)'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 99999;
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 500;
        font-size: 15px;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
