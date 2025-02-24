import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './componentes/NavBar.jsx';
import 
import caballero from './pages/caballero.jsx';
import dama from './pages/dama.jsx';
import ninos from './pages/infantil.jsx';
import sets from './pages/sets.jsx';
import unisex from './pages/unisex.jsx';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
