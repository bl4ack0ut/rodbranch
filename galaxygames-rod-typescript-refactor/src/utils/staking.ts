import Terry from "assets/images/avatars/Tezza.png";
import Swamp from "assets/images/avatars/Swamp.png";
import Blackbird from "assets/images/avatars/Blackbird.png";
import Blackout from "assets/images/avatars/Blackout.png";
import J3spa from "assets/images/avatars/J3spa.png";
import Bill from "assets/images/avatars/Bill.png";
import Web3 from "web3";
import { provider } from "web3-core";
import { AbiItem } from "web3-utils";
import { useEffect, useState, useCallback } from "react";
import { useBlockNumber, useAccount } from "wagmi";

type IAvatarType = "colonist" | "pirate";
export type IAvatar = { type: IAvatarType; image: string; name: string; subtitle?: string };

export const useUnstakedNFTs = () => {
  const [nfts, setNFTs] = useState<IAvatar[] | null>(null);
  const [{ data: accountData, error: accountError }] = useAccount();
  const [{ data: blockNumberData, error: blockNumberError }] = useBlockNumber();
  const fetchNFTs = useCallback(async () => {
    if (accountData?.address && !accountError && !blockNumberError) {
      const updatedNfts = await getWalletUnstakedColonistsOrPirates(); // TODO
      return setNFTs(updatedNfts);
    }
  }, [accountData?.address, blockNumberData]);

  useEffect(() => {
    if (accountData?.address && blockNumberData) {
      fetchNFTs();
    }
  }, [accountData?.address, blockNumberData]);
  return [nfts] as const;
};

export const useStakedColonists = () => {
  const [nfts, setNFTs] = useState<IAvatar[] | null>(null);
  const [{ data: accountData, error: accountError }] = useAccount();
  const [{ data: blockNumberData, error: blockNumberError }] = useBlockNumber();
  const fetchNFTs = useCallback(async () => {
    if (accountData?.address && !accountError && !blockNumberError) {
      const updatedNfts = await getWalletUnstakedColonistsOrPirates(true); // TODO
      return setNFTs(updatedNfts.filter((nft) => nft.type === "colonist"));
    }
  }, [accountData?.address, blockNumberData]);

  useEffect(() => {
    if (accountData?.address && blockNumberData) {
      fetchNFTs();
    }
  }, [accountData?.address, blockNumberData]);
  return [nfts] as const;
};

export const useStakedPirates = () => {
  const [nfts, setNFTs] = useState<IAvatar[] | null>(null);
  const [{ data: accountData, error: accountError }] = useAccount();
  const [{ data: blockNumberData, error: blockNumberError }] = useBlockNumber();
  const fetchNFTs = useCallback(async () => {
    if (accountData?.address && !accountError && !blockNumberError) {
      const updatedNfts = await getWalletUnstakedColonistsOrPirates(true); // TODO
      return setNFTs(updatedNfts.filter((nft) => nft.type === "pirate"));
    }
  }, [accountData?.address, blockNumberData]);

  useEffect(() => {
    if (accountData?.address && blockNumberData) {
      fetchNFTs();
    }
  }, [accountData?.address, blockNumberData]);
  return [nfts] as const;
};

export const getWalletUnstakedColonistsOrPirates = async (
  useSubtitle?: boolean,
): Promise<IAvatar[]> => {
  // NOTE: for now this is a mocKup, but should be a function that will get the actual wallet's unstaked colonists or pirates
  const values = [
    { type: "pirate" as IAvatarType, image: Bill, name: "Bill" },
    { type: "pirate" as IAvatarType, image: Terry, name: "Terry" },
    { type: "colonist" as IAvatarType, image: J3spa, name: "J3spa" },
    { type: "colonist" as IAvatarType, image: Swamp, name: "Swamp" },
    { type: "colonist" as IAvatarType, image: Blackout, name: "Blackout" },
    { type: "pirate" as IAvatarType, image: Blackbird, name: "Blackbird" },
    { type: "pirate" as IAvatarType, image: Bill, name: "Bill" },
    { type: "pirate" as IAvatarType, image: Terry, name: "Terry" },
    { type: "colonist" as IAvatarType, image: J3spa, name: "J3spa" },
    { type: "colonist" as IAvatarType, image: Swamp, name: "Swamp" },
    { type: "colonist" as IAvatarType, image: Blackout, name: "Blackout" },
    { type: "pirate" as IAvatarType, image: Blackbird, name: "Blackbird" },
  ];
  if (useSubtitle) {
    return values.map((v) => ({ ...v, subtitle: "28,506" }));
  }
  return values;
};

export const getContract = (provider: provider, address: string, ABI: unknown) => {
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(ABI as AbiItem, address);
  return contract;
};

// export const callStakingDeposit = (wallet: Wallet, poolId: string, amount: string, decimals: number) => {
//     const stakingContract = getContract(wallet.ethereum, CONTRACTS.staking, STAKING_ABI);
//     return new Promise(async (res, rej) => {
//       try {
//             const web3 = new Web3(wallet.ethereum);
//             const gasPrice = await web3.eth.getGasPrice();
//             const gasLimit = '0x927C0';
//             const finalAmount = new BigNumber(amount).times(new BigNumber(10).pow(decimals)).toString();
//             await stakingContract.methods
//                 .deposit(poolId, finalAmount)
//                 .send({ from: wallet.account, gasPrice, gasLimit })
//                 .on('transactionHash', (hash: string) => { console.log('hash: ', hash); })
//                 .on('receipt', res)
//                 .on('error', rej);
//         } catch (err) {
//             console.error('Failed callStakingDeposit: ', err);
//             rej(err);
//         }
//     });
//   }
//   Contract.methods.pay().send({
//     from: accounts,
//     gas: 470000,
//     value:1000000000000000000 // in WEI, which is equivalent to 1 ether
//     gasPrice:0
//   })
//   const weiValue = Web3.utils.toWei('1', 'ether');

/*
export const getBalance = async (address: string, provider: provider) => {
  if (!address || !provider) {
    return null;
  }
  const tokenContract = getContract(provider, CONTRACTS.gn, GN_ABI);
  try {
    const n: string = await tokenContract.methods.balanceOf(wallet.account).call();
    const decimals: string = await tokenContract.methods.decimals().call();
    const symbol: string = await tokenContract.methods.symbol().call();
    return [
      new BigNumber(n.toString()).dividedBy(new BigNumber(10).pow(decimals)),
      symbol,
      decimals,
    ] as const;
  } catch (err) {
    console.error("Error getting balance: ", err);
    return null;
  }
};

export const useTokenBalance = () => {
  const [balance, setBalance] = useState<BigNumber | null>(null);
  const [symbol, setSymbol] = useState<string | null>(null);
  const [decimals, setDecimals] = useState<string | null>(null);
  //   const wallet = useWallet.useWallet();
  const [{ data: accountData, error: accountError, loading: accountLoading }, disconnectAccount] =
    useAccount();
  const [
    { data: blockNumberData, error: blockNumberError, loading: blockLoading },
    getBlockNumber,
  ] = useBlockNumber();
  const provider = useProvider();
  const fetchBalance = useCallback(async () => {
    if (!accountData?.address) {
      return setBalance(BigNumber.from(0));
    }
    const b = await getBalance(accountData.address, provider);
    if (!b) {
      return;
    }
    setBalance();
    setSymbol(b[1]);
    setDecimals(b[2]);
  }, [wallet.account, wallet.ethereum]);

  useEffect(() => {
    if (wallet.account && wallet.ethereum) {
      fetchBalance();
    }
  }, [wallet.account, wallet.ethereum, setBalance, block]);
  return [balance, symbol, decimals] as const;
};

*/
