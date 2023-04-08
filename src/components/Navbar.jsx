import { useRef } from "react";
import { NavLink } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Navbar(){
    const { usuario, cerrarSesion } = useAuth();

    const menu = useRef();

    const handleMenu = () => {
        menu.current.classList.toggle("activo");
    }

    const closeMenu = () => {
        menu.current.classList.remove("activo");
    }

    const handleCerrarSesion = async () => {
        try{
            await cerrarSesion();
            closeMenu();
            //? Aquí no se usa navigate porque se ejecuta con el NavLink que ya redirecciona a la página de inicio
        } catch(err){
            console.log({err});
        }
    }

    return(
        <div className="navbar">
            {
                // Nombre de usuario
                usuario != null &&
                <div className="navbar__usuario" key={usuario.id}>
                    <img src={usuario.imgUrl} className="navbar__img" alt={`Foto de perfil de ${usuario.nombre}`} />
                    <h3 className="navbar__nombre">{usuario.nombre}</h3>
                </div>
            }
            <div className="navbar__contenedor" ref={menu}>
                <div className="navbar__paginas">
                    {/* Hacer un componente especial al que le pasemos la ruta y el texto como children 
                    y automáticamente le ponga la clase navbar__link y los onClick*/}
                    <NavLink className="navbar__link" to="/" onClick={closeMenu}>Inicio</NavLink>
                    <NavLink className="navbar__link" to="/ofertas" onClick={closeMenu}>Ofertas</NavLink>
                    <NavLink className="navbar__link" to="/cursos" onClick={closeMenu}>Cursos</NavLink>
                    {
                        usuario && usuario.rol == "empresa" && (
                            <NavLink className="navbar__link" to="/publicar" onClick={closeMenu}>Publicar</NavLink>
                        )
                    }
                </div>

                {
                    usuario == null ? (
                        <div className="navbar__sesion">
                            <NavLink className="navbar__link" to="/registro" onClick={closeMenu}>Registrarse</NavLink>
                            <NavLink className="navbar__link" to="/inicio-sesion" onClick={closeMenu}>Iniciar sesión</NavLink>
                        </div>
                    ) : (
                        <div className="navbar__sesion">
                            <NavLink className="navbar__link" to={`/${usuario.rol}/${usuario.id}`} onClick={closeMenu}>Mi perfil</NavLink>
                            <NavLink className="navbar__link" to="/" onClick={handleCerrarSesion}>Cerrar sesión</NavLink>
                        </div>
                    )
                }
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