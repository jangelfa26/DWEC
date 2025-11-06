window.onload = function() {
  let botonEmpezar = document.getElementById("botonEmpezar");
  let texto = document.getElementById("texto");
  let pista = document.getElementById("pista");
  let intentos = document.getElementById("intentos");
  let alfabeto = document.getElementById("alfabeto");

  let fragmentoActual = "";
  let letraCorrecta = "";
  let letraSeleccionada = "";
  let selectorSolucion = "";
  let contadorIntentos = 0;

  for (let i = 65; i <= 90; i++) {
    let div = document.createElement("div");
    div.className = "letra";
    div.textContent = String.fromCharCode(i);
    alfabeto.appendChild(div);
  }

  botonEmpezar.addEventListener("click", function() {
    cargarFragmento("fragmento1.xml");
  });

  alfabeto.addEventListener("click", function(e) {
    if (e.target.classList.contains("letra")) {
      document.querySelectorAll(".letra").forEach(l => l.classList.remove("seleccionada"));
      e.target.classList.add("seleccionada");
      letraSeleccionada = e.target.textContent;
    }
  });

  document.addEventListener("click", function(e) {
    if (e.target.classList.contains("letra") || e.target.id === "botonEmpezar") return;
    if (!fragmentoActual) return;

    if (letraSeleccionada !== letraCorrecta) {
      e.target.classList.add("error");
      setTimeout(() => e.target.classList.remove("error"), 300);
      contadorIntentos++;
      intentos.textContent = "Intentos: " + contadorIntentos;
      return;
    }

    if (e.target.matches(selectorSolucion)) {
      if (fragmentoActual === "") {
        alert("Has descifrado el manuscrito completo.");
        texto.textContent = "";
        pista.textContent = "";
        return;
      }
      alert("Acertaste el fragmento. Cargando siguiente...");
      cargarFragmento(fragmentoActual);
    } else {
      e.target.classList.add("error");
      setTimeout(() => e.target.classList.remove("error"), 300);
      contadorIntentos++;
      intentos.textContent = "Intentos: " + contadorIntentos;
    }
  });

  function cargarFragmento(nombreArchivo) {
    let solicitud = new XMLHttpRequest();
    solicitud.open("GET", "datos/" + nombreArchivo, true);

    solicitud.onload = function() {
      if (solicitud.status == 200) {
        let xml = solicitud.responseXML;
        texto.textContent = xml.querySelector("texto").textContent;
        pista.textContent = xml.querySelector("pista").textContent;
        selectorSolucion = xml.querySelector("selector_solucion").textContent;
        letraCorrecta = xml.querySelector("letra_clave").textContent;
        fragmentoActual = xml.querySelector("siguiente_fragmento")
                          ? xml.querySelector("siguiente_fragmento").textContent
                          : "";
      }
    };

    solicitud.send();
  }
};
