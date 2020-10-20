import React, { useState, useEffect } from "react";
import { Table } from "antd";
import useGet from "apiHelpers/hooks/useGet";
import { get } from "apiHelpers";
import useWindowSize from "hooks/useWindowSize";
import { useHistory } from "react-router-dom";

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
    render: types => types.map(type => type?.type?.name).join(", ")
  }
];

const getPokemonIdFromPokemonUrl = pokemonUrl => {
  const regexp = /pokemon-species\/(\d+)/i;
  const res = pokemonUrl.match(regexp);
  if (!res || res.length < 2) return null;
  return res[1];
};

const getPageIdsFromPokemonIds = ({
  pokemonIds,
  page,
  totalItems,
  perPage
}) => {
  const startIndex = (page - 1) * perPage;
  let endIndex = startIndex + perPage - 1;

  if (startIndex < 0) return [];
  if (endIndex > totalItems - 1) endIndex = totalItems - 1;
  if (endIndex < startIndex) return [];

  return pokemonIds.slice(startIndex, endIndex + 1);
};

const getPokemonsPage = async ({ setPageLoading, ids }) => {
  setPageLoading(true);
  const pokemonsPromises = ids.map(current =>
    get({ url: `pokemon/${current}` })
  );

  const pokemonsValues = await Promise.allSettled(pokemonsPromises);
  const pokemons = await Promise.all(
    pokemonsValues.map(async current => {
      if (!current.status === "fulfilled") return undefined;
      if (!current?.value?.json) return undefined;
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

const getOnClickRow = ({ history, pokemon }) => () => {
  if (pokemon?.id) history.push(`/pokemon/${pokemon?.id}`);
};

const Home = () => {
  const { data, loading: generationLoading } = useGet("generation/1");
  const pokemonSpecies = data?.pokemon_species;
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10
  });
  const [dataSource, setDataSource] = useState([]);
  const [orderedPokemonIds, setOrderedPokemonIds] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);
  const { height } = useWindowSize();
  const history = useHistory();

  useEffect(() => {
    if (pokemonSpecies && pokemonSpecies.length) {
      setPagination(prevPagination => ({
        ...prevPagination,
        current: 1,
        total: pokemonSpecies.length
      }));

      setOrderedPokemonIds(
        pokemonSpecies
          .map(pokemonSpecie => getPokemonIdFromPokemonUrl(pokemonSpecie.url))
          .sort((pokemonA, pokemonB) => {
            const pokemonAId = parseInt(pokemonA, 10);
            const pokemonBId = parseInt(pokemonB, 10);
            if (pokemonAId === pokemonBId) return 0;
            if (pokemonAId < pokemonBId) return -1;
            return 1;
          })
      );
    }
  }, [pokemonSpecies]);

  useEffect(() => {
    if (orderedPokemonIds && orderedPokemonIds.length) {
      setDataSourceFromPokemonsIds({
        setDataSource,
        setPageLoading,
        ids: getPageIdsFromPokemonIds({
          pokemonIds: orderedPokemonIds,
          page: pagination.current,
          totalItems: pagination.total,
          perPage: pagination.pageSize
        })
      });
    }
  }, [pagination, orderedPokemonIds]);

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={pagination}
      loading={generationLoading || pageLoading}
      onChange={getHandleTableChange(setPagination)}
      scroll={{ y: height - 180 - 15 - 47, scrollToFirstRowOnChange: true }}
      onRow={(record) => {
        return {
          onClick: getOnClickRow({ history, pokemon: record })
        };
      }}
      rowClassName="custom-table-clickable-row"
    />
  );
};
export default Home;
