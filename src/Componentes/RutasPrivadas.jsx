import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

export function RutasPrivadas(){
    let [usuario, setUsuario] = useState(null);

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUsuario(<Outlet/>)
            console.log('El usuario está autenticado = '+user.displayName);
        } else {
            setUsuario(<Navigate to = "/"/>)
            console.log('El usuario no está autenticado');
            usuario = null;
        }
    });

    return(
        usuario 
    )
}