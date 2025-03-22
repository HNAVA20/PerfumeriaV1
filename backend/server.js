require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // Agrega tu contraseña si tienes una
    database: "tu_base_de_datos",
    port: process.env.DB_PORT || 3306 // Usa el puerto definido en .env o el 3306 por defecto
});

db.connect(err => {
    if (err) {
        console.error("Error conectando con MySQL:", err);
    } else {
        console.log("Conectado a MySQL en el puerto", process.env.DB_PORT || 3306);
    }
});

module.exports = db;
