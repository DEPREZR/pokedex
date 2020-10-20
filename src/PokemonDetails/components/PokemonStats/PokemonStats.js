import React from "react";
import { usePokemonDetailsContext } from "PokemonDetails";
import { Card, List, Typography, Divider } from "antd";

const { Text } = Typography;

const statsPrettyNames = {
  hp: "Base HP",
  attack: "Base attack",
  defense: "Base defense",
  "special-attack": "Base pecial attack",
  "special-defense": "Base pecial defense",
  speed: "Base Speed"
};

const PokemonStats = () => {
  const pokemon = usePokemonDetailsContext();

  return (
    <Card style={{ width: 348 }}>
      <List split={false}>
        <List.Item
          style={{ width: 300 }}
          className="d-flex flex-row justify-content-between"
        >
          <Text strong>type(s)</Text>
          {pokemon.types.map(type => type?.type?.name).join(", ")}
        </List.Item>
        <List.Item
          style={{ width: 300 }}
          className="d-flex flex-row justify-content-between"
        >
          <Text strong>weight</Text>
          {pokemon.weight}
        </List.Item>
        <Divider />
        {pokemon.stats.map(stat => (
          <List.Item
            style={{ width: 300 }}
            className="d-flex flex-row justify-content-between"
          >
            <Text strong>{statsPrettyNames[stat.stat.name]}</Text>
            {stat.base_stat}
          </List.Item>
        ))}
      </List>
    </Card>
  );
};

export default PokemonStats;
