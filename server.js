import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import pool from "./db.js";
import estudiantesRoutes from "./routes/estudiantesRoutes.js";

const app = express();
const PORT = 3000;

// Necesario para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // servir login.html, index.html, css, js

// ================== Rutas frontend ==================

// Ruta principal -> login
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

// Ruta para actividades -> index
app.get("/actividades", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ================== Rutas de base de datos ==================

// Ruta de prueba DB
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    res.json(rows[0]);
  } catch (err) {
    console.error("Error en la consulta:", err);
    res.status(500).json({ error: "Error en la consulta" });
  }
});

// Obtener cursos
app.get("/cursos", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT DISTINCT curso FROM estudiantes");
    res.json(rows);
  } catch (err) {
    console.error("Error al obtener cursos:", err);
    res.status(500).json({ error: "Error al obtener cursos" });
  }
});

// Obtener estudiantes por curso
app.get("/estudiantes/:curso", async (req, res) => {
  const { curso } = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT id, apellido, nombre FROM estudiantes WHERE curso = ?",
      [curso]
    );
    res.json(rows);
  } catch (err) {
    console.error("Error al obtener estudiantes:", err);
    res.status(500).json({ error: "Error al obtener estudiantes" });
  }
});

// Verificar login con MySQL
app.post("/verificar", async (req, res) => {
  const { curso, estudiante, tarjeta } = req.body;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM estudiantes WHERE id = ? AND curso = ? AND tarjeta_identidad = ?",
      [estudiante, curso, tarjeta]
    );

    if (rows.length > 0) {
      res.json({ success: true, estudiante: rows[0] });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ error: "Error en login" });
  }
});

// ================== Rutas API extra (tareas y estudiantes) ==================
app.use("/api", estudiantesRoutes);

// ================== Iniciar servidor ==================
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
