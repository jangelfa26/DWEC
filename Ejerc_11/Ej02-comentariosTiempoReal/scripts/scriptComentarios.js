const listaComentarios = document.getElementById("comments-list");
const formulario = document.getElementById("form-comentario");
const mensaje = document.getElementById("mensaje");
const botonEnviar = document.getElementById("btn-enviar");

function mostrarComentarios(datos) {
  listaComentarios.innerHTML = "";
  datos.forEach(function(comentario) {
    let elemento = document.createElement("li");
    elemento.classList.add("list-group-item");
    elemento.innerHTML = `
      <strong>${comentario.author}</strong>
      <p>${comentario.commentText}</p>
      <small class="text-muted">${new Date(comentario.timestamp).toLocaleString()}</small>
    `;
    listaComentarios.appendChild(elemento);
  });
}

function cargarComentarios() {
  let peticion = new XMLHttpRequest();
  peticion.open("GET", "../datos/comments_initial.json");
  peticion.onload = function() {
    if (peticion.status === 200) {
      let datos = JSON.parse(peticion.responseText);
      mostrarComentarios(datos);
    } else {
      mensaje.innerHTML = `<div class='alert alert-danger'>Error al cargar los comentarios iniciales.</div>`;
    }
  };
  peticion.onerror = function() {
    mensaje.innerHTML = `<div class='alert alert-danger'>Error de conexión al cargar comentarios.</div>`;
  };
  peticion.send();
}

formulario.addEventListener("submit", function(evento) {
  evento.preventDefault();

  let nombreAutor = document.getElementById("autor").value.trim();
  let texto = document.getElementById("textoComentario").value.trim();

  if (!nombreAutor || !texto) {
    mensaje.innerHTML = `<div class='alert alert-warning'>Por favor, completa todos los campos.</div>`;
    return;
  }

  botonEnviar.disabled = true;
  mensaje.innerHTML = `<div class='alert alert-info'>Enviando comentario...</div>`;

  let nuevoComentario = {
    author: nombreAutor,
    commentText: texto,
    timestamp: new Date().toISOString()
  };

  let peticion = new XMLHttpRequest();
  peticion.open("POST", "https://cors-anywhere.herokuapp.com/https://webhook.site/90bcba5d-a8d5-4bb6-a8fb-b983027987c3");
  peticion.setRequestHeader("Content-Type", "application/json");
  peticion.setRequestHeader("X-Requested-With", "XMLHttpRequest");

  peticion.onload = function() {
    botonEnviar.disabled = false;
    if (peticion.status >= 200 && peticion.status < 300) {
      mensaje.innerHTML = `<div class='alert alert-success'>Comentario enviado correctamente.</div>`;
      agregarComentarioLocal(nuevoComentario);
      formulario.reset();
    } else {
      mensaje.innerHTML = `<div class='alert alert-danger'>Error al enviar el comentario.</div>`;
    }
  };

  peticion.onerror = function() {
    botonEnviar.disabled = false;
    mensaje.innerHTML = `<div class='alert alert-danger'>Error de conexión al enviar comentario.</div>`;
  };

  peticion.send(JSON.stringify(nuevoComentario));
});

function agregarComentarioLocal(comentario) {
  let elemento = document.createElement("li");
  elemento.classList.add("list-group-item");
  elemento.innerHTML = `
    <strong>${comentario.author}</strong>
    <p>${comentario.commentText}</p>
    <small class="text-muted">${new Date(comentario.timestamp).toLocaleString()}</small>
  `;
  listaComentarios.appendChild(elemento);
}

cargarComentarios();
