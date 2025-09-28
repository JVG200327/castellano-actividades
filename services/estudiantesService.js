// services/estudiantesService.js
import pool from "../db.js";

// Obtener todos los estudiantes
export async function getEstudiantes() {
  const [rows] = await pool.query("SELECT * FROM estudiantes");
  return rows;
}

// Insertar una tarea entregada
export async function entregarTarea(id_estudiante, titulo, descripcion, archivo_url) {
  const [result] = await pool.query(
    "INSERT INTO tareas_entregadas (id_estudiante, titulo, descripcion, archivo_url) VALUES (?, ?, ?, ?)",
    [id_estudiante, titulo, descripcion, archivo_url]
  );
  return result.insertId;
}

// Obtener todas las tareas entregadas (con nombre del estudiante)
export async function getTareas() {
  const [rows] = await pool.query(`
    SELECT t.id, e.nombre, e.apellido, t.titulo, t.descripcion, t.fecha_entrega, t.archivo_url
    FROM tareas_entregadas t
    JOIN estudiantes e ON t.id_estudiante = e.id
  `);
  return rows;
}

// Crear nueva tarea (docente)
export async function crearTarea(titulo, descripcion, tipo, fecha_entrega) {
  const [result] = await pool.query(
    "INSERT INTO tareas (titulo, descripcion, tipo, fecha_entrega) VALUES (?, ?, ?, ?)",
    [titulo, descripcion, tipo, fecha_entrega]
  );
  return result.insertId;
}

// Obtener todas las tareas (asignadas)
export async function getTareasAsignadas() {
  const [rows] = await pool.query("SELECT * FROM tareas ORDER BY fecha_creacion DESC");
  return rows;
}
