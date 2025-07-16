document.addEventListener("DOMContentLoaded", () => {
  actualizarBloqueados();
});

function toggleRamo(element) {
  if (element.classList.contains("bloqueado")) return;

  element.classList.toggle("aprobado");
  actualizarBloqueados();
}

function actualizarBloqueados() {
  const ramos = document.querySelectorAll(".ramo");

  ramos.forEach(ramo => {
    const prereq = ramo.dataset.prereq;

    if (prereq) {
      const prereqElement = document.querySelector(`.ramo[data-id="${prereq}"]`);
      const aprobado = prereqElement && prereqElement.classList.contains("aprobado");
      ramo.classList.toggle("bloqueado", !aprobado);
    }
  });
}
function actualizarBloqueados() {
  const ramos = document.querySelectorAll(".ramo");

  ramos.forEach(ramo => {
    const prereqs = ramo.dataset.prereq?.split(" ") || [];
    const bloqueado = prereqs.some(pr => {
      const el = document.querySelector(`.ramo[data-id="${pr}"]`);
      return !el || !el.classList.contains("aprobado");
    });
    ramo.classList.toggle("bloqueado", bloqueado);
  });
}

