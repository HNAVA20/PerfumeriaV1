import React from "react";
import '../componentes/FormContactanos.css';

function FormContactanos() {
    return(
        <div className="container">
            <h1>Contacta con nosotros</h1>
            <div className="dropdown">
                <label htmlFor="contact">¿Con quién te gustaría contactar?</label>
                <select id="contact" name="contact" value={contact} onChange={handleChange}>
                    <option value="ventas">Ventas</option>
                    <option value="soporte">Soporte Técnico</option>
                    <option value="perfumes_hombre">Perfumes Hombre</option>
                    <option value="perfumes_mujer">Perfumes Mujer</option>
                    <option value="perfumes_niños">Perfumes Niños</option>
                    <option value="otros">Otros</option>
                </select>
            </div>
        </div>
    );
}

export default FormContactanos;