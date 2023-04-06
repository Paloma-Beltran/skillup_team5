import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { useAuth } from "../context/AuthContext";
import { useTitle } from "../hooks/useTitle";

import toast from 'react-hot-toast';

// Ver si se necesita hacer un registro para cada rol o si simplemente se selecciona con un boton el rol
function PaginaRegistro(){
    useTitle("Registro | SkillUp");

    const { registrarUsuario, registrarUsuarioFirestore } = useAuth();
    const navigate = useNavigate();

    const [rol, setRol] = useState("");
    const [datos, setDatos] = useState({
        correo: "",
        contrasena: "",
        nombre: "",
        carrera: "",
        institucion: "",
        descripcion: "",
        habilidades: "",
        direccion: ""
    });

    const handleSubmit = async e => {
        e.preventDefault();
        
        try{
            // Se registra el usuario en firebase/auth
            let { user } = await registrarUsuario(datos.correo, datos.contrasena);
            
            // Datos que llevan todos los usuarios
            let data = {
                id: user.uid,
                rol,
                correo: datos.correo,
                nombre: datos.nombre,
                descripcion: datos.descripcion
            }

            // Se agregan los datos específicos de cada usuario
            if(rol == "usuario"){
                data = {
                    ...data,
                    carrera: datos.carrera,
                    institucion: datos.institucion,
                    habilidades: datos.habilidades
                }
            } else if(rol == "empresa"){
                // Por ahora no guardamos datos específicos para las empresas
                data = {
                    ...data,
                    direccion: datos.direccion
                }
            }

            // Se registra el usuario en firebase/firestore (base de datos)
            await registrarUsuarioFirestore(data);

            // console.log("Usuario registrado correctamente");
            toast.success("Registro exitoso");

            navigate("/");
            // navigate(`/usuario/${idUsuario}`);
        } catch(err){
            console.log({err});
            if(err.code == "auth/email-already-in-use"){
                toast.error("Correo en uso");
            } else if(err.code == "auth/weak-password"){
                toast.error("La contraseña debe tener al menos 6 caracteres");
            } else if(err.code == "auth/invalid-email"){
                toast.error("Correo inválido");
            } else {
                toast.error("Hubo un error, revise los datos nuevamente");
            }
        }
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

                            {/* <div className="form__apartado">
                                <label htmlFor="telefono">Número de teléfono</label>
                                <input
                                    name="telefono"
                                    id="telefono"
                                    className="form__input"
                                    type="number"
                                    onInput={handleInput}
                                    value={datos.telefono}
                                    required
                                />
                            </div> */}

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