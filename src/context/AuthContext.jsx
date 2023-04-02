import { createContext, useContext, useState, useEffect } from 'react';

import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

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

    // Al iniciar la aplicación se suscribe al evento para obtener los cambios en el auth
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async currentUser => {
            setCargando(true);

            if(currentUser){
                // Se obtienen los datos de firestore para tener el rol y las demás cosas
                let docRef = doc(db, "usuarios", currentUser.uid);
                let res = await getDoc(docRef);
                let datosFS = res.data();

                setUser({
                    id: currentUser.uid,
                    ...datosFS
                })
            } else {
                setUser(currentUser);
            }
            setCargando(false);
        })
         
        return () => unsubscribe();
    }, [])

    return(
        <authContext.Provider value={{ cargandoUsuario: cargando, usuario: user, registrarUsuario, iniciarSesion, cerrarSesion, restablecerContrasena, registrarUsuarioFirestore }}>
            { children }
        </authContext.Provider>
    )
}

export default AuthProvider;