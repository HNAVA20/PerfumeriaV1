import React from 'react';
import { useNavigate } from 'react-router-dom'; // Cambiado a useNavigate
import '../styles/registroadmin.css';

const categories = [
  { name: "Productos", className: "productos-card" },
  { name: "Secciones", className: "secciones-card" },
  { name: "Marcas", className: "marcas-card" },
  { name: "Usuarios", className: "-card" },
];

function RegistroAdmin() {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/login'); // Ruta hacia la página de login
  };

  return (
    <div><br /><br /><br />
      <h2 id="h2" >Registro vista de administrador</h2>
      <p id="p" >Aquí puedes registrar todo como administrador.</p>
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
