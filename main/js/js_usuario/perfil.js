// Verificar sesión al cargar la página
window.addEventListener('load', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        alert('No hay sesión activa. Redirigiendo al inicio.');
        window.location.href = '../main.html';
        return;
    }
    
    // Cargar datos del usuario
    cargarDatosUsuario();
    
    // Cargar foto si existe
    if (currentUser.fotoPerfil) {
        const fotoPerfil = document.getElementById('fotoPerfil');
        fotoPerfil.innerHTML = `<img src="${currentUser.fotoPerfil}" alt="Foto de perfil" style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px;">`;
    }
});

function cargarDatosUsuario() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        alert('No hay sesión activa. Redirigiendo al inicio.');
        window.location.href = '../main.html';
        return;
    }

    // Cargar datos en los campos
    document.getElementById('nombreCompleto').value = currentUser.nombreCompleto || '';
    document.getElementById('correoElectronico').value = currentUser.email || '';
    document.getElementById('numeroTelefono').value = currentUser.telefono || '';
    document.getElementById('numeroDocumento').value = currentUser.numeroDocumento || '';
    document.getElementById('direccion').value = currentUser.direccion || '';
    
    // Mapear tipo de documento - DNI o RUC
    const tipoDocTexto = {
        'dni': 'dni',
        'ruc': 'ruc',
        'cedula': 'dni',
        'cedula_extranjeria': 'dni',
        'pasaporte': 'dni',
        'tarjeta_identidad': 'dni'
    };
    document.getElementById('tipoDocumento').value = tipoDocTexto[currentUser.tipoDocumento] || 'dni';
    
    // Cargar preferencias
    document.getElementById('notificaciones').checked = currentUser.notificaciones !== false;
    document.getElementById('promociones').checked = currentUser.promociones !== false;
}

function editarCampo(campoId) {
    const campo = document.getElementById(campoId);
    const isReadonly = campo.getAttribute('readonly') !== null;
    const isDisabled = campo.hasAttribute('disabled') || campo.disabled;
    const editIcon = campo.parentElement.querySelector('.edit-icon');
    
    if (isReadonly || isDisabled) {
        // Habilitar edición
        campo.removeAttribute('readonly');
        campo.disabled = false;
        campo.focus();
        if (editIcon) editIcon.title = 'Guardando...';
    } else {
        // Bloquear edición y guardar
        campo.setAttribute('readonly', 'readonly');
        campo.disabled = true;
        if (editIcon) editIcon.title = 'Editar';
        guardarCampo(campoId, campo.value);
    }
}

function guardarCampo(campoId, valor) {
    // Validaciones específicas
    if (campoId === 'numeroTelefono') {
        if (!/^\d{9}$/.test(valor)) {
            mostrarNotificacion('El teléfono debe tener exactamente 9 dígitos', 'error');
            document.getElementById('numeroTelefono').value = '';
            return false;
        }
    }
    
    if (campoId === 'numeroDocumento') {
        if (!/^\d{8}$/.test(valor)) {
            mostrarNotificacion('El número de documento debe tener exactamente 8 dígitos', 'error');
            document.getElementById('numeroDocumento').value = '';
            return false;
        }
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
    // Mapear campos a propiedades del usuario
    const campoMap = {
        'nombreCompleto': 'nombreCompleto',
        'correoElectronico': 'email',
        'numeroTelefono': 'telefono',
        'numeroDocumento': 'numeroDocumento',
        'direccion': 'direccion',
        'tipoDocumento': 'tipoDocumento'
    };
    
    const propiedad = campoMap[campoId];
    if (propiedad) {
        currentUser[propiedad] = valor;
        
        // Actualizar en la lista de usuarios
        const userIndex = usuarios.findIndex(u => u.email === currentUser.email);
        if (userIndex !== -1) {
            usuarios[userIndex][propiedad] = valor;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    
    return true;
}

function guardarCambios() {
    // Validar todos los campos antes de abrir modal
    const numeroTelefono = document.getElementById('numeroTelefono').value;
    const numeroDocumento = document.getElementById('numeroDocumento').value;
    
    let errores = [];
    
    if (numeroTelefono && !/^\d{9}$/.test(numeroTelefono)) {
        errores.push('El teléfono debe tener exactamente 9 dígitos');
    }
    
    if (numeroDocumento && !/^\d{8}$/.test(numeroDocumento)) {
        errores.push('El número de documento debe tener exactamente 8 dígitos');
    }
    
    if (errores.length > 0) {
        mostrarNotificacion(errores.join(' | '), 'error');
        return;
    }
    
    abrirModal('modalEditarPerfil');
}

function confirmarEditarPerfil() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
    // Guardar preferencias
    currentUser.notificaciones = document.getElementById('notificaciones').checked;
    currentUser.promociones = document.getElementById('promociones').checked;
    
    // Guardar datos de los campos editados
    currentUser.nombreCompleto = document.getElementById('nombreCompleto').value;
    currentUser.email = document.getElementById('correoElectronico').value;
    currentUser.telefono = document.getElementById('numeroTelefono').value;
    currentUser.numeroDocumento = document.getElementById('numeroDocumento').value;
    currentUser.tipoDocumento = document.getElementById('tipoDocumento').value;
    currentUser.direccion = document.getElementById('direccion').value;
    
    // Actualizar en la lista de usuarios
    const userIndex = usuarios.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
        usuarios[userIndex] = currentUser;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Mostrar mensaje de éxito
    cerrarModal('modalEditarPerfil');
    mostrarNotificacion('Cambios guardados exitosamente', 'success');
}

function cambiarFoto() {
    document.getElementById('inputFoto').click();
}

document.getElementById('inputFoto').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const fotoPerfil = document.getElementById('fotoPerfil');
            fotoPerfil.innerHTML = `<img src="${e.target.result}" alt="Foto de perfil" style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px;">`;
            
            // Guardar la foto en localStorage
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            currentUser.fotoPerfil = e.target.result;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        };
        reader.readAsDataURL(file);
    }
});

function cambiarPassword() {
    // Limpiar campos y mensajes de error
    document.getElementById('passwordActual').value = '';
    document.getElementById('passwordNueva').value = '';
    document.getElementById('passwordConfirm').value = '';
    
    // Resetear tipo de input a password
    document.getElementById('passwordActual').type = 'password';
    document.getElementById('passwordNueva').type = 'password';
    document.getElementById('passwordConfirm').type = 'password';
    
    // Resetear iconos a eye
    document.querySelectorAll('#modalCambiarPassword .toggle-password-icon').forEach(icon => {
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    });
    
    ocultarErrores();
    abrirModal('modalCambiarPassword');
}

function confirmarCambiarPassword() {
    const passwordActual = document.getElementById('passwordActual').value;
    const passwordNueva = document.getElementById('passwordNueva').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    
    // Limpiar errores previos
    ocultarErrores();
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let tieneError = false;
    
    // Validar contraseña actual
    if (passwordActual !== currentUser.password) {
        mostrarError('errorPasswordActual');
        tieneError = true;
    }
    
    // Validar longitud de nueva contraseña
    if (passwordNueva.length < 8) {
        mostrarError('errorPasswordNueva');
        tieneError = true;
    }
    
    // Validar que las contraseñas coincidan
    if (passwordNueva !== passwordConfirm) {
        mostrarError('errorPasswordConfirm');
        tieneError = true;
    }
    
    if (tieneError) {
        return;
    }
    
    // Actualizar contraseña
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    currentUser.password = passwordNueva;
    
    const userIndex = usuarios.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
        usuarios[userIndex].password = passwordNueva;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Mostrar mensaje de éxito
    document.getElementById('successMessage').style.display = 'block';
    
    // Cerrar modal después de 1.5 segundos
    setTimeout(() => {
        cerrarModal('modalCambiarPassword');
        mostrarNotificacion('Contraseña actualizada exitosamente', 'success');
    }, 1500);
}

function irMetodoPago() {
    cargarMetodosPago();
    abrirModal('modalMetodoPago');
}

function irMisPedidos() {
    alert('Función de Mis Pedidos - Por implementar');
}

function toggleSwitch(element) {
    element.classList.toggle('active');
    const checkbox = element.parentElement.querySelector('input[type="checkbox"]');
    checkbox.checked = element.classList.contains('active');
}

function cerrarSesion() {
    abrirModal('modalCerrarSesion');
}

function confirmarCerrarSesion() {
    localStorage.removeItem('currentUser');
    cerrarModal('modalCerrarSesion');
    window.location.href = '../main.html';
}

// FUNCIONES DE UTILIDAD PARA MODALES
function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function cerrarModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function mostrarError(errorId) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.style.display = 'block';
    }
}

function ocultarErrores() {
    const errores = document.querySelectorAll('.error-message');
    errores.forEach(error => {
        error.style.display = 'none';
    });
    document.getElementById('successMessage').style.display = 'none';
}

function mostrarNotificacion(mensaje, tipo) {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${tipo === 'success' ? '#10b981' : '#dc2626'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        z-index: 2000;
        animation: slideIn 0.3s ease-in-out;
        font-size: 14px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    notificacion.innerHTML = `<i class="fas fa-${tipo === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${mensaje}`;
    
    document.body.appendChild(notificacion);
    
    // Remover notificación después de 3 segundos
    setTimeout(() => {
        notificacion.style.animation = 'slideOut 0.3s ease-in-out';
        setTimeout(() => {
            notificacion.remove();
        }, 300);
    }, 3000);
}

// Cerrar modal al hacer click fuera
window.addEventListener('click', function(e) {
    const modales = document.querySelectorAll('.modal.show');
    modales.forEach(modal => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
});

// Cerrar modal con tecla Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modales = document.querySelectorAll('.modal.show');
        modales.forEach(modal => {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    }
});

// Cargar foto de perfil si existe
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.fotoPerfil) {
        const fotoPerfil = document.getElementById('fotoPerfil');
        fotoPerfil.innerHTML = `<img src="${currentUser.fotoPerfil}" alt="Foto de perfil" style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px;">`;
    }
    
    // Inicializar toggles
    const switches = document.querySelectorAll('.toggle');
    switches.forEach(switchEl => {
        const checkbox = switchEl.parentElement.querySelector('input[type="checkbox"]');
        if (checkbox && checkbox.checked) {
            switchEl.classList.add('active');
        }
    });
});

// Función para toglear visibilidad de contraseña
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.parentElement.querySelector('.toggle-password-icon');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// ===== FUNCIONES DE MÉTODOS DE PAGO =====
function cargarMetodosPago() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const metodosPago = currentUser.metodosPago || [];
    const container = document.getElementById('tarjetasContainer');
    
    container.innerHTML = '';
    
    if (metodosPago.length === 0) {
        container.innerHTML = '<p class="sin-metodos">No tienes métodos de pago guardados</p>';
        return;
    }
    
    metodosPago.forEach((metodo, index) => {
        const ultimosCuatro = metodo.numeroTarjeta.slice(-4);
        const esPredeterminado = metodo.predeterminado;
        
        const iconoTipo = {
            'creditcard': 'fa-credit-card',
            'debitcard': 'fa-university',
            'wallet': 'fa-wallet'
        }[metodo.tipo] || 'fa-credit-card';
        
        const tarjetaHTML = `
            <div class="tarjeta-pago ${esPredeterminado ? 'predeterminada' : ''}">
                <div class="tarjeta-header">
                    <div class="tarjeta-info">
                        <i class="fas ${iconoTipo}"></i>
                        <div>
                            <h4>${metodo.nombreTitular}</h4>
                            <p>•••• •••• •••• ${ultimosCuatro}</p>
                        </div>
                    </div>
                    ${esPredeterminado ? '<span class="badge-default">Por Defecto</span>' : ''}
                </div>
                <div class="tarjeta-footer">
                    <small>Vence: ${metodo.fechaVencimiento}</small>
                    <div class="tarjeta-acciones">
                        ${!esPredeterminado ? `<button class="btn-accion predeterminado" onclick="hacerPredeterminado(${index})" title="Hacer predeterminado"><i class="fas fa-check"></i></button>` : ''}
                        <button class="btn-accion eliminar" onclick="eliminarMetodoPago(${index})" title="Eliminar"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML += tarjetaHTML;
    });
}

function agregarMetodoPago() {
    const nombreTitular = document.getElementById('nombreTitular').value.trim();
    const numeroTarjeta = document.getElementById('numeroTarjeta').value.trim().replace(/\s/g, '');
    const fechaVencimiento = document.getElementById('fechaVencimiento').value.trim();
    const cvv = document.getElementById('cvv').value.trim();
    const tipoPago = document.getElementById('tipoPago').value;
    const predeterminado = document.getElementById('predeterminado').checked;
    
    // Validaciones
    if (!nombreTitular) {
        mostrarNotificacion('Por favor ingresa el nombre del titular', 'error');
        return;
    }
    
    if (!/^\d{16}$/.test(numeroTarjeta)) {
        mostrarNotificacion('El número de tarjeta debe tener 16 dígitos', 'error');
        return;
    }
    
    if (!/^\d{2}\/\d{2}$/.test(fechaVencimiento)) {
        mostrarNotificacion('La fecha debe estar en formato MM/YY', 'error');
        return;
    }
    
    if (!/^\d{3,4}$/.test(cvv)) {
        mostrarNotificacion('El CVV debe tener 3 ó 4 dígitos', 'error');
        return;
    }
    
    if (!tipoPago) {
        mostrarNotificacion('Por favor selecciona un tipo de pago', 'error');
        return;
    }
    
    // Obtener usuario actual
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
    // Inicializar array si no existe
    if (!currentUser.metodosPago) {
        currentUser.metodosPago = [];
    }
    
    // Si es predeterminado, quitar ese estado de otros
    if (predeterminado) {
        currentUser.metodosPago.forEach(metodo => {
            metodo.predeterminado = false;
        });
    }
    
    // Agregar nuevo método
    const nuevoMetodo = {
        nombreTitular,
        numeroTarjeta: numeroTarjeta,
        fechaVencimiento,
        cvv,
        tipo: tipoPago,
        predeterminado: predeterminado || currentUser.metodosPago.length === 0,
        fechaAgregada: new Date().toISOString()
    };
    
    currentUser.metodosPago.push(nuevoMetodo);
    
    // Actualizar localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Actualizar en lista de usuarios
    const userIndex = usuarios.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
        usuarios[userIndex].metodosPago = currentUser.metodosPago;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
    
    // Limpiar formulario
    document.getElementById('nombreTitular').value = '';
    document.getElementById('numeroTarjeta').value = '';
    document.getElementById('fechaVencimiento').value = '';
    document.getElementById('cvv').value = '';
    document.getElementById('tipoPago').value = '';
    document.getElementById('predeterminado').checked = false;
    
    // Recargar tarjetas y mostrar notificación
    cargarMetodosPago();
    mostrarNotificacion('Método de pago agregado exitosamente', 'success');
}

function hacerPredeterminado(index) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
    // Quitar predeterminado de todos
    currentUser.metodosPago.forEach(metodo => {
        metodo.predeterminado = false;
    });
    
    // Establecer el seleccionado como predeterminado
    currentUser.metodosPago[index].predeterminado = true;
    
    // Actualizar localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Actualizar en lista de usuarios
    const userIndex = usuarios.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
        usuarios[userIndex].metodosPago = currentUser.metodosPago;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
    
    // Recargar tarjetas
    cargarMetodosPago();
    mostrarNotificacion('Método de pago establecido como predeterminado', 'success');
}

function eliminarMetodoPago(index) {
    if (confirm('¿Estás seguro de que deseas eliminar este método de pago?')) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        
        currentUser.metodosPago.splice(index, 1);
        
        // Si eliminamos el predeterminado, establecer el primero como predeterminado
        if (currentUser.metodosPago.length > 0) {
            if (!currentUser.metodosPago.some(m => m.predeterminado)) {
                currentUser.metodosPago[0].predeterminado = true;
            }
        }
        
        // Actualizar localStorage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Actualizar en lista de usuarios
        const userIndex = usuarios.findIndex(u => u.email === currentUser.email);
        if (userIndex !== -1) {
            usuarios[userIndex].metodosPago = currentUser.metodosPago;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }
        
        // Recargar tarjetas
        cargarMetodosPago();
        mostrarNotificacion('Método de pago eliminado', 'success');
    }
}

// Agregar formatos automáticos a los inputs
document.addEventListener('DOMContentLoaded', function() {
    // Formato de número de tarjeta (espacios cada 4 dígitos)
    const numeroTarjeta = document.getElementById('numeroTarjeta');
    if (numeroTarjeta) {
        numeroTarjeta.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
        });
    }
    
    // Formato de fecha (MM/YY)
    const fechaVencimiento = document.getElementById('fechaVencimiento');
    if (fechaVencimiento) {
        fechaVencimiento.addEventListener('input', function(e) {
            const value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                e.target.value = value.substring(0, 2) + '/' + value.substring(2, 4);
            } else {
                e.target.value = value;
            }
        });
    }
});
