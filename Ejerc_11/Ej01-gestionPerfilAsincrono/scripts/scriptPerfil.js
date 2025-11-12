let listaUsuarios = [];
let usuarioActual;
let modoEdicion = false;

const contenedor = document.getElementById("user-profile");
const botonEditar = document.getElementById("btn-editar");
const botonGuardar = document.getElementById("btn-guardar");
const mensaje = document.getElementById("mensaje");

function mostrarPerfil() {
  if (!usuarioActual) {
    contenedor.innerHTML = "<p>No hay datos de usuario.</p>";
    return;
  }

  let soloLectura = modoEdicion ? "" : "readonly";
  let u = usuarioActual;

  contenedor.innerHTML = `
    <div class="mb-3">
      <label>Nombre:</label>
      <input id="nombre" class="form-control" value="${u.personalInfo.firstName}" ${soloLectura}>
    </div>
    <div class="mb-3">
      <label>Apellidos:</label>
      <input id="apellidos" class="form-control" value="${u.personalInfo.lastName}" ${soloLectura}>
    </div>
    <div class="mb-3">
      <label>Email:</label>
      <input id="email" class="form-control" value="${u.personalInfo.email}" ${soloLectura}>
    </div>
    <div class="mb-3">
      <label>Teléfono:</label>
      <input id="telefono" class="form-control" value="${u.personalInfo.phone}" ${soloLectura}>
    </div>
    <div class="mb-3">
      <label>Calle:</label>
      <input id="calle" class="form-control" value="${u.address.street}" ${soloLectura}>
    </div>
    <div class="mb-3">
      <label>Ciudad:</label>
      <input id="ciudad" class="form-control" value="${u.address.city}" ${soloLectura}>
    </div>
    <div class="mb-3">
      <label>Código Postal:</label>
      <input id="codigoPostal" class="form-control" value="${u.address.zipCode}" ${soloLectura}>
    </div>
    <div class="mb-3">
      <label>País:</label>
      <input id="pais" class="form-control" value="${u.address.country}" ${soloLectura}>
    </div>
    <div class="mb-3">
      <label>Hobbies:</label>
      <textarea id="hobbies" class="form-control" rows="2" ${soloLectura}>${u.hobbies.join(", ")}</textarea>
    </div>
  `;
}

function cargarDatos() {
  let peticion = new XMLHttpRequest();
  peticion.open("GET", "../datos/user_data.json");
  peticion.onload = function() {
    if (peticion.status === 200) {
      listaUsuarios = JSON.parse(peticion.responseText);
      usuarioActual = listaUsuarios[0];
      mostrarPerfil();
    } else {
      contenedor.innerHTML = "<p class='text-danger'>Error al cargar los datos.</p>";
    }
  };
  peticion.onerror = function() {
    contenedor.innerHTML = "<p class='text-danger'>No se pudo conectar con el archivo JSON.</p>";
  };
  peticion.send();
}

botonEditar.addEventListener("click", function() {
  modoEdicion = true;
  mostrarPerfil();
  botonEditar.classList.add("d-none");
  botonGuardar.classList.remove("d-none");
});

botonGuardar.addEventListener("click", function() {
  botonGuardar.disabled = true;
  mensaje.innerHTML = `<div class='alert alert-info'>Guardando...</div>`;

  let actualizado = {
    personalInfo: {
      firstName: document.getElementById("nombre").value,
      lastName: document.getElementById("apellidos").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("telefono").value
    },
    address: {
      street: document.getElementById("calle").value,
      city: document.getElementById("ciudad").value,
      zipCode: document.getElementById("codigoPostal").value,
      country: document.getElementById("pais").value
    },
    hobbies: document.getElementById("hobbies").value.split(",").map(x => x.trim())
  };

  let peticion = new XMLHttpRequest();
  peticion.open("POST", "https://cors-anywhere.herokuapp.com/https://webhook.site/90bcba5d-a8d5-4bb6-a8fb-b983027987c3");
  peticion.setRequestHeader("Content-Type", "application/json");
  peticion.setRequestHeader("X-Requested-With", "XMLHttpRequest");

  peticion.onload = function() {
    botonGuardar.disabled = false;
    if (peticion.status >= 200 && peticion.status < 300) {
      mensaje.innerHTML = `<div class='alert alert-success'>Datos guardados correctamente.</div>`;
      usuarioActual = Object.assign({}, usuarioActual, actualizado);
      modoEdicion = false;
      botonGuardar.classList.add("d-none");
      botonEditar.classList.remove("d-none");
      mostrarPerfil();
    } else {
      mensaje.innerHTML = `<div class='alert alert-danger'>Error al guardar los datos.</div>`;
    }
  };

  peticion.onerror = function() {
    mensaje.innerHTML = `<div class='alert alert-danger'>Error de conexión.</div>`;
    botonGuardar.disabled = false;
  };

  peticion.send(JSON.stringify(actualizado));
});

cargarDatos();
