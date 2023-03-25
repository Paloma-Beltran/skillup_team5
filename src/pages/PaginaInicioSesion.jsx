import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function PaginaInicioSesion(){
    const navigate = useNavigate();
    const [datos, setDatos] = useState({
        correo: "",
        contrasena: ""
    });

    const handleSubmit = e => {
        e.preventDefault();

        toast.success("Inicio de sesión exitoso");

        navigate("/");
    }
    
    const handleInput = e => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }

    return(
        <div className="contenedor">
            <h1 className="titulo">Inicio Sesión</h1>

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
            </form>
        </div>
    )
}

export default PaginaInicioSesion;