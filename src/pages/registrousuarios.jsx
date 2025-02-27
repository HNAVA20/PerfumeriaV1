import React, { useState } from "react";
import '../styles/registrousuarios.css';

function Registrousuarios() {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [contrasena, setContrasena] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Nombre:", nombre, "Apellido:", apellido, "Email:", email, "Teléfono:", telefono, "Fecha de Nacimiento:", fechaNacimiento, "Contraseña:", contrasena);
    };

    return (
        <div className="registro-container">
            <form onSubmit={handleSubmit}>
                <h1>Registro de Usuarios</h1>
                <input 
                    type="text" 
                    placeholder="Nombre" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Apellido" 
                    value={apellido} 
                    onChange={(e) => setApellido(e.target.value)} 
                    required 
                />
                <input 
                    type="email" 
                    placeholder="Correo electrónico" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Teléfono" 
                    value={telefono} 
                    onChange={(e) => setTelefono(e.target.value)} 
                    required 
                />
                <input 
                    type="date" 
                    placeholder="Fecha de Nacimiento" 
                    value={fechaNacimiento} 
                    onChange={(e) => setFechaNacimiento(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    value={contrasena} 
                    onChange={(e) => setContrasena(e.target.value)} 
                    required 
                />
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
}

export default Registrousuarios;
