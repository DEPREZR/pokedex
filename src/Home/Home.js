import React from "react";
import { Row, Button } from "antd";
import pokemonLogo from "resources/images/pokemon-logo.svg.png";
import useWindowSize from "hooks/useWindowSize";
import { useHistory } from "react-router-dom";

const Home = () => {
  const { height } = useWindowSize();
  const history = useHistory();

  return (
    <React.Fragment>
      <Row
        align="middle"
        justify="space-around"
        style={{ height: (30 / 100) * height }}
      >
        <img src={pokemonLogo} height="221" width="600" alt="pokemon" />
      </Row>
      <div
        className="d-flex flex-column justify-content-around align-items-center"
        style={{ height: (40 / 100) * height }}
      >
        <div className="d-flex flex-column justify-content-center align-items-center">
          <p>
            Pokemons are little monster you can catch. To catch them all, you
            need to know all about them.
          </p>
          <p>And this is exactly the purpose of the pokedex.</p>
          <p>
            This is like an encyclopedia telling us all about these little
            bastards. The pokedex will give you information about what each one
            is looking like, about names, and about types.
          </p>
          <p>
            If you want more information, please go on a more serious website
            about the subject.
          </p>
        </div>
        <div>
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
    </React.Fragment>
  );
};

export default Home;
