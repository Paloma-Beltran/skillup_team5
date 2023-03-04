import { useParams } from "react-router-dom";

function PaginaUsuario(){
    let { id } = useParams();

    return(
        <div className="contenedor">
            <h1>Perfil Usuario { id }</h1>
        </div>
    )
}

export default PaginaUsuario;