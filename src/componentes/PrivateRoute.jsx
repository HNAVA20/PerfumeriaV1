import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  // Verificar si el usuario está autenticado
  const isAuthenticated = localStorage.getItem('usuario'); // O cualquier otra verificación que uses

  // Retornar el componente si está autenticado, de lo contrario redirigir
  return isAuthenticated ? Component : <Navigate to="/login" />;
};

export default PrivateRoute;
