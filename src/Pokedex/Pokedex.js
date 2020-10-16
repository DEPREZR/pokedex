import React, { useState, useEffect } from "react";
import { Table } from "antd";
import useGet from "apiHelpers/hooks/useGet";
import _ from "lodash";
import { get } from "apiHelpers";
import useWindowSize from "hooks/useWindowSize";

const columns = [
  { title: "Order", dataIndex: "order", key: "order" },
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Sprite",
    key: "sprites",
    dataIndex: "sprites",
    render: sprites => <img src={sprites.front_default} alt="" />
  },
  {
    title: "Type(s)",
    key: "types",
    dataIndex: "types",
    render: types => types.map(type => _.get(type, ["type", "name"])).join(", ")
  }
];

const getPokemonIdFromPokemonUrl = pokemonUrl => {
  const regexp = /pokemon-species\/(\d+)/i;
  const res = pokemonUrl.match(regexp);
  if (!res || res.length < 2) return null;
  return res[1];
};

const getPageIdsFromPokemonSpecies = ({
  pokemonSpecies,
  page,
  totalItems,
  perPage
}) => {
  const startIndex = (page - 1) * perPage;
  let endIndex = startIndex + perPage - 1;

  if (startIndex < 0) return [];
  if (endIndex > totalItems - 1) endIndex = totalItems - 1;
  if (endIndex <= startIndex) return [];
  return pokemonSpecies
    .slice(startIndex, endIndex + 1)
    .map(pokemonSpecie => getPokemonIdFromPokemonUrl(pokemonSpecie.url));
};

const getPokemonsPage = async ({ setPageLoading, ids }) => {
  setPageLoading(true);
  const pokemonsPromises = ids.reduce((acc, current) => {
    return [...acc, get({ url: `pokemon/${current}` })];
  }, []);

  const pokemonsValues = await Promise.allSettled(pokemonsPromises);
  const pokemons = await Promise.all(
    pokemonsValues.map(async current => {
      if (!current.status === "fulfilled") return undefined;
      if (!_.get(current, ["value", "json"])) return undefined;
      const pokemon = await current.value.json();
      return pokemon;
    })
  );
  setPageLoading(false);

  return pokemons.filter(pokemon => pokemon !== undefined);
};

const setDataSourceFromPokemonsIds = async ({
  setDataSource,
  setPageLoading,
  ids
}) => {
  const pokemons = await getPokemonsPage({ ids, setPageLoading });

  setDataSource(pokemons);
};

const getHandleTableChange = setPagination => pagination => {
  setPagination(prevPagination => ({ ...prevPagination, ...pagination }));
};

const Home = () => {
  const { data, loading: generationLoading } = useGet("generation/1");
  const pokemonSpecies = _.get(data, ["pokemon_species"]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10
  });
  const [dataSource, setDataSource] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const { height } = useWindowSize();

  useEffect(() => {
    if (pokemonSpecies && pokemonSpecies.length) {
      setPagination(prevPagination => ({
        ...prevPagination,
        current: 1,
        total: pokemonSpecies.length
      }));
    }
  }, [pokemonSpecies]);

  useEffect(() => {
    if (pokemonSpecies && pokemonSpecies.length) {
      setDataSourceFromPokemonsIds({
        setDataSource,
        setPageLoading,
        ids: getPageIdsFromPokemonSpecies({
          pokemonSpecies,
          page: pagination.current,
          totalItems: pagination.total,
          perPage: pagination.pageSize
        })
      });
    }
  }, [pagination, pokemonSpecies]);

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={pagination}
      loading={generationLoading || pageLoading}
      onChange={getHandleTableChange(setPagination)}
      scroll={{ y: height - 180, scrollToFirstRowOnChange: true }}
    />
  );
};
export default Home;
