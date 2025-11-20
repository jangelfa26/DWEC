const urlApiUsuarios = "https://crudcrud.com/api/8b238a83820d4065a2887dd7da0ba696/usuarios";

const listaUsuarios = document.getElementById("lista-usuarios");
const formularioUsuario = document.getElementById("formulario-usuario");
const mensaje = document.getElementById("mensaje");
const botonCargarUsuarios = document.getElementById("boton-cargar-usuarios");
const buscador = document.getElementById("buscador");

let idUsuarioEditando = null;
let usuarios = [];

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(usuario.email)) {
        document.getElementById("error-correo").textContent = "Email inválido";
        valido = false;
    }
    try {
        new URL(usuario.picture);
    } catch {
        document.getElementById("error-foto").textContent = "URL inválida";
        valido = false;
    }

    return valido;
}

function mostrarMensaje(texto, color = "red") {
    mensaje.textContent = texto;
    mensaje.style.color = color;
    setTimeout(() => mensaje.textContent = "", 3000);
}

async function subirUsuariosIniciales() {
    botonCargarUsuarios.disabled = true;
    mostrarMensaje("Cargando usuarios iniciales...", "blue");

    for (let usuario of usuariosIniciales) {
        try {
            await fetch(urlApiUsuarios, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(usuario)
            });
        } catch {
            mostrarMensaje("Error subiendo usuarios iniciales");
        }
    }
    mostrarUsuarios();
    botonCargarUsuarios.disabled = false;
}

async function mostrarUsuarios() {
    listaUsuarios.innerHTML = "";
    try {
        const res = await fetch(urlApiUsuarios);
        usuarios = await res.json();

        const filtro = buscador.value.toLowerCase();

        usuarios
            .filter(u => (u.firstName + " " + u.lastName).toLowerCase().includes(filtro))
            .forEach(usuario => {
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

                elemento.querySelector(".boton-eliminar").addEventListener("click", async () => {
                    if (!confirm("¿Estás seguro de eliminar este usuario?")) return;
                    listaUsuarios.removeChild(elemento);
                    try {
                        await fetch(`${urlApiUsuarios}/${usuario._id}`, { method: "DELETE" });
                        mostrarMensaje("Usuario eliminado correctamente", "green");
                    } catch {
                        mostrarUsuarios();
                        mostrarMensaje("Error eliminando usuario");
                    }
                });

                listaUsuarios.appendChild(elemento);
            });
    } catch {
        mostrarMensaje("Error cargando usuarios");
    }
}

formularioUsuario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const datosUsuario = {
        firstName: document.getElementById("nombre").value,
        lastName: document.getElementById("apellido").value,
        email: document.getElementById("correo").value,
        picture: document.getElementById("foto").value
    };

    if (!validarUsuario(datosUsuario)) return;

    document.getElementById("boton-guardar").disabled = true;
    mostrarMensaje("Guardando usuario...", "blue");

    try {
        if (idUsuarioEditando) {
            await fetch(`${urlApiUsuarios}/${idUsuarioEditando}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datosUsuario)
            });
            mostrarMensaje("Usuario actualizado correctamente", "green");
            idUsuarioEditando = null;
        } else {
            const tempId = Date.now(); 
            usuarios.push({ ...datosUsuario, _id: tempId });
            mostrarUsuarios();
            await fetch(urlApiUsuarios, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datosUsuario)
            });
            mostrarMensaje("Usuario añadido correctamente", "green");
        }
        formularioUsuario.reset();
        mostrarUsuarios();
    } catch {
        mostrarMensaje("Error guardando usuario");
    } finally {
        document.getElementById("boton-guardar").disabled = false;
    }
});

buscador.addEventListener("input", () => {
    mostrarUsuarios();
});

botonCargarUsuarios.addEventListener("click", () => {
    subirUsuariosIniciales();
});

mostrarUsuarios();
