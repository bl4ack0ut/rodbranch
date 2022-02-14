import React from "react";
import styled from "styled-components";
import { IAvatar } from "../utils/staking";

type INftMultiSelectRowProps = {
  width?: number;
  height?: number;
  nfts: IAvatar[];
  selectedIndexes: number[];
  onSelect: (index: number) => void;
  style?: React.CSSProperties;
};

const NftMultiSelectRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  overflow-x: scroll;
  padding-bottom: 8px;
  .avatar-container {
    text-align: center;
    cursor: pointer;
    position: relative;

    border: 3px solid transparent;
    &:hover {
      border: 3px solid #cfcccf;
    }
    &.avatar-selected {
      border: 3px solid #8ff3ff;
    }
    .avatar__subtitle {
      font-size: 7px;
      color: #acfb58;
      position: absolute;
      z-index: 10;
      left: 6px;
      bottom: 8px;
      font-weight: 100;
      text-shadow: 1px 1px 2px black;
    }
  }
`;

export const NftMultiSelectRow = ({
  width = 64,
  height = 64,
  nfts,
  selectedIndexes,
  onSelect,
  style,
}: INftMultiSelectRowProps) => {
  if (!nfts.length) return null;

  const nftsEle = nfts.map((nft, i) => (
    <div
      className={`avatar-container ${selectedIndexes.includes(i) ? "avatar-selected" : ""}`}
      key={i}
      onClick={() => onSelect(i)}>
      <img src={nft.image} width={width} height={height} className="avatar-image" alt={nft.name} />
      <span className="avatar__subtitle">{nft.subtitle}</span>
    </div>
  ));
  return <NftMultiSelectRowWrapper style={style}>{nftsEle}</NftMultiSelectRowWrapper>;
};
