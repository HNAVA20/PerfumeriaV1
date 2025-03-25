require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");

const app = express();

// Middleware
app.use(express.json()); // Para leer JSON del frontend
app.use(cors()); // Habilita CORS si el frontend está en otro dominio
app.use("/uploads", express.static("uploads")); // Para servir las imágenes desde la carpeta 'uploads'

// Configuración a conexión a MySQL
const db = mysql.createPool({
    host: 'srv1009.hstgr.io',
    user: 'u465901502_root',
    password: '@DivinaTentacion2025',
    database: 'u465901502_perfumeria',
    port: process.env.DB_PORT || 3306,
    connectionLimit: 10 // número máximo de conexiones simultáneas
});

// No necesitas db.connect(), el pool gestiona esto automáticamente.

// Verificar la conexión a la base de datos
db.query("SELECT 1", (err) => {
    if (err) {
        console.error("Error conectando con MySQL:", err);
    } else {
        console.log("Conectado correctamente al pool de MySQL");
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

// Configuración de multer para manejo de imágenes
const upload = multer({
    dest: "uploads/", // Carpeta donde se guardarán las imágenes
    limits: { fileSize: 10 * 1024 * 1024 }, // Limitar el tamaño de las imágenes (10MB)
}).single("imagen_producto"); // 'imagen_producto' es el campo del formulario para la imagen

// Rutas CRUD para Marcas

// Obtener todas las marcas
app.get("/marcas", (req, res) => {
    const query = "SELECT id_marca, nombre_marca FROM marca";
    
    db.query(query, (err, results) => {
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
    const query = "SELECT id_seccion, nombre_seccion FROM secciones";
    
    db.query(query, (err, results) => {
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

//Rutas CRUD para productos

// Obtener todos los productos
app.get("/productos", (req, res) => {
    const query = `
        SELECT p.id_producto, p.nombre_producto, p.descripcion, p.aroma, p.precio, p.cantidad, m.nombre_marca AS marca, s.nombre_seccion AS seccion, p.imagen FROM productos p LEFT JOIN marca m ON p.id_mar = m.id_marca LEFT JOIN secciones s ON p.id_seccion = s.id_seccion LIMIT 0, 25`;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error al obtener productos:", err);
            res.status(500).json({ error: err.message });  // devuelve el mensaje exacto del error
        } else {
            res.json(results);
        }
    });
});

// Agregar un nuevo producto
app.post("/productos", (req, res) => {
    const { nombre_producto, descripcion, aroma, precio, cantidad, id_mar, id_seccion, imagen } = req.body;

    if (!nombre_producto || !precio || !id_mar || !id_seccion) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const query = `
        INSERT INTO productos (nombre_producto, descripcion, aroma, precio, cantidad, id_mar, id_seccion, imagen)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [nombre_producto, descripcion, aroma, precio, cantidad, id_mar, id_seccion, imagen], (err, result) => {
        if (err) {
            console.error("Error al agregar producto:", err);
            res.status(500).json({ error: "Error al agregar producto" });
        } else {
            res.json({ message: "Producto agregado", id: result.insertId });
        }
    });
});

// Editar un producto
app.put("/productos/:id", (req, res) => {
    const { id } = req.params;
    const { nombre_producto, descripcion, aroma, precio, cantidad, id_mar, id_seccion, imagen } = req.body;

    const query = `
        UPDATE productos 
        SET nombre_producto = ?, descripcion = ?, aroma = ?, precio = ?, 
            cantidad = ?, id_mar = ?, id_seccion = ?, imagen = ?
        WHERE id_producto = ?
    `;

    db.query(query, [nombre_producto, descripcion, aroma, precio, cantidad, id_mar, id_seccion, imagen, id], (err) => {
        if (err) {
            console.error("Error al actualizar producto:", err);
            res.status(500).json({ error: "Error al actualizar producto" });
        } else {
            res.json({ message: "Producto actualizado correctamente" });
        }
    });
});

// Eliminar un producto
app.delete("/productos/:id", (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM productos WHERE id_producto = ?", [id], (err) => {
        if (err) {
            console.error("Error al eliminar producto:", err);
            res.status(500).json({ error: "Error al eliminar producto" });
        } else {
            res.json({ message: "Producto eliminado correctamente" });
        }
    });
});

//Rutas CRUD para usuarios
// Obtener todos los usuarios
    app.get("/usuarios", (req, res) => {
        const query = `
        SELECT 
            u.id,
            u.nombres,
            u.primer_apellido,
            u.segundo_apellido,
            u.usuario,
            u.email,
            u.telefono,
            r.nombre_rol
        FROM usuarios u
        LEFT JOIN roles r ON u.id_rol = r.id_rol
        `;
    
        db.query(query, (err, results) => {
        if (err) {
            console.error("Error al obtener usuarios:", err);
            return res.status(500).json({ error: "Error al obtener usuarios" });
        }
    
        // Omitimos desencriptar aquí por simplicidad visual (se podría agregar si quieres mostrar el teléfono real)
        res.json(results);
        });
    });
  

  
  // Agregar usuario
  const CryptoJS = require("crypto-js");
  const SECRET_KEY = "MiClaveSecreta123";

  
  app.post("/usuarios", (req, res) => {
    const {
      nombres,
      primer_apellido,
      segundo_apellido,
      usuario,
      email,
      telefono,
      pass,
      id_rol
    } = req.body;
  
    console.log("📥 Datos recibidos:", req.body);
  
    if (!nombres || !primer_apellido || !usuario || !email || !telefono || !pass || !id_rol) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }
  
    // Validar teléfono
    if (telefono.length !== 10 || !/^\d{10}$/.test(telefono)) {
      return res.status(400).json({ error: "El teléfono debe tener 10 dígitos numéricos" });
    }
  
    try {
      const passEncriptada = CryptoJS.AES.encrypt(pass, SECRET_KEY).toString();
  
      const query = `
        INSERT INTO usuarios (
          nombres, primer_apellido, segundo_apellido, usuario, email, telefono, pass, id_rol
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
  
      db.query(
        query,
        [nombres, primer_apellido, segundo_apellido, usuario, email, telefono, passEncriptada, id_rol],
        (err, result) => {
          if (err) {
            console.error("❌ Error al insertar usuario:", err);
            return res.status(500).json({ error: err.message });
          }
          console.log("✅ Usuario insertado:", result.insertId);
          res.json({ id: result.insertId });
        }
      );
    } catch (error) {
      console.error("❌ Error general:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  });
  
  
  // Editar usuario
  app.put("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const { nombres, primer_apellido, segundo_apellido, usuario, email, telefono, pass, id_rol } = req.body;
    const query = `UPDATE usuarios SET nombres=?, primer_apellido=?, segundo_apellido=?, usuario=?, email=?, telefono=?, pass=?, id_rol=? WHERE id=?`;
    db.query(query, [nombres, primer_apellido, segundo_apellido, usuario, email, telefono, pass, id_rol, id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Usuario actualizado" });
    });
  });
  
  // Eliminar usuario
  app.delete("/usuarios/:id", (req, res) => {
    db.query("DELETE FROM usuarios WHERE id=?", [req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Usuario eliminado" });
    });
  });

    //Rutas CRUD para roles
    // Obtener todos los roles
    app.get("/roles", (req, res) => {
        const query = "SELECT * FROM roles";
        db.query(query, (err, results) => {
            if (err) {
                console.error("Error al obtener roles:", err);
                res.status(500).json({ error: "Error al obtener roles" });
            } else {
                res.json(results);
            }
        });
    });

    // Agregar un nuevo rol
    app.post("/roles", (req, res) => {
        const { nombre_rol } = req.body;
        if (!nombre_rol) {
            return res.status(400).json({ error: "El nombre del rol es requerido" });
        }

        const query = "INSERT INTO roles (nombre_rol) VALUES (?)";
        db.query(query, [nombre_rol], (err, result) => {
            if (err) {
                console.error("Error al insertar rol:", err);
                res.status(500).json({ error: "Error al insertar rol" });
            } else {
                res.json({ id_rol: result.insertId, nombre_rol });
            }
        });
    });

    // Editar un rol
    app.put("/roles/:id", (req, res) => {
        const { id } = req.params;
        const { nombre_rol } = req.body;
        const query = "UPDATE roles SET nombre_rol = ? WHERE id_rol = ?";

        db.query(query, [nombre_rol, id], (err) => {
            if (err) {
                console.error("Error al actualizar rol:", err);
                res.status(500).json({ error: "Error al actualizar rol" });
            } else {
                res.json({ message: "Rol actualizado correctamente" });
            }
        });
    });

    // Eliminar un rol
    app.delete("/roles/:id", (req, res) => {
        const { id } = req.params;
        const query = "DELETE FROM roles WHERE id_rol = ?";

        db.query(query, [id], (err) => {
            if (err) {
                console.error("Error al eliminar rol:", err);
                res.status(500).json({ error: "Error al eliminar rol" });
            } else {
                res.json({ message: "Rol eliminado correctamente" });
            }
        });
    });

        //Login
        app.post("/login", (req, res) => {
            const { usuario, pass } = req.body;
          
            if (!usuario || !pass) {
              return res.status(400).json({ error: "Usuario y contraseña son requeridos" });
            }
          
            const query = `
              SELECT u.id, u.usuario, u.pass, u.nombres, u.email, u.id_rol, r.nombre_rol
              FROM usuarios u
              LEFT JOIN roles r ON u.id_rol = r.id_rol
              WHERE u.usuario = ?
            `;
          
            db.query(query, [usuario], (err, results) => {
              if (err) {
                console.error("❌ Error al buscar usuario:", err);
                return res.status(500).json({ error: "Error interno del servidor" });
              }
          
              if (results.length === 0) {
                return res.status(401).json({ error: "Usuario no encontrado" });
              }
          
              const user = results[0];
          
              try {
                const passDesencriptada = CryptoJS.AES.decrypt(user.pass, SECRET_KEY).toString(CryptoJS.enc.Utf8);

                console.log("🔐 Contraseña recibida:", pass);
                console.log("🔓 Contraseña desencriptada:", passDesencriptada);
          
                if (passDesencriptada !== pass) {
                  return res.status(401).json({ error: "Contraseña incorrecta" });
                }
          
                // Éxito
                res.json({
                  id: user.id,
                  usuario: user.usuario,
                  nombres: user.nombres,
                  email: user.email,
                  id_rol: user.id_rol,
                  nombre_rol: user.nombre_rol
                });
              } catch (error) {
                console.error("❌ Error al desencriptar contraseña:", error);
                res.status(500).json({ error: "Error al procesar contraseña" });
              }
            });
          });

    // Inicia el servidor en el puerto 3000
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });


      