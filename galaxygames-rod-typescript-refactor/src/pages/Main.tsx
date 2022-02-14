import React from "react";
import { Link } from "react-router-dom";
import { NavIconLinks } from "../components/NavIconLinks";
import { WalletPicker } from "../components/WalletPicker";
import { PageWrapper } from "../components/PageWrapper";
import logo from "assets/images/ShatteredEon_Logo_Transparent.png";
import HomeVideoLoop from "assets/videos/homepage.mp4";

// NOTE: mainlogo full size: 1500 x 587
export const Main = () => {
  return (
    <PageWrapper>
      <main>
        <video autoPlay muted loop id="bgLoop" src={HomeVideoLoop} />
        <div className="page__header" style={{ alignItems: "center" }}>
          <NavIconLinks />
          <div className="page__header__right">
            <WalletPicker />
          </div>
        </div>
        <div style={{ margin: "7rem auto" }}>
          <Link to="/">
            <img src={logo} alt="Shattered Eon" width={600} height={235} className="mainlogo" />
          </Link>
          <h1 className="hidden">Shattered Eon Galaxy Game</h1>
        </div>

        <div style={{ display: "flex", flexDirection: "row", flex: 1, margin: "auto" }}>
          <div>
            <Link
              to="/play"
              className="btn-primary"
              style={{ display: "inline-block", width: 150, marginRight: "2.5rem" }}>
              GAME
            </Link>
          </div>
          <div>
            <Link
              to="/faq"
              className="btn-primary"
              style={{ display: "inline-block", width: 150, marginLeft: "2.5rem" }}>
              FAQ
            </Link>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
};
