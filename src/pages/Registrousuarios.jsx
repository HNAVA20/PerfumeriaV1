import React, { useState } from "react";
import '../styles/Registrousuarios.css';

function Registrousuarios() {
    var formData = useState({
        nombre: '',
        correo: '',
        contraseña: '',
    })[0];

    var setFormData = useState()[1];

    function handleChange(e) {
        var name = e.target.name;
        var value = e.target.value;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar los datos
        console.log(formData);
    }

    return (
        <div className="registro-container">
            <h1>Sección Registro de Usuarios</h1>
            <form onSubmit={handleSubmit} className="registro-form">
                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="correo">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="correo"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contraseña">Contraseña:</label>
                    <input
                        type="password"
                        id="contraseña"
                        name="contraseña"
                        value={formData.contraseña}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn-registrar">Registrar</button>
            </form>
        </div>
    );
}

export default Registrousuarios;
