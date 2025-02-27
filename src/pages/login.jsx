import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/login.css';

function Login() {
    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");
    var navigate = useNavigate();

    var handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email, "Password:", password);
        // Aquí puedes agregar la lógica de autenticación
    };

    return (
        <div className="login-container">
            <div className="login-overlay"></div>
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Iniciar Sesión</h2>
                <input 
                    type="email" 
                    placeholder="Correo electrónico" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Ingresar</button>
                <p className="register-link" onClick={() => navigate("/registrousuarios")}>
                    No cuentas con usuario? Regístrate aquí
                </p>
            </form>
        </div>
    );
}

export default Login;
