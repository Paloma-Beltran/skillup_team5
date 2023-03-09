import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerOfertas } from "../firebase";

function PaginaOfertas(){
    let [cargando, setCargando] = useState(true);
    let [ofertas, setOfertas] = useState([]);

    useEffect(() => {
        setCargando(true);

        const guardarEstadoOfertas = async () => {
            let docs = await obtenerOfertas();
            setOfertas(docs);
            setCargando(false);
        }
        guardarEstadoOfertas();
    }, [])

    /* 
        titulo          Titulo
        estado          Estado verde o rojo
        empresa         Perfil de la empresa (hipervinculo) poner id empresa
        descripcion     Descripción del cargo
        dinero          Sueldo
        duracion        Duración
        dirigido        A quién va dirigido
        modalidad       Modalidad
        etiquetas       Etiquetas personalizables
    */

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
                        <h3 className="titulo">Cargando...</h3>
                    ) : (
                        // ! PONER BOTON "ME INTERESA"
                        ofertas && ofertas.map(oferta => (
                            <div className="publicacion" key={oferta.id}>
                                {/* <p>ID: {oferta.id}</p> */}
                                <h2 className="publicacion__titulo">{oferta.data.titulo}</h2>
                                <div className="publicacion__estado">
                                    <div className={`publicacion__estado-indicador ${!oferta.data.estado && "inactiva"}`}></div>
                                    <p className="publicacion__estado-texto">{oferta.data.estado ? "Activa" : "Inactiva"}</p>
                                </div>
                                <Link to="#" className="publicacion__empresa">Nombre empresa</Link>
                                <b>Descripción:</b>
                                <p className="publicacion__descripcion">{oferta.data.descripcion}</p>
                                <hr />
                                <span className="publicacion__dinero"><b>Sueldo:</b> ${oferta.data.dinero}</span>
                                <span className="publicacion__duracion"><b>Duración:</b> {oferta.data.duracion}</span>
                                <span className="publicacion__dirigido"><b>Dirigido a:</b> {oferta.data.dirigido}</span>
                                <span className="publicacion__modalidad"><b>Modalidad:</b> {oferta.data.modalidad}</span>
                                <div className="publicacion__etiquetas">
                                    <b>Etiquetas: </b>
                                    {
                                        oferta.data.etiquetas ? (
                                            oferta.data.etiquetas.map(etiqueta => (
                                                <span className="publicacion__etiqueta" key={etiqueta}>{etiqueta}</span>
                                            ))
                                        ) : <span>Sin etiquetas</span>
                                    }
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default PaginaOfertas;