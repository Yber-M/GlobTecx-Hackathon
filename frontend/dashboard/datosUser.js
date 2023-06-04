const datosUsuario = [
    {
        id: '7002583821',
        nombre: 'Marlon Yber Quispe Olano',
        correo: 'mquispeol@ucvvirtual.edu.pe',
    }
]

// Add Datos de usuario en tabla
datosUsuario.forEach(datos => {
    const tr = document.createElement('tr');
    const trContenido = `
        <td>${datos.id}</td>
        <td>${datos.nombre}</td>
        <td>${datos.correo}</td>
    `;
    tr.innerHTML = trContenido;
    document.querySelector('table tbody').appendChild(tr);
});
