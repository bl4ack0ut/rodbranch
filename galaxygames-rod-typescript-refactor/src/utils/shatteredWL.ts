// ShatteredWL -
// • Top level contract
// • Used for Colonist minting during the whitelist and public sales in eth by way of the function at line 76 -
//   ```
//   function mintColonist(uint256 amount, bool stake)
//     external
//     payable
//     nonReentrant
//   ```
// • It will require that the amount being minted is > 1 & < 5 and that the amount of eth sent with the function is either the
//   “WhiteListPrice” or the “publicSalePirce” multiplied by the amount of mints.
// • If the public sale has not started the minters address must be stored in the “WhiteList” struct.
// • The public sale is toggled by the owner by marking bool “hasPublicSaleStarted” to true.
// • The user who is minting has the option to Mint&Stake their Colonist(s) at this time by toggling the “MintColonist” variable “Stake”
//   to true. Saving them gas vs minting and then paying gas fees again to stake. This will mint their Colonist to the “Pytheas” contract
//   where it will be stored. The struct “Stake” within the Pytheas contract will store the “tokenId” of the newly minted Colonist.
//   The “Value” (this is a timestamp) and the address of the minter “sOwner” within the Pytheas Contract at line 17:
//   ```
//    struct Stake {
//      external
//      payable
//      nonReentrant
//      uint16 tokenId;
//      uint80 value;
//      address sOwner;
//    }
//   ```
// • Only the first 10,000 mints are for sale in eth. After which the ShatteredEON contract will take the place of this contract.
// • Using two contracts, in this case, is to save the users gas and for simplicity of keeping all things eth to this contract and this contract only.

import { useCallback, useEffect, useState } from "react";
import { SETTINGS } from "settings";
import ShatteredWL from "./json_abis/ShatteredWL.json";
import Web3 from "web3";
import { parseBigNumber } from "./ethereum";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ABI: any = ShatteredWL;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ETH: any = window.ethereum;

export const useHasPublicSaleStarted = () => {
  const [hasStarted, setHasPublicSaleStarted] = useState<boolean | null>(null);
  const fetchMintCosts = useCallback(async () => {
    const web3 = new Web3(ETH);
    const contract = new web3.eth.Contract(ABI, SETTINGS.SHATTEREDWLADDRESS);
    const hasPublicSaleStarted = await contract.methods.hasPublicSaleStarted().call();
    return setHasPublicSaleStarted(hasPublicSaleStarted);
  }, []);
  useEffect(() => {
    fetchMintCosts();
  }, []);
  return hasStarted;
};

export const callMintColonist = (
  amount: number,
  stake: boolean,
  fromAddress: string,
  value: number,
) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (res, rej) => {
    try {
      const web3 = new Web3(ETH);
      const contract = new web3.eth.Contract(ABI, SETTINGS.SHATTEREDWLADDRESS);
      const gasPrice = await web3.eth.getGasPrice();
      const gasLimit = "0x927C0";
      const weiValue = Web3.utils.toWei(value.toString(), "ether");
      await contract.methods
        .mintColonist(amount, stake)
        .send({ from: fromAddress, gasPrice, gasLimit, value: weiValue })
        .on("transactionHash", (hash: string) => {
          console.log("callMintColonist hash: ", hash);
        })
        .on("receipt", res)
        .on("error", rej);
    } catch (err) {
      console.error("Failed callMintColonist: ", err);
      rej(err);
    }
  });
};
