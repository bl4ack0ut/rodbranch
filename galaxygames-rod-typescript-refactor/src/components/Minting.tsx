import React, { useState } from "react";
import { CoralButton } from "./CoralButton";
import { MintProgress } from "./MintProgress";
import { LoadingModal } from "./LoadingModal";
import { OutcomeModal } from "./OutcomeModal";
import { parseMint } from "utils/galaxyGame";
// import { mint, parseMint, tokenURI, isInvalidWoolf } from '../utils/woolf'
// import { decodeTokenURI, isSheep } from '../utils/uri'
import { decodeTokenURI } from "utils/uri";
import GALAXYGAME_ABI from "utils/abi/galaxyGame.abi";
// import MintNStakeModal from './MintNStakeModal'
import { utils, BigNumber } from "ethers";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
// import Button from "react-bootstrap/Button";
import { useAccount, useProvider, useContractWrite, useBalance } from "wagmi";
import { WalletPicker } from "./WalletPicker";
import { SETTINGS } from "../settings";

// todo: change these prices in woolf.js as well
const PLACEHOLDER =
  "data:application/json;base64,eyJuYW1lIjogIldvbGYgIzI5IiwgImRlc2NyaXB0aW9uIjogIlRob3VzYW5kcyBvZiBTaGVlcCBhbmQgV29sdmVzIGNvbXBldGUgb24gYSBmYXJtIGluIHRoZSBtZXRhdmVyc2UuIEEgdGVtcHRpbmcgcHJpemUgb2YgJFdPT0wgYXdhaXRzLCB3aXRoIGRlYWRseSBoaWdoIHN0YWtlcy4gQWxsIHRoZSBtZXRhZGF0YSBhbmQgaW1hZ2VzIGFyZSBnZW5lcmF0ZWQgYW5kIHN0b3JlZCAxMDAlIG9uLWNoYWluLiBObyBJUEZTLiBOTyBBUEkuIEp1c3QgdGhlIEF2YWxhbmNoZSBibG9ja2NoYWluLiIsICJpbWFnZSI6ICJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBEOTRiV3dnZG1WeWMybHZiajBpTVM0d0lpQmxibU52WkdsdVp6MGlhWE52TFRnNE5Ua3RNU0kvUGcwS1BDRXRMU0JIWlc1bGNtRjBiM0k2SUVGa2IySmxJRWxzYkhWemRISmhkRzl5SURFNExqRXVNU3dnVTFaSElFVjRjRzl5ZENCUWJIVm5MVWx1SUM0Z1UxWkhJRlpsY25OcGIyNDZJRFl1TURBZ1FuVnBiR1FnTUNrZ0lDMHRQZzBLUEhOMlp5QjJaWEp6YVc5dVBTSXhMakVpSUdsa1BTSkRZWEJoWHpFaUlIaHRiRzV6UFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eU1EQXdMM04yWnlJZ2VHMXNibk02ZUd4cGJtczlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5MekU1T1RrdmVHeHBibXNpSUhnOUlqQndlQ0lnZVQwaU1IQjRJZzBLQ1NCMmFXVjNRbTk0UFNJd0lEQWdNeklnTXpJaUlITjBlV3hsUFNKbGJtRmliR1V0WW1GamEyZHliM1Z1WkRwdVpYY2dNQ0F3SURNeUlETXlPeUlnZUcxc09uTndZV05sUFNKd2NtVnpaWEoyWlNJK0RRbzhaejROQ2drOFp5QnBaRDBpY1hWbGMzUnBiMjVmZURWR1gyMWhjbXNpUGcwS0NRazhaejROQ2drSkNUeHdZWFJvSUhOMGVXeGxQU0ptYVd4c09pTXdNekF4TURRN0lpQmtQU0pOTVRjdU5pd3pNR013TERFdU1UQXlMVEF1T0RrMUxESXRNaXd5Y3kweUxUQXVPRGs0TFRJdE1tTXdMVEV1TVRBNUxEQXVPRGsxTFRJc01pMHlVekUzTGpZc01qZ3VPRGt4TERFM0xqWXNNekI2SWk4K0RRb0pDUWs4Y0dGMGFDQnpkSGxzWlQwaVptbHNiRG9qTURNd01UQTBPeUlnWkQwaVRURTFMalkzTml3eU5TNDVOemRqTFRFdU16TTJMREF0TWk0MU9TMHdMalV5TXkwekxqVXpOUzB4TGpRMk9XTXRNQzQ1TkRVdE1TNHhNRFV0TVM0ME5qVXRNaTR6TlRrdE1TNDBOalV0TXk0Mk9UVU5DZ2tKQ1Fsek1DNDFNaTB5TGpVNUxERXVORFkxTFRNdU16Y3hiRFl1TmpnNExUWXVOamc0UXpFNUxqVTROQ3c1TGprNU5pd3lNQ3c0TGprNU1pd3lNQ3czTGpreU5tTXdMVEV1TURjdE1DNDBNVFl0TWk0d056UXRNUzR4TnpJdE1pNDRNamdOQ2drSkNRbGpMVEV1TlRVNUxURXVOVFU1TFRRdU1EazJMVEV1TlRZeUxUVXVOalUwTERCRE1USXVOREUyTERVdU9EVXlMREV5TERZdU9EVTFMREV5TERjdU9USTJTRGhqTUMweUxqRXpOeXd3TGpnek5DMDBMakUwT0N3eUxqTTBPQzAxTGpZMkRRb0pDUWtKWXpNdU1ESXRNeTR3TWpNc09DNHlPRFV0TXk0d01pd3hNUzR6TURrc01DNHdNRFJETWpNdU1UWTRMRE11TnpjM0xESTBMRFV1TnpnMUxESTBMRGN1T1RJMll6QXNNaTR4TXpjdE1DNDRNeklzTkM0eE5EVXRNaTR6TkRRc05TNDJOVFpzTFRZdU5qZzRMRFl1TlRJekRRb0pDUWtKWXkwd0xqTTRPU3d3TGpNNU1TMHdMak00T1N3eExqQXlNeXd3TERFdU5ERTBZekF1TXpreExEQXVNemt4TERFdU1ESXpMREF1TXpreExERXVOREUwTERCak1DNHlOVFF0TUM0eU5UZ3NNQzR5T1RNdE1DNDFOVFVzTUM0eU9UTXRNQzQzTVRGb05BMEtDUWtKQ1dNd0xERXVNek0yTFRBdU5USXNNaTQxT1RRdE1TNDBOalVzTXk0Mk9UbERNVGd1TWpZMkxESTFMalExTXl3eE55NHdNVElzTWpVdU9UYzNMREUxTGpZM05pd3lOUzQ1TnpkTU1UVXVOamMyTERJMUxqazNOM29pTHo0TkNna0pQQzluUGcwS0NUd3ZaejROQ2p3dlp6NE5DanhuUGcwS1BDOW5QZzBLUEdjK0RRbzhMMmMrRFFvOFp6NE5Dand2Wno0TkNqeG5QZzBLUEM5blBnMEtQR2MrRFFvOEwyYytEUW84Wno0TkNqd3ZaejROQ2p4blBnMEtQQzluUGcwS1BHYytEUW84TDJjK0RRbzhaejROQ2p3dlp6NE5DanhuUGcwS1BDOW5QZzBLUEdjK0RRbzhMMmMrRFFvOFp6NE5Dand2Wno0TkNqeG5QZzBLUEM5blBnMEtQR2MrRFFvOEwyYytEUW84Wno0TkNqd3ZaejROQ2p3dmMzWm5QZzBLIiwgImF0dHJpYnV0ZXMiOlt7InRyYWl0X3R5cGUiOiJGdXIiLCJ2YWx1ZSI6IkdyYXkifSx7InRyYWl0X3R5cGUiOiJIZWFkIiwidmFsdWUiOiJCZXRhIn0seyJ0cmFpdF90eXBlIjoiRXllcyIsInZhbHVlIjoiQ2xvc2VkIn0seyJ0cmFpdF90eXBlIjoiTW91dGgiLCJ2YWx1ZSI6IlNtaXJrIn0seyJ0cmFpdF90eXBlIjoiTmVjayIsInZhbHVlIjoiVGllIn0seyJ0cmFpdF90eXBlIjoiQWxwaGEgU2NvcmUiLCJ2YWx1ZSI6IjcifSx7InRyYWl0X3R5cGUiOiJHZW5lcmF0aW9uIiwidmFsdWUiOiJHZW4gMCJ9LHsidHJhaXRfdHlwZSI6IlR5cGUiLCJ2YWx1ZSI6IldvbGYifV19";

// const ETH_COST = ".069";
const MINT_PRICE = ".02";
// REACT_APP_EON
// REACT_APP_GALAXYGAME
const GAME_ADDRESS = SETTINGS.REACT_APP_GALAXYGAME;
const EON_ADDRESS = SETTINGS.REACT_APP_EON;

type IMintingProps = {
  stats: { totalSupply: string; maxTokens: number };
  reload: () => void;
};
export const Minting = ({ stats, reload }: IMintingProps) => {
  const provider = useProvider();
  const [{ data: accountData }] = useAccount({ fetchEns: false });
  const [{ data: eonBalanceData }] = useBalance({ addressOrName: EON_ADDRESS });
  const eon = eonBalanceData?.value;
  const [{ error }, writeMint] = useContractWrite(
    {
      addressOrName: GAME_ADDRESS,
      contractInterface: GALAXYGAME_ABI,
      signerOrProvider: provider,
    },
    "mint",
  );
  const wallet = accountData?.address;
  const [amount, setAmount] = useState(1);
  const [transacting, setTransacting] = useState(false);
  const [outcomes, setOutcomes] = useState<
    Array<{ message: string; source: string; link?: string; linkMessage?: string }>
  >([]);
  const onMint = async (stake: boolean) => {
    try {
      setTransacting(true);
      const writeResult = await writeMint({
        args: [amount, stake],
        overrides: {
          gasLimit: "3000000",
          value: requiresEth()
            ? utils.parseEther(MINT_PRICE).mul(amount).toString()
            : BigNumber.from(0).toString(),
        },
      });
      if (writeResult?.error || !writeResult?.data) {
        throw new Error(writeResult?.error?.message || "Failed to mint");
      }
      const receipt = await writeResult.data.wait();
      const results = Object.values(parseMint(stake, receipt));
      setTimeout(async () => {
        await presentOutcomes(results);
        setTransacting(false);
      }, 2000);
      console.log("Transaction finished: ", writeResult);
    } catch (e) {
      console.error("onMint error: ", e, transacting);
      setTransacting(false);
    }
  };

  // const delay = (time) => {
  //   return new Promise(res => setTimeout(res, time))
  // }

  // const getWoolf = async (tokenId) => {
  //   try {
  //     let u = await tokenURI(signer, tokenId)
  //     while (isInvalidWoolf(decodeTokenURI(u))) {
  //       console.log('RETRYING')
  //       await delay(1000)
  //       u = await tokenURI(tokenId)
  //     }
  //     return u
  //   } catch (e) {
  //     console.log('READ FAILED. RETRYING')
  //     return getWoolf(tokenId)
  //   }
  // }

  const presentOutcomes = async (results: Array<{ tokenId: string; recipient: string }>) => {
    const o: Array<{ message: string; source: string; link?: string; linkMessage?: string }> = [];
    for (const i in results) {
      // const { tokenId, recipient, stake } = results[i]
      const { tokenId, recipient } = results[i];

      // let u = await getWoolf(tokenId)
      const u = PLACEHOLDER;

      const stolen = recipient.toLowerCase() !== wallet?.toLowerCase();

      if (stolen) {
        const shortRecipient = `${recipient.slice(0, 6)}...${recipient.slice(-4)}`;
        o.push(
          {
            message: `You minted a sheep or a woolf #${tokenId.toString()} BUT...`,
            source: decodeTokenURI(u).image,
            link: "",
            linkMessage: "",
          },
          {
            message: `It was stolen by a Wolf! It's now owned by ${shortRecipient}`,
            source: "/images/mint-stolen.gif",
          },
        );
      } else {
        o.push({
          message: `You arrived safely at home with a sheep or a woolf #${tokenId.toString()}...`,
          source: decodeTokenURI(u).image,
          link: "",
          linkMessage: "",
        });
      }
    }
    setOutcomes(o);
  };

  const totalMinted = () => {
    if (!stats) return 0;
    // return parseInt(stats.sheepMinted) + parseInt(stats.wolvesMinted)
    return parseInt(stats.totalSupply);
  };

  const maxTokens = () => {
    if (!stats) return 500;
    return stats.maxTokens;
  };

  const requiresEth = () => {
    if (!stats) return true;
    return totalMinted() < stats.maxTokens / 5;
  };

  const ethCost = () => {
    return (
      utils.formatUnits(utils.parseUnits(MINT_PRICE, "gwei").mul(BigNumber.from(amount)), "gwei") +
      "ETH"
    );
  };

  const eonCost = (tokenId: number) => {
    if (!stats) return 0;
    const maxTokens = stats.maxTokens;
    if (tokenId <= (maxTokens * 2) / 5) return 20000;
    if (tokenId <= (maxTokens * 4) / 5) return 40000;
    return 80000;
  };

  const totalEonCost = () => {
    if (!stats) return 0;
    let total = 0;
    const currentId = totalMinted();
    for (let i = 1; i <= amount; i++) {
      total += eonCost(currentId + i);
    }
    return total;
  };

  const preCheck = () => {
    if (requiresEth()) return undefined;
    if (!eon) return "Insufficient $EON";
    if (utils.parseUnits("" + totalEonCost(), "gwei").gt(eon)) {
      return "Insufficient $EON";
    }
    return undefined;
  };

  return (
    <>
      <section className="text-center">
        <h2>MINTING</h2>
      </section>
      <MintProgress minted={totalMinted()} maxTokens={maxTokens()} />

      {totalMinted() >= maxTokens() ? (
        <div className="text-red text-2xl">Sold out!</div>
      ) : (
        <WalletPicker>
          <div>
            <div>
              <button
                className="amount-toggle"
                title="decrease"
                onClick={() => {
                  setAmount(Math.max(1, amount - 1));
                }}>
                /<br />\
              </button>
              <span className="click-count">0/5</span>
              <button
                className="amount-toggle"
                title="decrease"
                onClick={() => {
                  setAmount(Math.min(10, amount + 1));
                }}>
                \<br />/
              </button>
              <div className="mint-cost-wrapper">
                <span className="mint-cost cost-eth">
                  {requiresEth() ? ethCost() : `${totalEonCost()} $EON`}
                </span>
                <span className="mint-cost cost-eon">{requiresEth() && `${eonCost(0)}`} EON</span>
              </div>
            </div>
            <div>
              {preCheck() ? (
                <div className="text-red text-2xl">{preCheck()}</div>
              ) : (
                <>
                  <CoralButton
                    // className="btn btn-primary"
                    title={"MINT"}
                    disabled={transacting}
                    onClick={() => {
                      onMint(false);
                    }}
                    width={160}
                    height={60}
                  />
                  <button
                    // className="text-center min-stake btn-secondary"
                    disabled={transacting}
                    onClick={() => {
                      onMint(true);
                    }}>
                    MINT &amp;
                    <br />
                    STAKE
                  </button>
                  (saves gas)
                </>
              )}

              {error?.message && (
                <div className="text-sm text-red font-console">{error.message}</div>
              )}
            </div>
          </div>
        </WalletPicker>
      )}
      <LoadingModal
        loadingScenes={[
          {
            message: "Pytheas is in sight sir",
            source: "assets/gifs/GG_BirthingChamberLoop.gif",
          },
        ]}
        modalIsOpen={transacting}
      />
      <OutcomeModal
        outcomes={outcomes}
        modalIsOpen={outcomes.length > 0}
        closeModal={() => {
          setOutcomes([]);
          reload();
        }}
      />
    </>
  );
};
