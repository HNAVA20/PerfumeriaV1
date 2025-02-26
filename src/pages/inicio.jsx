import React from "react";
import '../styles/inicio.css';
import '../componentes/NavBar.jsx';
import Form from "../componentes/FormRegistro.jsx";

function Inicio() {
    return(
        <div>
            <h1>Hello World!</h1>
            <Form />
        </div>
    );
}

export default Inicio;