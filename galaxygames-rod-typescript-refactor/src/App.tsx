import React from "react";
import Modal from "react-modal";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { walletConnectors } from "utils/ethereum";
import { Provider } from "wagmi";

import { GlobalStyles } from "./GlobalStyles";
import { Main } from "./pages/Main";
import { Play } from "./pages/Play";
import { ToS } from "./pages/ToS";
import { FAQ } from "./pages/FAQ";

export const App = () => {
  React.useEffect(() => {
    Modal.setAppElement("body");
    console.log("Mounting app");
  }, []);
  return (
    <React.Fragment>
      <GlobalStyles />
      <Provider autoConnect connectors={walletConnectors}>
        <BrowserRouter>
          <Routes>
            <Route path="/faq" element={<FAQ />} />
            <Route path="/tos" element={<ToS />} />
            <Route path="/play" element={<Play />} />
            <Route path="/" element={<Main />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </React.Fragment>
  );
};
