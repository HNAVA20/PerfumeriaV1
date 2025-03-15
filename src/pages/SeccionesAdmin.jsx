import React from 'react';
import { useNavigate } from 'react-router-dom'; // Cambiado a useNavigate
import '../styles/registroadmin.css';

const categories = [
  { name: "Agregar seccion", className: "agregarseccion-card" },
  { name: "Modificar seccion", className: "modificarseccion-card" },
  { name: "Consultar seccion", className: "consultarseccion-card" },
  { name: "Eliminar seccion", className: "eliminarseccion-card" },
];

function RegistroAdmin() {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/login'); // Ruta hacia la página de login
  };

  const handleCardClick = (categoryName) => {
    if (categoryName === "Agregar seccion") {
      navigate('/AgregarSeccionAdmin'); // Navegar a la página de agregar sección
    }
    // Puedes agregar más condiciones aquí para otras categorías si es necesario
  };

  return (
    <div><br /><br /><br />
      <h2 id="h2">Registro Seccion vista de administrador</h2>
      <p id="p">Aquí puedes registrar secciones como administrador.</p>
      <div className="category-container">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`category-card ${category.className}`}
            onClick={() => handleCardClick(category.name)}
          >
            <div className="category-label">{category.name}</div>
          </div>
        ))}
      </div>
      <div className="buttons-container">
        <button id="back-to-login" onClick={handleBackToLogin}>Regresar al Login</button>
      </div>
    </div>
  );
}

export default RegistroAdmin;
