import React from "react";
import styled from "styled-components";
import { useBalance } from "wagmi";
import { WalletPicker } from "./WalletPicker";
import { SETTINGS } from "../settings";
import { parseBigNumber } from "utils/ethereum";

const BalanceWrapper = styled.div`
  text-shadow: 1px 1px 2px black;
  .bal__righttitle {
    display: flex;
    flex: row;
  }
  .bal__title {
    border: 3px solid #91db69;
    border-bottom: 0;
    display: inline-block;
    padding: 0 2rem;
    background-color: rgba(33, 33, 33, 0.6);
    filter: blur(0.3px);
    > h2 {
      color: #8fd3ff;
      font-size: 14px;
    }
  }
  .statsblock {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: end;
    .bal__contentwrapper {
      display: flex;
      flex-direction: row;
      .bal__content {
        position: relative;
        border: 3px solid #91db69;
        padding: 0 2rem;
        color: #8fd3ff;
        background-color: rgba(33, 33, 33, 0.7);
        filter: blur(0.3px);
        .bal__content__body {
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
      .bal__content__footer {
        display: flex;
        flex-direction: row;
        font-size: 10px;
        > .bal__content {
          border: 3px solid #fb6b1d;
          margin: 1.5rem 0.4rem;
        }
      }
    }
  }
`;
export const Balance: React.FunctionComponent = () => {
  const [{ data: eonBalanceData }] = useBalance({ addressOrName: SETTINGS.EONADDRESS });
  const [{ data: rEonBalanceData }] = useBalance({ addressOrName: SETTINGS.RAWADDRESS });
  const eon = parseBigNumber(eonBalanceData?.value || 0) || "...";
  const reon = parseBigNumber(rEonBalanceData?.value || 0) || "...";
  return (
    <WalletPicker emptyIfNotConnected={true}>
      <BalanceWrapper>
        <div className="statsblock">
          <div className="bal__righttitle">
            <div className="takespace" />
            <div className="bal__title">
              <h2>BALANCE</h2>
            </div>
          </div>
          <div className="bal__contentwrapper">
            <div className="bal__content">
              <div className="bal__content__footer">
                <div className="bal__content">
                  <p className="value__yellow">
                    YOUR <span className="value__orange">rEON</span>:
                  </p>
                  <p className="value__yellow">{reon}</p>
                </div>
                <div className="bal__content">
                  <p className="value__yellow">
                    YOUR <span className="value__green">EON</span>:
                  </p>
                  <p className="value__yellow">{eon}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BalanceWrapper>
    </WalletPicker>
  );
};
