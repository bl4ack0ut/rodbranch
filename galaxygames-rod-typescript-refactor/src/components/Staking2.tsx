import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAccount, useBalance, useProvider, useSigner } from "wagmi";
import { WalletPicker } from "./WalletPicker";
import { parseClaims, stake, claim } from "utils/pytheas";
import { parseBigNumber, watchTransaction } from "utils/ethereum";
import StakingImage from "assets/images/avatars/stakingProfileImage.png";
import Bill from "assets/images/avatars/Bill.png";
import { SETTINGS } from "settings";
import { Signer, BigNumber } from "ethers";
import { LoadingModal } from "./LoadingModal";
import { OutcomeModal } from "./OutcomeModal";
import { UnstakeModal } from "./UnstakeModal";
import {
  getWalletUnstakedColonistsOrPirates,
  useStakedColonists,
  useStakedPirates,
  useUnstakedNFTs,
} from "utils/staking";
import { NftMultiSelectRow } from "./NftMultiSelectRow";

// const emptyVal = "...";
const StakeWrapper = styled.div`
  .stake__righttitle {
    display: flex;
    flex: row;
  }
  .stake__title {
    border: 3px solid #91db69;
    border-bottom: 0;
    display: inline-block;
    background-color: rgba(33, 33, 33, 0.6);
    filter: blur(0.3px);
    > h2 {
      color: #8fd3ff;
      font-size: 14px;
    }
  }
  .statsblock {
    display: flex;
    flex-direction: column;
    flex: 1;
    text-align: center;
    .stake__contentwrapper {
      display: flex;
      width: 100%;
      flex-direction: row;
      .stake__content {
        display: flex;
        flex: 1;
        flex-direction: column;
        position: relative;
        border: 3px solid #91db69;
        padding: 0 2rem;
        color: #8fd3ff;
        background-color: rgba(33, 33, 33, 0.7);
        max-width: 460px;
        filter: blur(0.3px);
        .stake__content__body {
          display: flex;
          flex-direction: row;
          table {
            h4 {
              font-size: 10px;
              margin: 0.25rem 0.5rem;
            }
          }
        }
      }
      .stake__content__footer {
        display: flex;
        flex-direction: column;
        font-size: 10px;
        .stake__contentwrapper {
          display: flex;
          flex-direction: column;
          background-color: #fbb954bb;
          text-align: center;
          border: none;
          margin-bottom: 5px;
          .unstaked__content {
            display: flex;
            flex-direction: row;
            border: none;
            background-color: transparent;
            justify-content: space-between;
          }
          .staked__content {
            display: flex;
            flex-direction: row;
            border: none;

            p {
              padding-left: 0.5rem;
              padding-right: 0.5rem;
              margin: auto;
            }

            .nft__multiselector {
              display: flex;
              overflow-x: scroll;
            }
          }
        }
      }
    }
  }
  .stake__bottombuttons {
    border: 3px solid #91db69;
    border-top: 0;
    margin-left: 12px;
    margin-right: 12px;
    padding: 0.8rem 0.2rem;
    justify-content: space-around;
    display: flex;
    flex-direction: row;
    background-color: rgba(33, 33, 33, 0.6);
    filter: blur(0.3px);
    > h2 {
      color: #8fd3ff;
      font-size: 14px;
    }
  }
`;

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

export const Stake: React.FunctionComponent<{}> = () => {
  const provider = useProvider();
  const [{ data: signerData }] = useSigner();
  const [{ data: accountData }] = useAccount({ fetchEns: false });
  const [loadingScenes, setLoadingScenes] = useState<Array<{ message: string; source: string }>>(
    [],
  );
  const [unstakedNfts] = useUnstakedNFTs();
  const [stakedColonists] = useStakedColonists();
  const [stakedPirates] = useStakedPirates();

  const [outcomes, setOutcomes] = useState<Array<{ message: string; source: string }>>([]);
  const [operation, setOperation] = useState<null | string>(null);
  const [selected, setSelected] = useState<
    Array<{ id: string; number: string; isColonist: boolean; value: string }>
  >([]);
  const [isUnstaking, setIsUnstaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transacting, setTransacting] = useState(false);

  const [selectedUnstakedNftsIndexes, setSelectedUnstakedNftsIndexes] = useState<number[]>([]);
  const [selectedColonistsIndexes, setSelectedColonistsIndexes] = useState<number[]>([]);
  const [selectedPiratesIndexes, setSelectedPiratesIndexes] = useState<number[]>([]);

  useEffect(() => {
    if (selected.length === 0) setOperation(null);
  }, [selected]);

  const wallet = accountData?.address || "...";

  const onSelectUnstakedNftByIndex = (nftIndex: number) => {
    if (selectedUnstakedNftsIndexes.includes(nftIndex)) {
      setSelectedUnstakedNftsIndexes(
        selectedUnstakedNftsIndexes.filter((index) => index !== nftIndex),
      );
    } else {
      setSelectedUnstakedNftsIndexes([...selectedUnstakedNftsIndexes, nftIndex]);
    }
  };

  const onSelectColonistByIndex = (nftIndex: number) => {
    if (selectedColonistsIndexes.includes(nftIndex)) {
      setSelectedColonistsIndexes(selectedColonistsIndexes.filter((index) => index !== nftIndex));
    } else {
      setSelectedColonistsIndexes([...selectedColonistsIndexes, nftIndex]);
    }
  };

  const onSelectPirateByIndex = (nftIndex: number) => {
    if (selectedPiratesIndexes.includes(nftIndex)) {
      setSelectedPiratesIndexes(selectedPiratesIndexes.filter((index) => index !== nftIndex));
    } else {
      setSelectedPiratesIndexes([...selectedPiratesIndexes, nftIndex]);
    }
  };

  // TODO: don't use mocked up data here
  // const avatarsUnstaked = getWalletUnstakedColonistsOrPirates();
  // const renderAvatarsUnstaked = () => avatarsUnstaked.map((avatar, i) => ());
  const onStake = async () => {
    setLoading(true);
    setError(null);
    try {
      const hash = (
        await stake(
          signerData as Signer,
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

  const onClaim = async (unstake: boolean) => {
    setLoading(true);
    setError(null);
    try {
      const hash = (
        await claim(
          signerData as Signer,
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
  // const [{ data: eonStakeData }] = useBalance({ addressOrName: SETTINGS.REACT_APP_EON });
  // const eon = eonStakeData?.value;
  // console.log(eon);

  return (
    <WalletPicker emptyIfNotConnected={true}>
      <StakeWrapper>
        <div className="stake__righttitle">
          <div className="takespace" />
          <div className="stake__title">
            <div>
              <img src={StakingImage} width="120" height="120" className="avatar-image" alt="" />
            </div>
          </div>
        </div>
        <div className="statsblock">
          <div className="stake__contentwrapper">
            <div className="stake__content">
              <h1 className="text__shadow">STAKING</h1>
              <div className="stake__content__footer">
                <div className="stake__contentwrapper" style={{ marginBottom: "1rem" }}>
                  <h4 className="value__dark">UNSTAKED</h4>
                  <NftMultiSelectRow
                    nfts={unstakedNfts || []}
                    selectedIndexes={selectedUnstakedNftsIndexes}
                    onSelect={onSelectUnstakedNftByIndex}
                  />
                </div>
                <div className="stake__contentwrapper">
                  <h4 className="value__dark">STAKED</h4>
                  <div className="staked__content">
                    <p className="value__dark">COLONISTS</p>
                    <div className="nft__multiselector">
                      <NftMultiSelectRow
                        nfts={stakedColonists || []}
                        selectedIndexes={selectedColonistsIndexes}
                        onSelect={onSelectColonistByIndex}
                      />
                    </div>
                  </div>
                </div>
                <div className="stake__contentwrapper">
                  <div className="staked__content">
                    <p className="value__dark">PIRATES</p>
                    <div className="nft__multiselector">
                      <NftMultiSelectRow
                        nfts={stakedPirates || []}
                        selectedIndexes={selectedPiratesIndexes}
                        onSelect={onSelectPirateByIndex}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="stake__bottombuttons">
            <button className="btn-secondary" style={{ display: "inline-block", width: 120 }}>
              CLAIM
            </button>
            <button
              className="btn-secondary"
              style={{ display: "inline-block", width: 120 }}
              disabled={!selectedUnstakedNftsIndexes.length}>
              STAKE
            </button>
            <button
              className="btn-secondary"
              style={{ display: "inline-block", width: 120 }}
              disabled={![...selectedColonistsIndexes, ...selectedPiratesIndexes].length}>
              UNSTAKE
            </button>
          </div>
        </div>
        {error && <div className="text-sm text-red font-console">{error}</div>}
        <LoadingModal loadingScenes={loadingScenes} modalIsOpen={transacting} />
        <OutcomeModal
          outcomes={outcomes}
          modalIsOpen={outcomes.length > 0}
          closeModal={() => {
            // reload();
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
      </StakeWrapper>
    </WalletPicker>
  );
};
