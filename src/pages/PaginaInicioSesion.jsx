import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { useAuth } from "../context/AuthContext";
import { useTitle } from "../hooks/useTitle";

import toast from 'react-hot-toast';

function PaginaInicioSesion(){
    useTitle("Inicio de sesión | SkillUp");

    const { iniciarSesion, restablecerContrasena } = useAuth();
    const navigate = useNavigate();

    const [datos, setDatos] = useState({
        correo: "",
        contrasena: ""
    });

    const handleSubmit = async e => {
        e.preventDefault();

        try{
            await iniciarSesion(datos.correo, datos.contrasena);

            // console.log("Inicio de sesión exitoso");
            toast.success("Inicio de sesión exitoso");
            
            navigate("/");
        } catch(err){
            // console.log({err});
            if(err.code == "auth/user-not-found"){
                toast.error("Usuario no encontrado");
            } else if (err.code == "auth/wrong-password") {
                toast.error("Contraseña incorrecta");
            } else if (err.code == "auth/too-many-requests"){
                toast.error("Demasiados intentos");
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

    const handleRestablecerContrasena = async () => {
        if(!datos.correo) toast.error("Introduce tu correo electrónico para restablecer la contraseña");
        
        try{
            await restablecerContrasena(datos.correo);

            // console.log("Correo enviado para restablecer contraseña");
            toast.success("Correo enviado para restablecer contraseña");
        } catch(err){
            // console.log({err});
            
            if(err.code == "auth/user-not-found"){
                toast.error("Correo no encontrado");
            } else if(err.code == "auth/invalid-email"){
                toast.error("Correo inválido");
            } else {
                toast.error("Hubo un error, revise los datos nuevamente");
            }
        }
    }

    return(
        <div className="contenedor">
            <h1 className="titulo">Inicio de Sesión</h1>

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

                <input type="submit" className="form__input form__input--boton boton" value="Iniciar Sesión" />

                <a href="#" className="form__restablecer" onClick={handleRestablecerContrasena}>Olvidé mi contraseña</a>
            </form>
        </div>
    )
}

export default PaginaInicioSesion;