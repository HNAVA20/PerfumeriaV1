import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './componentes/NavBar.jsx';
import Footer from './componentes/footer.jsx';
import Inicio from './pages/inicio.jsx';
import Caballero from './pages/caballero.jsx';
import Dama from './pages/dama.jsx';
import Ninos from './pages/infantil.jsx';
import Sets from './pages/sets.jsx';
import Unisex from './pages/unisex.jsx';
import Blog from './pages/blog.jsx';
import Login from './pages/login.jsx';
import Sitemap from './pages/sitemap.jsx';
import Perfumes from './pages/perfumes.jsx';
import Chanel from './pages/chanel.jsx';
import Registroadmin from './pages/RegistroAdmin.jsx';
import ProductosAdmin from './pages/ProductosAdmin.jsx';
import SeccionesAdmin from './pages/SeccionesAdmin.jsx';
import MarcasAdmin from './pages/MarcasAdmin.jsx';
import UsuariosAdmin from './pages/UsuariosAdmin.jsx';
import AgregarProductoAdmin from './pages/AgregarProductoAdmin.jsx';
import ModificarProductoAdmin from './pages/ModificarProductoAdmin.jsx';
import AgregarSeccionAdmin from './pages/AgregarSeccionAdmin.jsx';
import AgregarMarcasAdmin from './pages/AgregarMarcasAdmin.jsx';
import AgregarUsuariosAdmin from './pages/AgregarUsuariosAdmin.jsx';
import RolesAdmin from './pages/RolesAdmin.jsx';
import VistaSeccion from './pages/VistaSeccion.jsx';
import VistaMarcaEnSeccion from './pages/VistaMarcaEnSeccion';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/caballero" element={<Caballero />} />
        <Route path="/dama" element={<Dama />} />
        <Route path='/ninos' element={<Ninos />} />
        <Route path='/sets' element={<Sets />} />
        <Route path='/unisex' element={<Unisex />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registroadmin' element={< Registroadmin/>} /> 
        <Route path='/productosadmin' element={< ProductosAdmin />} />
        <Route path='/seccionesadmin' element={< SeccionesAdmin />} />
        <Route path='/sitemap' element={<Sitemap />} />
        <Route path='/perfumes' element={<Perfumes />} />
        <Route path='dama/chanel' element={<Chanel />} />
        <Route path='/marcasadmin' element={<MarcasAdmin />} />
        <Route path='/usuariosadmin' element={<UsuariosAdmin/>} />
        <Route path='/agregarproductoadmin' element={<AgregarProductoAdmin/>} />
        <Route path='/modificarproductoadmin' element={<ModificarProductoAdmin/>} />
        <Route path='/agregarseccionadmin' element={<AgregarSeccionAdmin/>} />
        <Route path='/agregarmarcasadmin' element={<AgregarMarcasAdmin/>} />
        <Route path='/agregarusuariosadmin' element={<AgregarUsuariosAdmin/>} />
        <Route path='/rolesadmin' element={<RolesAdmin/>} />
        <Route path="/seccion/:nombre" element={<VistaSeccion />} />
        <Route path="/seccion/:nombre/marca/:nombreMarca" element={<VistaMarcaEnSeccion />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
