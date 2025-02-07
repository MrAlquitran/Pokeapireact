import React, { useState, useEffect } from 'react';
import "../style/Juego.css";
import { Link } from "react-router-dom";

function JuegoAhorcado() {
    const alfabeto = 'abcdefghijklmnopqrstuvwxyz-';
    const [palabraSeleccionada, setPalabraSeleccionada] = useState('');
    const [vidas, setVidas] = useState(10);
    const [letrasAdivinadas, setLetrasAdivinadas] = useState([]);
    const [pista, setPista] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [imagen, setImagen] = useState(''); 

    async function obtenerPokemonAleatorio() {
        const id = Math.floor(Math.random() * 1303) + 1; 
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        return { 
            palabra: data.name, 
            pista: `Pokemon tipo ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}`,
            imagen: data.sprites.other['official-artwork'].front_default 
        };
    }

    async function inicializarJuego() {
        const palabraAleatoria = await obtenerPokemonAleatorio();
        setPalabraSeleccionada(palabraAleatoria.palabra);
        setImagen(palabraAleatoria.imagen); 
        setLetrasAdivinadas([]);
        setVidas(5);
        setMensaje('');
        mostrarPista(palabraAleatoria.pista);
    }

    useEffect(() => {
        inicializarJuego();
    }, []);

    function manejarAdivinanza(letra) {
        if (palabraSeleccionada.includes(letra)) {
            const nuevasLetrasAdivinadas = [...letrasAdivinadas, letra];
            setLetrasAdivinadas(nuevasLetrasAdivinadas);

            if (palabraSeleccionada.split('').every((letra) => nuevasLetrasAdivinadas.includes(letra))) {
                setMensaje('¡Enhorabuena!');
            }
        } else {
            const nuevasVidas = vidas - 1;
            setVidas(nuevasVidas);
            verificarFinDelJuego(nuevasVidas);
        }
    }

    function mostrarPalabra() {
        return palabraSeleccionada
            .split('')
            .map((letra) => (letrasAdivinadas.includes(letra) ? letra : '_'))
            .join(' ');
    }

    function mostrarPista(pista) {
        setPista(`Pista: ${pista}`);
    }

    function verificarFinDelJuego(vidasRestantes) {
        if (vidasRestantes <= 0) {
            setMensaje(`Perdiste. La palabra era "${palabraSeleccionada}".`);
        }
    }

    return (
        <div className="juego-ahorcado-container">
            <h1>Juego del Ahorcado</h1>
            <Link to={`/`} className="link">Inicio</Link>
            <Link to={`/listapokemon`} className="link">Pokedex</Link>
            <div>
                <h2>Vidas: {vidas}</h2>
                <h2>{mensaje}</h2>
                <h3>{pista}</h3>
                {imagen && <img src={imagen} alt={palabraSeleccionada} className={`pokemon-imagen ${mensaje.includes('¡Enhorabuena!') ? 'visible' : ''}`} />}
            </div>

            <div className="palabra-container">
                <h2>{mostrarPalabra()}</h2>
            </div>

            <div id="alfabeto">
                {alfabeto.split('').map((letra) => (
                    <button
                        key={letra}
                        onClick={() => manejarAdivinanza(letra)}
                        disabled={letrasAdivinadas.includes(letra) || mensaje.includes('Perdiste') || mensaje.includes('¡Enhorabuena!')}
                        className={letrasAdivinadas.includes(letra) ? 'desactivado' : ''}
                    >
                        {letra}
                    </button>
                ))}
            </div>

            <button onClick={inicializarJuego} id="reiniciar">
                Reiniciar
            </button>
        </div>
    );
}

export default JuegoAhorcado;
