import { Row, Button, List } from "antd";
import pokemonLogo from "resources/images/pokemon-logo.svg.png";
import useWindowSize from "hooks/useWindowSize";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { height } = useWindowSize();
  const navigate = useNavigate();

  return (
    <div
      style={{ height: height - 150 }}
      className="d-flex flex-column justify-content-around"
    >
      <Row align="middle" justify="space-around">
        <img src={pokemonLogo} height="221" width="600" alt="pokemon" />
      </Row>
      <List style={{ height: 250 }}>
        <List.Item>
          <p className="text-center mx-auto">
            Pokemons are little monster you can catch. To catch them all, you
            need to know all about them.
          </p>
        </List.Item>
        <List.Item>
          <p className="text-center mx-auto">
            And this is exactly the purpose of this first generation's pokedex.
          </p>
        </List.Item>
        <List.Item>
          <p className="text-center mx-auto">
            This pokedex is a simple example of react application, using react ui router and ant design.
          </p>
        </List.Item>
        <List.Item>
          <p className="text-center mx-auto">
            In the list, you can click on a row to see details about corresponding pokemon.
          </p>
        </List.Item>
        <List.Item>
          <p className="text-center mx-auto">
            It is powered by <a target="_blank" rel="noopener noreferrer" href="https://pokeapi.co/">PokeAPI</a>
          </p>
        </List.Item>
      </List>
      <div className="text-center">
        <Button
          type="primary"
          onClick={() => {
            navigate("/pokedex");
          }}
        >
          Show me that
        </Button>
      </div>
    </div>
  );
};

export default Home;
