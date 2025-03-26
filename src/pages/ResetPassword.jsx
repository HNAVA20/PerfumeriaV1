import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Obtener el token de la URL
    const urlParams = new URLSearchParams(location.search);
    const tokenFromUrl = urlParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setError('Token inválido o expirado');
    }
  }, [location]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/reset-password', {
        token,
        newPassword,
      });

      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (err) {
      console.error('Error al restablecer la contraseña:', err);
      setError('Hubo un error al restablecer la contraseña. Inténtalo nuevamente.');
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Restablecer Contraseña</h2>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">¡Contraseña restablecida con éxito!</p>}

      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          placeholder="Nueva Contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Restablecer Contraseña</button>
      </form>

      <button onClick={() => navigate('/login')}>Volver al inicio de sesión</button>
    </div>
  );
}

export default ResetPassword;
