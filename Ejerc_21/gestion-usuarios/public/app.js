const formulario = document.getElementById('formulario');

const contenedor = document.getElementById('contenedor');

const BUCKET = 'alumnos';


async function cargarAlumnos() {

    const respuesta = await fetch('/api/alumnos');

    const alumnos = await respuesta.json();

    contenedor.innerHTML = '';

    alumnos.forEach(alumno => {

        const card = document.createElement('div');

        card.classList.add('card');

        card.innerHTML = `
<img
    src="/imagen/${alumno.imagen}"
    width="200"
>

            <h3>${alumno.nombre}</h3>

             <p>${alumno.apellidos}</p>

            <p><strong>ID:</strong> ${alumno.id}</p>

            <p><strong>Localidad:</strong> ${alumno.localidad}</p>

            <button onclick="eliminarAlumno(${alumno.id})">
                Eliminar
            </button>
        `;

        contenedor.appendChild(card);
    });
}


formulario.addEventListener('submit', async (e) => {

    e.preventDefault();

    const formData = new FormData(formulario);

    try {

        const respuesta = await fetch('/api/alumnos', {

            method: 'POST',

            body: formData
        });

        const data = await respuesta.json();

        console.log(data);

        formulario.reset();

        cargarAlumnos();

    } catch (error) {

        console.error(error);
    }
});

async function eliminarAlumno(id) {

    await fetch(`/api/alumnos/${id}`, {

        method: 'DELETE'
    });

    cargarAlumnos();
}


cargarAlumnos();