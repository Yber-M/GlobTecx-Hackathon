// * Abrir y Cerrar Los Formularios Login y Register
const evolutara = document.querySelector('.evolutara');
const linkLogin = document.querySelector('.entrar-login');
const linkRegister = document.querySelector('.entrar-registrar');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

linkRegister.addEventListener('click', () => {
    evolutara.classList.add('active');
});

linkLogin.addEventListener('click', () => {
    evolutara.classList.remove('active');
});

btnPopup.addEventListener('click', () => {
    evolutara.classList.add('active-popup');
});

iconClose.addEventListener('click', () => {
    evolutara.classList.remove('active-popup');
});

// * Validar User y Contraseña
function validate() {
    let user = document.getElementById('input-correo').value;
    let clave = document.getElementById('input-pass').value;

    if (user == "ybermarlon@gmail.com" && clave == "123") {
        alert("Se Ingresó Como Administrador");
        window.location = "./admin/index.html";

        return false;
    }
    if (user == "user@gmail.com" && clave == "12") {
        window.location = "./cliente/catalogo.html";
        return false;
    } else {
        alert("Error de credenciales, inténtelo nuevamente.")
    }
}