const cursoSelect = document.getElementById("cursoSelect");
const estudianteSelect = document.getElementById("estudianteSelect");
const loginForm = document.getElementById("loginForm");
const mensaje = document.getElementById("mensaje");

// ✅ Cargar cursos manualmente
["9-3", "9-6"].forEach(curso => {
  const opt = document.createElement("option");
  opt.value = curso;
  opt.textContent = curso;
  cursoSelect.appendChild(opt);
});

// ✅ Cargar estudiantes según curso
cursoSelect.addEventListener("change", () => {
  estudianteSelect.innerHTML = '<option value="">Seleccionar estudiante</option>';

  if (cursoSelect.value) {
    fetch(`http://localhost:3000/estudiantes/${cursoSelect.value}`) // <--- importante
      .then(res => res.json())
      .then(estudiantes => {
        estudiantes.forEach(est => {
          const opt = document.createElement("option");
          opt.value = est.id;
          opt.textContent = `${est.apellido} ${est.nombre}`;
          estudianteSelect.appendChild(opt);
        });
      })
      .catch(err => console.error("Error cargando estudiantes:", err));
  }
});


// ✅ Validar login con /verificar
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const curso = cursoSelect.value;
  const estudiante = estudianteSelect.value;
  const tarjeta = document.getElementById("tarjetaInput").value;

  try {
    const response = await fetch("http://localhost:3000/verificar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ curso, estudiante, tarjeta }),
    });

    const data = await response.json();

    if (data.success) {
      mensaje.style.color = "green";
      mensaje.textContent = "✅ Acceso permitido";
      window.location.href = "index.html";// ✅ redirige al index.html
    } else {
      mensaje.style.color = "red";
      mensaje.textContent = "❌ Datos incorrectos.";
    }
  } catch (error) {
    console.error("Error:", error);
    mensaje.style.color = "red";
    mensaje.textContent = "⚠️ Error al conectar con el servidor.";
  }
});
