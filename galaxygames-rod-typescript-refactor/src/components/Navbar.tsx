import React from "react";
import { NavIconLinks } from "./NavIconLinks";
import { WalletPicker } from "components/WalletPicker";

export function Navbar() {
  return (
    <div>
      <div>
        <NavIconLinks />
      </div>
      <div>
        <WalletPicker />
      </div>
    </div>
  );
}
