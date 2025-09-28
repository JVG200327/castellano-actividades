// db.js
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Juan2025@oracle",  // tu clave real
  database: "estudiantes_db",   // base de datos donde está la tabla
});

export default pool;
