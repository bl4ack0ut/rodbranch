import React, { useState } from "react";
import styled from "styled-components";
import { parseBigNumber } from "utils/ethereum";
import { BigNumber } from "@ethersproject/bignumber";
import { WalletPicker } from "./WalletPicker";

import Bill from "assets/images/avatars/Bill.png";
import { MintProgressing } from "./MintProgressing";
import { SETTINGS } from "../settings";
import { useHasPublicSaleStarted, callMintColonist } from "../utils/shatteredWL";
import { useMintCosts, callMintColonistEON } from "../utils/shatteredEON";

const MintWrapper = styled.div`
  .mint__title {
    border: 3px solid #91db69;
    border-bottom: 0;
    display: inline-block;
    background-color: hsla(0, 0%, 12.941176470588237%, 0.6);
    filter: blur(0.3px);
    > img {
    }
  }
  .mintblock {
    display: flex;
    flex: 1;
    flex-direction: column;
    .mint__contentwrapper {
      display: flex;
      flex-direction: row;
      flex: 1;
      .mint__content {
        position: relative;
        border: 3px solid #91db69;
        padding: 0 2rem;
        color: #8fd3ff;
        background-color: rgba(33, 33, 33, 0.7);
        filter: blur(0.3px);
        text-align: center;
        .mint__options {
          display: flex;
          margin-top: 5px;
          flex-direction: row;
          text-align: center;
          justify-content: space-around;
          background-color: hsla(0, 0%, 12.941176470588237%, 0.6);
          user-select: none;
          .mint__numberpicker {
            font-size: 10px;
            margin: auto;
            .mint__txtsymbol {
              font-family: monospace;
              cursor: pointer;
              font-size: 20px;
              margin: 48px 18px 0 18px;
              vertical-align: bottom;
            }
            .mint__cost {
              font-size: 10px;
              margin-left: 7px;
              margin-right: 7px;
              vertical-align: bottom;
              color: #91db69;
            }
          }
        }
      }
    }
    .mint__bottombuttons {
      border: 3px solid #91db69;
      border-top: 0;
      margin-right: 16%;
      margin-left: 50%;

      justify-content: center;
      display: flex;
      flex-direction: row;
      background-color: rgba(33, 33, 33, 0.6);
      filter: blur(0.3px);
      > h2 {
        color: #8fd3ff;
        font-size: 14px;
      }
      .avatar-container {
        margin: 10px;
      }
    }
  }
  .selected__buttons {
    display: flex;
    flex-direction: row;
    text-align: center;
    flex: 1;
    margin-bottom: 2rem;
    .radio__button {
      text-align: center;
      color: #d8a13e;
      font-size: 12px;
      background-color: transparent;
      display: flex;
      flex: 1;
      text-shadow: 1px 1px 2px black;
      padding: 0.4rem 0.8rem;
      cursor: pointer;
      border: 3px solid #fff;
      font-family: "Digitalix", sans-serif;
      span {
        margin: auto;
      }
      &:hover {
        background: #fff9;
        color: #91db69;
      }
      &.radio__button__active {
        background: #fff;
        color: #91db69;
      }
    }
  }
`;

type IMint = {
  mint?: {
    colonistMinted: string;
    colonistStaked: string;
    piratesMinted: string;
    piratesStaked: string;
    colonistKidnapped: string;
    piratesKidnapped: string;
    eonClaimed: string;
    totalSupply: string;
  };
  mintedColonists: number;
  walletAddress: string;
};

const defaultMint: IMint["mint"] = {
  colonistMinted: "12066",
  colonistStaked: "11756",
  piratesMinted: "1743",
  piratesStaked: "1456",
  colonistKidnapped: "347",
  piratesKidnapped: "43",
  eonClaimed: "230.110.840.21",
  totalSupply: "",
};

// rEon
// Colonist Mints         Price
// 10k - 20K                4000
// 20k-30K                  16000
// 30k-40k                  48000
// 40k-50k                  122500
// 50k-55k                  250000

// Eon
// Colonist Mints          Price
// 10k-20k                  3000
// 20k-30k.                 12000
// 30k-40k                  36000
// 40k-50k                  98000
// 50-55k                   200000

export const Mint: React.FunctionComponent<IMint> = ({ mintedColonists, walletAddress }) => {
  const publicSaleStarted = useHasPublicSaleStarted();
  const [priceType, setPriceType] = useState<"rEON" | "EON">("rEON");
  const [mintAmount, setMintAmount] = useState<number>(1);
  const [mintInProgress, setMintInProgress] = useState<boolean>(false);

  const mintCosts = useMintCosts(mintedColonists + 1);
  const increaseMintAmount = () => setMintAmount(mintAmount >= 4 ? 5 : mintAmount + 1);
  const decreaseMintAmount = () => setMintAmount(mintAmount <= 1 ? 1 : mintAmount - 1);
  const setReonPrice = () => setPriceType("rEON");
  const setEonPrice = () => setPriceType("EON");

  let priceBaseValue = 0;
  let finalPrice = 0;
  let priceSymbol = "ETH";

  if (mintedColonists <= 100000) {
    if (publicSaleStarted === false) {
      priceBaseValue = SETTINGS.ETH_PRE_PUBLIC_SALE_PRICE;
    } else if (publicSaleStarted === true) {
      priceBaseValue = SETTINGS.ETH_PUBLIC_SALE_PRICE;
    }
  } else {
    priceBaseValue =
      priceType === "rEON"
        ? parseFloat(mintCosts?.rawMintCost || "0")
        : parseFloat(mintCosts?.eonMintCost || "0");
    priceSymbol = priceType;
  }
  if (typeof priceBaseValue === "number") {
    finalPrice = priceBaseValue * mintAmount;
  }

  const renderPriceTypeSwitch = () => (
    <>
      <h4
        className="text__shadow value__white"
        style={{ fontWeight: "normal", fontSize: 8, marginTop: "1rem" }}>
        MINT COLONIST WITH rEON OR EON
      </h4>
      <div className="selected__buttons">
        <div
          className={`radio__button ${priceType === "rEON" ? "radio__button__active" : ""}`}
          onClick={setReonPrice}>
          <span>{mintCosts?.rawMintCost || "..."} rEON</span>
        </div>
        <div
          className={`radio__button ${priceType === "EON" ? "radio__button__active" : ""}`}
          onClick={setEonPrice}>
          <span>{mintCosts?.eonMintCost || "..."} EON</span>
        </div>
      </div>
    </>
  );

  const onMint = async () => {
    setMintInProgress(true);
    try {
      if (mintedColonists <= 100000) {
        await callMintColonist(mintAmount, false, walletAddress, finalPrice);
      } else {
        await callMintColonistEON(mintAmount, priceType, false, walletAddress);
      }
      setMintInProgress(false);
    } catch (err) {
      console.error("callMintColonist", err);
      setMintInProgress(false);
    }
  };
  const onMintAndStake = async () => {
    setMintInProgress(true);
    try {
      if (mintedColonists <= 100000) {
        await callMintColonist(mintAmount, true, walletAddress, finalPrice);
      } else {
        await callMintColonistEON(mintAmount, priceType, true, walletAddress);
      }
      setMintInProgress(false);
    } catch (err) {
      console.error("callMintColonist", err);
      setMintInProgress(false);
    }
  };

  return (
    <WalletPicker emptyIfNotConnected={true}>
      <MintWrapper>
        <div className="mint__title">
          <div className="avatar-container">
            <img src={Bill} width="120" height="120" className="avatar-image" alt="" />
          </div>
        </div>

        <div className="mintblock">
          <div className="mint__contentwrapper">
            <div className="mint__content">
              <h1 className="text__shadow">MINTING</h1>
              <MintProgressing
                maxColonists={SETTINGS.MAX_COLONISTS}
                colonistsMinted={mintedColonists}
                priceType={priceType}
                publicSaleHasStarted={false}
              />

              {mintedColonists > 10000 ? renderPriceTypeSwitch() : null}

              <div className="mint__options">
                <div className="mint__numberpicker">
                  <span className="mint__txtsymbol" onClick={decreaseMintAmount}>
                    &#60;
                  </span>
                  {mintAmount} / 5
                  <span className="mint__txtsymbol" onClick={increaseMintAmount}>
                    &#62;
                  </span>
                  <span className="mint__cost text__shadow">
                    {finalPrice} {priceSymbol}
                  </span>
                </div>
                <button
                  onClick={onMint}
                  disabled={mintInProgress}
                  className="btn-primary"
                  style={{ display: "inline-block", width: 150 }}>
                  MINT
                </button>
                <button
                  onClick={onMintAndStake}
                  disabled={mintInProgress}
                  className="btn-primary"
                  style={{ display: "inline-block", width: 150 }}>
                  MINT AND STAKE
                </button>
              </div>
            </div>
          </div>
          <div className="mint__bottombuttons">
            <div className="avatar-container">
              <button className="btn-primary" style={{ display: "inline-block", width: 180 }}>
                MINT PIRATE
              </button>
            </div>
          </div>
        </div>
      </MintWrapper>
    </WalletPicker>
  );
};
