import React from 'react';
import { useNavigate } from 'react-router-dom'; // Cambiado a useNavigate
import '../styles/registroadmin.css';

const categories = [
  { name: "Agregar producto", className: "agregarproductos-card" },
  { name: "Modificar producto", className: "modificarproducto-card" },
  { name: "Consultar producto", className: "consultarproducto-card" },
  { name: "Eliminar producto", className: "eliminarproducto-card" },
];

function RegistroAdmin() {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/login'); // Ruta hacia la página de login
  };

  
  
  return (
    <div><br /><br /><br />
      <h2 id="h2" >Registro Productos vista administrador</h2>
      <p id="p" >Aquí puedes registrar los productos como administrador.</p>
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
