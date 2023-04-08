import { createContext, useContext, useState, useEffect } from 'react';

import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db, obtenerUsuario } from '../firebase';

import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

const authContext = createContext();

// Hook personalizado para facilitar el uso del contexto
export const useAuth = () => {
    let context = useContext(authContext);

    return context;
}

function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [cargando, setCargando] = useState(true);

    const registrarUsuario = (correo, contrasena) => {
        // console.log("Registrando usuario:", {correo, contrasena});

        return createUserWithEmailAndPassword(auth, correo, contrasena);
    }

    const registrarUsuarioFirestore = (datos) => {
        // console.log("Registrando usuario en firebase:", {datos});

        let docRef = doc(db, "usuarios", datos.id);

        return setDoc(docRef, {...datos, fechaRegistro: Date.now()});
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

    const editarPerfil = (uid, datos) => {
        let docRef = doc(db, "usuarios", uid);
        return updateDoc(docRef, datos);
    }

    const actualizarUsuario = async (uid) => {
        // Cuando se edita el perfil se actualiza el estado del usuario actual
        setCargando(true);
        let datos = await obtenerUsuario(uid);
                
        setUser(datos);
        setCargando(false);
    }

    // Al iniciar la aplicación se suscribe al evento para obtener los cambios en el auth
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async currentUser => {
            setCargando(true);

            if(currentUser){
                // Se obtienen los datos de firestore para tener el rol y las demás cosas
                // Tenemos que usar await para que espere y no salgan errores antes de obtener el usuario
                await actualizarUsuario(currentUser.uid);
            } else {
                setUser(currentUser);
            }
            setCargando(false);
        })
         
        return () => unsubscribe();
    }, [])

    return(
        <authContext.Provider value={{ cargandoUsuario: cargando, usuario: user, registrarUsuario, iniciarSesion, cerrarSesion, restablecerContrasena, registrarUsuarioFirestore, editarPerfil, actualizarUsuario }}>
            { children }
        </authContext.Provider>
    )
}

export default AuthProvider;