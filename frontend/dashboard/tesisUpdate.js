const Tesis = [
    {
        n: 1,
        tituloDeTesis: 'TECx-: Desarrollo de un Sistema Inteligente de Apoyo para la Elaboración de Tesis',
        fechaSubda: '03/06/2023',
        fechaCulmin: '---------',
        antiplagio: 44,
        LineaInves: 'Tecnología de la información y la comunicación',
        Estado: 'En Proceso',
        colorStatus: 'style="color: var(--color-warnign);"'
    },

    {
        n: 2,
        tituloDeTesis: 'Sistema Web para la Gestión de Incidencias en la Empresa BUSINESSOFT S.R.L',
        fechaSubda: '03/06/2017',
        fechaCulmin: '31/12/2018',
        antiplagio: 0,
        LineaInves: 'Sistemas de información y comunicaciones',
        Estado: 'Aprobado',
        colorStatus: 'style="color: var(--color-primario);"'
    },

    {
        n: 3,
        tituloDeTesis: 'Un Estudio Superficial y Sin Fundamento sobre un Tema Irrelevante para la Investigación Académicas',
        fechaSubda: '03/06/2015',
        fechaCulmin: '01/03/2016',
        antiplagio: 100,
        LineaInves: 'Estudios sin fundamentos',
        Estado: 'Rechazado',
        colorStatus: 'style="color: var(--color-danger);"'
    }
]

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