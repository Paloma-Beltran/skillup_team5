import { Link } from "react-router-dom";

function PaginaInicio(){
    return(
        <div className="contenedor">
            <h1>Inicio</h1>
            <p>Poner información de la pagina</p>
            <Link to="/usuario/1">Ejemplo perfil usuario</Link><br />
            <Link to="/empresa/2">Ejemplo perfil empresa</Link>
        </div>
    )
}

export default PaginaInicio;