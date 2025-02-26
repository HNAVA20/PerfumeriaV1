import React, { useState } from 'react';
import '../styles/inicio.css';
import NavBar from '../componentes/NavBar.jsx';  // Asegúrate de importar correctamente tu NavBar

function Inicio() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log(formData);
  };

  return (
    <div className="Container-Inicio">
      {/* Carrusel de imágenes */}
      <div id="carousel" className="carousel">
        <div className="carousel-item">
          <img src="image1.jpg" alt="Perfume 1" />
        </div>
        <div className="carousel-item">
          <img src="image2.jpg" alt="Perfume 2" />
        </div>
        <div className="carousel-item">
          <img src="image3.jpg" alt="Perfume 3" />
        </div>
      </div>

      {/* Información sobre las secciones del municipio */}
      <section className="info-secciones">
        <h2>Conoce nuestras secciones</h2>
        <div className="seccion">
          <h3>Fragancias Exclusivas</h3>
          <p>Descubre nuestra línea exclusiva de perfumes de lujo.</p>
        </div>
        <div className="seccion">
          <h3>Ofertas Especiales</h3>
          <p>Los mejores precios en perfumes seleccionados.</p>
        </div>
        <div className="seccion">
          <h3>Perfumería para Todos</h3>
          <p>Perfumes para todas las ocasiones, desde lo más sofisticado hasta lo más casual.</p>
        </div>
      </section>

      {/* Formulario de contacto */}
      <section className="contacto">
        <h2>Contáctanos</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Enviar</button>
        </form>
      </section>
    </div>
  );
}

export default Inicio;
