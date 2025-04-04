import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./stylecom/Breadcrumb.css";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div aria-label="breadcrumb" className="container-breadcrumbs">
      <ul className="breadcrumbs">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1; // Detectar la última miga
          return (
            <li key={to} className={isLast ? "last-breadcrumb" : ""}>
              {isLast ? (
                <span className="last-breadcrumb-text">{decodeURIComponent(value)}</span> // Cambiar el texto sin enlace
              ) : (
                <Link to={to}>{decodeURIComponent(value)}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
