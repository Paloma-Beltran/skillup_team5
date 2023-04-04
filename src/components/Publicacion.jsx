import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cambiarEstadoPublicacion, obtenerUsuario } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

function Publicacion({ documento: doc, tipo, actualizarEstadoDocumento=null }){
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
    // Se guarda el estado para poder actualizar la interfaz y para utilizarlo al cambiarlo en la base de datos
    const [estado, setEstado] = useState(doc.data.estado);
    const [nombreEmpresa, setNombreEmpresa] = useState("");
    // Si el usuario actual es el dueño de la publicación aparecerá un boton para cambiar el estado
    const [creador, setCreador] = useState(false);
    let { usuario } = useAuth(); // Para verificar si es la publicación de la empresa actual

    useEffect(() => {
        // Se obtiene el nombre de la empresa con el id (se debe obtener aquí por si el nombre fue cambiado recientemente)
        const obtenerNombreEmpresa = async () => {
            let { nombre } = await obtenerUsuario(doc.data.idEmpresa);
            setNombreEmpresa(nombre);
        }
        obtenerNombreEmpresa();
    }, [])
    
    useEffect(() => {
        // Verificar si es el dueño de la publicación para mostrar el boton de activar o desactivar
        setCreador(false);
        if(usuario && usuario.id == doc.data.idEmpresa){
            setCreador(true);
        }
    }, [usuario])

    const toggleEstado = async (docId) => {
        try{
            let nuevoEstado = (estado + 1) % 2;
            // Cambiar el estado de la publicación en la base de datos
            await cambiarEstadoPublicacion(docId, nuevoEstado, tipo); 

            // Cambiar el estado de la publicación en el frontend
            setEstado(nuevoEstado);

            // Actualizar en el arreglo de documentos (Sirve para el filtro)
            // Si se edita desde el perfil no se necesita actualizar el arreglo de documentos, solo el frontend y la db
            if(actualizarEstadoDocumento != null) actualizarEstadoDocumento(docId, nuevoEstado);

            if(nuevoEstado == 1){
                toast.success("Publicación activada");
            } else {
                toast.success("Publicación desactivada");
            }
        } catch(err){
            // console.log({err});
            toast.error("Hubo un error al cambiar el estado");
        }
    }

    return(
        <div className={`publicacion ${!estado && "inactiva"}`} key={doc.id}>
            {/* <p>ID: {doc.id}</p> */}
            <h2 className="publicacion__titulo">{doc.data.titulo}</h2>
            <div className="publicacion__estado">
                <div className={`publicacion__estado-indicador ${estado == 0 && "inactiva"}`}></div>
                <p className="publicacion__estado-texto">{estado == 1 ? "Activa" : "Inactiva"}</p>
                {
                    creador && (
                        <button onClick={() => toggleEstado(doc.id)} className="boton publicacion__estado-boton">
                            {estado == 1 ? "Desactivar" : "Activar"}
                        </button>
                    )
                }
            </div>
            <Link to={`/empresa/${doc.data.idEmpresa}`} className="publicacion__empresa">{nombreEmpresa}</Link>
            <b>Descripción:</b>
            <p className="publicacion__descripcion">{doc.data.descripcion}</p>
            <hr />
            <span className="publicacion__dinero"><b>{tipo == "oferta" ? "Sueldo" : "Costo"}:</b> ${doc.data.dinero}</span>
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