import React, { useState, useEffect } from "react";
import axios from "axios"; 
import "../styles/usuariosadmin.css";

const API_URL = ""; 

function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newUsuario, setNewUsuario] = useState({
    nombre_usuario: "",
    email_usuario: "",
    telefono_usuario: ""
  });
  const [editId, setEditId] = useState(null);

  // Obtener usuarios del backend al cargar la página
  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsuarios(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const handleAddUsuario = async () => {
    if (newUsuario.nombre_usuario.trim() && newUsuario.email_usuario.trim() && newUsuario.telefono_usuario.trim()) {
      try {
        if (editId !== null) {
          // Editar usuario existente
          await axios.put(`${API_URL}/${editId}`, newUsuario);
        } else {
          // Agregar nuevo usuario
          const response = await axios.post(API_URL, newUsuario);
          setUsuarios([...usuarios, response.data]);
        }

        setNewUsuario({ nombre_usuario: "", email_usuario: "", telefono_usuario: "" });
        setEditId(null);
        setModalOpen(false);
        fetchUsuarios(); // Recargar usuarios
      } catch (error) {
        console.error("Error al guardar usuario:", error);
      }
    }
  };

  const handleEditUsuario = (usuario) => {
    setNewUsuario({
      nombre_usuario: usuario.nombre_usuario,
      email_usuario: usuario.email_usuario,
      telefono_usuario: usuario.telefono_usuario
    });
    setEditId(usuario.id_usuario);
    setModalOpen(true);
  };

  const handleDeleteUsuario = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsuarios(); // Recargar usuarios después de eliminar
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  return (
    <div className="crud-container">
      <h2>CRUD de Usuarios</h2>

      <div className="toolbar">
        <button className="btn-add" onClick={() => setModalOpen(true)}>
          + Agregar Usuario
        </button>
        <input type="text" placeholder="Buscar..." className="search-bar" />
      </div>

      <table className="usuarios-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id_usuario}>
              <td>{usuario.id_usuario}</td>
              <td>{usuario.nombre_usuario}</td>
              <td>{usuario.email_usuario}</td>
              <td>{usuario.telefono_usuario}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEditUsuario(usuario)}>Editar</button>
                <button className="btn-delete" onClick={() => handleDeleteUsuario(usuario.id_usuario)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editId !== null ? "Editar Usuario" : "Agregar Usuario"}</h3>
            <input
              type="text"
              placeholder="Nombre del usuario"
              value={newUsuario.nombre_usuario}
              onChange={(e) => setNewUsuario({ ...newUsuario, nombre_usuario: e.target.value })}
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={newUsuario.email_usuario}
              onChange={(e) => setNewUsuario({ ...newUsuario, email_usuario: e.target.value })}
            />
            <input
              type="text"
              placeholder="Teléfono"
              value={newUsuario.telefono_usuario}
              onChange={(e) => setNewUsuario({ ...newUsuario, telefono_usuario: e.target.value })}
            />
            <div className="modal-actions">
              <button onClick={handleAddUsuario}>Guardar</button>
              <button onClick={() => setModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsuariosAdmin;