import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";
import { SETTINGS } from "./settings";

import { App } from "./App";

const client = new ApolloClient({
  ssrMode: false,
  uri: SETTINGS.REACT_APP_SUBGRAPH,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root"),
);
