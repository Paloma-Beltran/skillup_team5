import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Ver si se necesita hacer un registro para cada rol o si simplemente se selecciona con un boton el rol
function PaginaRegistro(){
    const navigate = useNavigate();
    const [rol, setRol] = useState("");
    const [datos, setDatos] = useState({
        correo: "",
        contrasena: "",
        nombre: "",
        carrera: "",
        institucion: "",
        descripcion: "",
        habilidades: ""
    });

    const handleSubmit = e => {
        e.preventDefault();

        toast.success("Registro exitoso");

        //! Agregar a los datos el rol para poder registrar
        //! Agregar la fecha de registro
        //! Al saber el rol, solo elegir los datos necesarios
        //! ID del documento (fecha de registro o podría ser crypto.getRandomUUID() pero no creo :D)

        navigate("/");
        // navigate(`/usuario/${idUsuario}`);
    }
    
    const handleInput = e => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }

    const cambiarRol = (e) => {
        setRol(e.target.value);
    }

    return(
        <div className="contenedor">
            <h1 className="titulo">Registro</h1>

            <form className="form" onSubmit={handleSubmit}>

                <div className="form__apartado">
                    <label htmlFor="correo">Correo electrónico</label>
                    <input
                        name="correo"
                        id="correo"
                        className="form__input"
                        type="email"
                        onInput={handleInput}
                        value={datos.correo}
                        required
                    />
                </div>

                <div className="form__apartado">
                    <label htmlFor="contrasena">Contraseña</label>
                    <input
                        name="contrasena"
                        id="contrasena"
                        className="form__input"
                        type="password"
                        onInput={handleInput}
                        value={datos.contrasena}
                        required
                    />
                </div>

                <div className="form__apartado">
                    <label htmlFor="rol">Rol</label>
                    <select name="rol" id="rol" className="form__input" onChange={cambiarRol} value={rol} required>
                        <option value="">Elige una opción</option>
                        <option value="usuario">Usuario</option>
                        <option value="empresa">Empresa</option>
                    </select>
                </div>

                {
                    rol == "usuario" ? (
                        //! INPUTS SOLO PARA USUARIOS
                        <>
                            <h3>Información extra para usuarios</h3>

                            <div className="form__apartado">
                                <label htmlFor="nombre">Nombre completo</label>
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
                                <label htmlFor="carrera">Carrera o nivel de estudios</label>
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
                                <label htmlFor="institucion">Institución de estudios</label>
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
                                    rows="5"
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
                                    rows="5"
                                    onInput={handleInput}
                                    value={datos.habilidades}
                                    required>
                                </textarea>
                            </div>
                        </>
                    ) : (
                        rol == "empresa" ? (
                            //! INPUTS SOLO PARA EMPRESAS
                            <>
                                <h3>Información extra para empresas</h3>

                                <div className="form__apartado">
                                    <label htmlFor="nombre">Nombre empresa</label>
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
                                    <label htmlFor="descripcion">Descripción</label>
                                    <textarea
                                        name="descripcion"
                                        id="descripcion"
                                        className="form__input"
                                        cols="30"
                                        rows="5"
                                        onInput={handleInput}
                                        value={datos.descripcion}
                                        required>
                                    </textarea>
                                </div>
                            </>
                        ) : null
                    )
                }

                <input type="submit" className="form__input form__input--boton boton" value="Registrarse" />
            </form>
        </div>
    )
}

export default PaginaRegistro;