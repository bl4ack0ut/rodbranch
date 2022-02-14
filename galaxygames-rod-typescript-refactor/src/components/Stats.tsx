import React from "react";
import styled from "styled-components";
import { WalletPicker } from "./WalletPicker";
import { IGetQuery } from "utils/query";

// const emptyVal = "...";
const StatsWrapper = styled.div`
  text-shadow: 1px 1px 2px black;
  .stats__title {
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
    .stats__contentwrapper {
      display: flex;
      flex-direction: row;
      .stats__content {
        position: relative;
        border: 3px solid #91db69;
        padding: 0 2rem;
        color: #8fd3ff;
        background-color: rgba(33, 33, 33, 0.7);
        filter: blur(0.3px);
        .stats__content__body {
          display: flex;
          flex-direction: row;
          table {
            h4 {
              font-size: 10px;
              margin: 0.25rem 0.5rem;
            }
            :last-child {
              margin-left: 1rem;
              padding-left: 1rem;
              padding-top: 1rem;
              padding-bottom: 1rem;
              border-left: 2px solid #8fd3ff;
              border-radius: 2px;
            }
          }
        }
      }
    }
  }
`;

type IStats = { stats: IGetQuery["stat"]; loading?: boolean };
export const Stats: React.FunctionComponent<IStats> = ({ stats, loading }) => {
  const renderValue = (val?: string | number) => (loading ? "..." : val || 0);
  return (
    <WalletPicker emptyIfNotConnected={true}>
      <StatsWrapper>
        <div className="stats__title">
          <h2>GAME STATUS</h2>
        </div>
        <div className="statsblock">
          <div className="stats__contentwrapper">
            <div className="stats__content">
              <div className="stats__content__body">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <h4>COLONISTS MINTED:</h4>
                      </td>
                      <td>
                        <span className="value__green">{renderValue(stats?.colonistsMinted)}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h4>COLONISTS STAKED:</h4>
                      </td>
                      <td>
                        <span className="value__yellow">{renderValue(stats?.colonistsStaked)}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h4>PIRATES MINTED:</h4>
                      </td>
                      <td>
                        <span className="value__green">{renderValue(stats?.piratesMinted)}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h4>PIRATES STAKED:</h4>
                      </td>
                      <td>
                        <span className="value__yellow">{renderValue(stats?.piratesStaked)}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <h4>COLONISTS KIDNAPPED:</h4>
                      </td>
                      <td>
                        <span className="value__red">{renderValue(stats?.colonistStolen)}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h4>PIRATES KIDNAPPED:</h4>
                      </td>
                      <td>
                        <span className="value__red">{renderValue(stats?.piratesStolen)}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h4>EON CLAIMED:</h4>
                      </td>
                      <td>
                        <span className="value__orange">{renderValue(stats?.eonMinted)}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </StatsWrapper>
    </WalletPicker>
  );
};
