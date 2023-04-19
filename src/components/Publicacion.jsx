import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cambiarEstadoPublicacion, cambiarInteresUsuario, obtenerPublicacion, obtenerUsuario } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import ListaInteresados from "./ListaInteresados";

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
    // Estado para poder actualizar la interfaz y para utilizarlo al cambiarlo en la base de datos
    const [estado, setEstado] = useState(doc.data.estado);
    // Estado de interesado para actualizar la interfaz
    const [interesado, setInteresado] = useState(false);
    // Nombre de la empresa para mostrar en la publicación
    const [nombreEmpresa, setNombreEmpresa] = useState("");
    // Si el usuario actual es el dueño de la publicación aparecerá un boton para cambiar el estado
    const [creador, setCreador] = useState(false);
    // Para mostrar en la ventana modal
    const [listaInteresados, setListaInteresados] = useState(null);
    const [mostrandoInteresados, setMostrandoInteresados] = useState(false);
    const [cargandoInteresados, setCargandoInteresados] = useState(false);

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

        // Si existe el usuario, se cambia si está interesado o no
        if(usuario) setInteresado(doc.data?.interesados?.includes(usuario.id) || false);
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
            toast.error("Hubo un error al cambiar el estado de la publicación");
        }
    }

    const toggleMeInteresa = async (docId) => {
        try{
            let nuevoInteres = !interesado;

            // A la publicacion con ese id, cambiarle el arreglo con los interesados
            await cambiarInteresUsuario(docId, usuario.id, nuevoInteres, tipo);

            // Cambiar en el frontend
            setInteresado(nuevoInteres);
        } catch(err){
            // console.log({err});
            toast.error("Hubo un error al registrar interés");
        }
    }

    const toggleInteresados = async (docId) => {
        // Obtener documento
        try{
            let interesados;

            // Si se están mostrando los interesados, se ocultan
            setMostrandoInteresados(!mostrandoInteresados);

            setCargandoInteresados(true);
            // Se obtiene la publicación actualizada
            let { datos } = await obtenerPublicacion(docId, tipo);

            // Si hay suficientes interesados, se recorren y se obtienen los datos
            if(datos.interesados.length > 0){
                // Se obtienen los datos de cada usuario interesado (devuelve promesas)
                let promesasInteresados = datos.interesados.map(async (idInteresado) => {
                    let { nombre, id } = await obtenerUsuario(idInteresado);
                    return { nombre, id }
                })
                // Se espera a que se terminen las promesas para obtener los valores
                interesados = await Promise.all(promesasInteresados);
            }
            
            // Se guardan los interesados
            setListaInteresados(interesados || []);
            setCargandoInteresados(false);
        } catch(err){
            console.log({err});
            toast.error("Hubo un error");
        }
    }

    return(
        <div className={`publicacion ${!estado && "inactiva"}`} key={doc.id}>
            {/* <p>ID: {doc.id}</p> */}
            <h2 className="publicacion__titulo">{doc.data.titulo}</h2>

            {/* Estado de la publicación */}
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
            
            {/* Etiquetas */}
            <div className="publicacion__etiquetas">
                <b>Etiquetas: </b>
                {
                    doc.data.etiquetas.length > 0 ? (
                        doc.data.etiquetas.map(etiqueta => (
                            <span className="publicacion__etiqueta" key={etiqueta}>#{etiqueta}</span>
                        ))
                    ) : <span>Sin etiquetas</span>
                }
            </div>

            {/* Botones de interes */}
            {
                estado == 1 && (
                    <>
                        <hr />
                        <div className="publicacion__interes">
                            {
                                usuario && usuario.rol == "usuario" && (
                                    <button onClick={() => toggleMeInteresa(doc.id)} className={`boton publicacion__interes-boton ${interesado && "interesado"}`}>
                                        {!interesado ? "Me interesa" : "Ya no me interesa"}
                                    </button>
                                )
                            }
                            <button onClick={() => toggleInteresados(doc.id)} className="boton publicacion__ver-interesados">{!mostrandoInteresados ? "Mostrar interesados" : "Ocultar interesados"}</button>
                        </div>
                    </>
                )
            }
            
            {/* Interesados */}
            <ListaInteresados cargandoInteresados={cargandoInteresados} mostrandoInteresados={mostrandoInteresados} listaInteresados={listaInteresados} />
        </div>
    )
}

export default Publicacion;