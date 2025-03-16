import React, { useState } from "react";
import '../styles/registrousuarios.css';

function RegistroSeccion() {
    const [formulario, setFormulario] = useState({
        nombre_seccion: "",
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
                <h1>Agregar Seccion</h1>
                <input
                    type="text"
                    name="nombre_seccion"
                    placeholder="Nombre de la seccion"
                    value={formulario.nombre_producto}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
}

export default RegistroSeccion;
