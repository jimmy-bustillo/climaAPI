// Selectores
const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e) {
  e.preventDefault();

  // Validar el formulario
  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;

  if (ciudad === "" || pais === "") {
    mostrarAlerta("Ambos campos son obligatorios");
    return;
  }

  // Consultar la API
  consultarAPI(ciudad, pais);
}

function mostrarAlerta(mensaje) {
  const alerta = document.querySelector(".bg-red-100");

  if (!alerta) {
    const alerta = document.createElement("div");

    alerta.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-md",
      "mx-auto",
      "mt-6",
      "text-center"
    );

    alerta.innerHTML = `
      <strong class="font-bold">Error!</strong>
      <span class="blog">${mensaje}</span>
    `;

    container.appendChild(alerta);

    // Se elimina la alerta despues de 5 segundos

    setTimeout(() => {
      alerta.remove();
    }, 5000);
  }
}

function consultarAPI(ciudad, pais) {
  const appId = "d8893ddb83782982821d26616dc32611";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      console.log(datos);
      if (datos.cod === "404") {
        mostrarAlerta("Ciudad no encontrada");
      }
    });
}
