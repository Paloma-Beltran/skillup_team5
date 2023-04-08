import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { borrarFotoPerfil, subirFotoPerfil } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useTitle } from "../hooks/useTitle";
import { toast } from "react-hot-toast";
import { deleteField } from "firebase/firestore";

function FormEditarPerfil(){
    useTitle("Editar perfil | SkillUp");

    const navigate = useNavigate();
    const { usuario, editarPerfil, actualizarUsuario } = useAuth();
    const [datos, setDatos] = useState(null);
    const [file, setFile] = useState(null);
    const [foto, setFoto] = useState(null);
    const [borrarFoto, setBorrarFoto] = useState(false);

    // Para cuando se obtenga el usuario al renderizar el componente
    useEffect(() => {
        setDatos(usuario);
        if(usuario) setFoto(usuario.imgUrl);
    }, [usuario])

    const handleSubmit = async e => {
        e.preventDefault();
        
        try{
            // Si se quiso borrar la foto, se borra del storage
            if(borrarFoto) await borrarFotoPerfil(datos.id);

            // Subir imagen si se cambió el input file
            let imgUrl = datos.imgUrl; // por defecto es la imagen que ya tenía antes
            if(file){
                //? Se utilizan los parentesis para que no se interprete como un bloque de código
                //? sino como una expresión a evaluar
                ({ imgUrl } = await subirFotoPerfil(file, datos.id));
                // console.log({imgData, imgUrl});
            }

            // Editar datos de perfil
            if(!borrarFoto){
                // Si no se borró la foto, se actualiza con la nueva url
                // o con la misma si no se subió ningún archivo
                await editarPerfil(datos.id, { ...datos, imgUrl });
            } else {
                //? Filtramos la url para que no se guarde en la base de datos ya que se obtiene desde las otras funciones
                // Si se borró, se actualiza el documento y se quita la url
                // para usar la que va por defecto
                await editarPerfil(datos.id, { ...datos, imgUrl: deleteField() });
            }

            // Se actualizan los datos del usuario con la sesión activa (info e imagen)
            actualizarUsuario(datos.id);
            
            // console.log("Perfil editado", datos);
            toast.success("Perfil editado correctamente");
            
            navigate(`/${datos.rol}/${datos.id}`);
        } catch(err){
            // console.log({err});
            toast.error("Hubo un error");
        }
    }

    const handleInput = e => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }

    const handleInputFile = async e => {
        // Ya no se borra la foto de storage, solo se va a actualizar
        setBorrarFoto(false);

        const file = e.target.files[0];

        // Se va a cambiar la imagen pero solo va a ser visual, aquí no se actualiza en storage
        let reader = new FileReader();

        reader.onload = res => {
            let result = res.target.result;

            setFoto(result);
        }

        reader.readAsDataURL(file);

        setFile(file);

        // Se limpia el input para poder subir varias veces la misma imagen después de darle al boton de borrar foto
        e.target.value = "";
    }

    const handleBorrarFoto = async () => {
        // El file se limpia
        setFile(null);
        
        // Se marca para borrar la foto de storage
        setBorrarFoto(true);

        // Se renderiza la imagen por defecto
        setFoto(`https://ui-avatars.com/api/?name=${encodeURI(datos.nombre)}&background=555&color=fff&uppercase=true`);
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
                        <input type="file" name="imagen" id="inpFoto" onInput={handleInputFile} style={{display: "none"}} />
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
                        </>
                    )
                }

                <input type="submit" className="form__input form__input--boton boton" value="Guardar cambios" />
            </form>
        </div>
    )
}

export default FormEditarPerfil;