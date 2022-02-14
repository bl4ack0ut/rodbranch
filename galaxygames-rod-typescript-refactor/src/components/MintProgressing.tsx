import React from "react";
import styled from "styled-components";
import { SETTINGS } from "../settings";

type IMintProgressingWrapperProps = { width: string };
const MintProgressingWrapper = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  .mint__coloredprogressbar {
    width: ${(props: IMintProgressingWrapperProps) => props.width};
    height: 80%;
    background: #ff9944;
    position: absolute;
    z-index: -1;
  }
  .mint__genswrapper {
    display: flex;
    flex-direction: row;
    .mint__gens {
      display: flex;
      flex-direction: column;
      border: 3px solid #3e3546;
      background-color: rgba(186, 67, 3, 0.6);
      border-right: 0;
      :last-child {
        border-right: 3px;
      }
      p {
        padding: 0 2.2rem;
        text-align: center;
      }
      p.title__gens {
        color: #b1fb69;
        font-size: 15px;
        padding-bottom: 30px;
      }
      p.gain__per__gen {
        color: #fff;
        text-shadow: 1px 1px 2px black;
        font-size: 7px;
        position: absolute;
        bottom: 9px;
      }
    }
  }
`;

type IMintProgressingProps = {
  maxColonists: number;
  colonistsMinted: number;
  priceType: "rEON" | "EON";
  style?: React.CSSProperties;
  publicSaleHasStarted: boolean;
};

// NOTE: this are contract constats
const COLONIST_MINT_PRICING = {
  rEON: [4000, 123000, 250000],
  EON: [3000, 98500, 200000],
};

export const MintProgressing = ({
  maxColonists,
  colonistsMinted,
  style,
  priceType,
  publicSaleHasStarted,
}: IMintProgressingProps) => {
  const progressWidth = `${(colonistsMinted / maxColonists) * 100}%`;
  const ethPrice = publicSaleHasStarted
    ? SETTINGS.ETH_PUBLIC_SALE_PRICE
    : SETTINGS.ETH_PRE_PUBLIC_SALE_PRICE;

  const renderPriceInfo = (price: number) =>
    colonistsMinted > 10000 ? `${price} ${priceType}` : "";
  return (
    <>
      <MintProgressingWrapper style={style} width={progressWidth}>
        <div className="mint__coloredprogressbar" />
        <div className="mint__genswrapper text__shadow">
          <div className="mint__gens">
            <p className="title__gens">GEN 0</p>
            <p className="gain__per__gen">{ethPrice} ETH</p>
          </div>
          <div className="mint__gens">
            <p className="title__gens">GEN 1</p>
            <p className="gain__per__gen">{renderPriceInfo(COLONIST_MINT_PRICING[priceType][0])}</p>
          </div>
          <div className="mint__gens">
            <p className="title__gens">GEN 2</p>
            <p className="gain__per__gen">{renderPriceInfo(COLONIST_MINT_PRICING[priceType][1])}</p>
          </div>
          <div className="mint__gens">
            <p className="title__gens">GEN 3</p>
            <p className="gain__per__gen">{renderPriceInfo(COLONIST_MINT_PRICING[priceType][2])}</p>
          </div>
        </div>
      </MintProgressingWrapper>
      <h2 className="text__shadow" style={{ fontSize: 11 }}>
        {colonistsMinted}/{maxColonists} MINTED
      </h2>
    </>
  );
};
