import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../componentes/Breadcrumb.css";


const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div aria-label="breadcrumb">
      <ul className="breadcrumbs">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          return (
            <li key={to}>
              <Link to={to}>{decodeURIComponent(value)}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
