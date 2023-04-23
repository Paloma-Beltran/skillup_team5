import { Link } from "react-router-dom";

function ListaInteresados({cargandoInteresados, mostrandoInteresados, listaInteresados}){
    return(
        mostrandoInteresados && (
            cargandoInteresados == true ? (
                <p>Cargando interesados...</p>
            ) : (
                // Si el arreglo tiene elementos, se muestran los usuarios
                listaInteresados?.length > 0 ? (
                    <div className="publicacion__interesados">
                        <b>Interesados ({listaInteresados.length}):</b>
                        {
                            listaInteresados.map(usuarioInteresado => (
                                <Link className="publicacion__interesado" to={`/usuario/${usuarioInteresado.id}`} key={usuarioInteresado.id}>{usuarioInteresado.nombre}</Link>
                            ))
                        }
                    </div>
                ) : (
                    // Si no tiene elementos, se muestra que no hay interesados
                    listaInteresados?.length == 0 && (
                        <>
                            <b>Interesados (0):</b>
                            <p>No hay interesados</p>
                        </>
                    )
                )
            )
        )
    )
}

export default ListaInteresados;