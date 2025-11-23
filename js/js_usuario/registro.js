function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.parentElement.querySelector('.toggle-password');
    
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
    
    const password = document.getElementById('password').value;
    const confirmarPassword = document.getElementById('confirmarPassword').value;
    
    if (password !== confirmarPassword) {
        alert('Las contraseñas no coinciden. Por favor, verifica e intenta nuevamente.');
        return;
    }
    
    if (password.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return;
    }
    
    // Guardar datos del usuario en localStorage
    const userData = {
        nombreCompleto: document.getElementById('nombreCompleto').value,
        telefono: document.getElementById('telefono').value,
        email: document.getElementById('email').value,
        tipoDocumento: document.getElementById('tipoDocumento').value,
        numeroDocumento: document.getElementById('numeroDocumento').value,
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
