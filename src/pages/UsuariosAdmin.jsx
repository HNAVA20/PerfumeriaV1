import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/usuarioadmin.css";

const API_URL = "http://localhost:3000/usuarios";

function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newUsuario, setNewUsuario] = useState({ 
    nombres: "", 
    primer_apellido: "", 
    segundo_apellido: "", 
    usuario: "", 
    email: "", 
    telefono: "", 
    pass: "",
    id_rol: ""
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUsuarios();
    fetchRoles();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsuarios(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:3000/roles");
      setRoles(response.data);
    } catch (error) {
      console.error("Error al obtener roles:", error);
    }
  };

  const handleAddUsuario = async () => {
    try {
      if (editId !== null) {
        await axios.put(`${API_URL}/${editId}`, newUsuario);
      } else {
        await axios.post(API_URL, newUsuario);
      }
      setNewUsuario({ 
        nombres: "", primer_apellido: "", segundo_apellido: "", usuario: "", 
        email: "", telefono: "", pass: "", id_rol: "" 
      });
      setEditId(null);
      setModalOpen(false);
      fetchUsuarios();
    } catch (error) {
      console.error("Error al guardar usuario:", error);
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
      <div className="table-container">
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombres</th>
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
                <td>{usuario.nombres}</td>
                <td>{usuario.primer_apellido}</td>
                <td>{usuario.segundo_apellido}</td>
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
            <div className="modal-body">
              <input type="text" placeholder="Nombres" value={newUsuario.nombres} onChange={e => setNewUsuario({...newUsuario, nombres: e.target.value})} />
              <input type="text" placeholder="Primer Apellido" value={newUsuario.primer_apellido} onChange={e => setNewUsuario({...newUsuario, primer_apellido: e.target.value})} />
              <input type="text" placeholder="Segundo Apellido" value={newUsuario.segundo_apellido} onChange={e => setNewUsuario({...newUsuario, segundo_apellido: e.target.value})} />
              <input type="text" placeholder="Usuario" value={newUsuario.usuario} onChange={e => setNewUsuario({...newUsuario, usuario: e.target.value})} />
              <input type="email" placeholder="Email" value={newUsuario.email} onChange={e => setNewUsuario({...newUsuario, email: e.target.value})} />
              <input type="text" placeholder="Teléfono" value={newUsuario.telefono} onChange={e => setNewUsuario({...newUsuario, telefono: e.target.value})} />
              <input type="password" placeholder="Contraseña" value={newUsuario.pass} onChange={e => setNewUsuario({...newUsuario, pass: e.target.value})} />
              <select value={newUsuario.id_rol} onChange={e => setNewUsuario({...newUsuario, id_rol: e.target.value})}>
                <option value="">Seleccionar Rol</option>
                {roles.map(rol => <option key={rol.id_rol} value={rol.id_rol}>{rol.nombre_rol}</option>)}
              </select>
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