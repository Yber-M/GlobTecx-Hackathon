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

// Add tesis en tabla
Tesis.forEach(tesis => {
    const tr = document.createElement('tr');
    const trContenido = `
        <td>${tesis.n}</td>
        <td>${tesis.tituloDeTesis}</td>
        <td>${tesis.fechaSubda}</td>
        <td>${tesis.fechaCulmin}</td>
        <td>${tesis.antiplagio}%</td>
        <td>${tesis.LineaInves}</td>
        <td class="status-tbl"><b ${tesis.colorStatus}>${tesis.Estado}</b></td>
    `;
    tr.innerHTML = trContenido;
    document.querySelector('table tbody').appendChild(tr);
});
