import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { obtenerOfertasEmpresa, obtenerCursosEmpresa, cambiarVerificacionEmpresa } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useDataUser } from "../hooks/useDataUser";
import { useTitle } from "../hooks/useTitle";

import Publicacion from "../components/Publicacion";
import { toast } from "react-hot-toast";

function PaginaEmpresa(){
    let { id: uid } = useParams();
    const { cargando, datosUsuario } = useDataUser(uid);
    // Para verificar si es el perfil de la propia empresa y poner los botones de editar
    const { usuario } = useAuth();

    const titulo = datosUsuario?.nombre && datosUsuario.nombre + " | SkillUp";
    useTitle(`${titulo || "SkillUp"}`);

    const [ofertas, setOfertas] = useState([]);
    const [cursos, setCursos] = useState([]);

    // Estado de verificada para actualizar la interfaz
    const [verificada, setVerificada] = useState(false);

    useEffect(() => {
        // Obtener las ofertas de esa empresa
        obtenerOfertasEmpresa(uid)
        .then(docs => {
            let docsOfertas = docs.map(doc => ({id: doc.id, data: doc.data()}))
            setOfertas(docsOfertas);
        });

        // Obtener los cursos de esa empresa
        obtenerCursosEmpresa(uid)
        .then(docs => {
            let docsCursos = docs.map(doc => ({id: doc.id, data: doc.data()}))
            setCursos(docsCursos);
        });
    }, [])

    useEffect(() => {
        // Si existe la empresa, se cambia si está verificada o no
        if(datosUsuario) setVerificada(datosUsuario.verificada);
    }, [datosUsuario])

    const toggleVerificada = async (idEmpresa) => {
        try{
            let nuevoEstado = !verificada;
    
            // Cambiar verificacion en firebase
            await cambiarVerificacionEmpresa(idEmpresa, nuevoEstado);
    
            // Cambiar verificacion en el frontend
            setVerificada(nuevoEstado);

            toast.success("Cambio de verificación exitoso");
        } catch(err){
            console.log({err});
            toast.error("Error al cambiar verificación");
        }
    }

    // Si está cargando se muestra el texto
    if(cargando) return <h2 className="contenedor titulo">Cargando perfil...</h2>

    // Si los datos de ese perfil no existen o si el rol no es empresa
    if(!datosUsuario || datosUsuario.rol != "empresa") return <h2 className="contenedor titulo">Perfil de empresa no existente</h2>

    return(
        <div className="usuario contenedor">
            <div className="usuario__datos">
                {
                    usuario && usuario.rol == "admin" && (
                        <button onClick={() => toggleVerificada(datosUsuario.id)} className={`boton boton-verificar ${verificada && "verificada"}`}>{!verificada ? "Verificar empresa" : "Quitar verificación"}</button>
                    )
                }
                <img src={datosUsuario.imgUrl} className="usuario__img" alt={`Foto de perfil de la empresa ${datosUsuario.nombre}`} />
                <div className="usuario__informacion">
                    {
                        // Si es dueño del perfil, se muestra el boton para editar
                        usuario != null && uid == usuario.id && (
                            <Link to="/editar-perfil" className="usuario__editar">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil usuario__editar-icon" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                                    <path d="M13.5 6.5l4 4"></path>
                                </svg>
                                Editar perfil
                            </Link>
                        )
                    }
                    <h2 className="usuario__nombre">
                        {datosUsuario.nombre}
                        {
                            verificada && (
                                <svg xmlns="http://www.w3.org/2000/svg" class="usuario__verificacion icon icon-tabler icon-tabler-discount-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#000" fill="#0af" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1"></path>
                                    <path d="M9 12l2 2l4 -4"></path>
                                </svg>
                            )
                        }
                    </h2>
                    {
                        //! Correo que solo puede ver el admin y el dueño del perfil
                        (usuario.rol == "admin" || uid == usuario.id) && <p className="usuario__correo">{datosUsuario.correo}</p>
                    }
                    <p className="usuario__direccion">{datosUsuario.direccion}</p>
                </div>
            </div>
            <div className="usuario__textos">

                <div className="usuario__texto">
                    <h2 className="usuario__titulo">Descripción</h2>
                    <p className="usuario__parrafo">{datosUsuario.descripcion}</p>
                </div>

                <div className="usuario__texto">
                    <h2 className="usuario__titulo">Ofertas</h2>
                    {
                        ofertas.length > 0 ? (
                            ofertas.map(oferta => (
                                <Publicacion documento={oferta} tipo="oferta" pagina="perfil" key={oferta.id} />
                            ))
                        ) : (
                            <p>No hay ofertas disponibles</p>
                        )
                    }
                </div>

                <div className="usuario__texto">
                    <h2 className="usuario__titulo">Cursos</h2>
                    {
                        cursos.length > 0 ? (
                            cursos.map(curso => (
                                <Publicacion documento={curso} tipo="curso" pagina="perfil" key={curso.id} />
                            ))
                        ) : (
                            <p>No hay cursos disponibles</p>
                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default PaginaEmpresa;