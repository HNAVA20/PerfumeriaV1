import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import '../componentes/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Perfumería Divina Tentación</h3>
          <p>Dirección</p>
          <p>Tel: (311) 123-4567</p>
          <p>Email: contacto@divinatentacion.com</p>
        </div>
        <div className="footer-section">
          <h3>Enlaces Rápidos</h3>
          <ul>
            <li><Link to="/perfumes">Perfumes</Link></li>
            <li><Link to="/dama">Dama</Link></li>
            <li><Link to="/caballero">Caballero</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Síguenos</h3>
          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <h3><link to="/">Mapa del sitio</link></h3>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Perfumería Divina Tentación. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
