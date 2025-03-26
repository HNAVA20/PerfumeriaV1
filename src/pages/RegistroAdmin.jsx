import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/vistaadministrador.css';

const categories = [
  {
    name: "Productos",
    className: "productos-card",
    
  },
  {
    name: "Secciones",
    className: "secciones-card",
    
  },
  {
    name: "Marcas",
    className: "marcas-card",
   
  },
  {
    name: "Usuarios",
    className: "usuarios-card",
   
  },
  {
    name: "Roles",
    className: "roles-card",
     
  },
  {
    name: "Cerrar Sesión",
    className: "cerrar-card",
     
  }
];

function RegistroAdmin() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    switch (categoryName) {
      case 'Productos':
        navigate('/ProductosAdmin');
        break;
      case 'Secciones':
        navigate('/SeccionesAdmin');
        break;
      case 'Marcas':
        navigate('/MarcasAdmin');
        break;
      case 'Usuarios':
        navigate('/UsuariosAdmin');
        break;
      case 'Roles':
        navigate('/Rolesadmin');
        break;
      case 'Cerrar Sesión':
        navigate('/login');
        break;
      default:
        break;
    }
  };

  return (
    <div className="admin-container">
      <h2 id="h2">Registro vista de administrador</h2>
      <p id="p">Aquí puedes registrar todo como administrador.</p>
      <div className="category-grid">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`category-card ${category.className}`}
            onClick={() => handleCategoryClick(category.name)}
          >
            <div className="category-label">{category.name}</div>
            <p className="category-description">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RegistroAdmin;
