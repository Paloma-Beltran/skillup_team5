import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerUsuario } from "../firebase";

function Publicacion({ documento: doc, tipo }){
    /* 
        titulo          Titulo
        estado          Estado verde o rojo
        empresa         Perfil de la empresa (hipervinculo) poner id empresa
        descripcion     Descripción
        dinero          Sueldo o costo (dependiendo del tipo)
        duracion        Duración
        dirigido        A quién va dirigido
        modalidad       Modalidad
        etiquetas       Etiquetas personalizables
    */
    //! PONER BOTON "ME INTERESA"
    const [nombreEmpresa, setNombreEmpresa] = useState("");
    // Se obtiene el nombre de la empresa con el id (se debe obtener aquí por si el nombre fue cambiado recientemente)
    useEffect(() => {
        const obtenerNombreEmpresa = async () => {
            let { nombre } = await obtenerUsuario(doc.data.idEmpresa);
            setNombreEmpresa(nombre);
        }
        obtenerNombreEmpresa();
    }, [])

    return(
        <div className="publicacion" key={doc.id}>
            {/* <p>ID: {doc.id}</p> */}
            <h2 className="publicacion__titulo">{doc.data.titulo}</h2>
            <div className="publicacion__estado">
                <div className={`publicacion__estado-indicador ${!doc.data.estado && "inactiva"}`}></div>
                <p className="publicacion__estado-texto">{doc.data.estado ? "Activa" : "Inactiva"}</p>
            </div>
            <Link to={`/empresa/${doc.data.idEmpresa}`} className="publicacion__empresa">{nombreEmpresa}</Link>
            <b>Descripción:</b>
            <p className="publicacion__descripcion">{doc.data.descripcion}</p>
            <hr />
            <span className="publicacion__dinero"><b>{tipo == "Oferta" ? "Sueldo" : "Costo"}:</b> ${doc.data.dinero}</span>
            <span className="publicacion__duracion"><b>Duración:</b> {doc.data.duracion}</span>
            <span className="publicacion__dirigido"><b>Dirigido a:</b> {doc.data.dirigido}</span>
            <span className="publicacion__modalidad"><b>Modalidad:</b> {doc.data.modalidad}</span>
            <div className="publicacion__etiquetas">
                <b>Etiquetas: </b>
                {
                    doc.data.etiquetas.length > 0 ? (
                        doc.data.etiquetas.map(etiqueta => (
                            <span className="publicacion__etiqueta" key={etiqueta}>{etiqueta}</span>
                        ))
                    ) : <span>Sin etiquetas</span>
                }
            </div>
        </div>
    )
}

export default Publicacion;