import { useState } from "react";
import { obtenerOfertas } from "../firebase";
import { useDocs } from "../hooks/useDocs";

import FiltroPublicaciones from "../components/FiltroPublicaciones";
import Publicacion from "../components/Publicacion";

function PaginaOfertas(){
    // Custom hook que obtiene los documentos de la función de firebase
    let { cargando, documentos, setDocumentos } = useDocs(obtenerOfertas);
    let [filtradas, setFiltradas] = useState([]);

    const actualizarEstadoDocumento = (docId, nuevoEstado) => {
        let documentosActualizados = [...documentos].map(documento => {
            if(documento.id != docId) return documento;

            let documentoActualizado = {
                id: documento.id,
                data: {...documento.data}
            }
            documentoActualizado.data.estado = nuevoEstado;
            
            return documentoActualizado;
        });
        setDocumentos(documentosActualizados);
    }

    return(
        <div className="contenedor">
            <h1 className="titulo">Ofertas de trabajo</h1>

            <FiltroPublicaciones publicaciones={documentos} setFiltradas={setFiltradas} />

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
                                <Publicacion documento={doc} tipo={"oferta"} key={doc.id} actualizarEstadoDocumento={actualizarEstadoDocumento}/>
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