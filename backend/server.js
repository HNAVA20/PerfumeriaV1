require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const nodemailer = require("nodemailer");

const app = express();


app.use(express.json()); // Para leer JSON del frontend
app.use(cors()); // Habilita CORS si el frontend está en otro dominio

// Configuración a conexión a MySQL
const db = mysql.createConnection({
    host: 'srv1009.hstgr.io', // O usa '193.203.166.234'
    user: 'u465901502_root', // Cambia esto por tu usuario
    password: '@DivinaTentacion2025', // La contraseña de la BD
    database: 'u465901502_perfumeria', // Nombre de la BD
    port: process.env.DB_PORT || 3306
});

db.connect(err => {
    if (err) {
        console.error("Error conectando con MySQL:", err);
    } else {
        console.log("Conectado a MySQL en el puerto", process.env.DB_PORT || 3306);
    }
});

// Configuración a nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Correo
        pass: process.env.EMAIL_PASS  // Contraseña o App Password
    }
});

// Ruta para recibir datos del formulario y enviar el correo
app.post("/enviar-correo", (req, res) => {
    const { nombre, email, mensaje } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "tic-300015@utnay.edu.mx", // Cambiar esto al correo donde recibiré los mensajes
        subject: "Nuevo mensaje del formulario de contacto",
        text: `Nombre: ${nombre}\nCorreo: ${email}\nMensaje: ${mensaje}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error enviando el correo:", error);
            res.status(500).json({ success: false, message: "Error enviando el correo." });
        } else {
            console.log("Correo enviado:", info.response);
            res.json({ success: true, message: "Correo enviado correctamente." });
        }
    });
});

// Inicia el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Rutas CRUD para Marcas

// Obtener todas las marcas
app.get("/marcas", (req, res) => {
    db.query("SELECT * FROM marca", (err, results) => {
        if (err) {
            console.error("Error al obtener marcas:", err);
            res.status(500).json({ error: "Error al obtener marcas" });
        } else {
            res.json(results);
        }
    });
});

// Agregar una nueva marca
app.post("/marcas", (req, res) => {
    const { nombre_marca } = req.body;
    if (!nombre_marca) {
        return res.status(400).json({ error: "El nombre de la marca es requerido" });
    }

    db.query("INSERT INTO marca (nombre_marca) VALUES (?)", [nombre_marca], (err, result) => {
        if (err) {
            console.error("Error al insertar marca:", err);
            res.status(500).json({ error: "Error al insertar marca" });
        } else {
            res.json({ id: result.insertId, nombre_marca });
        }
    });
});

// Editar una marca
app.put("/marcas/:id", (req, res) => {
    const { id } = req.params;
    const { nombre_marca } = req.body;

    db.query("UPDATE marca SET nombre_marca = ? WHERE id_marca = ?", [nombre_marca, id], (err) => {
        if (err) {
            console.error("Error al actualizar marca:", err);
            res.status(500).json({ error: "Error al actualizar marca" });
        } else {
            res.json({ message: "Marca actualizada correctamente" });
        }
    });
});

// Eliminar una marca
app.delete("/marcas/:id", (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM marca WHERE id_marca = ?", [id], (err) => {
        if (err) {
            console.error("Error al eliminar marca:", err);
            res.status(500).json({ error: "Error al eliminar marca" });
        } else {
            res.json({ message: "Marca eliminada correctamente" });
        }
    });
});

// Rutas CRUD para Secciones

// Obtener todas las secciones
app.get("/secciones", (req, res) => {
    db.query("SELECT * FROM secciones", (err, results) => {
        if (err) {
            console.error("Error al obtener secciones:", err);
            res.status(500).json({ error: "Error al obtener secciones" });
        } else {
            res.json(results);
        }
    });
});

// Agregar una nueva sección
app.post("/secciones", (req, res) => {
    const { nombre_seccion } = req.body;
    if (!nombre_seccion) {
        return res.status(400).json({ error: "El nombre de la sección es requerido" });
    }

    db.query("INSERT INTO secciones (nombre_seccion) VALUES (?)", [nombre_seccion], (err, result) => {
        if (err) {
            console.error("Error al insertar sección:", err);
            res.status(500).json({ error: "Error al insertar sección" });
        } else {
            console.log("Sección insertada:", result);
            res.json({ id: result.insertId, nombre_seccion });
        }
    });
});

// Editar una sección
app.put("/secciones/:id", (req, res) => {
    const { id } = req.params;
    const { nombre_seccion } = req.body;

    db.query("UPDATE secciones SET nombre_seccion = ? WHERE id_seccion = ?", [nombre_seccion, id], (err) => {
        if (err) {
            console.error("Error al actualizar sección:", err);
            res.status(500).json({ error: "Error al actualizar sección" });
        } else {
            res.json({ message: "Sección actualizada correctamente" });
        }
    });
});

// Eliminar una sección
app.delete("/secciones/:id", (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM secciones WHERE id_seccion = ?", [id], (err) => {
        if (err) {
            console.error("Error al eliminar sección:", err);
            res.status(500).json({ error: "Error al eliminar sección" });
        } else {
            res.json({ message: "Sección eliminada correctamente" });
        }
    });
});

//Rutas CRUD para peoductos

//Obtener todos los usuarios
app.get("/productos", (req, res) => {
    db.query("SELECT * FROM productos", (err, results) => {
        if (err) {
            console.error("Error al obtener productos:", err);
            res.status(500).json({ error: "Error al obtener productos" });
        } else {
            res.json(results);
        }
    });
});
