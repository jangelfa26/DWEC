const urlApiUsuarios = "https://crudcrud.com/api/fa1f5174299640cb94dcc0fea28b9393/usuarios";

const listaUsuarios = document.getElementById("lista-usuarios");
const formularioUsuario = document.getElementById("formulario-usuario");
const mensaje = document.getElementById("mensaje");
const botonCargarUsuarios = document.getElementById("boton-cargar-usuarios");

let idUsuarioEditando = null;

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

function subirUsuariosIniciales() {
    usuariosIniciales.forEach(usuario => {
        fetch(urlApiUsuarios, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        })
        .then(respuesta => respuesta.json())
        .then(() => mostrarUsuarios())
        .catch(err => mostrarMensaje("Error subiendo usuarios"));
    });
}

botonCargarUsuarios.addEventListener("click", subirUsuariosIniciales);

function mostrarUsuarios() {
    fetch(urlApiUsuarios)
        .then(respuesta => respuesta.json())
        .then(usuarios => {
            listaUsuarios.innerHTML = "";

            usuarios.forEach(usuario => {
                const elemento = document.createElement("li");
                elemento.classList.add("usuario-item");

                elemento.innerHTML = `
                    <div class="usuario-info">
                        <img src="${usuario.picture}" alt="foto">
                        <div>
                            <strong>${usuario.firstName} ${usuario.lastName}</strong><br>
                            <span>${usuario.email}</span>
                        </div>
                    </div>
                    <div class="botones">
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

                elemento.querySelector(".boton-eliminar").addEventListener("click", () => eliminarUsuario(usuario._id));

                listaUsuarios.appendChild(elemento);
            });
        })
        .catch(err => mostrarMensaje("Error cargando usuarios"));
}


formularioUsuario.addEventListener("submit", (event) => {
    event.preventDefault();

    const datosUsuario = {
        firstName: document.getElementById("nombre").value,
        lastName: document.getElementById("apellido").value,
        email: document.getElementById("correo").value,
        picture: document.getElementById("foto").value
    };

    if (idUsuarioEditando) {
        fetch(`${urlApiUsuarios}/${idUsuarioEditando}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datosUsuario)
        })
        .then(() => {
            mostrarUsuarios();
            formularioUsuario.reset();
            idUsuarioEditando = null;
        })
        .catch(() => mostrarMensaje("Error actualizando usuario"));

    } else { 
        fetch(urlApiUsuarios, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datosUsuario)
        })
        .then(() => {
            mostrarUsuarios();
            formularioUsuario.reset();
        })
        .catch(() => mostrarMensaje("Error guardando usuario"));
    }
});

function eliminarUsuario(id) {
    if (!confirm("¿Estás seguro de eliminar este usuario?")) return;

    fetch(`${urlApiUsuarios}/${id}`, {
        method: "DELETE"
    })
    .then(() => mostrarUsuarios())
    .catch(() => mostrarMensaje("Error eliminando usuario"));
}

function mostrarMensaje(texto) {
    mensaje.textContent = texto;
    mensaje.style.color = "red";
    setTimeout(() => mensaje.textContent = "", 3000);
}

mostrarUsuarios();