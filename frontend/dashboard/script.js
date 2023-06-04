const sideMenu = document.querySelector("aside")
const btnMenu = document.querySelector("#menu-btn")
const closeMenu = document.querySelector("#close-btn")
const temaNoDi = document.querySelector('.modo-visualizador')

// * Abrir el menu
btnMenu.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

// * Funcionalidad del boton de cerrar menu
closeMenu.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

// * Funcionalidad de modo oscuro y modo dia
temaNoDi.addEventListener('click', () => {
    document.body.classList.toggle('modo-oscuro-variables');

    temaNoDi.querySelector('span:nth-child(1)').classList.toggle('active');
    temaNoDi.querySelector('span:nth-child(2)').classList.toggle('active');
});



