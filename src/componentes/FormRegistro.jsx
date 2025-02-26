import { useState } from "react";  
import "../componentes/FormRegistro.css";

const Form = () => { 
  const [values, setValues] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleForm = (event) => {
    event.preventDefault();
    const { name, lastName, email, password, } = values;

    if (!name || !lastName || !email || !password) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    if (!/^[a-zA-Z0-9]{6,}$/.test(password)) {
      alert("La contraseña debe tener al menos 6 caracteres y solo puede contener letras y números.");
      return;
    }


    console.log(values);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleForm}>
        <h1>REGISTRATE</h1>
        <input
          type="text"
          name="name"
          value={values.name}
          placeholder="Ingrese su nombre"
          onChange={handleInputChange}
          required
          minLength="2"
        />
        <input
          type="text"
          name="lastName"
          value={values.lastName}
          placeholder="Ingrese su apellido"
          onChange={handleInputChange}
          required
          minLength="2"
        />
        <input
          type="email"
          name="email"
          value={values.email}
          placeholder="Ingrese su e-mail"
          autoComplete="off"
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          value={values.password}
          placeholder="Ingrese su contraseña"
          onChange={handleInputChange}
          required
          minLength="6"
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Form;
