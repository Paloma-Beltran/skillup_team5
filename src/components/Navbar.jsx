import { useRef } from "react";
import { NavLink } from "react-router-dom";

function Navbar(){
    // <NavLink to="/" style={({isActive}) => ({
    //     background: isActive && "red"
    // })}>Inicio</NavLink>

    let menu = useRef();

    const handleMenu = () => {
        menu.current.classList.toggle("activo");
    }

    const closeMenu = () => {
        menu.current.classList.remove("activo");
    }

    return(
        <div className="navbar">
            <div className="navbar__contenedor" ref={menu}>
                <div className="navbar__paginas">
                    {/* Hacer un componente especial al que le pasemos la ruta y el texto como children 
                    y automáticamente le ponga la clase navbar__link y los onClick*/}
                    <NavLink className="navbar__link" to="/" onClick={closeMenu}>Inicio</NavLink>
                    <NavLink className="navbar__link" to="/ofertas" onClick={closeMenu}>Ofertas</NavLink>
                    <NavLink className="navbar__link" to="/cursos" onClick={closeMenu}>Cursos</NavLink>
                    <NavLink className="navbar__link" to="/publicar" onClick={closeMenu}>Publicar</NavLink>
                </div>
                <div className="navbar__sesion">
                    <NavLink className="navbar__link" to="/registro" onClick={closeMenu}>Registrarse</NavLink>
                    <NavLink className="navbar__link" to="/inicio-sesion" onClick={closeMenu}>Iniciar sesión</NavLink>
                </div>
            </div>
            <div className="navbar__hamburguesa" onClick={handleMenu}>
                <div className="linea"></div>
                <div className="linea"></div>
                <div className="linea"></div>
            </div>
        </div>
    )
}

export default Navbar;