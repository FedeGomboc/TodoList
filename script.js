//PENDIENTE:
//-Editar tarea

const titulo = document.querySelector("#titulo");
const descripcion = document.querySelector("#descripcion");
const fecha = document.querySelector("#fecha");
const prioridad = document.querySelector("#prioridad");
const boton = document.querySelector(".submitBtn");
const deleteBoton = document.querySelector(".deleteBtn");

let tareas = [];

crearToDo = () => {
  const toDoListDiv = document.querySelector(".toDoList");
  toDoListDiv.textContent = "";

  tareas.forEach((element) => {
    const divIndividual = document.createElement("div");
    const h1Titulo = document.createElement("h1");
    const descripcion = document.createElement("p");
    const fecha = document.createElement("p");
    const prioridad = document.createElement("p");
    const boton = document.createElement("button");
    const botonDetalles = document.createElement("button");
    const botonRealizar = document.createElement("button")

    botonRealizar.textContent = "Tarea realizada"
    h1Titulo.textContent = element.titulo;
    descripcion.textContent = "Descripcion: " + element.descripcion;
    fecha.textContent = "Fecha: " + element.fecha;
    prioridad.textContent = "Prioridad: " + element.prioridad;

    boton.textContent = "Eliminar tarea";
    botonDetalles.textContent = "Ver detalles";
    botonDetalles.classList = "detallesBtn";
    boton.classList = "deleteBtn";
    divIndividual.classList = "divIndividual";
    divIndividual.appendChild(h1Titulo);

    divIndividual.appendChild(botonRealizar)

    botonRealizar.onclick = function () { realizarTarea(element.id, divIndividual, botonRealizar) }

    botonDetalles.onclick = function () {
      verDetalles(
        element.id,
        divIndividual,
        descripcion,
        fecha,
        prioridad,
        botonDetalles,
        botonRealizar
      );
    };
    
    divIndividual.appendChild(botonDetalles);

    boton.onclick = function () {
      eliminarTarea(element.id);
    };

    divIndividual.appendChild(boton);

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

  crearToDo();
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
  crearToDo();
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
    } else if (tarea.id === id && botonDetalles.textContent === "Dejar de ver detalles") {
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
  let i = 0;
  for (const tarea of tareas) {
    if (tarea.id === id && boton.textContent === "Tarea realizada") {
      div.style.background = "#4caf50"
      boton.textContent = "Tarea no realizada"
    } else if (tarea.id === id && boton.textContent === "Tarea no realizada") {
      div.style.background = "#999999"
      boton.textContent = "Tarea realizada"
    } else {
      i++
    }
  }
}

boton.addEventListener("click", () => {
  agregarTarea();
});
