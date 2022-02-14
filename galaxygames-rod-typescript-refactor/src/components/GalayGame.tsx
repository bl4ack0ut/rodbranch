import React from "react";
import { decodeTokenURI } from "utils/uri";
import { utils, BigNumber } from "ethers";
import { parseBigNumber } from "utils/ethereum";

type IGalaxyGameProps = {
  galaxyGame: { value: number; isColonist: boolean; fuel: number; tokenURI: string };
  onClick: (ev: React.MouseEvent) => void;
  selected: boolean;
  stats?: { eonEarned: number; lastClaimTimestamp: number; eonPerFuel: number };
};
export const GalaxyGame: React.FunctionComponent<IGalaxyGameProps> = ({
  galaxyGame,
  onClick,
  selected,
  stats,
}) => {
  //const MAXIMUM_GLOBAL_WOOL = BigNumber.from(24000000).mul(BigNumber.from(10).pow(BigNumber.from(18)))
  const MAXIMUM_GLOBAL_EON = BigNumber.from(2000000000).mul(
    BigNumber.from(10).pow(BigNumber.from(18)),
  );

  const unclaimedEon = () => {
    if (!galaxyGame.value) return null;
    if (galaxyGame.isColonist) {
      const eonEarned = stats ? stats.eonEarned : 0;
      let duration = Math.floor(Date.now() / 1000) - galaxyGame.value;
      if (stats && BigNumber.from(eonEarned).gte(MAXIMUM_GLOBAL_EON)) {
        duration = Math.max(stats.lastClaimTimestamp - galaxyGame.value, 0);
      }
      const earnings = utils
        .parseUnits("10000", "gwei")
        .mul(BigNumber.from(duration))
        .div(BigNumber.from(24 * 60 * 60));
      return parseBigNumber(earnings, 0);
    } else {
      const eonPerFuel = stats ? stats.eonPerFuel : galaxyGame.value;
      const earnings = BigNumber.from(eonPerFuel)
        .sub(BigNumber.from(galaxyGame.value))
        .mul(BigNumber.from(galaxyGame.fuel));
      return parseBigNumber(earnings, 0);
    }
  };

  const earnings = unclaimedEon();

  return (
    <div
      className="mx-3 relative cursor-pointer"
      style={{
        width: "64px",
        height: "64px",
        border: selected ? "solid 4px #B11D18" : "",
        padding: selected ? "2px" : "10px",
      }}
      onClick={onClick}>
      <img
        src={decodeTokenURI(galaxyGame.tokenURI).image}
        alt="galaxyGame"
        style={{ width: "100%", height: "100%" }}
      />
      {earnings && (
        <div
          className="absolute font-console text-red text-center flex items-center justify-center"
          style={{
            width: "100%",
            height: "14px",
            background: "white",
            bottom: 0,
            right: 0,
            fontSize: "10px",
          }}>
          {earnings}
        </div>
      )}
    </div>
  );
};
