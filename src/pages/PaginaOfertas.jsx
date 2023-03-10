import { obtenerOfertas } from "../firebase";
import Publicacion from "../components/Publicacion";
import { useDocs } from "../hooks/useDocs";

function PaginaOfertas(){
    // Custom hook que obtiene los documentos de la función de firebase
    let { cargando, documentos: ofertas } = useDocs(obtenerOfertas);

    return(
        <div className="contenedor">
            <h1 className="titulo">Ofertas de trabajo</h1>
            { 
            //! PONER UN COMPONENTE DE FILTRO QUE SE PUEDA UTILIZAR EN OFERTAS Y CURSOS
            //! FILTRAR POR CARRERA POR LO PRONTO
            }
            <div className="publicaciones">
                {
                    cargando ? (
                        <h3 className="titulo">Cargando ofertas...</h3>
                    ) : (
                        ofertas && ofertas.map(oferta => (
                            <Publicacion documento={oferta}  tipo={"oferta"} key={oferta.id} />
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default PaginaOfertas;