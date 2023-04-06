import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTitle } from "../hooks/useTitle";
import { toast } from "react-hot-toast";

function FormEditarPerfil(){
    useTitle("Editar perfil | SkillUp");

    const navigate = useNavigate();
    const { usuario, editarPerfil, actualizarUsuario } = useAuth();
    const [datos, setDatos] = useState(null);

    // Para cuando se obtenga el usuario al renderizar el componente
    useEffect(() => {
        setDatos(usuario);
    }, [usuario])

    const handleSubmit = async e => {
        e.preventDefault();

        try{
            await editarPerfil(usuario.id, datos);

            // Se actualizan los datos del usuario con la sesión activa
            actualizarUsuario(usuario.id);
            
            // console.log("Perfil editado", datos);
            toast.success("Perfil editado correctamente");
            
            navigate(`/${usuario.rol}/${usuario.id}`);
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

    // Si todavía no se cargan los datos
    if(!datos) return <h2 className="contenedor titulo">Cargando...</h2>

    return(
        <div className="contenedor">
            <h1 className="titulo">Editar perfil</h1>

            <form className="form" onSubmit={handleSubmit}>

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