window.onload = function() {
  cargarSoporteVital();
  cargarInventario();
};

function cargarSoporteVital() {
  let peticion = new XMLHttpRequest();
  peticion.open("GET", "../datos/soporte_vital.xml", true);

  peticion.onload = function() {
    if (peticion.status == 200) {
      let xml = peticion.responseXML;
      let mediciones = xml.getElementsByTagName("medicion");

      if (mediciones.length === 0) {
        document.getElementById("zonaSoporte").textContent = "No hay mediciones disponibles.";
        return;
      }

      let medicionMasReciente = mediciones[0];
      let fechaMasReciente = new Date(mediciones[0].getAttribute("timestamp"));

      for (let i = 1; i < mediciones.length; i++) {
        let fechaActual = new Date(mediciones[i].getAttribute("timestamp"));
        if (fechaActual > fechaMasReciente) {
          fechaMasReciente = fechaActual;
          medicionMasReciente = mediciones[i];
        }
      }

      let oxigeno = medicionMasReciente.getElementsByTagName("oxigeno")[0].textContent;
      let temperatura = medicionMasReciente.getElementsByTagName("temperatura")[0].textContent;
      let presion = medicionMasReciente.getElementsByTagName("presion")[0].textContent;

      let zona = document.getElementById("zonaSoporte");
      zona.innerHTML = `
        <p><strong>Última medición:</strong> ${fechaMasReciente.toISOString()}</p>
        <p><strong>Oxígeno:</strong> ${oxigeno}%</p>
        <p><strong>Temperatura:</strong> ${temperatura} °C</p>
        <p><strong>Presión:</strong> ${presion} hPa</p>
      `;
    } else {
      document.getElementById("zonaSoporte").textContent = "Error: no se encontró el archivo soporte_vital.xml";
    }
  };

  peticion.onerror = function() {
    document.getElementById("zonaSoporte").textContent = "Error al intentar cargar los datos XML.";
  };

  peticion.send();
}

let xmlInventario = null;

function cargarInventario() {
  let peticion = new XMLHttpRequest();
  peticion.open("GET", "../datos/inventario.xml", true);

  peticion.onload = function() {
    if (peticion.status == 200) {
      xmlInventario = peticion.responseXML;

      let articulos = xmlInventario.getElementsByTagName("item");
      let lista = document.getElementById("listaArticulos");

      lista.innerHTML = "";

      for (let i = 0; i < articulos.length; i++) {
        let nombre = articulos[i].getElementsByTagName("nombre")[0].textContent;
        let opcion = document.createElement("option");
        opcion.value = i;
        opcion.textContent = nombre;
        lista.appendChild(opcion);
      }

      if (articulos.length > 0) {
        lista.value = 0;
        mostrarInfoArticulo();
      }

      lista.onchange = mostrarInfoArticulo;
      document.getElementById("botonAutonomia").onclick = calcularAutonomia;
    } else {
      document.getElementById("infoArticulo").textContent = "Error al cargar inventario.xml";
    }
  };

  peticion.onerror = function() {
    document.getElementById("infoArticulo").textContent = "Error de conexión al cargar el XML.";
  };

  peticion.send();
}

function mostrarInfoArticulo() {
  let lista = document.getElementById("listaArticulos");
  let indice = parseInt(lista.value);

  let articulos = xmlInventario.getElementsByTagName("item");

  if (isNaN(indice) || indice < 0 || indice >= articulos.length) {
    document.getElementById("infoArticulo").textContent = "Selecciona un artículo válido.";
    return;
  }

  let articulo = articulos[indice];
  let cantidad = articulo.getElementsByTagName("cantidad")[0].textContent;
  let unidad = articulo.getAttribute("unidad");

  let zonaInfo = document.getElementById("infoArticulo");
  zonaInfo.textContent = "Disponible: " + cantidad + " " + unidad;
}

function calcularAutonomia() {
  let articulos = xmlInventario.getElementsByTagName("item");
  let textoResultado = "";

  for (let i = 0; i < articulos.length; i++) {
    let nombre = articulos[i].getElementsByTagName("nombre")[0].textContent;
    let cantidad = parseFloat(articulos[i].getElementsByTagName("cantidad")[0].textContent);
    let consumo = parseFloat(articulos[i].getElementsByTagName("consumo")[0].textContent);

    let consumoTotal = consumo * 4;
    let dias = Math.floor(cantidad / consumoTotal);

    textoResultado += nombre + ": " + dias + " días de autonomía.<br>";
  }

  document.getElementById("resultado").innerHTML = textoResultado;
}
