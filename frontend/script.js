// * Abrir y Cerrar Los Formularios Login y Register
const evolutara = document.querySelector('.evolutara')

// * Constante Abrir Login con el btn Inciar Sesion
const btnOpen = document.querySelector('.btnLogin-popup')

// * Constante Cerrar Login con el btn X
const iconClose = document.querySelector('.icon-close')

// ? Evento Abrir Login con el btn Inciar Sesion
btnOpen.addEventListener('click', () => {
    evolutara.classList.add('active-popup');
});

iconClose.addEventListener('click', () => {
    evolutara.classList.remove('active-popup');
});


// * Validar User y Contraseña
function validate() {
    let user = document.getElementById('input-correo').value;
    let clave = document.getElementById('input-pass').value;

    if (user == "admin@ucvvirtual.edu.pe" && clave == "123") {
        alert("Se Ingresó Como Administrador");
        window.location = "./admin/index.html";

        return false;
    }
    if (user == "user@ucvvirtual.edu.pe0" && clave == "123") {
        window.location = "./cliente/catalogo.html";
        return false;
    } else {
        alert("Error de credenciales, inténtelo nuevamente.")
    }
}