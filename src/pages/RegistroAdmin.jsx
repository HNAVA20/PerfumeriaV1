import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/vistaadministrador.css';

const categories = [
  {
    name: "Productos",
    className: "productos-card",
    descripcion: "Aquí puedes administrar los productos.",
  },
  {
    name: "Secciones",
    className: "secciones-card",
    descripcion: "Gestiona las secciones de tu plataforma.",
  },
  {
    name: "Marcas",
    className: "marcas-card",
    descripcion: "Administra las marcas disponibles.",
  },
  {
    name: "Usuarios",
    className: "usuarios-card",
    descripcion: "Controla los usuarios registrados.",
  },
  {
    name: "Roles",
    className: "roles-card",
    descripcion: "Define los roles de usuario.",
  },
  {
    name: "Cerrar Sesión",
    className: "cerrar-card",
    descripcion: "Salir de la plataforma.",
  },
  {
    name: "Depuración",
    className: "depuracion-card",
    descripcion: "Accede a las herramientas de depuración.",
  },
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
      case 'Depuración':
        navigate('/AdminDepuracion');
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
            <p className="category-description">{category.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RegistroAdmin;
