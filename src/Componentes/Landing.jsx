import React from 'react';
import Login from './Login';
import ListaPokemon from './ListaPokemon';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="landing-container">
            <header className="landing-cabecera">
                <h1>Bienvenido a tu pokedex</h1>
                <p>Encuentra todos los detalles de tus Pokemon favoritos</p>
            </header>
            <main className="landing-principal">
                <Link to="/listapokemon">
                    <button className="landing-button">¡Consiguelos a todos!</button>
                </Link>
                <Link to="/login">
                    <button className="landing-button">Registrarse</button>
                </Link>
                <Link to="/juego">
                    <button className="landing-button">¡Juega!</button>
                </Link>
            </main>
        </div>
    );
};

export default Landing;