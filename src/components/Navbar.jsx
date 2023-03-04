import { NavLink } from "react-router-dom";

function Navbar(){
    // <NavLink to="/" style={({isActive}) => ({
    //     background: isActive && "red"
    // })}>Inicio</NavLink>
    // Por ahora el responsive del navbar solo utiliza flex-wrap: wrap;
    return(
        <div className="navbar">
            <div className="navbar__contenedor">
                <div className="navbar__paginas">
                    <NavLink className="navbar__link" to="/">Inicio</NavLink>
                    <NavLink className="navbar__link" to="/ofertas">Ofertas</NavLink>
                    <NavLink className="navbar__link" to="/cursos">Cursos</NavLink>
                </div>
                <div className="navbar__sesion">
                    <NavLink className="navbar__link" to="/registro">Registrarse</NavLink>
                    <NavLink className="navbar__link" to="/inicio-sesion">Iniciar sesión</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar;