import { useState } from "react";
import { obtenerOfertas } from "../firebase";
import { useDocs } from "../hooks/useDocs";

import FiltroPublicaciones from "../components/FiltroPublicaciones";
import Publicacion from "../components/Publicacion";

function PaginaOfertas(){
    // Custom hook que obtiene los documentos de la función de firebase
    let { cargando, documentos: ofertas } = useDocs(obtenerOfertas);
    let [filtradas, setFiltradas] = useState([]);

    return(
        <div className="contenedor">
            <h1 className="titulo">Ofertas de trabajo</h1>

            <FiltroPublicaciones publicaciones={ofertas} setFiltradas={setFiltradas} />

            <div className="publicaciones">
                <p className="publicaciones__total">Total: {filtradas.length}</p>
                {
                    cargando ? (
                        // Si está cargando se muestra el texto
                        <h3 className="titulo">Cargando ofertas...</h3>
                    ) : (
                        filtradas.length ? (
                            //Si hay publicaciones, se muestran
                            filtradas.map(doc => (
                                <Publicacion documento={doc} tipo={"oferta"} key={doc.id} />
                            ))
                        ) : (
                            // Si no hay publicaciones, se muestra que no hay ofertas
                            <h3 className="titulo">No hay ofertas</h3>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default PaginaOfertas;