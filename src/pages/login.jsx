import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/login.css';

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // Estado para manejar la visibilidad del modal
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        usuario: usuario,
        pass: password
      });

      const user = response.data;

      // Guardar el usuario en localStorage (opcional)
      localStorage.setItem("usuario", JSON.stringify(user));

      // Redireccionar según el rol
      if (user.nombre_rol === "admin") {
        navigate("/RegistroAdmin");
      } else if (user.nombre_rol === "visitante") {
        navigate("/");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Error de login:", err);
      setError("Usuario o contraseña incorrectos");
    }
  };

  const handleRecoverPassword = async (email) => {
    try {
      await axios.post('http://localhost:3000/recover-password', { email });
      alert('Revisa tu correo para el enlace de recuperación');
      setShowModal(false); // Cerrar el modal después de enviar la solicitud
    } catch (error) {
      alert('Error al enviar el correo, verifica tu email');
    }
  };

  return (
    <div className="login-container">
      <div className="login-overlay"></div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>

        {error && <p className="login-error">{error}</p>}

        <input 
          type="text" 
          placeholder="Usuario" 
          value={usuario} 
          onChange={(e) => setUsuario(e.target.value)}
        />

        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Ingresar</button>

        {/* Enlace de recuperación de contraseña */}
        <div className="login-recover">
          <a className="register-link" onClick={() => setShowModal(true)}>¿Olvidaste tu contraseña?</a>
        </div>
      </form>


      {/* Modal de recuperación de contraseña */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Recuperar Contraseña</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const email = e.target.email.value;
              handleRecoverPassword(email);
            }}>
              <input type="email" name="email" placeholder="Introduce tu correo" required />
              <button type="submit">Recuperar</button>
            </form>
            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
