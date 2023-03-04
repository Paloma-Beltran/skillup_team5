import { useParams } from "react-router-dom";

function PaginaEmpresa(){
    let { id } = useParams();

    return(
        <div className="contenedor">
            <h1>Perfil Empresa { id }</h1>
        </div>
    )
}

export default PaginaEmpresa;