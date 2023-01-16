import { useState, useEffect } from "react";
import { Table } from "antd";
import useGet from "apiHelpers/hooks/useGet";
import useGetAll from "apiHelpers/hooks/useGetAll";
import useWindowSize from "hooks/useWindowSize";
import { useNavigate } from "react-router-dom";

const columns = [
  { title: "Order", dataIndex: "order", key: "order" },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Sprite",
    key: "sprites",
    dataIndex: "sprites",
    render: (sprites) => <img src={sprites.front_default} alt="" />,
  },
  {
    title: "Type(s)",
    key: "types",
    dataIndex: "types",
    render: (types) => types.map((type) => type?.type?.name).join(", "),
  },
];

const getPokemonIdFromPokemonUrl = (pokemonUrl) => {
  const regexp = /pokemon-species\/(\d+)/i;
  const res = pokemonUrl.match(regexp);
  if (!res || res.length < 2) return null;
  return res[1];
};

const getPageIdsFromPokemonIds = ({
  pokemonIds,
  page,
  totalItems,
  perPage,
}) => {
  const startIndex = (page - 1) * perPage;
  let endIndex = startIndex + perPage - 1;

  if (startIndex < 0) return [];
  if (endIndex > totalItems - 1) endIndex = totalItems - 1;
  if (endIndex < startIndex) return [];

  return pokemonIds.slice(startIndex, endIndex + 1);
};

const getHandleTableChange = (setPagination) => (pagination) => {
  setPagination((prevPagination) => ({ ...prevPagination, ...pagination }));
};

const getOnClickRow = ({ navigate, pokemon }) => () => {
  if (pokemon?.id) navigate(`/pokemon/${pokemon?.id}`);
};

const Pokedex = () => {
  const [pageUrls, setPageUrls] = useState(null);
  const { data, loading: generationLoading } = useGet("generation/1");
  const {
    result: { data: pokemonsPage, loading: pokemonsPageLoading },
    call: getPokemonsPage,
  } = useGetAll(pageUrls);
  const pokemonSpecies = data?.pokemon_species;
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [orderedPokemonIds, setOrderedPokemonIds] = useState(null);
  const { height } = useWindowSize();
  const navigate = useNavigate();

  useEffect(() => {
    if (pokemonSpecies && pokemonSpecies.length) {
      setPagination((prevPagination) => ({
        ...prevPagination,
        current: 1,
        total: pokemonSpecies.length,
      }));

      setOrderedPokemonIds(
        pokemonSpecies
          .map((pokemonSpecie) => getPokemonIdFromPokemonUrl(pokemonSpecie.url))
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
      setPageUrls(
        getPageIdsFromPokemonIds({
          pokemonIds: orderedPokemonIds,
          page: pagination.current,
          totalItems: pagination.total,
          perPage: pagination.pageSize,
        }).map((pokemonId) => `pokemon/${pokemonId}`)
      );
    }
  }, [pagination, orderedPokemonIds]);

  useEffect(() => {
    if (pageUrls) getPokemonsPage();
  }, [pageUrls, getPokemonsPage]);

  return (
    <Table
      dataSource={pokemonsPage || []}
      columns={columns}
      pagination={pagination}
      loading={generationLoading || pokemonsPageLoading}
      onChange={getHandleTableChange(setPagination)}
      scroll={{ y: height - 180 - 15 - 47, scrollToFirstRowOnChange: true }}
      onRow={(record) => {
        return {
          onClick: getOnClickRow({ navigate, pokemon: record }),
        };
      }}
      rowClassName="custom-table-clickable-row"
    />
  );
};
export default Pokedex;
