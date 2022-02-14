import { useCallback, useEffect, useState } from "react";
import { SETTINGS } from "settings";
import ShatteredEON from "./json_abis/ShatteredEON.json";
import Web3 from "web3";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ABI: any = ShatteredEON;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ETH: any = window.ethereum;

export const useMintCosts = (tokenId?: number) => {
  const [cost, setCost] = useState<{ rawMintCost: string; eonMintCost: string } | null>(null);
  //   const contract = useContract({
  //     addressOrName: SETTINGS.SHATTEREDEONADDRESS,
  //     contractInterface: ShatteredEonAbi,
  //   });
  //   const [{ data: signerData, error: signerError, loading: signerLoading }] = useSigner();
  const fetchMintCosts = useCallback(async () => {
    if (tokenId) {
      const web3 = new Web3(ETH);
      const contract = new web3.eth.Contract(ABI, SETTINGS.SHATTEREDEONADDRESS);
      const [rawMintCost, eonMintCost] = await Promise.all([
        contract.methods.rawMintCost(tokenId.toString(), SETTINGS.MAX_COLONISTS.toString()).call(),
        contract.methods.EONmintCost(tokenId.toString(), SETTINGS.MAX_COLONISTS.toString()).call(),
      ]);
      return setCost({ rawMintCost, eonMintCost });
    }
  }, [tokenId]);
  useEffect(() => {
    if (tokenId) {
      fetchMintCosts();
    }
  }, [tokenId]);
  return cost;
};

export const callMintColonistEON = (
  amount: number,
  paymentType: "rEON" | "EON",
  stake: boolean,
  fromAddress: string,
) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (res, rej) => {
    try {
      const web3 = new Web3(ETH);
      const contract = new web3.eth.Contract(ABI, SETTINGS.SHATTEREDWLADDRESS);
      const gasPrice = await web3.eth.getGasPrice();
      const gasLimit = "0x927C0";
      const paymentId = paymentType === "rEON" ? "1" : "0";
      await contract.methods
        .mintColonist(amount, paymentId, stake)
        .send({ from: fromAddress, gasPrice, gasLimit })
        .on("transactionHash", (hash: string) => {
          console.log("EON.callMintColonist hash: ", hash);
        })
        .on("receipt", res)
        .on("error", rej);
    } catch (err) {
      console.error("Failed EON.callMintColonist: ", err);
      rej(err);
    }
  });
};
