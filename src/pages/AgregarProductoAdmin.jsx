import React, { useState } from "react";
import '../styles/registrousuarios.css';

function RegistroProductos() {
    const [formulario, setFormulario] = useState({
        nombre_producto: "",
        descripcion: "",
        aroma: "",
        precio: "",
        cantidad: ""
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
                <h1>Agregar Producto</h1>
                <input
                    type="text"
                    name="nombre_producto"
                    placeholder="Nombre del Producto"
                    value={formulario.nombre_producto}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="descripcion"
                    placeholder="Descripción"
                    value={formulario.descripcion}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="aroma"
                    placeholder="Aroma"
                    value={formulario.aroma}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="precio"
                    placeholder="Precio"
                    value={formulario.precio}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="cantidad"
                    placeholder="Cantidad"
                    value={formulario.cantidad}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
}

export default RegistroProductos;
