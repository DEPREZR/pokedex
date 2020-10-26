import { Row, Button, List } from "antd";
import pokemonLogo from "resources/images/pokemon-logo.svg.png";
import useWindowSize from "hooks/useWindowSize";
import { useHistory } from "react-router-dom";

const Home = () => {
  const { height } = useWindowSize();
  const history = useHistory();

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
            And this is exactly the purpose of the pokedex.
          </p>
        </List.Item>
        <List.Item>
          <p className="text-center mx-auto">
            This is like an encyclopedia telling us all about these little
            bastards. The pokedex will give you information about what each one
            is looking like, about names, and about types.
          </p>
        </List.Item>
        <List.Item>
          <p className="text-center mx-auto">
            If you want more information, please go on a more serious website
            about the subject.
          </p>
        </List.Item>
      </List>
      <div className="text-center">
        <Button
          type="primary"
          onClick={() => {
            history.push("/pokedex");
          }}
        >
          Show me that
        </Button>
      </div>
    </div>
  );
};

export default Home;
