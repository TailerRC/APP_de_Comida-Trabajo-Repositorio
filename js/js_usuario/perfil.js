// Verificar sesión al cargar la página
window.addEventListener('load', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        alert('No hay sesión activa. Redirigiendo al inicio.');
        window.location.href = 'main.html';
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
        window.location.href = 'main.html';
        return;
    }

    // Cargar datos en los campos
    document.getElementById('nombreCompleto').value = currentUser.nombreCompleto || '';
    document.getElementById('correoElectronico').value = currentUser.email || '';
    document.getElementById('numeroTelefono').value = currentUser.telefono || '';
    document.getElementById('numeroDocumento').value = currentUser.numeroDocumento || '';
    document.getElementById('direccion').value = currentUser.direccion || '';
    
    // Mapear tipo de documento
    const tipoDocTexto = {
        'cedula': 'Cédula de Ciudadanía',
        'cedula_extranjeria': 'Cédula de Extranjería',
        'pasaporte': 'Pasaporte',
        'tarjeta_identidad': 'Tarjeta de Identidad'
    };
    document.getElementById('tipoDocumento').value = tipoDocTexto[currentUser.tipoDocumento] || 'DNI';
    
    // Cargar preferencias
    document.getElementById('notificaciones').checked = currentUser.notificaciones !== false;
    document.getElementById('promociones').checked = currentUser.promociones !== false;
}

function editarCampo(campoId) {
    const campo = document.getElementById(campoId);
    const isDisabled = campo.disabled;
    
    if (isDisabled) {
        campo.disabled = false;
        campo.focus();
        campo.style.backgroundColor = 'white';
    } else {
        campo.disabled = true;
        campo.style.backgroundColor = '#f8f9fa';
        guardarCampo(campoId, campo.value);
    }
}

function guardarCampo(campoId, valor) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
    // Mapear campos a propiedades del usuario
    const campoMap = {
        'nombreCompleto': 'nombreCompleto',
        'correoElectronico': 'email',
        'numeroTelefono': 'telefono',
        'numeroDocumento': 'numeroDocumento',
        'direccion': 'direccion'
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
}

function guardarCambios() {
    abrirModal('modalEditarPerfil');
}

function confirmarEditarPerfil() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
    // Guardar preferencias
    currentUser.notificaciones = document.getElementById('notificaciones').checked;
    currentUser.promociones = document.getElementById('promociones').checked;
    
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
    alert('Función de Método de Pago - Por implementar');
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
    window.location.href = 'main.html';
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
