import { Link } from "react-router-dom";
import "./stylecom/BackToHomeButton.css";

const BackToHomeButton = () => {
  return (
    <div className="back-to-home-container">
      <Link to="/" className="back-to-home-button">
        &#8592; Regresar al inicio
      </Link>
    </div>
  );
};

export default BackToHomeButton;