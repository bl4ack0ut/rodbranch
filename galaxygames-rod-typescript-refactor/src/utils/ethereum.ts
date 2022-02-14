import { BaseProvider } from "@ethersproject/providers";
import { BigNumberish, utils } from "ethers";
import { defaultChains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { SETTINGS } from "../settings";

export const chainId = SETTINGS.REACT_APP_CHAIN;

const chains = defaultChains.filter((c) => `${c.id}` === `${chainId}`);

export const walletConnectors = () => {
  return [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: { infuraId: SETTINGS.INFURA_ID },
    }),
  ];
};

export const watchTransaction = async (provider: BaseProvider, txHash: string) => {
  if (!provider) return;
  // provider.once(txHash, (transaction) => {
  //   callback(transaction, transaction.status === 1);
  // });
  const transactionStatus = await provider.waitForTransaction(txHash);
  // const confirm = await provider.waitForTransaction(txHash);
  return transactionStatus;
};

export const parseBigNumber = (bn: BigNumberish, decimals = 2) => {
  if (!bn) return 0;
  try {
    return numberWithCommas(parseFloat(utils.formatUnits(bn, "ether")).toFixed(decimals));
  } catch (e) {
    return bn;
  }
};

function numberWithCommas(x: number | string) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
