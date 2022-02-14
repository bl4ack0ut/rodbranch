import React from "react";
import styled from "styled-components";
import { NavIconLinks } from "../components/NavIconLinks";
import { PageWrapper } from "../components/PageWrapper";
import logo from "assets/images/ShatteredEon_Logo_Transparent.png";
import HomeVideoLoop from "assets/videos/homepage.mp4";
// import { Link } from "react-router-dom";

import MintingGIF from "assets/gifs/GGcoloniststaking.gif";
import Bill from "assets/images/avatars/Bill.png";
import { Link } from "react-router-dom";

const FAQContentWrapper = styled.div`
  outline: 3px solid #fb6b1d;
  border: 3px solid #3e3546;
  padding: 7rem 0 2rem 0;
  border-radius: 3px;
  background-color: rgba(22, 13, 30, 0.8);
  position: relative;
  text-align: justify;
  margin-bottom: 2rem;
  color: #a1fb89;

  > a > .mainlogo__faq {
    user-select: none;
    position: absolute;
    top: -14px;
    margin: auto;
    left: -50%;
    right: -50%;
  }
  > .mainlogo__wizard {
    user-select: none;
    position: absolute;
    width: 120px;
    height: 120px;
    top: -60px;
    left: -40px;
    outline: 3px solid #fb6b1d;
    border: 3px solid #3e3546;
    border-radius: 3px;
  }
  > .faq__content {
    height: 64vh;
    min-height: 460px;
    overflow-y: scroll;
    padding: 0 2.5rem;
    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      -webkit-border-radius: 8px;
      border-radius: 8px;
    }
    ::-webkit-scrollbar-thumb {
      -webkit-border-radius: 8px;
      border-radius: 8px;
      background: rgba(251, 107, 29, 0.8);
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    }
    ::-webkit-scrollbar-thumb:window-inactive {
      background: rgba(251, 107, 29, 0.8);
    }
  }
  @media only screen and (max-width: 768px) {
    .mainlogo__wizard {
      display: none;
      visibility: hidden;
    }
  }
`;

export const FAQ = () => {
  return (
    <PageWrapper>
      <main>
        <video autoPlay muted loop id="bgLoop" src={HomeVideoLoop} />
        <div style={{ display: "flex", flexDirection: "row", margin: "auto" }}>
          <div style={{ margin: "100px auto 0px auto" }}>
            <FAQContentWrapper>
              <Link to="/">
                <img
                  src={logo}
                  alt="Shattered Eon"
                  width={375}
                  height={147}
                  className="mainlogo__faq"
                  style={{
                    maxWidth: "85%",
                    transform: "translateY(-50px)",
                    marginBottom: "-10px",
                  }}
                />
              </Link>
              <img
                src={Bill}
                className="mainlogo__wizard"
                width={120}
                height={120}
                alt="Techno Wizard"
              />
              <div className="faq__content">
                <h1 className="color-blue">FAQ</h1>
                <p>
                  Shattered EON is a Sci-Fi inspired, Ethereum-based, strategy game which
                  incorporates the earning power of defi with a series of unique and utility-packed
                  dystopian-retro style NFTs.
                </p>
                <p>
                  Shattered EON takes inspiration for its mechanics from popular on-chain projects
                  that have paved the way for this concept, but moves the adventure into a new
                  universe of deep story, multi-tiered gameplay, artifact acquisition, and
                  discovery, with a new twist on quality of art and user interaction. Players will
                  experience mining, settlements, migration, piracy, kidnapping, power struggles,
                  and perhaps even all out war for supremacy of Pytheas.
                </p>
                <h3>The Story So Far:</h3>
                <p>
                  Long ago, after a faulty warp drive incident, the Imperial Guild stumbled upon a
                  strange planet, which they named Pytheas. The surface of Pytheas contains a
                  powerful resource. This glowing emerald-like element has been named Eonite (EON)
                  and after refining it through a specialized process of capturing direct energy
                  from a collapsed star, its true potential is released.
                </p>
                <p>
                  Decades have elapsed since its discovery. The entire galactic economy and
                  technological progression rests upon the production of the mysterious crystal, but
                  surface deposits have been completely depleted. The only recourse: dig. The
                  Imperial Guild has granted access to the vast riches that Pytheas provides by
                  offering mining claims to all who dare.
                </p>
                <h3>Contract Addresses</h3>
                <p>
                  &emsp;- Colonist Miner NFT: <br />
                  &emsp;- Ai-Lax Pirate NFT: <br />
                  &emsp;- Pytheas Asset Staking: <br />
                  &emsp;- $rEON Token: <br />
                  &emsp;- $EON Token: <br />
                  &emsp;- Refinery Staking: <br />
                </p>
                <h3>Pytheas Calls!</h3>
                <p>
                  The scattered denizens of neighboring home worlds have heard the call to planet
                  Pytheas. There is a small cost to acquire the first 10,000 mining claims, but
                  these colonists will do whatever it takes to be some of the first miners on the
                  surface.
                </p>
                <p>
                  Always, with the promise of great fortune comes great opportunity and risk. The
                  colonist-miners are not alone in the vast abyss...
                </p>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      display: "flex",
                      margin: "auto",
                      textAlign: "center",
                      alignItems: "center",
                    }}>
                    <img
                      src={MintingGIF}
                      style={{ height: "100px" }}
                      className="object-contain"
                      alt=""
                    />
                    <h3 className="drop-text">Minting</h3>
                    <img
                      src={MintingGIF}
                      style={{ height: "100px" }}
                      className="object-contain"
                      alt=""
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <table className="table table-borderless color-brand" style={{ maxWidth: 500 }}>
                    <thead>
                      <tr>
                        <th scope="col">Token ID</th>
                        <th scope="col">Minting Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1 to 10,000 (Gen 0)</th>
                        <td>.07 ETH</td>
                      </tr>
                      <tr>
                        <th scope="row">10,001 to 20,000</th>
                        <td>4,000 $rEON</td>
                      </tr>
                      <tr>
                        <th scope="row">20,001 to 30,000</th>
                        <td>16,000 $rEON</td>
                      </tr>
                      <tr>
                        <th scope="row">30,001 to 40,000</th>
                        <td>48,000 $rEON</td>
                      </tr>
                      <tr>
                        <th scope="row">40,001 to 50,000</th>
                        <td>98,000 $EON</td>
                      </tr>
                      <tr>
                        <th scope="row">50,001 to 60,000</th>
                        <td>200,000 $EON</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  The total cost to mint all of the Colonists and Pirates possible will be
                  3,660,000,000 $rEON before refinery conversion.
                </p>
                <div className="flex justify-center items-center gap-5">
                  {/* //TODO: gifs need replacing */}
                  <img
                    src="/images/unstaking-barn.gif"
                    style={{ height: "100px" }}
                    className="object-contain"
                    alt=""
                  />
                  {/* //TODO: gifs need replacing */}
                  <img
                    src="/images/staked-barn.gif"
                    style={{ height: "100px" }}
                    className="object-contain"
                    alt=""
                  />
                </div>
                <h4 className="color-blue my-5">Colonist Miners</h4>
                <p>
                  The first 10,000 units available will be CMs, they will cost .07 ETH each, be
                  granted mining rights on Pytheas, and will be considered generation 0 citizens.
                  Further generations can be hired using rEON or EON.
                </p>
                <p>
                  These CMs will be assigned to a claim (Pytheas staking contract) and will earn raw
                  EON ($rEON) at a rate of 2700/rEON per 24 hours.
                </p>
                <p>
                  They cannot leave the mining operation (unstake) until they have accumulated an
                  individual amount equal to 5400 rEON or 48 hours. Further generations can be hired
                  using rEON and EON. Be attentive, there have been rumors of specialized CMs that
                  may have further utility based on their operations' size. Groups of 10 seem to be
                  their favorite...
                </p>
                <p>
                  You have a 90% chance of minting a CM, each with unique traits. Here are the
                  actions they can take:
                </p>
                <table className="table table-dark color-brand my-5">
                  <thead>
                    <tr>
                      <th scope="col">Action</th>
                      <th scope="col">Notes</th>
                      <th scope="col">Risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Enter Pytheas (Stake)</th>
                      <td>Accumulate 2700 $rEON / day (prorated to the second)</td>
                      <td>No risk.</td>
                    </tr>
                    <tr>
                      <th scope="row">Transport $rEON (Claim)</th>
                      <td>Receive 80% of $rEON accumulated on your CM</td>
                      <td>
                        Ai-Lax Pirates take a guaranteed 20% tax on transported $rEON in return for
                        not attacking the CMs in transport. Taxed $rEON is split among all of the
                        Pirates currently staked on Pytheas, proportional to their ranks.
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Leave Pyhteas (Unstake)</th>
                      <td>
                        CM is removed from the planet and all $rEON is transported with them. (Can
                        only be done if the CM has accumulated 2 days worth of $rEON to afford the
                        journey.)
                      </td>
                      <td>
                        50% chance of ALL of your accumulated $rEON being stolen by Pirates. Stolen
                        $rEOn is split among all of the Pirates currently staked on Pytheas,
                        proportional to their Ranks.
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Defect (Pirate Mint Chance)</th>
                      <td>
                        0-10% chance to mint a pirate (sliding scale depending on population ratio)
                      </td>
                      <td>
                        Process will send your CM on a mission to join the Ai-Lax Pirate Faction. If
                        successful you forfeit all accumulated earnings for that miner and it will
                        be burned. If it fails, you lose only 20% of accumulated $rEON and claim the
                        rest. You can only attempt with a staked CM that has accumulated 48 hours of
                        mining time. Cost scales with Gen stage.
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex justify-center items-center gap-5">
                  {/* //TODO: gifs need replacing */}
                  <img
                    src="/images/shearing.gif"
                    style={{ height: "100px" }}
                    className="object-contain"
                    alt=""
                  />
                  <h4 className="color-blue my-5">$rEON</h4>
                  <img
                    src="/images/claiming-pack.gif"
                    style={{ height: "100px" }}
                    className="object-contain"
                    alt=""
                  />
                </div>
                <p>The maximum $rEON supply is 6,250,000,000 :</p>
                <ul>
                  <li>
                    When supply reaches 3,125,000,000 $rEON earned for staking, the staking “faucet”
                    turns off
                  </li>
                  <li>
                    $rEOn will be an ERC-1155 asset that can only be traded on opensea or private
                    trades
                  </li>
                  <li>
                    This will act as the base game-economy token and cannot be sold through any
                    other means(IE; uniswap or sushiswap)
                  </li>
                  <li>
                    The developers will receive 0 $rEON, any remainder after Orbit 1 will be used
                    for further development
                  </li>
                  <li>
                    Community Rewards will be implemented in the form of in game assets or currency,
                    which will manifest as different events and gameplay throughout the course of
                    the project
                  </li>
                </ul>
                <div className="flex justify-center items-center gap-5">
                  {/* //TODO: gifs need replacing */}
                  <img
                    src="/images/shearing.gif"
                    style={{ height: "100px" }}
                    className="object-contain"
                    alt=""
                  />
                  <h4 className="color-blue my-5">$EON</h4>
                  <img
                    src="/images/claiming-pack.gif"
                    style={{ height: "100px" }}
                    className="object-contain"
                    alt=""
                  />
                </div>
                <p>The maximum $EON supply is 5,000,000,000 :</p>
                <ul>
                  <li>
                    This will be a premium transferrable asset capable of open market trade(IE;
                    uniswap or sushiswap)
                  </li>
                  <li>The developers will receive 0 $EON</li>
                  <li>$EON is only attainable by way of using the REFINERY</li>
                  <li>
                    Many in-game economy and advancement mechanics will rely on this asset, making
                    it highly valuable to certain players depending on strategies used
                  </li>
                </ul>
                <div className="flex justify-center items-center gap-5">
                  <img
                    src="/images/shearing.gif"
                    style={{ height: "100px" }}
                    className="object-contain"
                    alt=""
                  />
                  <h4 className="color-blue my-5">Refinery</h4>
                  <img
                    src="/images/claiming-pack.gif"
                    style={{ height: "100px" }}
                    className="object-contain"
                    alt=""
                  />
                </div>
                <p>
                  Colonist-Miners and Ai-Lax Pirates will need to convert their hard-earned rEON
                  into the powerful and coveted EON by way of the ore processing machines and
                  enrichment processes only found at The Refinery.
                </p>
                <p>
                  The Refinery is a unique facility positioned in line with a super-massive
                  blackhole&apos;s plasma jet stream, the only power source deemed sufficient to run
                  the facility and purification process. The distance to reach it and effects of
                  time dilation limit the rate at which EON can be retrieved from submitted rEON.
                </p>
                <p>
                  For every 13,000 $rEON deposited into this refinery, it will output 9750 $EON per
                  day. This helps control supply entering the ecosystem and gives everyone a chance
                  to accumulate at a throttled pace for a timeframe that matches our development
                  roadmap goals.
                </p>
                <p>
                  The Refinery has a dynamic output based on global utilization and will convert
                  your $rEON into valuable $EON, so these values may change slightly with more
                  players using it.
                </p>
                <div className="flex justify-center items-center gap-5">
                  <img
                    src="/images/staking-pack.gif"
                    style={{ height: "100px" }}
                    className="object-contain"
                    alt=""
                  />
                  <h4 className="color-blue my-5">Ai-Lax Pirates</h4>
                  <img
                    src="/images/unstaked-pack.gif"
                    style={{ height: "100px" }}
                    className="object-contain"
                    alt=""
                  />
                </div>
                <p>
                  Very few of these units will be present initially, inherently outcasts, they grow
                  their numbers by converting defectors to join their cause.
                </p>
                <p>
                  These units earn by injecting themselves into the economy of Pytheas (staking).
                  They will take 20% of all claimed rEON that a miner transports as a safe passage
                  tax and have a 50% chance to take all earned rEON if a miner decides to flee the
                  planet completely (unstaking). Orbital blockades are a specialty tactic of the
                  pirates.
                </p>
                <p>
                  CMs often come to them seeking to join their ranks. This defection choice comes at
                  a cost, depending on how close the Pirate population is to 10% of CMs the chance
                  reduces, but if it&apos;s lower the chance increases. Upon successful defection to
                  the Ai-Lax Pirate faction, a miner will give up their right to partake in rEON
                  mining and turn to a more nefarious way of life as a scoundrel.
                </p>
                <p>
                  When a successful attempt is made, all accumulated rEON (necessary for minting
                  that generation) will be taken as tribute and the CM will be burned. On a failed
                  attempt the miner will still lose 20% of accumulated rEON as tax and reset their
                  staking timer to 0 hours. The remainder will return to a users total holdings.
                </p>
                <p>
                  Every new CM being hired (minted) will also have a 10% chance of being intercepted
                  by pirates and never to arrive on the surface. Depending on a pirate’s rank, this
                  will dictate how much of the spoils they bask in, the higher the better.
                </p>
                <p>
                  &emsp;- The higher the portion of $rEON that the Pirate earns from taxes
                  <br />
                  &emsp;- The higher chance of stealing a newly minted Colonist or Pirate
                </p>
                <h4 className="color-blue py-4">Example:</h4>
                <p>Pirate A has a rank of 8 and Pirate B has a rank of 6, and they are staked.</p>
                <p>
                  &emsp;- If 70,000 $rEON total have been accumulated as taxes, Pirate A will be
                  able to claim 40,000 $rEON and Pirate B will be able to claim 30,000 $rEON
                </p>
                <p>
                  &emsp;- If a newly minted CM or Pirate is stolen, Pirate A has a 57% chance of
                  receiving it and Pirate B has a 43% chance of receiving it
                </p>

                <p className="underline">
                  Only staked Ai-Lax Pirates are able to steal a CM/Pirate or earn the $rEON tax.
                </p>
                <div className="d-flex justify-content-center">
                  <table className="table table-borderless color-brand my-5">
                    <thead>
                      <tr>
                        <th scope="col">Action</th>
                        <th scope="col">Notes</th>
                        <th scope="col">Risk</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Stake Pirate</th>
                        <td style={{ width: "50%" }}>
                          Earn your share of the 20% tax of all $rEON generated by CMs on Pytheas
                        </td>
                        <td>No risk.</td>
                      </tr>
                      <tr>
                        <th scope="row">Claim $rEON</th>
                        <td style={{ width: "50%" }}>
                          Receive all $rEON taxes accrued for the staked Pirate
                        </td>
                        <td>No risk.</td>
                      </tr>
                      <tr>
                        <th scope="row">Unstake Pirate</th>
                        <td style={{ width: "50%" }}>
                          Receive all $rEON taxes accrued for the staked Pirate
                        </td>
                        <td>No risk.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </FAQContentWrapper>
          </div>
        </div>
      </main>
      <footer>
        <NavIconLinks />
      </footer>
    </PageWrapper>
  );
};
