import { useState } from "react";
import { usePokemonDetailsContext } from "PokemonDetails";
import { Card } from "antd";

const tabList = [
  {
    key: "default",
    tab: "default"
  },
  {
    key: "shiny",
    tab: "shiny"
  }
];

const getContentList = ({ pokemon }) => ({
  default: (
    <img
      src={`${pokemon?.sprites?.front_default ?? ""}`}
      width="150"
      height="150"
      alt=""
    />
  ),
  shiny: (
    <img
      src={`${pokemon?.sprites?.front_shiny ?? ""}`}
      width="150"
      height="150"
      alt=""
    />
  )
});

const PokemonSprites = () => {
  const pokemon = usePokemonDetailsContext();
  const [selectedTabKey, setSelectedTabKey] = useState("default");

  return (
    <Card
      style={{ textAlign: "center" }}
      tabList={tabList}
      type="inner"
      activeTabKey={selectedTabKey}
      onTabChange={key => {
        setSelectedTabKey(key);
      }}
    >
      {getContentList({ pokemon })[selectedTabKey]}
    </Card>
  );
};
export default PokemonSprites;
