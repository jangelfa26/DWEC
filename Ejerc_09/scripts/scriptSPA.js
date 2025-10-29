const pages = {
  inicio: '<h1>Página de Inicio</h1><p>Bienvenido a nuestra web.</p>',
  productos: '<h1>Productos</h1><p>Descubre nuestra gama de productos...</p>',
  contacto: '<h1>Contacto</h1><p>Contacta con nosotros...</p>'
};

let navPaginas = document.querySelector("nav");

navPaginas.addEventListener("click", (event) => {
    event.preventDefault();
    let rutaEnlace = event.target.href;
    console.log(rutaEnlace);
})