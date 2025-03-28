import { useEffect, useState } from "react";
import axios from "axios";
import './stylecom/AdminDepuracion.css'; // Asegúrate de ajustar la ruta si es diferente

function AdminDepuracion() {
  const [data, setData] = useState({
    productosInvalidos: [],
    usuariosInvalidos: []
  });

  // Cargar datos inválidos desde el backend
  const cargarDatos = () => {
    axios.get("http://localhost:3000/api/admin/depuracion")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // Eliminar productos inválidos
  const eliminarProductos = () => {
    // eslint-disable-next-line no-restricted-globals
    if (window.confirm("¿Estás seguro de eliminar TODOS los productos inválidos?")) {
      axios.delete("http://localhost:3000/api/admin/depuracion/productos")
        .then(() => cargarDatos())
        .catch(err => console.error(err));
    }
  };

  // Corregir productos inválidos
  const corregirProductos = () => {
    // eslint-disable-next-line no-restricted-globals
    if (window.confirm("¿Corregir automáticamente los productos inválidos?")) {
      axios.put("http://localhost:3000/api/admin/depuracion/productos")
        .then(() => cargarDatos())
        .catch(err => console.error(err));
    }
  };

  // Eliminar usuarios inválidos
  const eliminarUsuarios = () => {
    // eslint-disable-next-line no-restricted-globals
    if (window.confirm("¿Estás seguro de eliminar TODOS los usuarios inválidos?")) {
      axios.delete("http://localhost:3000/api/admin/depuracion/usuarios")
        .then(() => cargarDatos())
        .catch(err => console.error(err));
    }
  };

  // Corregir usuarios inválidos
  const corregirUsuarios = () => {
    // eslint-disable-next-line no-restricted-globals
    if (window.confirm("¿Corregir automáticamente los usuarios inválidos?")) {
      axios.put("http://localhost:3000/api/admin/depuracion/usuarios")
        .then(() => cargarDatos())
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="admin-depuracion">
      <h2>Depuración de Datos</h2>

      <h3>Productos inválidos</h3>
      <button onClick={eliminarProductos}>🗑 Eliminar</button>
      <button onClick={corregirProductos}>🛠 Corregir automáticamente</button>
      <ul>
        {data.productosInvalidos.length > 0 ? (
          data.productosInvalidos.map(p => (
            <li key={p.id_producto}>
              {p.nombre_producto || 'Sin nombre'} - Precio: {p.precio} - Cantidad: {p.cantidad}
            </li>
          ))
        ) : (
          <li>✅ No hay productos inválidos</li>
        )}
      </ul>

      <h3>Usuarios inválidos</h3>
      <button onClick={eliminarUsuarios}>🗑 Eliminar</button>
      <button onClick={corregirUsuarios}>🛠 Corregir automáticamente</button>
      <ul>
        {data.usuariosInvalidos.length > 0 ? (
          data.usuariosInvalidos.map(u => (
            <li key={u.id}>
              {u.nombres || 'Sin nombre'} - ID Rol: {u.id_rol || '[null]'}
            </li>
          ))
        ) : (
          <li>✅ No hay usuarios inválidos</li>
        )}
      </ul>
    </div>
  );
}

export default AdminDepuracion;
