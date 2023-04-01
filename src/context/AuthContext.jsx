import { createContext, useContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

const authContext = createContext();

// Hook personalizado para facilitar el uso del contexto
export const useAuth = () => {
    let context = useContext(authContext);

    return context;
}

function AuthProvider({ children }){
    //! TAMBIEN REGISTRAR EN LA BASE DE DATOS
    //! EN LOS PARAMETROS PASAR EL OBJETO COMPLETO CON LA INFORMACION
    //! REGISTRAR EN LA BASE DE DATOS CON LOS DATOS COMPLETOS
    //! DEPENDIENDO DEL ROL, ELEGIR LA FORMA DE REGISTRARLO EN LA BASE DE DATOS
    //! REGISTRAR EN AUTH CON CORREO Y CONTRASEÑA
    const [user, setUser] = useState(null);

    const registrarUsuario = (correo, contrasena) => {
        // console.log("Registrando usuario:", {correo, contrasena});

        return createUserWithEmailAndPassword(auth, correo, contrasena);
    }

    const iniciarSesion = (correo, contrasena) => {
        // console.log("Iniciando sesión:", {correo, contrasena});

        return signInWithEmailAndPassword(auth, correo, contrasena);
    }

    const cerrarSesion = () => {
        // console.log("Cerrando sesión");

        return signOut(auth);
    }

    const restablecerContrasena = (correo) => {
        // console.log("Enviando correo para restablecer la contraseña");

        return sendPasswordResetEmail(auth, correo);
    }

    // Al iniciar la aplicación se suscribe al evento para obtener los cambios en el auth
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            //! Al cambiar el usuario, obtener su uid y buscar en la base de datos su información para agregarla al user y poder verificar los roles y demás cosas
            // console.log(currentUser);
            setUser(currentUser);
        })
         
        return () => unsubscribe();
    }, [])

    return(
        <authContext.Provider value={{ user, registrarUsuario, iniciarSesion, cerrarSesion, restablecerContrasena }}>
            { children }
        </authContext.Provider>
    )
}

export default AuthProvider;