import React, { useState } from "react";
import axios from "axios";
import '../styles/registrousuarios.css';

function RegistroProductos() {
    const [formulario, setFormulario] = useState({
        nombre_producto: "",
        descripcion: "",
        aroma: "",
        marca: "",
        precio: "",
        cantidad: ""
    });

    const [mensaje, setMensaje] = useState(""); // Para mostrar mensajes de éxito/error

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario({
            ...formulario,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post("http://localhost/mi_api/insertar_producto.php", formulario, {
                headers: { "Content-Type": "application/json" }
            });

            setMensaje(response.data.mensaje || response.data.error);
            
            if (response.data.mensaje) {
                // Reiniciar formulario si se registró correctamente
                setFormulario({
                    nombre_producto: "",
                    descripcion: "",
                    aroma: "",
                    marca: "",
                    precio: "",
                    cantidad: ""
                });
            }
        } catch (error) {
            setMensaje("Error al conectar con la API");
        }
    };

    const marcas = ["1", "2", "3"]; // IDs de las marcas en la base de datos

    return (
        <div className="registro-container">
            <form onSubmit={handleSubmit}>
                <h1>Agregar Producto</h1>
                {mensaje && <p>{mensaje}</p>}
                <input
                    type="text"
                    name="nombre_producto"
                    placeholder="Nombre del Producto"
                    value={formulario.nombre_producto}
                    onChange={handleChange}
                    required
                />
                <select
                    name="marca"
                    value={formulario.marca}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona una marca</option>
                    {marcas.map((id) => (
                        <option key={id} value={id}>
                            Marca {id}
                        </option>
                    ))}
                </select>
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
