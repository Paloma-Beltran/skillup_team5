import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Navbar(){
    const [dark, setDark] = useState(false);
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

    const handleTheme = () => {
        document.body.classList.toggle("dark");
        setDark(!dark);
    }

    return(
        <nav className="navbar">
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

                <div className="navbar__sesion">
                    {
                        usuario == null ? (
                            <>
                                <NavLink className="navbar__link" to="/registro" onClick={closeMenu}>Registrarse</NavLink>
                                <NavLink className="navbar__link" to="/inicio-sesion" onClick={closeMenu}>Iniciar sesión</NavLink>
                            </>
                        ) : (
                            <>
                                {
                                    // Para ver el perfil necesitas ser usuario o empresa
                                    usuario.rol != "admin" && (
                                        <NavLink className="navbar__link" to={`/${usuario.rol}/${usuario.id}`} onClick={closeMenu}>Mi perfil</NavLink>
                                    )
                                }
                                <NavLink className="navbar__link" to="/" onClick={handleCerrarSesion}>Cerrar sesión</NavLink>
                            </>
                        )
                    }
                </div>
            </div>
            <span onClick={handleTheme} className="navbar__tema">
                {
                    dark ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brightness-up" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                            <path d="M12 5l0 -2"></path>
                            <path d="M17 7l1.4 -1.4"></path>
                            <path d="M19 12l2 0"></path>
                            <path d="M17 17l1.4 1.4"></path>
                            <path d="M12 19l0 2"></path>
                            <path d="M7 17l-1.4 1.4"></path>
                            <path d="M6 12l-2 0"></path>
                            <path d="M7 7l-1.4 -1.4"></path>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-moon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
                        </svg>
                    )
                }
            </span>
            <div className="navbar__hamburguesa" onClick={handleMenu}>
                <div className="linea"></div>
                <div className="linea"></div>
                <div className="linea"></div>
            </div>
        </nav>
    )
}

export default Navbar;