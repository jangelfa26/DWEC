const pages = {
  inicio: '<h1>Página de Inicio</h1><p>Bienvenido a nuestra web.</p>',
  productos: '<h1>Productos</h1><p>Descubre nuestra gama de productos...</p>',
  contacto: '<h1>Contacto</h1><p>Contacta con nosotros...</p>'
};

let navPaginas = document.querySelector("nav");

function insertarResultado(codigoInsertar) {

  let main = document.querySelector("main");

  main.innerHTML = codigoInsertar;
    


}

function marcarActivo(ruta) {
  let enlaces = Array.from(navPaginas.children);
  console.log(enlaces)
  enlaces.forEach(enlace => {
    let href = enlace.getAttribute("href");
    console.log(href);
   
    if (href == ruta) {
      enlace.classList.add("active");
    } else {
      enlace.classList.remove("active");
    }
  });
}


navPaginas.addEventListener("click", (event) => {
  event.preventDefault();

  if (event.target.tagName === "A") {
    let rutaEnlace = event.target.getAttribute("href");
    
    history.pushState({}, "", rutaEnlace);

    let pagina = rutaEnlace.replace("/", "");

    let codigoInsertar = pages[pagina];

    insertarResultado(codigoInsertar);
    marcarActivo(rutaEnlace)
  }

})

window.addEventListener("popstate", () => {
  let pagina = location.pathname.replace("/", "") || "inicio";
  let codigoInsertar = pages[pagina];
  insertarResultado(codigoInsertar);
});

const paginaInicial = location.pathname.replace("/", "") || "inicio";
  let codigoInsertar = pages[paginaInicial];
  insertarResultado(codigoInsertar);
