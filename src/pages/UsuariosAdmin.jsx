import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/usuarioadmin.css";

const API_URL = ""; // URL del backend

function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newUsuario, setNewUsuario] = useState({ 
    nombre: "", 
    primerApellido: "", 
    segundoApellido: "", 
    usuario: "", 
    email: "", 
    telefono: "", 
    contraseña: "" 
  });
  const [editId, setEditId] = useState(null);

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
    if (newUsuario.nombre.trim() && newUsuario.email.trim()) {
      try {
        if (editId !== null) {
          await axios.put(`${API_URL}/${editId}`, newUsuario);
        } else {
          const response = await axios.post(API_URL, newUsuario);
          setUsuarios([...usuarios, response.data]);
        }

        setNewUsuario({ 
          nombre: "", 
          primerApellido: "", 
          segundoApellido: "", 
          usuario: "", 
          email: "", 
          telefono: "", 
          contraseña: "" 
        });
        setEditId(null);
        setModalOpen(false);
        fetchUsuarios();
      } catch (error) {
        console.error("Error al guardar usuario:", error);
      }
    }
  };

  const handleEditUsuario = (usuario) => {
    setNewUsuario(usuario);
    setEditId(usuario.id);
    setModalOpen(true);
  };

  const handleDeleteUsuario = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsuarios();
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
      <div className="table-container"> {/* Contenedor con scroll */}
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Primer Apellido</th>
              <th>Segundo Apellido</th>
              <th>Usuario</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.primerApellido}</td>
                <td>{usuario.segundoApellido}</td>
                <td>{usuario.usuario}</td>
                <td>{usuario.email}</td>
                <td>{usuario.telefono}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEditUsuario(usuario)}>Editar</button>
                  <button className="btn-delete" onClick={() => handleDeleteUsuario(usuario.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editId !== null ? "Editar Usuario" : "Agregar Usuario"}</h3>
            <div className="modal-body"> {/* Contenedor con scroll */}
              <input type="text" placeholder="Nombre" value={newUsuario.nombre} onChange={(e) => setNewUsuario({ ...newUsuario, nombre: e.target.value })} />
              <input type="text" placeholder="Primer Apellido" value={newUsuario.primerApellido} onChange={(e) => setNewUsuario({ ...newUsuario, primerApellido: e.target.value })} />
              <input type="text" placeholder="Segundo Apellido" value={newUsuario.segundoApellido} onChange={(e) => setNewUsuario({ ...newUsuario, segundoApellido: e.target.value })} />
              <input type="text" placeholder="Usuario" value={newUsuario.usuario} onChange={(e) => setNewUsuario({ ...newUsuario, usuario: e.target.value })} />
              <input type="email" placeholder="Email" value={newUsuario.email} onChange={(e) => setNewUsuario({ ...newUsuario, email: e.target.value })} />
              <input type="text" placeholder="Teléfono" value={newUsuario.telefono} onChange={(e) => setNewUsuario({ ...newUsuario, telefono: e.target.value })} />
              <input type="password" placeholder="Contraseña" value={newUsuario.contraseña} onChange={(e) => setNewUsuario({ ...newUsuario, contraseña: e.target.value })} />
            </div>
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