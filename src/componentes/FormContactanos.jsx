import React, { useState } from "react";
import "./stylecom/FormContactanos.css";

const FormContactanos = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const [mensajeEstado, setMensajeEstado] = useState("");

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/enviar-correo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setMensajeEstado(data.message);

      if (data.success) {
        setFormData({ nombre: "", email: "", telefono: "", mensaje: "" }); // Limpiar el formulario
      }
    } catch (error) {
      console.error("Error enviando el formulario:", error);
      setMensajeEstado("Hubo un error al enviar el mensaje.");
    }
  };

  return (
    <div className="form-container">
      <div className="form-instructions">
        <h2 className="instructions-title">Contáctanos</h2>
        <p className="instructions-text">
          Para solicitar información, cotización o aclaración, por favor completa el siguiente formulario con tus datos.
          <br />
          <br />
          Te responderemos a la brevedad.
        </p>
      </div>
      <div className="form-card2">
        <form className="form" onSubmit={handleSubmit}>
          <p className="form-heading">Formulario de Contacto</p>

          <div className="form-field">
            <input
              required
              name="nombre"
              placeholder="Nombre"
              className="input-field"
              type="text"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <input
              required
              name="email"
              placeholder="Correo electrónico"
              className="input-field"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <input
              required
              name="telefono"
              placeholder="Teléfono"
              className="input-field"
              type="tel"
              value={formData.telefono}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <textarea
              required
              name="mensaje"
              placeholder="Mensaje"
              cols={30}
              rows={3}
              className="input-field"
              value={formData.mensaje}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="sendMessage-btn">
            Enviar
          </button>

          {mensajeEstado && <p className="status-message">{mensajeEstado}</p>}
        </form>
      </div>
    </div>
  );
};

export default FormContactanos;
