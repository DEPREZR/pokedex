import "./App.css";
import Pokedex from "Pokedex";
import Home from "Home";
import { HashRouter, Routes, Navigate, Route } from "react-router-dom";
import { Layout } from "antd";
import Menu from "Menu";
import PokemonDetails from "PokemonDetails";

const { Content } = Layout;

function App() {
  return (
    <Layout>
      <Content style={{ padding: "30px", minHeight: "100vh" }}>
        <HashRouter>
          <Routes>
            <Route exact path="/home" element={<><Menu /><Home /></>} />
            <Route path="/pokemon/:pokemonId" element={<><Menu /><PokemonDetails /></>} />
            <Route exact path="/pokedex" element={<><Menu /><Pokedex /></>} />
            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
        </HashRouter>
      </Content>
    </Layout>
  );
}

export default App;
