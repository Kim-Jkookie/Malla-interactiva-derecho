const semestres = [ /* listado de ramos por semestre (ya incluido en tu HTML actual) */ ];
const prerrequisitos = { /* estructura de requisitos (también ya incluida) */ };

const contenedor = document.getElementById("contenedor-malla");

semestres.forEach((semestre, index) => {
  const semestreDiv = document.createElement("div");
  semestreDiv.className = "semestre";
  semestreDiv.innerHTML = `<h2>${index + 1}º Semestre</h2>`;

  const ramosDiv = document.createElement("div");
  ramosDiv.className = "ramos";

  semestre.forEach(ramo => {
    const ramoDiv = document.createElement("div");
    ramoDiv.className = "ramo";
    ramoDiv.textContent = ramo.nombre;
    ramoDiv.dataset.id = ramo.id;
    ramosDiv.appendChild(ramoDiv);
  });

  semestreDiv.appendChild(ramosDiv);
  contenedor.appendChild(semestreDiv);
});

function actualizarBloqueos() {
  document.querySelectorAll(".ramo").forEach(ramo => {
    const id = ramo.dataset.id;
    const requisitos = prerrequisitos[id] || [];
    const cumplidos = requisitos.every(req => {
      const reqRamo = document.querySelector(`.ramo[data-id="${req}"]`);
      return reqRamo && reqRamo.classList.contains("aprobado");
    });
    if (requisitos.length && !cumplidos) {
      ramo.classList.add("bloqueado");
    } else {
      ramo.classList.remove("bloqueado");
    }
  });
}

document.addEventListener("click", e => {
  if (e.target.classList.contains("ramo") && !e.target.classList.contains("bloqueado")) {
    e.target.classList.toggle("aprobado");
    actualizarBloqueos();
  }
});

actualizarBloqueos();


