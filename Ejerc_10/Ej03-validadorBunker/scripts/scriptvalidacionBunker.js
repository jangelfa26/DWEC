window.onload = function() {

  let campoCodigo = document.getElementById("codigoAgente");
  let campoClave = document.getElementById("claveAcceso");
  let mensajeCodigo = document.getElementById("mensajeCodigo");
  let mensajeClave = document.getElementById("mensajeClave");
  let botonAcceder = document.getElementById("botonAcceder");

  let agenteValido = false;
  let claveValida = false;
  let claveCorrecta = "";

  campoCodigo.addEventListener("blur", function() {
    let codigoIntroducido = campoCodigo.value.trim();

    if (codigoIntroducido == "") {
      mensajeCodigo.textContent = "Introduce un código.";
      return;
    }

    let solicitud = new XMLHttpRequest();
    solicitud.open("GET", "datos/personal.xml", true);

    solicitud.onload = function() {
      if (solicitud.status == 200) {
        let xml = solicitud.responseXML;
        let agente = xml.querySelector(`agente[codigo="${codigoIntroducido}"]`);

        if (agente) {
          let nombre = agente.querySelector("nombre").textContent;
          claveCorrecta = agente.querySelector("clave").textContent;
          mensajeCodigo.textContent = `Bienvenido, ${nombre}`;
          agenteValido = true;
          campoClave.disabled = false;
        } else {
          mensajeCodigo.textContent = "Código de agente no reconocido.";
          agenteValido = false;
          campoClave.disabled = true;
          campoClave.value = "";
          mensajeClave.textContent = "";
          claveValida = false;
        }
        actualizarEstadoBoton();
      }
    };

    solicitud.send();
  });

  campoClave.addEventListener("blur", function() {
    let claveIntroducida = campoClave.value.trim();

    if (!agenteValido) {
      mensajeClave.textContent = "Primero valida el código de agente.";
      return;
    }

    if (claveIntroducida == claveCorrecta) {
      mensajeClave.textContent = "Clave correcta.";
      claveValida = true;
    } else {
      mensajeClave.textContent = "Clave incorrecta.";
      claveValida = false;
    }
    actualizarEstadoBoton();
  });

  campoCodigo.addEventListener("input", function() {
    agenteValido = false;
    claveValida = false;
    campoClave.value = "";
    campoClave.disabled = true;
    mensajeClave.textContent = "";
    mensajeCodigo.textContent = "";
    actualizarEstadoBoton();
  });

  function actualizarEstadoBoton() {
    botonAcceder.disabled = !(agenteValido && claveValida);
  }

  
};

botonAcceder.addEventListener("click", function() {
  alert("Acceso concedido. Bienvenido al búnker.");
});