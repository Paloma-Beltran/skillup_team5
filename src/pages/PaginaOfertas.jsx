import { useEffect, useState } from "react";
import { obtenerOfertas } from "../firebase";

function PaginaOfertas(){
    let [ofertas, setOfertas] = useState([]);

    useEffect(() => {
        const guardarEstadoOfertas = async () => {
            let docs = await obtenerOfertas();
            setOfertas(docs);
        }
        guardarEstadoOfertas();
    }, [])

    return(
        <div className="contenedor">
            <h1>Ofertas de trabajo</h1>
            {
                ofertas && ofertas.map(oferta => (
                    <div className="contenedor" key={oferta.id}>
                        <p>ID: {oferta.id}</p>
                        <h2>{oferta.data.titulo}</h2>
                        <p>{oferta.data.descripcion}</p>
                    </div>
                ))
            }
            <p>Poner grid con las ofertas de trabajo, ya sean cuadros o en forma de lista</p>
            <p>Poner las descripciones</p>
        </div>
    )
}

export default PaginaOfertas;