import React, { useEffect, useState } from "react";
import TokenList from "./TokenList";
import { LoadingModal } from "./LoadingModal";
import { OutcomeModal } from "./OutcomeModal";
import { UnstakeModal } from "./UnstakeModal";
import { parseClaims, stake, claim } from "utils/pytheas";
import { parseBigNumber, watchTransaction } from "utils/ethereum";
import { BigNumber } from "@ethersproject/bignumber";
import { CoralButton } from "./CoralButton";

import Terry from "assets/images/avatars/Tezza.png";
import Swamp from "assets/images/avatars/Swamp.png";
import Blackbird from "assets/images/avatars/Blackbird.png";
import Blackout from "assets/images/avatars/Blackout.png";
import J3spa from "assets/images/avatars/J3spa.png";
import Bill from "assets/images/avatars/Bill.png";

import { useProvider, useAccount, useSigner, useBalance } from "wagmi";
import { WalletPicker } from "./WalletPicker";
import { SETTINGS } from "settings";

type IStakingProps = {
  fetching: boolean;
  tokens: Array<{ id: string }>;
  stakes: Array<{ id: string; number: string; isColonist: boolean; value: string }>;
  reload: () => void;
  stats: {
    totalSupply: string;
    maxTokens: number;
    eonEarned: number;
    lastClaimTimestamp: number;
    eonPerFuel: number;
  };
};
export const Staking: React.FunctionComponent<IStakingProps> = ({
  fetching,
  tokens,
  stakes,
  reload,
  stats,
}) => {
  const provider = useProvider();
  const [{ data: signerData }] = useSigner();
  const [{ data: accountData }] = useAccount({ fetchEns: false });
  const [{ data: eonBalanceData }] = useBalance({ addressOrName: SETTINGS.REACT_APP_EON });
  const eon = eonBalanceData?.value;
  const [loadingScenes, setLoadingScenes] = useState<Array<{ message: string; source: string }>>(
    [],
  );
  const [outcomes, setOutcomes] = useState<Array<{ message: string; source: string }>>([]);
  const [operation, setOperation] = useState<null | string>(null);
  const [selected, setSelected] = useState<
    Array<{ id: string; number: string; isColonist: boolean; value: string }>
  >([]);
  const [selectedAll, setSelectedAll] = useState(false);

  const [isUnstaking, setIsUnstaking] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transacting, setTransacting] = useState(false);

  useEffect(() => {
    if (selected.length === 0) setOperation(null);
  }, [selected]);

  const wallet = accountData?.address!;
  const onStake = async () => {
    setLoading(true);
    setError(null);
    try {
      const hash = (
        await stake(
          signerData!,
          wallet,
          selected.map((x) => x.number),
        )
      ).hash;
      setTransacting(true);
      const receipt = await watchTransaction(provider, hash);
      console.warn("Receipt: ", receipt);
      //   async (receipt, success) => {
      // if (!success) {
      //   setLoading(false);
      //   setTransacting(false);
      //   return setError("Stake failed. Check transaction.");
      // }
      const o: Array<{ message: string; source: string }> = [];
      for (let i = 0; i < selected.length; i++) {
        const message = selected[i].isColonist
          ? `Colonist #${selected[i].number} landed on Pytheas`
          : `Pirate #${selected[i].number} joined the crew`;
        const source = selected[i].isColonist
          ? "/images/staked-pytheas.gif"
          : "/images/staked-crew.gif";
        o.push({ message, source });
      }
      setOutcomes(o);
      setLoading(false);
      setTransacting(false);
      //   };
    } catch (e) {
      console.log(e);
      setLoading(false);
      setTransacting(false);
    }
  };

  const onClaim = async (unstake: boolean) => {
    setLoading(true);
    setError(null);
    try {
      const hash = (
        await claim(
          signerData!,
          selected.map((x) => x.number),
          unstake,
        )
      ).hash;
      setTransacting(true);
      setIsUnstaking(false);
      const receipt = await watchTransaction(provider, hash);
      if (receipt) {
        presentOutcomes(receipt);
      }
      setLoading(false);
      setTransacting(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setTransacting(false);
    }
  };

  const canUnstake = () => {
    const timestamp = Math.floor(Date.now() / 1000);
    for (const i in selected) {
      if (!selected[i].isColonist) continue;
      if (parseInt(selected[i].value) + 2 * 24 * 60 * 60 > timestamp) return false;
    }
    return true;
  };

  const presentOutcomes = (receipt: { logs: Array<{ topics: string[]; data: string }> }) => {
    const claims = parseClaims(receipt);
    const o = [];
    for (let i = 0; i < claims.length; i++) {
      const token = selected.find((el) => el.number === claims[i].tokenId.toString());
      if (token?.isColonist) {
        if (claims[i].unstaked) {
          if (claims[i].earned.eq(BigNumber.from(0))) {
            o.push({
              message: `Colonist #${token.number} left Pytheas, but was intercepted all $EON was stolen by Pirates!`,
              source: "/images/unstaked-notsafe.gif",
            });
          } else {
            o.push({
              message: `Colonist #${
                token.number
              } left pytheas and evaded the Pirates, earning ${parseBigNumber(
                claims[i].earned,
              )} $EON`,
              source: "/images/unstaked-safe.gif",
            });
          }
        } else {
          o.push({
            message: `Colonist #${token.number} was harvested for ${parseBigNumber(
              claims[i].earned,
            )} $EON, after paying a 20% tax to the Pirates.`,
            source: "/images/harvested.gif",
          });
        }
      } else {
        if (claims[i].unstaked) {
          o.push({
            message: `Pirate #${token?.number} left the crew, and received ${parseBigNumber(
              claims[i].earned,
            )} $EON!`,
            source: "/images/unstaked-pack.gif",
          });
        } else {
          o.push({
            message: `Pirate #${token?.number} collected a tax of ${parseBigNumber(
              claims[i].earned,
            )} $EON!`,
            source: "/images/claimed-pack.gif",
          });
        }
      }
    }
    setOutcomes(o);
  };

  return (
    <>
      <section className="text-center">
        <h2>STAKING</h2>
      </section>

      <div className="unstaked">
        <div className="staking-images-row">
          <h3>UNSTAKED</h3>
          <div className="image-box">
            <img src={Bill} alt="Bill" className="staking-asset" />
          </div>
          <div className="image-box">
            <img src={Terry} alt="Bill" className="staking-asset" />
          </div>
          <div className="image-box">
            <img src={J3spa} alt="Bill" className="staking-asset" />
          </div>
          <div className="image-box">
            <img src={Swamp} alt="Bill" className="staking-asset" />
          </div>
          <div className="image-box">
            <img src={Blackout} alt="Bill" className="staking-asset" />
          </div>
          <div className="image-box">
            <img src={Blackbird} alt="Bill" className="staking-asset" />
          </div>
        </div>
      </div>
      <div className="staked">
        <div className="staking-images-row">
          <h3>STAKED</h3>
          <div className="image-box">
            <img src={Bill} alt="Bill" className="staking-asset" />
            <span className="eon">10000 EON</span>
          </div>
          <div className="image-box">
            <img src={Terry} alt="Bill" className="staking-asset" />
            <span className="eon">10000 EON</span>
          </div>
          <div className="image-box">
            <img src={J3spa} alt="Bill" className="staking-asset" />
            <span className="eon">10000 EON</span>
          </div>
          <div className="image-box">
            <img src={Swamp} alt="Bill" className="staking-asset" />
            <span className="eon">10000 EON</span>
          </div>
          <div className="image-box">
            <img src={Blackout} alt="Bill" className="staking-asset" />
            <span className="eon">10000 EON</span>
          </div>
          <div className="image-box">
            <img src={Blackbird} alt="Bill" className="staking-asset" />
            <span className="eon">10000 EON</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center font-pixel gap-5">
        <div className="flex justify-between items-center font-console gap-2">
          <div>$EON in your wallet:</div>
          <div>{parseBigNumber(eon || 0)} $EON</div>
        </div>
        <div className="subtitle mt-5">Unstaked</div>
        <WalletPicker>
          {fetching ? (
            <div className="text-center text-red font-console">Fetching...</div>
          ) : (
            <TokenList
              title={"Can Stake"}
              active={operation !== "CLAIM"}
              items={tokens}
              selected={selected}
              toggleSelected={(item, select) => {
                if (operation !== "STAKE" && operation !== null) return;
                setOperation("STAKE");
                setSelected((current) => {
                  return select ? current.concat(item) : current.filter((el) => el.id !== item.id);
                });
              }}
            />
          )}
          {/* <div style={{height:'80px'}} className="text-sm font-console flex items-center text-red text-center">
            Your Colonist, or eonf will be revealed after staking into the PYTHEAS
          </div> */}
        </WalletPicker>
        <div className="subtitle mt-5">Staked</div>
        <WalletPicker>
          {fetching ? (
            <div className="text-center text-red font-console">Fetching...</div>
          ) : (
            <div className="w-full flex flex-col justify-center items-center gap-2">
              <TokenList
                title={"PYTHEAS"}
                active={operation !== "STAKE"}
                items={stakes?.filter((el) => el.isColonist)}
                selected={selected}
                stats={stats}
                toggleSelected={(item, select) => {
                  if (operation !== "CLAIM" && operation !== null) return;
                  setOperation("CLAIM");
                  setSelected((current) => {
                    return select
                      ? current.concat(item)
                      : current.filter((el) => el.id !== item.id);
                  });
                }}
              />
              <TokenList
                title={"PirateCrew"}
                active={operation !== "STAKE"}
                items={stakes?.filter((el) => !el.isColonist)}
                selected={selected}
                stats={stats}
                toggleSelected={(item, select) => {
                  if (operation !== "CLAIM" && operation !== null) return;
                  setOperation("CLAIM");
                  setSelected((current) => {
                    return select
                      ? current.concat(item)
                      : current.filter((el) => el.id !== item.id);
                  });
                }}
              />
              <div className="w-full flex flex-col md:flex-row justify-center items-center gap-1">
                {/* {selected.length === 1 && (
                   <WoodButton width={150} height={80} fontSize="16px" title={'View on OpenSea'} loading={loading} onClick={() => {
                     window.open(`${process.env.VITE_REACT_APP_OPENSEA}/${process.env.VITE_REACT_APP_eonF}/${parseInt(selected[0].id)}`, "_blank")
                  }}/>
                )} */}
                {operation === "CLAIM" && (
                  <>
                    <CoralButton
                      width={150}
                      height={80}
                      fontSize={16}
                      title={"HARVEST $EON"}
                      loading={loading}
                      onClick={() => {
                        const isClaimingColonist = !!selected.find((el) => el.isColonist);
                        const isClaimingPirate = !!selected.find((el) => !el.isColonist);
                        const scenes: Array<{ message: string; source: string }> = [];
                        if (isClaimingColonist)
                          scenes.push({
                            message: "Mining",
                            source: "/images/mining.gif",
                          });
                        if (isClaimingPirate)
                          scenes.push({
                            message: "Collecting 20% tax",
                            source: "/images/claiming-pack.gif",
                          });
                        setLoadingScenes(scenes);
                        onClaim(false);
                      }}
                    />
                    <div className={canUnstake() ? "" : "opacity-50"}>
                      <CoralButton
                        width={150}
                        height={80}
                        fontSize={16}
                        title={"harvest $EON AND UNSTAKE"}
                        disabled={!canUnstake()}
                        loading={loading}
                        onClick={() => {
                          if (!canUnstake()) return;
                          const isUnstakingColonist = !!selected.find((el) => el.isColonist);
                          if (isUnstakingColonist) {
                            setIsUnstaking(true);
                            return;
                          }
                          const isUnstakingPirate = !!selected.find((el) => !el.isColonist);
                          const scenes = [];
                          if (isUnstakingColonist)
                            scenes.push({
                              message: "Loading cargo and leaving PYTHEAS",
                              source: "/images/unstaking-PYTHEAS.gif",
                            });
                          if (isUnstakingPirate)
                            scenes.push({
                              message: "Collecting tax and leaving the crew",
                              source: "/images/unstaking-pack.gif",
                            });
                          setLoadingScenes(scenes);
                          onClaim(true);
                        }}
                      />
                    </div>
                  </>
                )}
                {operation === "STAKE" && (
                  <CoralButton
                    width={150}
                    height={80}
                    fontSize={16}
                    title={"STAKE"}
                    loading={loading}
                    onClick={() => {
                      const isStakingColonist = !!selected.find((el) => el.isColonist);
                      const isStakingPirate = !!selected.find((el) => !el.isColonist);
                      const scenes = [];
                      if (isStakingColonist)
                        scenes.push({
                          message: "Entering the PYTHEAS",
                          source: "/images/staking-PYTHEAS.gif",
                        });
                      if (isStakingPirate)
                        scenes.push({
                          message: "Joining the Piratepack",
                          source: "/images/staking-pack.gif",
                        });
                      setLoadingScenes(scenes);
                      onStake(); // onStake(selected);
                    }}
                  />
                )}
                {operation === null && (
                  <div>
                    <div
                      style={{ height: "80px" }}
                      className="text-sm font-console flex items-center text-red text-center">
                      Select tokens to stake, harvest, or unstake
                    </div>
                    <div>
                      <CoralButton
                        title={!selectedAll ? "Select ALL" : "Deselect ALL"}
                        fontSize={16}
                        width={150}
                        height={80}
                        loading={loading}
                        onClick={() => {
                          if (!selectedAll) {
                            setSelected(stakes);
                            setSelectedAll(true);
                          } else {
                            setSelected([]);
                            setSelectedAll(false);
                          }
                        }}
                      />
                    </div>
                    {selectedAll && (
                      <CoralButton
                        title={"harvest and collect ALL"}
                        fontSize={16}
                        width={150}
                        height={80}
                        loading={loading}
                        onClick={() => {
                          const isClaimingColonist = !!selected.find((el) => el.isColonist);
                          const isClaimingPirate = !!selected.find((el) => !el.isColonist);
                          const scenes = [];
                          if (isClaimingColonist)
                            scenes.push({
                              message: "harvesting Colonist",
                              source: "/images/harvesting.gif",
                            });
                          if (isClaimingPirate)
                            scenes.push({
                              message: "Collecting 20% tax",
                              source: "/images/claiming-pack.gif",
                            });
                          setLoadingScenes(scenes);
                          onClaim(false);
                          setSelectedAll(false);
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
              {operation === "CLAIM" && !canUnstake() && (
                <div className="text-xs text-center text-red" style={{ width: "300px" }}>
                  You can only unstake a Colonist if it has at least 2 days worth of $EON.
                </div>
              )}
            </div>
          )}
        </WalletPicker>
      </div>

      {error && <div className="text-sm text-red font-console">{error}</div>}
      <LoadingModal loadingScenes={loadingScenes} modalIsOpen={transacting} />
      <OutcomeModal
        outcomes={outcomes}
        modalIsOpen={outcomes.length > 0}
        closeModal={() => {
          reload();
          setOutcomes([]);
          setSelected([]);
        }}
      />
      <UnstakeModal
        modalIsOpen={isUnstaking}
        closeModal={() => {
          setIsUnstaking(false);
        }}
        loading={loading}
        onClick={() => {
          const isUnstakingColonist = !!selected.find((el) => el.isColonist);
          const isUnstakingPirate = !!selected.find((el) => !el.isColonist);
          const scenes = [];
          if (isUnstakingColonist)
            scenes.push({
              message: "Loading cargo and leaving PYTHEAS",
              source: "/images/unstaking-PYTHEAS.gif",
            });
          if (isUnstakingPirate)
            scenes.push({
              message: "Collecting tax and leaving the Piratepack",
              source: "/images/unstaking-pack.gif",
            });
          setLoadingScenes(scenes);
          onClaim(true);
        }}
      />
    </>
  );
};
