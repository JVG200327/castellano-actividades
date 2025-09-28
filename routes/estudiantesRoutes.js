// routes/estudiantesRoutes.js
import express from "express";
import { getEstudiantes, entregarTarea, getTareas } from "../services/estudiantesService.js";

const router = express.Router();

// GET: lista de estudiantes
router.get("/estudiantes", async (req, res) => {
  try {
    const estudiantes = await getEstudiantes();
    res.json(estudiantes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: entregar tarea
router.post("/tareas", async (req, res) => {
  try {
    const { id_estudiante, titulo, descripcion, archivo_url } = req.body;
    const tareaId = await entregarTarea(id_estudiante, titulo, descripcion, archivo_url);
    res.json({ message: "Tarea entregada", tareaId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: ver tareas entregadas
router.get("/tareas", async (req, res) => {
  try {
    const tareas = await getTareas();
    res.json(tareas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

// 📌 Ver estudiantes
router.get("/estudiantes", async (req, res) => {
  try {
    const estudiantes = await getEstudiantes();
    res.json(estudiantes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Docente crea tarea
router.post("/tareas_asignadas", async (req, res) => {
  try {
    const { titulo, descripcion, tipo, fecha_entrega } = req.body;
    const tareaId = await crearTarea(titulo, descripcion, tipo, fecha_entrega);
    res.json({ message: "✅ Tarea creada", tareaId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Estudiante consulta tareas asignadas
router.get("/tareas_asignadas", async (req, res) => {
  try {
    const tareas = await getTareasAsignadas();
    res.json(tareas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Estudiante entrega tarea
router.post("/tareas_entregadas", async (req, res) => {
  try {
    const { id_estudiante, titulo, descripcion, archivo_url } = req.body;
    const tareaId = await entregarTarea(id_estudiante, titulo, descripcion, archivo_url);
    res.json({ message: "📤 Tarea entregada", tareaId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Docente consulta entregas
router.get("/tareas_entregadas", async (req, res) => {
  try {
    const tareas = await getTareas();
    res.json(tareas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});