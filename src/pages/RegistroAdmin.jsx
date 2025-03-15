import React from 'react';
import { useNavigate } from 'react-router-dom';
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

  const handleCategoryClick = (categoryName) => {
    if (categoryName === 'Productos') {
      navigate('/ProductosAdmin' ); // Redirige a ProductosAdmin
    }
    if (categoryName === 'Secciones') {
      navigate('/SeccionesAdmin');
    }
    if (categoryName === 'Marcas') {
      navigate('/MarcasAdmin');
    }
    if (categoryName === 'Usuarios') {
      navigate('/UsuariosAdmin');
    }
  };

  return (
    <div><br /><br /><br />
      <h2 id="h2">Registro vista de administrador</h2>
      <p id="p">Aquí puedes registrar todo como administrador.</p>
      <div className="category-container">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`category-card ${category.className}`}
            onClick={() => handleCategoryClick(category.name)}
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
