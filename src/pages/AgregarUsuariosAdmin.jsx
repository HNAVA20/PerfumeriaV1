import React, { useState } from "react";
import '../styles/registrousuarios.css';

function Registrousuarios() {
    const [formulario, setFormulario] = useState({
        nombres: "",
        primer_apellido: "",
        segundo_apellido: "",
        email: "",
        telefono: "",
        pass: "",
        usuario: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario({
            ...formulario,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos del formulario:", formulario);
    };

    return (
        <div className="registro-container">
            <form onSubmit={handleSubmit}>
                <h1>Registro de Usuarios</h1>
                <input 
                    type="text" 
                    name="nombres" 
                    placeholder="Nombres" 
                    value={formulario.nombres} 
                    onChange={handleChange} 
                    maxLength="30"
                    required 
                />
                <input 
                    type="text" 
                    name="primer_apellido" 
                    placeholder="Primer Apellido" 
                    value={formulario.primer_apellido} 
                    onChange={handleChange} 
                    maxLength="20"
                    required 
                />
                <input 
                    type="text" 
                    name="segundo_apellido" 
                    placeholder="Segundo Apellido" 
                    value={formulario.segundo_apellido} 
                    onChange={handleChange} 
                    maxLength="20"
                    required 
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Correo Electrónico" 
                    value={formulario.email} 
                    onChange={handleChange} 
                    maxLength="70"
                    required 
                />
                <input 
                    type="text" 
                    name="telefono" 
                    placeholder="Teléfono" 
                    value={formulario.telefono} 
                    onChange={handleChange} 
                    maxLength="10"
                    required 
                />
                <input 
                    type="password" 
                    name="pass" 
                    placeholder="Contraseña" 
                    value={formulario.pass} 
                    onChange={handleChange} 
                    maxLength="16"
                    required 
                />
                <input 
                    type="text" 
                    name="usuario" 
                    placeholder="Usuario" 
                    value={formulario.usuario} 
                    onChange={handleChange} 
                    maxLength="12"
                    required 
                />
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
}

export default Registrousuarios;
