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
import Registrousuarios from './pages/registrousuarios.jsx';
import Sitemap from './pages/sitemap.jsx';
import Perfumes from './pages/perfumes.jsx';
import Chanel from './pages/chanel.jsx';


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
        <Route path='/registrousuarios' element={<Registrousuarios />} />
        <Route path='/sitemap' element={<Sitemap />} />
        <Route path='/perfumes' element={<Perfumes />} />
        <Route path='/chanel' element={<Chanel />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;