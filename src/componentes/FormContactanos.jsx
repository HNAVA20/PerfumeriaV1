import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./stylecom/FormContactanos.css";

// Definir el esquema de validación
const schema = yup.object().shape({
  nombre: yup.string().required("El nombre es obligatorio").min(3, "Debe tener al menos 3 caracteres"),
  email: yup.string()
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Debe ser un correo electrónico válido"
  )
  .required("El correo electrónico es obligatorio"),
  telefono: yup.string()
    .required("El teléfono es obligatorio")
    .matches(/^[0-9]+$/, "Solo se permiten números")
    .length(10, "El teléfono debe tener 10 dígitos"),
  mensaje: yup.string().required("El mensaje es obligatorio").min(10, "Debe contener al menos 10 caracteres"),
});

const FormContactanos = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  // Manejar envío del formulario
  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/enviar-correo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      alert(result.message);

      if (result.success) {
        reset(); // Limpiar el formulario
      }
    } catch (error) {
      console.error("Error enviando el formulario:", error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-instructions">
        <h2 className="instructions-title">Contáctanos</h2>
        <p className="instructions-text">
          Para solicitar información, cotización o aclaración, completa el siguiente formulario con tus datos.
          <br /><br />
          Te responderemos a la brevedad.
        </p>
      </div>
      <div className="form-card2">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <p className="form-heading">Formulario de Contacto</p>

          <div className="form-field">
            <input {...register("nombre")} placeholder="Nombre" className="input-field" />
            <p className="error-message">{errors.nombre?.message}</p>
          </div>

          <div className="form-field">
            <input {...register("email")} placeholder="Correo electrónico" className="input-field" />
            <p className="error-message">{errors.email?.message}</p>
          </div>

          <div className="form-field">
            <input {...register("telefono")} placeholder="Teléfono" className="input-field" />
            <p className="error-message">{errors.telefono?.message}</p>
          </div>

          <div className="form-field">
            <textarea {...register("mensaje")} placeholder="Mensaje" className="input-field" />
            <p className="error-message">{errors.mensaje?.message}</p>
          </div>

          <button type="submit" className="sendMessage-btn">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default FormContactanos;
