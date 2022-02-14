import React from "react";

type IMintProgressProps = { minted: number; maxTokens: number };
export const MintProgress = ({ minted, maxTokens }: IMintProgressProps) => {
  return (
    <>
      <div className="gen-loader">
        <div
          className="gen-box-background"
          style={{
            width: `${
              minted < maxTokens / 5 ? (minted / (maxTokens / 5)) * 100 : (minted / maxTokens) * 100
            }%`,
          }}
        />
        <div className="gen-box">
          GEN 0<span className="eon">10000 EON</span>
        </div>
        <div className="gen-box">
          GEN 1<span className="eon">10000 EON</span>
        </div>
        <div className="gen-box">
          GEN 2<span className="eon">10000 EON</span>
        </div>
        <div className="gen-box">
          GEN 3<span className="eon">10000 EON</span>
        </div>
        <div className="gen-box">
          GEN 4<span className="eon">10000 EON</span>
        </div>
        <div className="gen-box">
          GEN 5<span className="eon">10000 EON</span>
        </div>
      </div>
      <h2 className="minted-text text-center">
        {minted} / {maxTokens} MINTED
      </h2>
    </>
  );
};
