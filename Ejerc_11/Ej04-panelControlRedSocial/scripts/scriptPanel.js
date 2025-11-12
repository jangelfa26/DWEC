const userWidget = document.getElementById("user-widget");
const postsWidget = document.getElementById("posts-widget");
const spinner = document.getElementById("loading-spinner");

const urlUsuario = "https://jsonplaceholder.typicode.com/users/1";
const urlPosts = "https://jsonplaceholder.typicode.com/posts?userId=1";

function mostrarUsuario(usuario) {
  const calle = usuario.address && usuario.address.street ? usuario.address.street : "";
  const suite = usuario.address && usuario.address.suite ? usuario.address.suite : "";
  const ciudad = usuario.address && usuario.address.city ? usuario.address.city : "";
  const codigoPostal = usuario.address && usuario.address.zipcode ? usuario.address.zipcode : "";
  const direccionCompleta = [calle, suite, ciudad, codigoPostal].filter(x => x).join(", ");

  userWidget.innerHTML = `
  
    <h5 class="mb-3">Información del Usuario</h5>
    <p><strong>Nombre:</strong> ${usuario.name}</p>
    <p><strong>Email:</strong> ${usuario.email}</p>
    <p><strong>Dirección:</strong> ${direccionCompleta}</p>
    <p><strong>Compañía:</strong> ${usuario.company && usuario.company.name ? usuario.company.name : ""}</p>
    <p><strong>Website:</strong> <a href="http://${usuario.website}" target="_blank">${usuario.website}</a></p>
  `;
}

function mostrarPosts(posts) {
  postsWidget.innerHTML = `<h5 class="mb-3">Últimos 3 Posts</h5>`;
  const ultimosTres = posts.slice(-3);
  if (ultimosTres.length === 0) {
    postsWidget.innerHTML += `<p class="text-muted">No hay posts para mostrar.</p>`;
    return;
  }
  ultimosTres.forEach(function(post) {
    let postElemento = document.createElement("div");
    postElemento.classList.add("mb-3", "border-bottom", "pb-2");
    postElemento.innerHTML = `
      <h6>${post.title}</h6>
      <p>${post.body}</p>
    `;
    postsWidget.appendChild(postElemento);
  });
}

function mostrarErrorUsuario() {
  userWidget.innerHTML = `<div class="alert alert-danger">Error al cargar la información del usuario.</div>`;
}

function mostrarErrorPosts() {
  postsWidget.innerHTML = `<div class="alert alert-danger">Error al cargar los posts del usuario.</div>`;
}

function mostrarErrorGeneral() {
  const contenedor = document.querySelector(".container");
  contenedor.innerHTML = `<div class="alert alert-danger text-center mt-4">No se pudo cargar la información ni los posts.</div>`;
}

function cargarDatos() {
  spinner.style.display = "block";

  const peticionUsuario = fetch(urlUsuario).then(r => {
    if (!r.ok) throw new Error("Error en usuario");
    return r.json();
  });

  const peticionPosts = fetch(urlPosts).then(r => {
    if (!r.ok) throw new Error("Error en posts");
    return r.json();
  });

  Promise.allSettled([peticionUsuario, peticionPosts])
    .then(resultados => {
      spinner.style.display = "none";

      const usuarioResultado = resultados[0];
      const postsResultado = resultados[1];

      if (usuarioResultado.status == "fulfilled") {
        mostrarUsuario(usuarioResultado.value);
      } else {
        mostrarErrorUsuario();
      }

      if (postsResultado.status == "fulfilled") {
        mostrarPosts(postsResultado.value);
      } else {
        mostrarErrorPosts();
      }

      if (usuarioResultado.status == "rejected" && postsResultado.status == "rejected") {
        mostrarErrorGeneral();
      }
    })
    .catch(() => {
      spinner.style.display = "none";
      mostrarErrorGeneral();
    });
}

cargarDatos();
