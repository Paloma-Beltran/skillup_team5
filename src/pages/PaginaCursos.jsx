import { obtenerCursos } from "../firebase";
import Publicacion from '../components/Publicacion';
import { useDocs } from "../hooks/useDocs";

function PaginaCursos(){
    // Custom hook que obtiene los documentos de la función de firebase
    let { cargando, documentos: cursos } = useDocs(obtenerCursos);

    return(
        <div className="contenedor">
            <h1 className="titulo">Cursos</h1>
            { 
            //! PONER UN COMPONENTE DE FILTRO QUE SE PUEDA UTILIZAR EN OFERTAS Y CURSOS
            //! FILTRAR POR CARRERA POR LO PRONTO
            }
            <div className="publicaciones">
                {
                    cargando ? (
                        <h3 className="titulo">Cargando cursos...</h3>
                    ) : (
                        cursos && cursos.map(curso => (
                            <Publicacion documento={curso} tipo={"curso"} key={curso.id} />
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default PaginaCursos;