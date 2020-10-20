import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import useGet from "apiHelpers/hooks/useGet";
import Loader from "Loader";
import PokemonSprites from "./components/PokemonSprites";
import PokemonStats from "./components/PokemonStats";
import { Card } from "antd";

const PokemonDetailsContext = React.createContext();

export const usePokemonDetailsContext = () => useContext(PokemonDetailsContext);

const PokemonDetails = () => {
  const { pokemonId } = useParams();
  const { data: pokemon, loading } = useGet(`pokemon/${pokemonId}`);

  return (
    <Loader loading={loading}>
      {() => (
        <PokemonDetailsContext.Provider value={pokemon}>
          <Card title={pokemon.name}>
            <div className="d-flex">
              <div style={{ height: 350, width: 250, marginRight: 16 }}>
                <PokemonSprites />
              </div>
              <PokemonStats />
            </div>
          </Card>
        </PokemonDetailsContext.Provider>
      )}
    </Loader>
  );
};

export default PokemonDetails;
