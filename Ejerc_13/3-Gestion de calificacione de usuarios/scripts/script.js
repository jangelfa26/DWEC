const API_URL_USUARIOS = "https://crudcrud.com/api/4eb353326764406eacac6360745add72/usuarios";

const listaUsuarios = document.getElementById("lista-usuarios");
const formUsuario = document.getElementById("formulario-usuario");
const mensajeGlobal = document.getElementById("mensaje");
const botonCargarIniciales = document.getElementById("boton-cargar-usuarios");
const buscador = document.getElementById("buscador");

const modalCalificaciones = document.getElementById("modal-calificaciones");
const botonCerrarModal = document.getElementById("cerrar-modal");
const tituloModalUsuario = document.getElementById("nombre-usuario-calificaciones");
const formCalificaciones = document.getElementById("formulario-calificaciones");

let idUsuarioEditando = null;
let usuarioSeleccionado = null;
let listaUsuariosMemoria = [];

const usuariosIniciales = [
    { firstName: "Alice", lastName: "Smith", email: "alice.smith@example.com", picture: "https://randomuser.me/api/portraits/women/1.jpg" },
    { firstName: "Bob", lastName: "Johnson", email: "bob.johnson@example.com", picture: "https://randomuser.me/api/portraits/men/2.jpg" },
    { firstName: "Charlie", lastName: "Brown", email: "charlie.brown@example.com", picture: "https://randomuser.me/api/portraits/men/3.jpg" },
    { firstName: "Diana", lastName: "Prince", email: "diana.prince@example.com", picture: "https://randomuser.me/api/portraits/women/4.jpg" },
    { firstName: "Eve", lastName: "Adams", email: "eve.adams@example.com", picture: "https://randomuser.me/api/portraits/women/5.jpg" },
    { firstName: "Frank", lastName: "White", email: "frank.white@example.com", picture: "https://randomuser.me/api/portraits/men/6.jpg" },
    { firstName: "Grace", lastName: "Taylor", email: "grace.taylor@example.com", picture: "https://randomuser.me/api/portraits/women/7.jpg" },
    { firstName: "Henry", lastName: "Moore", email: "henry.moore@example.com", picture: "https://randomuser.me/api/portraits/men/8.jpg" },
    { firstName: "Ivy", lastName: "Clark", email: "ivy.clark@example.com", picture: "https://randomuser.me/api/portraits/women/9.jpg" },
    { firstName: "Jack", lastName: "Lewis", email: "jack.lewis@example.com", picture: "https://randomuser.me/api/portraits/men/10.jpg" }
];

function mostrarMensaje(texto, color = "red") {
    mensajeGlobal.textContent = texto;
    mensajeGlobal.style.color = color;
    setTimeout(() => mensajeGlobal.textContent = "", 3000);
}

function validarUsuario(usuario) {
    let valido = true;

    document.getElementById("error-nombre").textContent = "";
    document.getElementById("error-apellido").textContent = "";
    document.getElementById("error-correo").textContent = "";
    document.getElementById("error-foto").textContent = "";

    if (!usuario.firstName.trim()) {
        document.getElementById("error-nombre").textContent = "El nombre es obligatorio";
        valido = false;
    }
    if (!usuario.lastName.trim()) {
        document.getElementById("error-apellido").textContent = "El apellido es obligatorio";
        valido = false;
    }
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(usuario.email)) {
        document.getElementById("error-correo").textContent = "Email inválido";
        valido = false;
    }
    try {
        new URL(usuario.picture);
    } catch {
        document.getElementById("error-foto").textContent = "URL de imagen inválida";
        valido = false;
    }

    return valido;
}

function validarCalificaciones(calificaciones) {
    for (let nota of Object.values(calificaciones)) {
        if (isNaN(nota) || nota < 0 || nota > 10) return false;
    }
    return true;
}

async function cargarUsuariosIniciales() {
    botonCargarIniciales.disabled = true;
    mostrarMensaje("Cargando usuarios iniciales...", "blue");

    for (let usuario of usuariosIniciales) {
        try {
            await fetch(API_URL_USUARIOS, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(usuario)
            });
        } catch {
            mostrarMensaje("Error subiendo usuarios iniciales");
        }
    }
    await mostrarUsuarios();
    botonCargarIniciales.disabled = false;
}

async function mostrarUsuarios() {
    listaUsuarios.innerHTML = "";
    try {
        const res = await fetch(API_URL_USUARIOS);
        listaUsuariosMemoria = await res.json();

        const filtro = buscador.value.toLowerCase();

        listaUsuariosMemoria
            .filter(u => (u.firstName + " " + u.lastName).toLowerCase().includes(filtro))
            .forEach(usuario => {
                const elemento = document.createElement("li");
                elemento.classList.add("usuario-item");

                let calificacionesHTML = "";
                if (usuario.calificaciones) {
                    calificacionesHTML = `<div class="calificaciones">
                        ${Object.entries(usuario.calificaciones)
                            .map(([asignatura, nota]) => `<span>${asignatura}: ${nota}</span>`)
                            .join("<br>")}
                    </div>`;
                }

                elemento.innerHTML = `
                    <div class="usuario-info">
                        <img src="${usuario.picture}" alt="foto">
                        <div>
                            <strong>${usuario.firstName} ${usuario.lastName}</strong><br>
                            <span>${usuario.email}</span>
                            ${calificacionesHTML}
                        </div>
                    </div>
                    <div class="botones">
                        <button class="boton-calificaciones">Calificaciones</button>
                        <button class="boton-editar">Editar</button>
                        <button class="boton-eliminar">Eliminar</button>
                    </div>
                `;

                elemento.querySelector(".boton-editar").addEventListener("click", () => {
                    document.getElementById("nombre").value = usuario.firstName;
                    document.getElementById("apellido").value = usuario.lastName;
                    document.getElementById("correo").value = usuario.email;
                    document.getElementById("foto").value = usuario.picture;
                    idUsuarioEditando = usuario._id;
                });

                elemento.querySelector(".boton-eliminar").addEventListener("click", async () => {
                    if (!confirm("¿Eliminar este usuario?")) return;
                    listaUsuarios.removeChild(elemento);
                    try {
                        await fetch(`${API_URL_USUARIOS}/${usuario._id}`, { method: "DELETE" });
                        mostrarMensaje("Usuario eliminado correctamente", "green");
                    } catch {
                        mostrarUsuarios();
                        mostrarMensaje("Error eliminando usuario");
                    }
                });

                elemento.querySelector(".boton-calificaciones").addEventListener("click", () => {
                    usuarioSeleccionado = usuario;
                    tituloModalUsuario.textContent = `${usuario.firstName} ${usuario.lastName}`;
                    formCalificaciones.matematicas.value = usuario.calificaciones?.Matemáticas ?? "";
                    formCalificaciones.historia.value = usuario.calificaciones?.Historia ?? "";
                    formCalificaciones.ciencia.value = usuario.calificaciones?.Ciencia ?? "";
                    formCalificaciones.ingles.value = usuario.calificaciones?.Inglés ?? "";
                    formCalificaciones.arte.value = usuario.calificaciones?.Arte ?? "";
                    modalCalificaciones.style.display = "block";
                });

                listaUsuarios.appendChild(elemento);
            });
    } catch {
        mostrarMensaje("Error cargando usuarios");
    }
}

formUsuario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const usuario = {
        firstName: document.getElementById("nombre").value,
        lastName: document.getElementById("apellido").value,
        email: document.getElementById("correo").value,
        picture: document.getElementById("foto").value
    };

    if (!validarUsuario(usuario)) return;

    document.getElementById("boton-guardar").disabled = true;
    mostrarMensaje("Guardando usuario...", "blue");

    try {
        if (idUsuarioEditando) {
            const usuarioUpdate = { ...usuario };
            await fetch(`${API_URL_USUARIOS}/${idUsuarioEditando}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(usuarioUpdate)
            });
            mostrarMensaje("Usuario actualizado correctamente", "green");
            idUsuarioEditando = null;
        } else {
            listaUsuariosMemoria.push({ ...usuario, _id: Date.now() });
            mostrarUsuarios();
            await fetch(API_URL_USUARIOS, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(usuario)
            });
            mostrarMensaje("Usuario añadido correctamente", "green");
        }
        formUsuario.reset();
        mostrarUsuarios();
    } catch {
        mostrarMensaje("Error guardando usuario");
    } finally {
        document.getElementById("boton-guardar").disabled = false;
    }
});

formCalificaciones.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!usuarioSeleccionado) return;

    const calificaciones = {
        "Matemáticas": parseFloat(formCalificaciones.matematicas.value),
        "Historia": parseFloat(formCalificaciones.historia.value),
        "Ciencia": parseFloat(formCalificaciones.ciencia.value),
        "Inglés": parseFloat(formCalificaciones.ingles.value),
        "Arte": parseFloat(formCalificaciones.arte.value)
    };

    if (!validarCalificaciones(calificaciones)) {
        mostrarMensaje("Todas las calificaciones deben ser números entre 0 y 10");
        return;
    }

    const usuarioUpdate = { ...usuarioSeleccionado };
    delete usuarioUpdate._id;
    usuarioUpdate.calificaciones = calificaciones;

    mostrarMensaje("Guardando calificaciones...", "blue");

    try {
        await fetch(`${API_URL_USUARIOS}/${usuarioSeleccionado._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuarioUpdate)
        });
        mostrarMensaje("Calificaciones guardadas correctamente", "green");
        modalCalificaciones.style.display = "none";
        mostrarUsuarios();
    } catch {
        mostrarMensaje("Error guardando calificaciones");
    }
});

document.getElementById("borrar-calificaciones").addEventListener("click", async () => {
    if (!usuarioSeleccionado) return;
    if (!confirm("¿Eliminar todas las calificaciones de este usuario?")) return;

    const usuarioUpdate = { ...usuarioSeleccionado };
    delete usuarioUpdate._id;
    delete usuarioUpdate.calificaciones;

    mostrarMensaje("Borrando calificaciones...", "blue");

    try {
        await fetch(`${API_URL_USUARIOS}/${usuarioSeleccionado._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuarioUpdate)
        });
        mostrarMensaje("Calificaciones eliminadas correctamente", "green");
        modalCalificaciones.style.display = "none";
        mostrarUsuarios();
    } catch {
        mostrarMensaje("Error borrando calificaciones");
    }
});

botonCerrarModal.onclick = () => modalCalificaciones.style.display = "none";
window.onclick = (event) => { if (event.target == modalCalificaciones) modalCalificaciones.style.display = "none"; };

buscador.addEventListener("input", mostrarUsuarios);

botonCargarIniciales.addEventListener("click", cargarUsuariosIniciales);

mostrarUsuarios();
