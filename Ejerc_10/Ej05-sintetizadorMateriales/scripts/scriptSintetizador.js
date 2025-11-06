window.onload = function() {
  let selectBase = document.getElementById("materialBase");
  let selectMezcla = document.getElementById("materialMezcla");
  let botonSintetizar = document.getElementById("botonSintetizar");
  let mensajeResultado = document.getElementById("mensajeResultado");
  let listaHistorial = document.getElementById("listaHistorial");

  let xmlRecetas = null;

  let solicitud = new XMLHttpRequest();
  solicitud.open("GET", "datos/recetas.xml", true);

  solicitud.onload = function() {
    if (solicitud.status == 200) {
      xmlRecetas = solicitud.responseXML;
      rellenarSelects(xmlRecetas);
    } else {
      mensajeResultado.textContent = "Error al cargar las recetas.";
    }
  };

  solicitud.send();

  function rellenarSelects(xml) {
    let bases = Array.from(xml.getElementsByTagName("base")).map(n => n.textContent);
    let mezclas = Array.from(xml.getElementsByTagName("mezcla")).map(n => n.textContent);

    let basesUnicas = [...new Set(bases)];
    let mezclasUnicas = [...new Set(mezclas)];

    basesUnicas.forEach(b => {
      let opcion = document.createElement("option");
      opcion.value = b;
      opcion.textContent = b;
      selectBase.appendChild(opcion);
    });

    mezclasUnicas.forEach(m => {
      let opcion = document.createElement("option");
      opcion.value = m;
      opcion.textContent = m;
      selectMezcla.appendChild(opcion);
    });
  }

  botonSintetizar.addEventListener("click", function() {
    if (!xmlRecetas) return;

    let baseSeleccionada = selectBase.value;
    let mezclaSeleccionada = selectMezcla.value;

    if (baseSeleccionada == "" || mezclaSeleccionada == "") {
      mensajeResultado.textContent = "Selecciona ambos materiales.";
      return;
    }

    let aleaciones = xmlRecetas.getElementsByTagName("aleacion");
    let encontrada = false;

    for (let aleacion of aleaciones) {
      let base = aleacion.querySelector("base").textContent;
      let mezcla = aleacion.querySelector("mezcla").textContent;

      if (base == baseSeleccionada && mezcla == mezclaSeleccionada) {
        let resultado = aleacion.querySelector("resultado").textContent;
        let descripcion = aleacion.querySelector("descripcion").textContent;
        mensajeResultado.textContent = `${base} + ${mezcla} = ${resultado}. ${descripcion}`;
        agregarAlHistorial(base, mezcla, resultado, descripcion);
        encontrada = true;
        break;
      }
    }

    if (!encontrada) {
      mensajeResultado.textContent = "Combinación no válida. No se ha producido ninguna aleación.";
    }
  });

  function agregarAlHistorial(base, mezcla, resultado, descripcion) {
    let elemento = document.createElement("li");
    elemento.textContent = `${base} + ${mezcla} = ${resultado}`;
    elemento.dataset.base = base;
    elemento.dataset.mezcla = mezcla;
    elemento.dataset.descripcion = descripcion;

    elemento.addEventListener("click", function() {
      selectBase.value = this.dataset.base;
      selectMezcla.value = this.dataset.mezcla;
      mensajeResultado.textContent = `${this.dataset.base} + ${this.dataset.mezcla} = ${this.textContent.split("=")[1].trim()}. ${this.dataset.descripcion}`;
    });

    listaHistorial.appendChild(elemento);
  }
};
