import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/usuarioadmin.css";

function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [newUsuario, setNewUsuario] = useState({
    nombres: "",
    primer_apellido: "",
    segundo_apellido: "",
    usuario: "",
    email: "",
    telefono: "",
    pass: "",
    id_rol: "",
  });

  // Al cargar el componente, obtenemos usuarios y roles
  useEffect(() => {
    fetchUsuarios();
    fetchRoles();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const res = await axios.get("http://localhost:3000/usuarios"); // Asegúrate que esta ruta exista
      setUsuarios(res.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await axios.get("http://localhost:3000/roles");
      console.log("Roles cargados:", res.data); // 👀 debug
      setRoles(res.data);
    } catch (error) {
      console.error("Error al obtener roles:", error);
    }
  };

  const handleChange = (e) => {
    setNewUsuario({ ...newUsuario, [e.target.name]: e.target.value });
  };

  const handleAddUsuario = async () => {
    try {
      if (editId !== null) {
        await axios.put(`http://localhost:3000/usuarios/${editId}`, newUsuario);
      } else {
        await axios.post("http://localhost:3000/usuarios", newUsuario);
      }

      setNewUsuario({
        nombres: "",
        primer_apellido: "",
        segundo_apellido: "",
        usuario: "",
        email: "",
        telefono: "",
        pass: "",
        id_rol: "",
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
      await axios.delete(`http://localhost:3000/usuarios/${id}`);
      fetchUsuarios();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  return (
    <div className="crud-container">
      <h2>CRUD de Usuarios</h2>

      <div className="toolbar">
        <button className="btn-add" onClick={() => setModalOpen(true)}>+ Agregar Usuario</button>
        <input type="text" placeholder="Buscar..." className="search-bar" />
      </div>

      <table className="usuarios-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombres}</td>
              <td>{u.primer_apellido} {u.segundo_apellido}</td>
              <td>{u.usuario}</td>
              <td>{u.email}</td>
              <td>{u.telefono}</td>
              <td>{u.nombre_rol}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEditUsuario(u)}>Editar</button>
                <button className="btn-delete" onClick={() => handleDeleteUsuario(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editId !== null ? "Editar Usuario" : "Agregar Usuario"}</h3>
            <div className="modal-body">
              <input type="text" name="nombres" placeholder="Nombres" value={newUsuario.nombres} onChange={handleChange} />
              <input type="text" name="primer_apellido" placeholder="Primer Apellido" value={newUsuario.primer_apellido} onChange={handleChange} />
              <input type="text" name="segundo_apellido" placeholder="Segundo Apellido" value={newUsuario.segundo_apellido} onChange={handleChange} />
              <input type="text" name="usuario" placeholder="Usuario" value={newUsuario.usuario} onChange={handleChange} />
              <input type="email" name="email" placeholder="Email" value={newUsuario.email} onChange={handleChange} />
              <input type="text" name="telefono" placeholder="Teléfono" value={newUsuario.telefono} onChange={handleChange} />
              <input type="password" name="pass" placeholder="Contraseña" value={newUsuario.pass} onChange={handleChange} />

              <select name="id_rol" value={newUsuario.id_rol} onChange={handleChange}>
                <option value="">Seleccionar Rol</option>
                {roles.map((rol) => (
                  <option key={rol.id_rol} value={rol.id_rol}>
                    {rol.nombre_rol}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-actions">
              <button onClick={handleAddUsuario}>Guardar</button>
              <button onClick={() => setModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <button className="btn-back" onClick={() => window.history.back()}>⬅ Regresar</button>
    </div>
  );
}

export default UsuariosAdmin;
