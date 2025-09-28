// Lista de tareas de ejemplo
const tareas = [
  { id: 1, titulo: "Matemáticas - Resolver ejercicios", fechaEntrega: "2025-08-30", enviada: false, fechaEnvio: null },
  { id: 2, titulo: "Historia - Leer capítulo 3", fechaEntrega: "2025-09-05", enviada: true, fechaEnvio: "2025-08-24" },
  { id: 3, titulo: "Ciencias - Preparar exposición", fechaEntrega: "2025-09-10", enviada: false, fechaEnvio: null }
];

const lista = document.getElementById("lista-tareas");
const detalle = document.getElementById("detalle-tarea");
const tituloDetalle = document.getElementById("tituloDetalle");
const fecha = document.getElementById("fecha");
const estado = document.getElementById("estado");
const envio = document.getElementById("envio");

let fechaEntregaGlobal = ""; // la fecha que pone el maestro

// Mostrar la lista de tareas inicial
function cargarTareas() {
  lista.innerHTML = "";
  tareas.forEach(t => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="info-tarea">
        <strong>${t.titulo}</strong>
        <p><em>Entrega:</em> ${t.fechaEntrega}</p>
      </div>
      <button onclick="verDetalle(${t.id})">Entrar</button>
    `;
    lista.appendChild(li);
  });
}

// Ver detalle de una tarea
function verDetalle(id) {
  const tarea = tareas.find(t => t.id === id);
  tituloDetalle.textContent = tarea.titulo;
  fecha.textContent = tarea.fechaEntrega;
  estado.textContent = tarea.enviada ? "✅ Enviada" : "❌ No enviada";
  envio.textContent = tarea.fechaEnvio ? tarea.fechaEnvio : "Pendiente";
  detalle.classList.remove("oculto");
}

// Cerrar detalle
function cerrarDetalle() {
  detalle.classList.add("oculto");
}

// Agregar tarea nueva
function agregarTarea() {
  const titulo = document.getElementById("tituloInput").value;
  const descripcion = document.getElementById("descripcionInput").value;
  const tipo = document.getElementById("tipoTarea").value;
  const archivo = document.getElementById("archivoInput").files[0];

  if (!titulo || !descripcion) {
    alert("Por favor completa el título y la descripción.");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <div class="info-tarea">
      <strong>${titulo}</strong>
      <p>${descripcion}</p>
      <em>Tipo:</em> ${tipo} 
      ${tipo === "archivo" && archivo ? `📎 ${archivo.name}` : ""}
    </div>
    <button onclick="mostrarDetalle('${titulo}', '${descripcion}', '${tipo}')">Entrar</button>
  `;

  lista.appendChild(li);

  // Limpiar campos
  document.getElementById("tituloInput").value = "";
  document.getElementById("descripcionInput").value = "";
  document.getElementById("tipoTarea").value = "archivo";
  document.getElementById("archivoInput").value = "";
  document.getElementById("archivoInput").style.display = "none";
}

// Mostrar detalle de nueva tarea
function mostrarDetalle(titulo, descripcion, tipo) {
  detalle.classList.remove("oculto");
  tituloDetalle.textContent = titulo + " - " + descripcion;
  fecha.textContent = fechaEntregaGlobal || "No definida";
  estado.textContent = "❌ No enviada";
  envio.textContent = "Pendiente";
}

// Actualizar fecha global
function actualizarFecha() {
  const fechaInput = document.getElementById("fechaInput").value;
  const fechaTexto = document.getElementById("fechaTexto");
  if (fechaInput) {
    fechaEntregaGlobal = fechaInput;
    fechaTexto.textContent = "Entrega: " + fechaInput;
  } else {
    fechaEntregaGlobal = "";
    fechaTexto.textContent = "";
  }
}

// Mostrar input archivo solo si se elige archivo
const tipoTareaSelect = document.getElementById("tipoTarea");
const archivoInput = document.getElementById("archivoInput");
tipoTareaSelect.addEventListener("change", function() {
  archivoInput.style.display = this.value === "archivo" ? "block" : "none";
});

// Inicializar
cargarTareas();
