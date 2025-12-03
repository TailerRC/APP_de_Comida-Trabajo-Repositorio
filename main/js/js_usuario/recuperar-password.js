document.getElementById('recuperarForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const emailError = document.getElementById('emailError');
    const successMessage = document.getElementById('successMessage');
    const enviarBtn = document.getElementById('enviarBtn');
    
    // Resetear errores previos
    emailError.style.display = 'none';
    successMessage.style.display = 'none';
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.style.display = 'block';
        return;
    }
    
    // Simular envío
    enviarBtn.disabled = true;
    enviarBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    setTimeout(() => {
        // Mostrar mensaje de éxito
        successMessage.style.display = 'block';
        
        // Resetear botón
        enviarBtn.disabled = false;
        enviarBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Enlace de Recuperación';
        
        // Limpiar formulario
        document.getElementById('email').value = '';
        
        // Scroll suave hacia el mensaje de éxito
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 2000);
});

// Ocultar mensaje de error mientras el usuario escribe
document.getElementById('email').addEventListener('input', function() {
    document.getElementById('emailError').style.display = 'none';
});
