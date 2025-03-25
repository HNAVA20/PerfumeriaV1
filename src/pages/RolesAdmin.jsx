import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/rolesadmin.css";

const API_URL = "http://localhost:3000/roles"; // URL del backend

function RolesAdmin() {
  const [roles, setRoles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newRole, setNewRole] = useState("");
  const [editId, setEditId] = useState(null);

  // Obtener roles al cargar la página
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get(API_URL);
      setRoles(response.data);
    } catch (error) {
      console.error("Error al obtener roles:", error);
    }
  };

  const handleAddRole = async () => {
    if (newRole.trim()) {
      try {
        if (editId !== null) {
          // Editar rol existente
          await axios.put(`${API_URL}/${editId}`, { nombre_rol: newRole });
        } else {
          // Agregar nuevo rol
          const response = await axios.post(API_URL, { nombre_rol: newRole });
          setRoles([...roles, response.data]);
        }

        setNewRole("");
        setEditId(null);
        setModalOpen(false);
        fetchRoles(); // Recargar roles
      } catch (error) {
        console.error("Error al guardar rol:", error);
      }
    }
  };

  const handleEditRole = (role) => {
    setNewRole(role.nombre_rol);
    setEditId(role.id_rol);
    setModalOpen(true);
  };

  const handleDeleteRole = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchRoles(); // Recargar roles después de eliminar
    } catch (error) {
      console.error("Error al eliminar rol:", error);
    }
  };

  return (
    <div className="crud-container">
      <h2>CRUD de Roles</h2>

      <div className="toolbar">
        <button className="btn-add" onClick={() => setModalOpen(true)}>
          + Agregar Rol
        </button>
        <input type="text" placeholder="Buscar..." className="search-bar" />
      </div>

      <table className="roles-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id_rol}>
              <td>{role.id_rol}</td>
              <td>{role.nombre_rol}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEditRole(role)}>Editar</button>
                <button className="btn-delete" onClick={() => handleDeleteRole(role.id_rol)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editId !== null ? "Editar Rol" : "Agregar Rol"}</h3>
            <input
              type="text"
              placeholder="Nombre del rol"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={handleAddRole}>Guardar</button>
              <button onClick={() => setModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RolesAdmin;
