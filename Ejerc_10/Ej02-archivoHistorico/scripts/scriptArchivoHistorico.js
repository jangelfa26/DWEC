window.onload = function() {
  let botonAnterior = document.getElementById("btnAnterior");
  let botonSiguiente = document.getElementById("btnSiguiente");
  let botonUltimo = document.getElementById("btnUltimo");
  let listaVisitados = document.getElementById("listaVisitados");

  cargarDocumento("datos/documento_ultimo.xml");

  function cargarDocumento(rutaArchivo) {
    let solicitud = new XMLHttpRequest();
    solicitud.open("GET", rutaArchivo, true);

    solicitud.onload = function() {
      if (solicitud.status === 200) {
        let xml = solicitud.responseXML;
        mostrarDocumento(xml, rutaArchivo);
      } else {
        document.getElementById("titulo").textContent = "Error al cargar el archivo XML.";
      }
    };

    solicitud.onerror = function() {
      document.getElementById("titulo").textContent = "Error de conexión con el servidor.";
    };

    solicitud.send();
  }

  function mostrarDocumento(xml, rutaArchivo) {
    let titulo = xml.getElementsByTagName("titulo")[0].textContent;
    let fecha = xml.getElementsByTagName("fecha")[0].textContent;
    let imagen = xml.getElementsByTagName("imagen")[0].textContent;
    let descripcion = xml.getElementsByTagName("descripcion")[0].textContent;
    let siguiente = xml.getElementsByTagName("siguiente")[0].textContent;
    let anterior = xml.getElementsByTagName("anterior")[0].textContent;

    document.getElementById("titulo").textContent = titulo;
    document.getElementById("fecha").textContent = fecha;
    document.getElementById("imagen").src = imagen;
    document.getElementById("descripcion").textContent = descripcion;

    // Activar o desactivar botones
    botonSiguiente.disabled = (siguiente === "null");
    botonAnterior.disabled = (anterior === "null");

    botonSiguiente.onclick = function() {
      if (siguiente !== "null") {
        cargarDocumento("datos/" + siguiente);
      }
    };

    botonAnterior.onclick = function() {
      if (anterior !== "null") {
        cargarDocumento("datos/" + anterior);
      }
    };

    botonUltimo.onclick = function() {
      cargarDocumento("datos/documento_ultimo.xml");
    };

    agregarAHistorial(titulo, fecha, rutaArchivo);
  }

  function agregarAHistorial(titulo, fecha, rutaArchivo) {
    let elementos = listaVisitados.getElementsByTagName("li");
    for (let i = 0; i < elementos.length; i++) {
      if (elementos[i].getAttribute("data-archivo") === rutaArchivo) {
        return;
      }
    }

    let nuevoElemento = document.createElement("li");
    nuevoElemento.textContent = `${titulo} (${fecha})`;
    nuevoElemento.setAttribute("data-archivo", rutaArchivo);
    nuevoElemento.style.cursor = "pointer";

    nuevoElemento.onclick = function() {
      let archivo = this.getAttribute("data-archivo");
      cargarDocumento(archivo);
    };

    listaVisitados.appendChild(nuevoElemento);
  }
};

