import { Provider } from "@ethersproject/abstract-provider";
import { Contract, Signer, utils } from "ethers";
import { useProvider } from "wagmi";
import GALAXYGAME_ABI from "./abi/galaxyGame.abi";
import PYTHEAS_ABI from "./abi/pytheas.abi";
import { SETTINGS } from "../settings";

const app_galaxy_game = SETTINGS.REACT_APP_GALAXYGAME;

/* old method, now using writeMint instead, keeping it for reference:
const MINT_PRICE = ".02";
export const mint = async (provider, signer, stake, tokens, paid) => {
  // const provider = useProvider();
  if (!provider) throw new Error("Unable to connect to wallet");

  console.log(tokens);
  console.log(stake);
  console.log(paid);

  const signerValue = signer || ("getSigner" in provider ? provider.getSigner() : undefined);
  const contract = new Contract(app_galaxy_game, GALAXYGAME_ABI, signerValue);
  //const ethCost = utils.parseEther(MINT_PRICE).mul(BigNumber.from(tokens));

  //const override = {
  // value: ethCost,
  // gasLimit: 3000000,
  // };

  return await contract.mint(tokens, stake, {
    value: paid ? utils.parseEther(MINT_PRICE).mul(tokens) : BigNumber.from(0),
    gasLimit: 3000000,
  });
};
*/

type IParseMintReceipt = { logs: Array<{ topics: string[]; data: string }> };
type IParseMintResult = { [key: string]: { tokenId: string; recipient: string; stake: boolean } };
export const parseMint = (_staked: boolean, receipt: IParseMintReceipt) => {
  const galaxyGame = new utils.Interface(GALAXYGAME_ABI);
  const pytheas = new utils.Interface(PYTHEAS_ABI);
  const results: IParseMintResult = {};
  for (const x in receipt.logs) {
    try {
      const log = pytheas.parseLog(receipt.logs[x]);
      results[log.args.tokenId.toString()] = {
        tokenId: log.args.tokenId,
        recipient: log.args.owner,
        stake: true,
      };
      continue;
    } catch (e) {}
    try {
      const log = galaxyGame.parseLog(receipt.logs[x]);
      results[log.args.tokenId.toString()] = {
        tokenId: log.args.tokenId,
        recipient: log.args.to,
        stake: false,
      };
    } catch (e) {}
  }

  return results;
};

export const tokenURI = async (signer: Signer, tokenId: string) => {
  const contract = new Contract(app_galaxy_game, GALAXYGAME_ABI, signer);
  return await contract.tokenURI(tokenId);
};

export const tokenTraits = async (signer: Signer, tokenId: string) => {
  //   const provider = useProvider();
  //   if (!provider) throw new Error("Unable to connect to wallet");
  //   const signer = provider.getSigner();
  const contract = new Contract(app_galaxy_game, GALAXYGAME_ABI, signer);
  return await contract.getTokenTraits(tokenId);
};

// TODO: fix tokenTraits any type
export const parseTokenTraits = (tokenTraits: any, tokenURI: string) => {
  return {
    isColonist: tokenTraits.isColonist,
    background: tokenTraits.background,
    jaw: tokenTraits.jaw,
    eye: tokenTraits.eye,
    sky: tokenTraits.sky,
    cockpit: tokenTraits.cockpit,
    weapon1: tokenTraits.weapon1,
    nose: tokenTraits.nose,
    tokenURI,
  };
};

export const isInvalidToken = (tokenURI: { image: string }) => {
  return (
    tokenURI.image ===
    "data:image/svg+xml;base64,PHN2ZyBpZD0id29vbGYiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDQwIDQwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48aW1hZ2UgeD0iNCIgeT0iNCIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBpbWFnZS1yZW5kZXJpbmc9InBpeGVsYXRlZCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQ0FBQUFBZ0JBTUFBQUNCVkdmSEFBQUFGVkJNVkVVQUFBRGZ2cWV5alhPVVhGa0FBQUIzUmt3bkp5ZTVySXhFQUFBQUFYUlNUbE1BUU9iWVpnQUFBT2xKUkVGVUtNOWQwVXR5d3lBTUJ1QXN1QUR1WTU5Zk5BZVFTTmNFSzltM3VBZm9lSHovSzBRbWptR2loWmo1UmhJYU9GaG9hcmxHRHBZY0dveElwdFFCQjFWSUJ3S0FPc2pldy9zT0xoWGFET2NyRExHREFZYmhGZDUzT0c3UURhM1JYN3ZHME1CVitIeUZPYlNXLzdXQTI2cmpsOEV2eS9Uc0VQejREd0xGSFhqd0VKSnoyb0RZVm1NaTJZR08vZzBtMHhQQUhzUzhEOG5NQTR0SlRCdWNyWitwVUpnZU1uNkRCVklrY256QUtZT0VaZzRGcWJhY1JxRHdJa0U1MUlvNEFiTmNTOXcrY1lrVDQxWnV5d1pYaVg5akxHS244eXRranFwS2xEbGQ2anM2VmN1cVRpMGQ3cUt1TTY2TGlsVnpBQUFBQUVsRlRrU3VRbUNDIi8+PGltYWdlIHg9IjQiIHk9IjQiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgaW1hZ2UtcmVuZGVyaW5nPSJwaXhlbGF0ZWQiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUNBQUFBQWdCQU1BQUFDQlZHZkhBQUFBRWxCTVZFVUFBQURwNGlXeEhSamVzQy9hUERhR0lpZXkwK2I5QUFBQUFYUlNUbE1BUU9iWVpnQUFBRFZKUkVGVUtNOWpBQUZtQVVNQlF3WWtJT1NvNUtnaWdPQXpCNGtxcVFnNUlxa3dWUXhTREFLcVFDZ3hOaFlVWkJnRnd3d0FBQ2EyQkNuUmtpb3JBQUFBQUVsRlRrU3VRbUNDIi8+PGltYWdlIHg9IjQiIHk9IjQiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgaW1hZ2UtcmVuZGVyaW5nPSJwaXhlbGF0ZWQiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUNBQUFBQWdCQU1BQUFDQlZHZkhBQUFBRlZCTVZFVUFBQUJEUDJSUVdaWXdZOVBhUERZa1VwbXhIUmdrdllKSkFBQUFBWFJTVGxNQVFPYllaZ0FBQUNwSlJFRlVLTTlqb0JzUVVoSVVGRlJTRW9RTE1JWUdNcVlsTWpBSXdBV01EUmxkSExFS2pJSUJBZ0N6RVFReUxKZzRVZ0FBQUFCSlJVNUVya0pnZ2c9PSIvPjxpbWFnZSB4PSI0IiB5PSI0IiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGltYWdlLXJlbmRlcmluZz0icGl4ZWxhdGVkIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFDQUFBQUFnQWdNQUFBQU9GSkpuQUFBQURGQk1WRVVBQUFBQUFBQ0dSRXVtWEZpeUxRdXFBQUFBQVhSU1RsTUFRT2JZWmdBQUFCdEpSRUZVR05Oam9Bdmcvd0JsY0MyQU1vUWFvUXpXRUliQkRBREZXUUtXZTFvMGFRQUFBQUJKUlU1RXJrSmdnZz09Ii8+PGltYWdlIHg9IjQiIHk9IjQiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgaW1hZ2UtcmVuZGVyaW5nPSJwaXhlbGF0ZWQiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFFQUFBQUJDQVFBQUFDMUhBd0NBQUFBQzBsRVFWUjQybU5rWUFBQUFBWUFBakNCMEM4QUFBQUFTVVZPUks1Q1lJST0iLz48L3N2Zz4="
  );
};
