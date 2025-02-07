import { useState, useEffect } from "react";
import { data, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

import "../style/ListaPokemon.css";

let pokemonIDVar;

function ListaPokemon() {
  const [pokemons, setPokemons] = useState([]);
  const [preloader, setPreloader] = useState(false);
  const [detallePokemon, setDetallePokemon] = useState({});
  const [offset, setOffset] = useState(0);
  const [valueInputBuscar, setValueInputBuscar] = useState('');
  const navigate = useNavigate();



  useEffect(() => {
    peticion();
  }, []);

  function peticion() {
    setPreloader(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=12`)
      .then((response) => response.json())
      .then((data) => {
        setPreloader(false);
        setPokemons((prevPokemons) => [...prevPokemons, ...data.results]);
        setOffset((prevOffset) => prevOffset + 12);

        data.results.forEach((pokemon) => {
          peticionDetalles(pokemon.name);
        });
      });
  }

  function peticionDetalles(pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
      .then((response) => response.json())
      .then((data) => {
        setDetallePokemon((prevDetalle) => ({ ...prevDetalle, [pokemon]: data }));
      });
  }


  function buscar(e) {
    navigate(`/detalle/${e}`);
  }
  let enterKey = (event) => {
    if (event.key === 'Enter') {
        peticionPorID(valueInputBuscar);
    }
};

function peticionPorID(valueInputBuscar){
  fetch(`https://pokeapi.co/api/v2/pokemon/${valueInputBuscar}/`)
  .then((response) => response.json())
  .then ((data) => {
     buscar(data.id);
  }
  )
}


  return (
    <>
      <Link to={`/`}>Inicio</Link>
      <Link to={`/juego`}>¡Juega!</Link>
      <button className="mas" onClick={peticion}>Ver más Pokémon</button>
      <input id="input-field" type="text" value={valueInputBuscar} onChange={(e) => setValueInputBuscar(e.target.value)} onKeyUp={enterKey} placeholder='Buscar...' />

      {preloader && <p>Cargando...</p>}
      <div className="pokemon-cards">
        {pokemons.map((pokemon, index) => {
          const detalles = detallePokemon[pokemon.name];
          return (
            <div key={index} className="pokemon-card">
              <img
                src={
                  detalles &&
                  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${detalles.id}.png`
                }
                alt={pokemon.name}
              />
              <h3>{pokemon.name}</h3>
              
              <Link to={`/detalle/${detalles?.id}`}>Ver detalles</Link>
              
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ListaPokemon;
