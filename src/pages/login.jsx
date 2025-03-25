import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/login.css';

function Login() {
  var [usuario, setUsuario] = useState("");
  var [password, setPassword] = useState("");
  var [error, setError] = useState("");
  var navigate = useNavigate();

  var handleSubmit = async (e) => {
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
        navigate("/inicio");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Error de login:", err);
      setError("Usuario o contraseña incorrectos");
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
      </form>
    </div>
  );
}

export default Login;
