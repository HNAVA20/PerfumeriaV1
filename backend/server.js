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
    host: "localhost",
    user: "root",
    password: "",
    database: "perfumeria",
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
        to: "destinatario@example.com", // Cambiar esto al correo donde recibiré los mensajes
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

// Inicia el servidor en el puerto 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
