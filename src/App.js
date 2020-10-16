import React from "react";
import "./App.css";
import Pokedex from "Pokedex";
import { HashRouter, Switch, Redirect, Route } from "react-router-dom";
import { Layout } from "antd";

const { Content } = Layout;

function App() {
  return (
    <Layout>
      <Content style={{ padding: "30px", minHeight: "100vh" }}>
        <HashRouter>
          <Switch>
            <Route exact path="/pokedex">
              <Pokedex />
            </Route>
            <Route>
              <Redirect to="/pokedex" />
            </Route>
          </Switch>
        </HashRouter>
      </Content>
    </Layout>
  );
}

export default App;
