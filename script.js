const titulo = document.querySelector("#titulo");
const descripcion = document.querySelector("#descripcion");
const fecha = document.querySelector("#fecha");
const prioridad = document.querySelector("#prioridad");
const boton = document.querySelector(".submitBtn");
const deleteBoton = document.querySelector(".deleteBtn");
const form = document.querySelector("form");
const toDoListDiv = document.querySelector(".toDoList");

const modal = document.querySelector(".modal");
const span = document.querySelector(".close");
const btnModal = document.querySelector(".abrirModal");

let tareas = [];

renderToDo = () => {
  toDoListDiv.textContent = "";

  localStorage.setItem("tareas", JSON.stringify(tareas))

  tareas.forEach((element) => {
    const divIndividual = document.createElement("div");
    divIndividual.classList = "divIndividual";

    const h1Titulo = document.createElement("h1");
    h1Titulo.textContent = element.titulo;
    const descripcion = document.createElement("p");
    descripcion.textContent = "Descripcion: " + element.descripcion;
    const fecha = document.createElement("p");
    fecha.textContent = "Fecha: " + element.fecha;
    const prioridad = document.createElement("p");
    prioridad.textContent = "Prioridad: " + element.prioridad;

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar tarea";
    botonEliminar.classList = "deleteBtn";
    const botonDetalles = document.createElement("button");
    botonDetalles.textContent = "Ver detalles";
    botonDetalles.classList = "detallesBtn";
    const botonRealizar = document.createElement("button");
    botonRealizar.textContent = "Tarea realizada";
    botonRealizar.classList = "realizarBtn"
    const botonEditar = document.createElement("button");
    botonEditar.textContent = "Editar tarea";
    botonEditar.classList = "editBtn";

    divIndividual.appendChild(h1Titulo);
    divIndividual.appendChild(botonRealizar);
    divIndividual.appendChild(botonDetalles);
    divIndividual.appendChild(botonEliminar);
    divIndividual.appendChild(botonEditar);

    botonRealizar.onclick = function () { realizarTarea(element.id, divIndividual, botonRealizar) };
    botonDetalles.onclick = function () { verDetalles(element.id, divIndividual, descripcion, fecha, prioridad, botonDetalles, botonRealizar); };
    botonEliminar.onclick = function () { eliminarTarea(element.id); };
    botonEditar.onclick = function () { editarTarea(element.id); };

    toDoListDiv.appendChild(divIndividual);
  });
};

agregarTarea = () => {
  let nuevaTarea = {
    id: new Date().getTime(),
    titulo: titulo.value,
    descripcion: descripcion.value,
    fecha: fecha.value,
    prioridad: prioridad.value,
  };

  tareas.push(nuevaTarea);

  titulo.value = "";
  descripcion.value = "";
  fecha.value = "";

  renderToDo();
};

eliminarTarea = (id) => {
  let i = 0;
  for (const tarea of tareas) {
    if (tarea.id === id) {
      tareas.splice(i, 1);
    } else {
      i++;
    }
  }
  renderToDo();
};

verDetalles = (
  id,
  div,
  descripcion,
  fecha,
  prioridad,
  botonDetalles,
  botonRealizar
) => {
  let i = 0;
  for (const tarea of tareas) {
    if (tarea.id === id && botonDetalles.textContent === "Ver detalles") {
      div.insertBefore(descripcion, botonRealizar);
      div.insertBefore(fecha, botonRealizar);
      div.insertBefore(prioridad, botonRealizar);

      botonDetalles.textContent = "Dejar de ver detalles";
    } else if (
      tarea.id === id &&
      botonDetalles.textContent === "Dejar de ver detalles"
    ) {
      div.removeChild(descripcion);
      div.removeChild(fecha);
      div.removeChild(prioridad);

      botonDetalles.textContent = "Ver detalles";
    } else {
      i++;
    }
  }
};

realizarTarea = (id, div, boton) => {
  for (const tarea of tareas) {
    if (tarea.id === id && boton.textContent === "Tarea realizada") {
      div.style.background = "#4caf50";
      boton.textContent = "Tarea no realizada";
      boton.classList = "tareaNoRealizada"
    } else if (tarea.id === id && boton.textContent === "Tarea no realizada") {
      div.style.background = "#999999";
      boton.textContent = "Tarea realizada";
      boton.classList = "realizarBtn"
    }
  }
};

editarTarea = (id) => {
  const btnModificar = document.createElement("button");
  btnModificar.type = "button";
  btnModificar.textContent = "Modificar tarea";
  btnModificar.classList = "modificarBtn"

  modal.style.display = "block";

  form.replaceChild(btnModificar, boton);

  let i = 0;
  let j = 0;

  for (const tarea of tareas) {
    if (tarea.id === id) {
      titulo.value = tareas[i].titulo;
      descripcion.value = tareas[i].descripcion;
      fecha.value = tareas[i].fecha;
      prioridad.value = tareas[i].prioridad;

      j = i;

      btnModificar.addEventListener("click", () => {
        console.log(j)
        tareas[j].titulo = titulo.value;
        tareas[j].descripcion = descripcion.value;
        tareas[j].fecha = fecha.value;
        tareas[j].prioridad = prioridad.value;
        modal.style.display = "none";

        renderToDo();

        form.replaceChild(boton, btnModificar);
        titulo.value = "";
        descripcion.value = "";
        fecha.value = "";
        prioridad.value = "";
      });
    } else {
      i++;
    }
  }
};

boton.addEventListener("click", () => {
  agregarTarea();
  modal.style.display = "none";
});

btnModal.addEventListener("click", () => {
  modal.style.display = "block";
});
