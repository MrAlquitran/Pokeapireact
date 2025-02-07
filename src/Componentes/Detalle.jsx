import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/Detalle.css";

function Detalle() {
  const { id } = useParams(); 
  const [pokemon, setPokemon] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => setPokemon(data));
  }, [id]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/characteristic/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        const desc = data.descriptions.find((desc) => desc.language.name === "es");
        setDescription(desc ? desc.description : "Descripcion no disponible");
      });
  }, [id]);
  if (!pokemon) {
    return <p>Cargando detalles del Pokémon...</p>;
  }

  return (
    <>
        <button className="volver-btn" onClick={() => window.history.back()}>Volver a la lista</button>
        <div className="detalle-container">
            <h2>{pokemon.name}</h2>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt="" />
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`} alt={pokemon.name} />
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/${pokemon.id}.gif`} alt={pokemon.name} />
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/${pokemon.id}.gif`} alt="" />
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/shiny/${pokemon.id}.gif`} alt="" />
            <div className="detalle-info">
                <p>Tipo: {pokemon.types.map((type) => type.type.name).join(", ")}</p>
                <p>Altura: {pokemon.height / 10} m</p>
                <p>Peso: {pokemon.weight / 10} kg</p>
                <p>Descripcion: {description} </p>
            </div>
        
        </div>
    </>
    
  );
}

export default Detalle;
