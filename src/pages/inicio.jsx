import React from "react";
import '../styles/inicio.css';
import '../componentes/NavBar.jsx';
import FormContactanos from "../componentes/FormContactanos.jsx";

function Inicio() {
    return(
        <div>
            <h1>Hello World!</h1>
            <FormContactanos />
        </div>
    );
}

export default Inicio;