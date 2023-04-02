import { Link, useParams } from "react-router-dom";
import { useDataUser } from "../hooks/useDataUser";
import { useAuth } from "../context/AuthContext";

function PaginaUsuario(){
    let { id: uid } = useParams();
    const {cargando, datosUsuario} = useDataUser(uid);
    const { usuario } = useAuth();

    // Si está cargando se muestra el texto
    if(cargando) return <h2 className="contenedor titulo">Cargando perfil...</h2>

    // Si los datos de ese perfil no existen o si el rol no es usuario
    if(!datosUsuario || datosUsuario.rol != "usuario") return <h2 className="contenedor titulo">Perfil de usuario no existente</h2>

    return(
        <div className="usuario contenedor">
            <div className="usuario__datos">
                <img src="https://i.pravatar.cc/100" className="usuario__img" alt="Foto de perfil del usuario" />
                <div className="usuario__informacion">
                    {
                        // Si es dueño del perfil, se muestra el boton para editar
                        usuario != null && uid == usuario.id && (
                            <Link to="/editar-perfil">Editar perfil</Link>
                        )
                    }
                    <h2 className="usuario__nombre">{datosUsuario.nombre}</h2>
                    <p className="usuario__carrera">{datosUsuario.carrera}</p>
                    <p className="usuario__centro">{datosUsuario.institucion}</p>
                </div>
            </div>
            <div className="usuario__textos">
                <div className="usuario__texto">
                    <h2 className="usuario__titulo">Descripción</h2>
                    <p className="usuario__parrafo">{datosUsuario.descripcion}</p>
                </div>
                <div className="usuario__texto">
                    <h2 className="usuario__titulo">Habilidades</h2>
                    <p className="usuario__parrafo">{datosUsuario.habilidades}</p>
                </div>
            </div>
        </div>
    )
}

export default PaginaUsuario;