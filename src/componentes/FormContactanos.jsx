import React from "react";
import '../componentes/FormContactanos.css';

const FormContactanos = () => {
  return (
    <div className="form-container">
      <div className="form-instructions">
        <h2 className="instructions-title">Contáctanos</h2>
        <p className="instructions-text">
          Para solicitar información, cotización o aclaración, por favor completa el siguiente formulario con tus datos.<br/><br/>Te responderemos a la brevedad.
        </p>
      </div>
      <div className="form-card2">
        <form className="form">
          <p className="form-heading">Formulario de Contacto</p>

          <div className="form-field">
            <input
              required
              placeholder="Nombre"
              className="input-field"
              type="text"
            />
          </div>

          <div className="form-field">
            <input
              required
              placeholder="Correo electrónico"
              className="input-field"
              type="email"
            />
          </div>

          <div className="form-field">
            <input
              required
              placeholder="Teléfono"
              className="input-field"
              type="tel"
            />
          </div>

          <div className="form-field">
            <textarea
              required
              placeholder="Mensaje"
              cols={30}
              rows={3}
              className="input-field"
            />
          </div>

          <button type="submit" className="sendMessage-btn">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default FormContactanos;