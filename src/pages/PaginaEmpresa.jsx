import { useParams } from "react-router-dom";
import { useDataUser } from "../hooks/useDataUser";

function PaginaUsuario(){
    let { id: uid } = useParams();
    const {cargando, datosUsuario} = useDataUser(uid);

    // Si está cargando se muestra el texto
    if(cargando) return <h2 className="contenedor titulo">Cargando perfil...</h2>

    // Si los datos de ese perfil no existen o si el rol no es empresa
    if(!datosUsuario || datosUsuario.rol != "empresa") return <h2 className="contenedor titulo">Perfil de empresa no existente</h2>

    return(
        <div className="usuario contenedor">
            <div className="usuario__datos">
                <img src="https://i.pravatar.cc/100" className="usuario__img" alt="Foto de perfil del usuario" />
                <div className="usuario__informacion">
                    <h2 className="usuario__nombre">{datosUsuario.nombre}</h2>
                </div>
            </div>
            <div className="usuario__textos">
                <div className="usuario__texto">
                    <h2 className="usuario__titulo">Descripción</h2>
                    <p className="usuario__parrafo">{datosUsuario.descripcion}</p>
                </div>
                <div className="usuario__texto">
                    <h2 className="usuario__titulo">Ofertas o cursos</h2>
                    <p className="usuario__parrafo">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa vitae illo dicta eum eaque, eligendi molestiae maiores! Maxime, earum esse nulla cum, repellendus magni optio sed suscipit autem sint sapiente?</p>
                </div>
            </div>
        </div>
    )
}

export default PaginaUsuario;