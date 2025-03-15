import React from 'react';
import { useNavigate } from 'react-router-dom'; // Cambiado a useNavigate
import '../styles/registroadmin.css';

const categories = [
  { name: "Agregar marcas", className: "agregarmarcas-card" },
  { name: "Modificar marcas", className: "modificarmarcas-card" },
  { name: "Consultar marcas", className: "consultarmarcas-card" },
  { name: "Eliminar marcas", className: "eliminarmarcas-card" },
];

function MarcasAdmin() {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/login'); // Ruta hacia la página de login
  };

  const handleCardClick = (categoryName) => {
    if (categoryName === "Agregar marcas") {
      navigate('/AgregarMarcasAdmin'); // Navegar a la página de agregar producto
    }    
};

  return (
    <div><br /><br /><br />
      <h2 id="h2">Registro Marcas vista administrador</h2>
      <p id="p">Aquí puedes registrar las marcas como administrador.</p>
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

export default MarcasAdmin;
