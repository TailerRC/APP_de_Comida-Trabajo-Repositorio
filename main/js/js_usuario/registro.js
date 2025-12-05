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

// Función para mostrar errores visuales
function mostrarError(inputId, mensaje) {
    const input = document.getElementById(inputId);
    const wrapper = input.closest('.input-wrapper') || input.closest('.password-input-wrapper');
    
    // Remover error anterior si existe
    const errorExistente = wrapper.parentElement.querySelector('.error-message');
    if (errorExistente) {
        errorExistente.remove();
    }
    
    // Agregar clase de error
    wrapper.classList.add('error');
    
    // Crear mensaje de error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${mensaje}`;
    wrapper.parentElement.appendChild(errorDiv);
    
    // Hacer scroll al campo con error
    input.focus();
    
    // Remover error al escribir
    input.addEventListener('input', function() {
        wrapper.classList.remove('error');
        const errorMsg = wrapper.parentElement.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    }, { once: true });
}

// Función para limpiar todos los errores
function limpiarErrores() {
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
}

// Validación del nombre completo
function validarNombreCompleto(nombre) {
    if (!nombre || nombre.length < 3) {
        return 'El nombre debe tener al menos 3 caracteres.';
    }
    if (!/^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]+$/.test(nombre)) {
        return 'El nombre solo puede contener letras y espacios.';
    }
    if (nombre.split(' ').filter(word => word.length > 0).length < 2) {
        return 'Por favor, ingresa tu nombre y apellido.';
    }
    return null;
}

// Validación de email
function validarEmail(email) {
    if (!email) {
        return 'El correo electrónico es obligatorio.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return 'Por favor, ingresa un correo electrónico válido.';
    }
    const dominiosValidos = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'icloud.com'];
    const dominio = email.split('@')[1];
    if (!dominiosValidos.includes(dominio)) {
        return 'Por favor, usa un correo de Gmail, Hotmail, Outlook, Yahoo o iCloud.';
    }
    return null;
}

// Validación de teléfono
function validarTelefono(telefono) {
    if (!telefono) {
        return 'El número de teléfono es obligatorio.';
    }
    if (!/^\d+$/.test(telefono)) {
        return 'El teléfono solo debe contener números.';
    }
    if (telefono.length !== 9) {
        return 'El teléfono debe tener exactamente 9 dígitos.';
    }
    if (!['9', '8', '7'].includes(telefono[0])) {
        return 'El teléfono debe comenzar con 9, 8 o 7.';
    }
    return null;
}

// Validación de documento
function validarDocumento(tipoDocumento, numeroDocumento) {
    if (!tipoDocumento) {
        return 'Por favor, selecciona un tipo de documento.';
    }
    if (!numeroDocumento) {
        return 'El número de documento es obligatorio.';
    }
    if (!/^\d+$/.test(numeroDocumento)) {
        return 'El documento solo debe contener números.';
    }
    if (tipoDocumento === 'dni' && numeroDocumento.length !== 8) {
        return 'El DNI debe tener exactamente 8 dígitos.';
    }
    if (tipoDocumento === 'ruc' && numeroDocumento.length !== 11) {
        return 'El RUC debe tener exactamente 11 dígitos.';
    }
    return null;
}

// Validación de contraseña
function validarPassword(password) {
    if (!password) {
        return 'La contraseña es obligatoria.';
    }
    if (password.length < 8) {
        return 'La contraseña debe tener al menos 8 caracteres.';
    }
    if (password.length > 50) {
        return 'La contraseña no puede tener más de 50 caracteres.';
    }
    if (!/(?=.*[a-z])/.test(password)) {
        return 'Debe contener al menos una letra minúscula.';
    }
    if (!/(?=.*[A-Z])/.test(password)) {
        return 'Debe contener al menos una letra mayúscula.';
    }
    if (!/(?=.*\d)/.test(password)) {
        return 'Debe contener al menos un número.';
    }
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
        return 'Debe contener al menos un símbolo (!@#$%^&*).';
    }
    if (/\s/.test(password)) {
        return 'La contraseña no puede contener espacios.';
    }
    return null;
}

// Validación de dirección
function validarDireccion(direccion) {
    if (!direccion || direccion.length < 10) {
        return 'La dirección debe tener al menos 10 caracteres.';
    }
    if (direccion.length > 200) {
        return 'La dirección no puede superar los 200 caracteres.';
    }
    return null;
}

document.getElementById('registroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Limpiar errores previos
    limpiarErrores();
    
    const nombreCompleto = document.getElementById('nombreCompleto').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmarPassword = document.getElementById('confirmarPassword').value;
    const tipoDocumento = document.getElementById('tipoDocumento').value;
    const numeroDocumento = document.getElementById('numeroDocumento').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const terminosAceptados = document.getElementById('terminos').checked;
    
    // Validar términos y condiciones
    if (!terminosAceptados) {
        alert('Debes aceptar los Términos y Condiciones para continuar.');
        return;
    }
    
    // Validaciones con feedback visual
    let errorEncontrado = false;
    
    // Validar nombre completo
    const errorNombre = validarNombreCompleto(nombreCompleto);
    if (errorNombre) {
        mostrarError('nombreCompleto', errorNombre);
        errorEncontrado = true;
    }
    
    // Validar email
    const errorEmail = validarEmail(email);
    if (errorEmail) {
        mostrarError('email', errorEmail);
        errorEncontrado = true;
    }
    
    // Validar teléfono
    const errorTelefono = validarTelefono(telefono);
    if (errorTelefono) {
        mostrarError('telefono', errorTelefono);
        errorEncontrado = true;
    }
    
    // Validar dirección
    const errorDireccion = validarDireccion(direccion);
    if (errorDireccion) {
        mostrarError('direccion', errorDireccion);
        errorEncontrado = true;
    }
    
    // Validar documento
    const errorDocumento = validarDocumento(tipoDocumento, numeroDocumento);
    if (errorDocumento) {
        if (!tipoDocumento) {
            mostrarError('tipoDocumento', errorDocumento);
        } else {
            mostrarError('numeroDocumento', errorDocumento);
        }
        errorEncontrado = true;
    }
    
    // Validar contraseña
    const errorPassword = validarPassword(password);
    if (errorPassword) {
        mostrarError('password', errorPassword);
        errorEncontrado = true;
    }
    
    // Validar confirmación de contraseña
    if (!confirmarPassword) {
        mostrarError('confirmarPassword', 'Por favor, confirma tu contraseña.');
        errorEncontrado = true;
    } else if (password !== confirmarPassword) {
        mostrarError('confirmarPassword', 'Las contraseñas no coinciden.');
        errorEncontrado = true;
    }
    
    // Si hay errores, detener el proceso
    if (errorEncontrado) {
        return;
    }
    
    // Guardar datos del usuario en localStorage
    const userData = {
        nombreCompleto: nombreCompleto,
        telefono: telefono,
        email: email,
        tipoDocumento: tipoDocumento,
        numeroDocumento: numeroDocumento,
        direccion: direccion,
        password: password, // En producción, nunca guardar passwords en texto plano
        fechaRegistro: new Date().toISOString(),
        notificaciones: true,
        promociones: true
    };
    
    // Obtener usuarios existentes o crear array vacío
    let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
    // Verificar si el email ya existe
    if (usuarios.some(user => user.email === userData.email)) {
        alert('Ya existe una cuenta con este correo electrónico.');
        return;
    }
    
    // Agregar nuevo usuario
    usuarios.push(userData);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    // Establecer sesión activa
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    // Mostrar modal de confirmación
    mostrarModalConfirmacion();
});

function mostrarModalConfirmacion() {
    const modal = document.getElementById('modalConfirmacion');
    modal.style.display = 'flex';
    
    // Evento para el botón continuar
    document.getElementById('btnContinuar').addEventListener('click', function() {
        window.location.href = '../main.html';
    });
}

// Cambiar placeholder y maxlength según tipo de documento
document.getElementById('tipoDocumento').addEventListener('change', function() {
    const numeroDocumentoInput = document.getElementById('numeroDocumento');
    
    if (this.value === 'dni') {
        numeroDocumentoInput.placeholder = '8 dígitos';
        numeroDocumentoInput.maxLength = 8;
    } else if (this.value === 'ruc') {
        numeroDocumentoInput.placeholder = '11 dígitos';
        numeroDocumentoInput.maxLength = 11;
    } else {
        numeroDocumentoInput.placeholder = 'Selecciona tipo de documento';
        numeroDocumentoInput.maxLength = 11;
    }
    
    // Limpiar el campo al cambiar tipo
    numeroDocumentoInput.value = '';
});

// Validación en tiempo real para solo números en teléfono y documento
document.getElementById('telefono').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^\d]/g, '');
});

document.getElementById('numeroDocumento').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^\d]/g, '');
});
