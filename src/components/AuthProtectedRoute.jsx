import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

function AuthProtectedRoute({ children, soloEmpresas }){
    const navigate = useNavigate();
    let { cargandoUsuario, usuario } = useAuth();

    useEffect(() => {
        // Si no ha cargado la información, se sale
        if(cargandoUsuario) return;

        // Si hay usuario con sesion activa
        if(usuario){
            // Si solo se aceptan empresas, se verifica el rol
            if(soloEmpresas && usuario.rol == "usuario"){
                navigate("/");
                toast.error("Permisos insuficientes");
            }
        } else { // Si no hay usuario
            navigate("/inicio-sesion");
            toast.error("Ruta protegida, inicia sesión");
        }
    }, [cargandoUsuario])

    return(
        <>
            {children}
        </>
    )
}

export default AuthProtectedRoute;