import { Contract, utils, BigNumber, Signer } from "ethers";
import { SETTINGS } from "../settings";
import PYTHEAS_ABI from "./abi/pytheas.abi";

const pytheas_addr = SETTINGS.REACT_APP_PYTHEAS;

export const stake = async (signer: Signer, account: string, tokenIds: string[]) => {
  const contract = new Contract(pytheas_addr, PYTHEAS_ABI, signer);
  const gasEstimate = await contract.estimateGas.addManyToPytheasAndCrew(account, tokenIds);
  return await contract.addManyToPytheasAndCrew(account, tokenIds, {
    gasLimit: gasEstimate.mul(BigNumber.from(12)).div(BigNumber.from(10)),
  });
};

export const claim = async (signer: Signer, tokenIds: string[], unstake: boolean) => {
  const contract = new Contract(pytheas_addr, PYTHEAS_ABI, signer);
  const gasEstimate = await contract.estimateGas.claimManyFromPytheasAndCrew(tokenIds, unstake);
  return await contract.claimManyFromPytheasAndCrew(tokenIds, unstake, {
    gasLimit: gasEstimate.mul(BigNumber.from(12)).div(BigNumber.from(10)),
  });
};

export const parseClaims = (receipt: { logs: Array<{ topics: string[]; data: string }> }) => {
  const pytheas = new utils.Interface(PYTHEAS_ABI);
  const claims: utils.Result[] = [];
  receipt.logs.forEach((log) => {
    try {
      const args = pytheas.parseLog(log).args;
      if (args.tokenId) claims.push(args);
    } catch (error) {}
  });
  return claims;
};
