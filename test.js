// test.js
import pool from "./db.js";

async function testConnection() {
  try {
    const [rows] = await pool.query("SELECT * FROM estudiantes");
    console.log("Estudiantes en la BD:", rows);
  } catch (err) {
    console.error("Error en la conexión:", err);
  }
}

testConnection();
