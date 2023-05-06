import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { borrarFotoPerfil, borrarCurriculumPerfil, subirCurriculum, subirFotoPerfil, subirComprobante, borrarComprobantePerfil } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useTitle } from "../hooks/useTitle";
import { toast } from "react-hot-toast";
import { deleteField } from "firebase/firestore";

function FormEditarPerfil(){
    useTitle("Editar perfil | SkillUp");

    const navigate = useNavigate();
    const { usuario, editarPerfil, actualizarUsuario } = useAuth();

    // Datos del dueño del perfil
    const [datos, setDatos] = useState(null);

    // Estados para subir los archivos
    const [fileFoto, setFileFoto] = useState(null);
    const [fileCurriculum, setFileCurriculum] = useState(null);
    const [fileComprobante, setFileComprobante] = useState(null);

    // Estado para renderizar la foto en el frontend
    const [foto, setFoto] = useState(null);
    const [borrarFoto, setBorrarFoto] = useState(false);
    // Estado para renderizados del curriculum
    const [curriculum, setCurriculum] = useState(false); // true o false
    const [borrarCurriculum, setBorrarCurriculum] = useState(false);
    // Estado para renderizados del comprobante
    const [comprobante, setComprobante] = useState(false); // true o false
    const [borrarComprobante, setBorrarComprobante] = useState(false);

    // Para guardar el "estado" de la nueva imagen y curriculum para editar el perfil y actualizar al mismo tiempo
    // Si se utiliza useState, en el cambio entre actualización de img y curriculum todavía no se actualiza el estado
    let urlImg, urlCurriculum, urlComprobante;

    // Para cuando se obtenga el usuario al renderizar el componente
    useEffect(() => {
        setDatos(usuario);
        if(usuario) {
            setFoto(usuario.imgUrl);
            setCurriculum(usuario.curriculumUrl ? true : false);
            setComprobante(usuario.comprobanteUrl ? true : false);
        }
    }, [usuario])

    const actualizarFoto = async () => {
        // Subir imagen si se cambió el input file
        urlImg = datos.imgUrl; // por defecto es la imagen que ya tenía antes
        if(fileFoto){
            //? Se utilizan los parentesis para que no se interprete como un bloque de código
            //? sino como una expresión a evaluar
            ({ url:urlImg } = await subirFotoPerfil(fileFoto, datos.id));
            // console.log({datosImg, urlImg});
        }

        // Si se quiso borrar la foto, se borra del storage y de firestore
        if(borrarFoto){
            await borrarFotoPerfil(datos.id);

            // Esto es para quitar de firestore al editar
            urlImg = "";
        }
    }

    const actualizarCurriculum = async () => {
        // Subir archivo con funcion de firebase
        urlCurriculum = datos.curriculumUrl;
        if(fileCurriculum){
            ({ url:urlCurriculum } = await subirCurriculum(fileCurriculum, datos.id));
            // console.log({ datosCurriculum, urlCurriculum });
        }

        // Si se quiso borrar el curriculum, se borra del storage y de firestore
        if(borrarCurriculum){
            // Si no existe el curriculum, se ignora el error
            try{
                await borrarCurriculumPerfil(datos.id);
            } catch(err){ }

            // Esto es para quitar de firestore al editar
            urlCurriculum = "";
        }
    }

    const actualizarComprobante = async () => {
        // Subir archivo con funcion de firebase
        urlComprobante = datos.comprobanteUrl;
        if(fileComprobante){
            ({ url:urlComprobante } = await subirComprobante(fileComprobante, datos.id));
            // console.log({ datosComprobante, urlComprobante });
        }

        // Si se quiso borrar el comprobante, se borra del storage y de firestore
        if(borrarComprobante){
            // Si no existe el comprobante, se ignora el error
            try{
                await borrarComprobantePerfil(datos.id);
            } catch(err){ }

            // Esto es para quitar de firestore al editar
            urlComprobante = "";
        }
    }

    const handleSubmit = async e => {
        // Realiza todos los cambios al perfil
        e.preventDefault();
        
        try{
            // Se suben los archivos y se actualizan las variables para editar el perfil
            await actualizarFoto();
            if(datos.rol == "usuario") await actualizarCurriculum();
            if(datos.rol == "empresa") await actualizarComprobante();

            // Actualizamos el perfil con la información nueva
            // deleteField() es para cuando se borran esos archivos y así eliminar los links de firestore
            await editarPerfil(datos.id, {
                ...datos,
                imgUrl: urlImg || deleteField(),
                curriculumUrl: urlCurriculum || deleteField(),
                comprobanteUrl: urlComprobante || deleteField()
            });

            // Se actualizan los datos del usuario con la sesión activa
            await actualizarUsuario(datos.id);
            
            // console.log("Perfil editado", datos);
            toast.success("Perfil editado correctamente");
            
            navigate(`/${datos.rol}/${datos.id}`);
        } catch(err){
            console.log({err});
            toast.error("Hubo un error");
        }
    }

    //? Para la información de los inputs que no son de archivos
    const handleInput = e => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }

    //? Obtiene la foto, la lee como URL y la guarda en el estado
    const handleInputFoto = async e => {
        // Para que no borre la foto del storage si es que antes se le dio al boton
        setBorrarFoto(false);

        const file = e.target.files[0];

        let reader = new FileReader();
        
        reader.onload = res => {
            let result = res.target.result;
            
            // Se va a cambiar la imagen pero solo va a ser visual, aquí no se actualiza en storage
            setFoto(result);
        }
        
        reader.readAsDataURL(file);
        
        // Se guarda el archivo para después subilo a storage
        setFileFoto(file);

        // Se limpia el input para poder subir varias veces la misma imagen después de darle al boton de borrar foto
        e.target.value = "";
    }

    const handleBorrarFoto = async () => {
        // El file se limpia
        setFileFoto(null);
        
        // Se marca para borrar la foto de storage
        setBorrarFoto(true);

        // Se renderiza la imagen por defecto
        setFoto(`https://ui-avatars.com/api/?name=${encodeURI(datos.nombre)}&background=555&color=fff&uppercase=true`);
    }

    //? Obtiene el curriculum y lo guarda en el estado
    const handleInputCurriculum = e => {
        // Para que no borre el curriculum del storage si es que antes se le dio al boton
        setBorrarCurriculum(false);

        const file = e.target.files[0];
        if(!file) return; // Si no subió ningún archivo, se sale

        if(file.type == "application/pdf"){
            // Aquí no se lee el archivo como URL porque no necesita renderizarlo
            // Solamente se guarda la referencia para después subirlo a storage
            setFileCurriculum(file);

            // Se va a cambiar el estado del curriculum para renderizar los botones
            setCurriculum(true);

            toast.success("Currículum cargado correctamente");
        } else {
            toast.error("Solo PDF permitidos");
        }

        // Se limpia el input para poder subir varias veces el mismo archivo después de darle al boton de borrar
        e.target.value = "";
    }

    const handleBorrarCurriculum = async () => {
        // El file se limpia
        setFileCurriculum(null);
        
        // Se marca para borrar el curriculum de storage
        setBorrarCurriculum(true);

        // Para mostrar el mensaje de si hay curriculum o no
        setCurriculum(false);

        if(curriculum) toast.success("Eliminando curriculum");
        else toast.error("No hay curriculum");
    }

    //? Obtiene el comprobante y lo guarda en el estado
    const handleInputComprobante = e => {
        // Para que no borre el comprobante del storage si es que antes se le dio al boton
        setBorrarComprobante(false);

        const file = e.target.files[0];
        if(!file) return; // Si no subió ningún archivo, se sale

        if(file.type == "application/pdf"){
            // Aquí no se lee el archivo como URL porque no necesita renderizarlo
            // Solamente se guarda la referencia para después subirlo a storage
            setFileComprobante(file);

            // Se va a cambiar el estado del comprobante para renderizar los botones
            setComprobante(true);

            toast.success("Comprobante cargado correctamente");
        } else {
            toast.error("Solo PDF permitidos");
        }

        // Se limpia el input para poder subir varias veces el mismo archivo después de darle al boton de borrar
        e.target.value = "";
    }

    const handleBorrarComprobante = async () => {
        // El file se limpia
        setFileComprobante(null);
        
        // Se marca para borrar el comprobante de storage
        setBorrarComprobante(true);

        // Para mostrar el mensaje de si hay comprobante o no
        setComprobante(false);

        if(comprobante) toast.success("Eliminando comprobante");
        else toast.error("No hay comprobante");
    }

    // Si todavía no se cargan los datos
    if(!datos) return <h2 className="contenedor titulo">Cargando...</h2>

    return(
        <div className="contenedor">
            <h1 className="titulo">Editar perfil</h1>

            <form className="form formEditar" onSubmit={handleSubmit}>
                <div className="formEditar__cambiar-foto">
                    <img src={foto} className="formEditar__foto" alt={`Imagen de perfil de ${datos.nombre}`} />
                    <div className="formEditar__botones">
                        <label htmlFor="inpFoto" className="boton formEditar__boton">Cambiar foto de perfil</label>
                        <input type="file" name="imagen" id="inpFoto" onInput={handleInputFoto} style={{display: "none"}} />
                        <button type="button" className="boton boton--rojo formEditar__boton" onClick={handleBorrarFoto}>Borrar foto</button>
                    </div>
                </div>
                {
                    datos.rol == "usuario" ? (
                        <>
                            <div className="form__apartado">
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                    name="nombre"
                                    id="nombre"
                                    className="form__input"
                                    type="text"
                                    onInput={handleInput}
                                    value={datos.nombre}
                                    required
                                />
                            </div>

                            <div className="form__apartado">
                                <label htmlFor="carrera">Carrera</label>
                                <input
                                    name="carrera"
                                    id="carrera"
                                    className="form__input"
                                    type="text"
                                    onInput={handleInput}
                                    value={datos.carrera}
                                    required
                                />
                            </div>
                            
                            <div className="form__apartado">
                                <label htmlFor="institucion">Institución</label>
                                <input
                                    name="institucion"
                                    id="institucion"
                                    className="form__input"
                                    type="text"
                                    onInput={handleInput}
                                    value={datos.institucion}
                                    required
                                />
                            </div>

                            <div className="form__apartado">
                                <label htmlFor="telefono">Número de teléfono</label>
                                <input
                                    name="telefono"
                                    id="telefono"
                                    className="form__input"
                                    type="tel"
                                    onInput={handleInput}
                                    value={datos.telefono}
                                    minLength={10}
                                    maxLength={10}
                                    pattern="\d{10}" // Solo acepta dígitos
                                    title="Introduce 10 dígitos"
                                    required
                                />
                            </div>

                            <div className="form__apartado">
                                <label htmlFor="descripcion">Descripción</label>
                                <textarea
                                    name="descripcion"
                                    id="descripcion"
                                    className="form__input"
                                    cols="30"
                                    rows="10"
                                    onInput={handleInput}
                                    value={datos.descripcion}
                                    required>
                                </textarea>
                            </div>

                            <div className="form__apartado">
                                <label htmlFor="habilidades">Habilidades</label>
                                <textarea
                                    name="habilidades"
                                    id="habilidades"
                                    className="form__input"
                                    cols="30"
                                    rows="10"
                                    onInput={handleInput}
                                    value={datos.habilidades}
                                    required>
                                </textarea>
                            </div>

                            <div className="formEditar__archivo">
                                <label htmlFor="inpCurriculum" className="usuario__editar">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-upload usuario__editar-icon" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                                        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                                        <path d="M12 11v6"></path>
                                        <path d="M9.5 13.5l2.5 -2.5l2.5 2.5"></path>
                                    </svg>
                                    Subir currículum
                                </label>
                                <input type="file" name="curriculum" id="inpCurriculum" onInput={handleInputCurriculum} accept=".pdf" style={{display: "none"}}></input>
                                {
                                    curriculum && (
                                        <button type="button" className="boton boton--rojo formEditar__btn-archivo" onClick={handleBorrarCurriculum}>Borrar curriculum</button>
                                    )
                                }
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="form__apartado">
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                    name="nombre"
                                    id="nombre"
                                    className="form__input"
                                    type="text"
                                    onInput={handleInput}
                                    value={datos.nombre}
                                    required
                                />
                            </div>

                            <div className="form__apartado">
                                <label htmlFor="direccion">Dirección</label>
                                <input
                                    name="direccion"
                                    id="direccion"
                                    className="form__input"
                                    type="text"
                                    onInput={handleInput}
                                    value={datos.direccion}
                                    required
                                />
                            </div>

                            <div className="form__apartado">
                                <label htmlFor="descripcion">Descripción</label>
                                <textarea
                                    name="descripcion"
                                    id="descripcion"
                                    className="form__input"
                                    cols="30"
                                    rows="10"
                                    onInput={handleInput}
                                    value={datos.descripcion}
                                    required>
                                </textarea>
                            </div>

                            <div className="formEditar__archivo">
                                <label htmlFor="inpComprobante" className="usuario__editar">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-upload usuario__editar-icon" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                                        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                                        <path d="M12 11v6"></path>
                                        <path d="M9.5 13.5l2.5 -2.5l2.5 2.5"></path>
                                    </svg>
                                    Subir RFC o comprobante de domicilio
                                </label>
                                <input type="file" name="comprobante" id="inpComprobante" onInput={handleInputComprobante} accept=".pdf" style={{display: "none"}}></input>
                                {
                                    comprobante && (
                                        <button type="button" className="boton boton--rojo formEditar__btn-archivo" onClick={handleBorrarComprobante}>Borrar Comprobante</button>
                                    )
                                }
                            </div>
                            <p className="form__info">El proceso de verificación mediante un comprobante nos ayuda a garantizar la autenticidad y legalidad de las empresas</p>
                        </>
                    )
                }

                <input type="submit" className="form__input form__input--boton boton" value="Guardar cambios" />
            </form>
        </div>
    )
}

export default FormEditarPerfil;