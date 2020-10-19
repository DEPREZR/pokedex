import React from "react";
import "./App.css";
import Pokedex from "Pokedex";
import Home from "Home";
import { HashRouter, Switch, Redirect, Route } from "react-router-dom";
import { Layout } from "antd";
import Menu from "Menu";

const { Content } = Layout;

function App() {
  return (
    <Layout>
      <Content style={{ padding: "30px", minHeight: "100vh" }}>
        <HashRouter>
          <Switch>
            <Route exact path="/home">
              <Menu />
              <Home />
            </Route>
            <Route exact path="/pokedex">
              <Menu />
              <Pokedex />
            </Route>
            <Route>
              <Redirect to="/home" />
            </Route>
          </Switch>
        </HashRouter>
      </Content>
    </Layout>
  );
}

export default App;
