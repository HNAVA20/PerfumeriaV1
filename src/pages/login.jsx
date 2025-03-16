import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/login.css';

function Login() {
    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");
    var navigate = useNavigate();

    var handleSubmit = (e) => {
        e.preventDefault();
        console.log("Redirigiendo a la página destino...");
        navigate("/Registroadmin");
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
                />
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={() => navigate("/Registroadmin")} type="submit">Ingresar</button>
            </form>
        </div>
    );
}

export default Login;
