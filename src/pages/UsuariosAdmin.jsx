import React from 'react';
import { useNavigate } from 'react-router-dom'; // Cambiado a useNavigate
import '../styles/registroadmin.css';

const categories = [
  { name: "Agregar usuarios", className: "agregarusuarios-card" },
  { name: "Modificar usuarios", className: "modificarusuarios-card" },
  { name: "Consultar usuarios", className: "consultarusuarios-card" },
  { name: "Eliminar usuarios", className: "eliminarusuarios-card" },
];

function RegistroAdmin() {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/login'); // Ruta hacia la página de login
  };

  return (
    <div><br /><br /><br />
      <h2 id="h2" >Registro Usuarios vista de administrador</h2>
      <p id="p" >Aquí puedes registrar Usuarios como administrador.</p>
      <div className="category-container">
        {categories.map((category, index) => (
          <div key={index} className={`category-card ${category.className}`}>
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
