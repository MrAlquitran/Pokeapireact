import React, { useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { authGoogle, useCurrentUser } from './firebase.js';
import { Link } from 'react-router-dom';

function Login() {
    const [user, setUser] = useState(null);
    const googleAuthProvider = new GoogleAuthProvider();

    useEffect(() => {
        useCurrentUser(setUser);
    }, []);

    function iniciarSesionGoogle() {
        signInWithPopup(authGoogle, googleAuthProvider)
            .then(() => console.log("validación correcta"))
            .catch((error) => console.error('Failed sign', error));
    }

    function cerrarSesion() {
        signOut(authGoogle)
            .then(() => console.log("sesión cerrada"))
            .catch((error) => console.error("Se ha producido un error", error));
    }

    return (
        <div className="auth-container">
            <Link to={`/`}>Inicio</Link>
            <Link to={`/listapokemon`}>Pokedex</Link>
            <Link to={`/juego`}>¡Juega!</Link>
            <nav>
            </nav>
            <div className="buttons">
                {!user && (
                    <button onClick={iniciarSesionGoogle}>Iniciar sesión con Google</button>
                )}
                {user && (
                    <button onClick={cerrarSesion}>Cerrar Sesión</button>
                )}
            </div>
        </div>
    );
}

export default Login;
