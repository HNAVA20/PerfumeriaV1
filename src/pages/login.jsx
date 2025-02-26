import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/login.css';
import Registrousuarios from "./Registrousuarios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email, "Password:", password);
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
                <button className="register-button" onClick={() => navigate("/registrousuarios")}>Registrar nuevo usuario</button>
            </form>
        </div>
    );
}

export default Login;
