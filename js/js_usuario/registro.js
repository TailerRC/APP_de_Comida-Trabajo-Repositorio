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

document.getElementById('registroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombreCompleto = document.getElementById('nombreCompleto').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmarPassword = document.getElementById('confirmarPassword').value;
    const tipoDocumento = document.getElementById('tipoDocumento').value;
    const numeroDocumento = document.getElementById('numeroDocumento').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    
    // Validaciones
    if (!nombreCompleto) {
        alert('Por favor, ingresa tu nombre completo.');
        return;
    }
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }
    
    if (!telefono || telefono.length !== 9 || !/^\d+$/.test(telefono)) {
        alert('El teléfono debe tener exactamente 9 dígitos.');
        return;
    }
    
    if (!password || password.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return;
    }
    
    if (!/(?=.*[a-z])/.test(password)) {
        alert('La contraseña debe contener al menos una letra minúscula.');
        return;
    }
    
    if (!/(?=.*[A-Z])/.test(password)) {
        alert('La contraseña debe contener al menos una letra mayúscula.');
        return;
    }
    
    if (!/(?=.*\d)/.test(password)) {
        alert('La contraseña debe contener al menos un número.');
        return;
    }
    
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
        alert('La contraseña debe contener al menos un símbolo (!@#$%^&*).');
        return;
    }
    
    if (password !== confirmarPassword) {
        alert('Las contraseñas no coinciden. Por favor, verifica e intenta nuevamente.');
        return;
    }
    
    if (!tipoDocumento) {
        alert('Por favor, selecciona un tipo de documento.');
        return;
    }
    
    if (!numeroDocumento || numeroDocumento.length !== 8 || !/^\d+$/.test(numeroDocumento)) {
        alert('El número de documento debe tener exactamente 8 dígitos.');
        return;
    }
    
    if (!direccion) {
        alert('Por favor, ingresa tu dirección.');
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
    
    alert('¡Registro exitoso! Te has registrado correctamente.');
    
    // Redirigir a la página principal después de 1 segundo
    setTimeout(() => {
        window.location.href = 'main.html';
    }, 1000);
});
