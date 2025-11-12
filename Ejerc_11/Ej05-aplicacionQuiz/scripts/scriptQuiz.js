const contenedor = document.getElementById("quiz-container");
const btnIniciar = document.getElementById("btn-iniciar");
const pantallaInicial = document.getElementById("pantalla-inicial");
const quizArea = document.getElementById("quiz-area");
const textoPregunta = document.getElementById("texto-pregunta");
const formOpciones = document.getElementById("form-opciones");
const btnSiguiente = document.getElementById("btn-siguiente");
const btnAnterior = document.getElementById("btn-anterior");
const mensaje = document.getElementById("mensaje");
const contador = document.getElementById("contador");
const resumen = document.getElementById("results-summary");

let preguntas = [];
let indiceActual = 0;
let puntuacion = 0;
let respuestasUsuario = [];

function mostrarMensaje(texto, tipo) {
  mensaje.innerHTML = `<div class="alert alert-${tipo}">${texto}</div>`;
  setTimeout(() => { if (mensaje) mensaje.innerHTML = ""; }, 2500);
}

function renderizarPregunta() {
  const p = preguntas[indiceActual];
  contador.textContent = `Pregunta ${indiceActual + 1} de ${preguntas.length}`;
  textoPregunta.textContent = p.text;

  formOpciones.innerHTML = "";
  p.options.forEach(function(op) {
    const idInput = `opt-${p.questionId}-${op.id}`;
    const div = document.createElement("div");
    div.className = "form-check";
    div.innerHTML = `
      <input class="form-check-input" type="radio" name="opcion" id="${idInput}" value="${op.id}">
      <label class="form-check-label" for="${idInput}">${op.id}. ${op.text}</label>
    `;
    formOpciones.appendChild(div);
  });

  const respuestaGuardada = respuestasUsuario[indiceActual];
  if (respuestaGuardada && respuestaGuardada.seleccion) {
    const inputSel = document.querySelector(`input[value="${respuestaGuardada.seleccion}"]`);
    if (inputSel) inputSel.checked = true;
  }

  btnAnterior.disabled = indiceActual == 0;
  btnSiguiente.textContent = (indiceActual == preguntas.length - 1) ? "Finalizar" : "Siguiente";
}

function registrarYAvanzar() {
  const seleccion = document.querySelector('input[name="opcion"]:checked');
  if (!seleccion) {
    mostrarMensaje("Selecciona una opción antes de continuar.", "warning");
    return;
  }

  const valor = seleccion.value;
  const actual = preguntas[indiceActual];
  const correcto = actual.correctAnswer === valor;

  respuestasUsuario[indiceActual] = {
    questionId: actual.questionId,
    seleccion: valor,
    correcto: correcto
  };

  if (correcto) puntuacion++;

  if (indiceActual == preguntas.length - 1) {
    mostrarResultados();
  } else {
    indiceActual++;
    renderizarPregunta();
  }
}

function retroceder() {
  if (indiceActual == 0) return;
  indiceActual--;
  renderizarPregunta();
}

function mostrarResultados() {
  quizArea.classList.add("d-none");
  resumen.classList.remove("d-none");
  resumen.innerHTML = `
    <h4>Resultados</h4>
    <p>Puntuación: <strong>${puntuacion} / ${preguntas.length}</strong></p>
    <hr>
  `;

  const listaIncorrectas = preguntas.map((p, i) => {
    const resp = respuestasUsuario[i];
    if (!resp || !resp.correcto) {
      return { pregunta: p, indice: i, respuestaUsuario: resp ? resp.seleccion : null };
    }
    return null;
  }).filter(x => x);

  if (listaIncorrectas.length == 0) {
    resumen.innerHTML += `<div class="alert alert-success">¡Perfecto! Todas las respuestas son correctas.</div>`;
  } else {
    resumen.innerHTML += `<h6>Explicaciones para respuestas incorrectas:</h6>`;
    listaIncorrectas.forEach(function(item) {
      const p = item.pregunta;
      const respUsuario = item.respuestaUsuario || "No respondida";
      const bloque = document.createElement("div");
      bloque.className = "mb-3";
      bloque.innerHTML = `
        <p><strong>${p.text}</strong></p>
        <p>Tu respuesta: <em>${respUsuario}</em></p>
        <p>Respuesta correcta: <em>${p.correctAnswer}</em></p>
        <p class="text-muted">Explicación: ${p.explanation}</p>
      `;
      resumen.appendChild(bloque);
    });
  }

  resumen.innerHTML += `<div class="mt-3"><button id="btn-reiniciar" class="btn btn-outline-primary">Reiniciar Quiz</button></div>`;

  document.getElementById("btn-reiniciar").addEventListener("click", () => {
    reiniciarQuiz();
  });
}

function reiniciarQuiz() {
  indiceActual = 0;
  puntuacion = 0;
  respuestasUsuario = [];
  resumen.classList.add("d-none");
  pantallaInicial.classList.remove("d-none");
  quizArea.classList.add("d-none");
  mostrarMensaje("Quiz reiniciado.", "info");
}

function cargarPreguntas() {
  mensaje.innerHTML = "";
  fetch("../datos/questions.json")
    .then(res => {
      if (!res.ok) throw new Error("Error al cargar preguntas");
      return res.json();
    })
    .then(data => {
      preguntas = data;
      if (!Array.isArray(preguntas) || preguntas.length == 0) {
        mostrarMensaje("No hay preguntas disponibles.", "warning");
        return;
      }
      pantallaInicial.classList.add("d-none");
      quizArea.classList.remove("d-none");
      indiceActual = 0;
      puntuacion = 0;
      respuestasUsuario = [];
      renderizarPregunta();
    })
    .catch(err => {
      mostrarMensaje("Error al cargar las preguntas. Revisa questions.json.", "danger");
      console.error(err);
    });
}

btnIniciar.addEventListener("click", function() {
  cargarPreguntas();
});

btnSiguiente.addEventListener("click", function() {
  registrarYAvanzar();
});

btnAnterior.addEventListener("click", function() {
  retroceder();
});
