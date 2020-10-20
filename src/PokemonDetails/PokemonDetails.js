import React from "react";
import { useParams } from "react-router-dom";

const PokemonDetails = () => {
  const { pokemonId } = useParams();

  return <div>{pokemonId}</div>;
};
export default PokemonDetails;
