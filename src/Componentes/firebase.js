import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from "firebase/app";

// Configuración de Firebase
export const firebaseApp = initializeApp({
  apiKey: "AIzaSyBdl2-w-U0OdB64cW1dBgbCTbY9Ofbbd_o",
  authDomain: "pokeapi-12210.firebaseapp.com",
  projectId: "pokeapi-12210",
  storageBucket: "pokeapi-12210.firebasestorage.app",
  messagingSenderId: "223672863985",
  appId: "1:223672863985:web:09b1c0ca097edbaa9ced50"
});

// Inicializar Firebase Auth
const authGoogle = getAuth(firebaseApp);

// Función para rastrear el usuario actual
function useCurrentUser(callback) {
  onAuthStateChanged(authGoogle, (user) => {
    callback(user);
  });
}

// Exportaciones
export { authGoogle, useCurrentUser };
