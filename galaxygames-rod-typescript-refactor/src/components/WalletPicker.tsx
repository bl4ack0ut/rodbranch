import React from "react";
import { useConnect, useNetwork, useAccount } from "wagmi";
import { chainId } from "utils/ethereum";

const buttonStyle = { width: "100%", maxWidth: 240 };

type IWalletPickerProps = { emptyIfNotConnected?: boolean };
export const WalletPicker: React.FunctionComponent<IWalletPickerProps> = ({
  children,
  emptyIfNotConnected,
}) => {
  const [{ data: connectData, error: connectError, loading: loadingConnect }, connect] =
    useConnect();
  const [{ data: networkData, error: networkError, loading: loadingSwitch }, switchNetwork] =
    useNetwork();
  const [{ loading: loadingAccount }, disconnect] = useAccount({
    fetchEns: false,
  });
  const disconnectButton = (
    <div style={{ textAlign: "center" }}>
      <button
        style={buttonStyle}
        className="btn-secondary"
        disabled={loadingAccount}
        onClick={disconnect}>
        Disconnect
      </button>
    </div>
  );
  let content = null;
  if (`${networkData?.chain?.id}` === chainId) {
    content = children || disconnectButton; // NOTE: disconnect button is only shown if no children present
  } else if (
    networkData?.chain &&
    `${networkData?.chain?.id}` !== chainId &&
    !emptyIfNotConnected
  ) {
    if (!switchNetwork) {
      content = (
        <div style={{ textAlign: "center" }}>
          <button style={buttonStyle} className="btn-secondary" disabled={true}>
            Invalid network
          </button>
          {disconnectButton}
          {networkError && <div>{networkError?.message ?? "Failed to switch"}</div>}
        </div>
      );
    } else {
      const chgNet = () => switchNetwork(`0x${parseInt(chainId || "").toString(16)}` as any);
      //   const chgNet = () => switchNetwork(parseInt(chainId || ""));
      content = (
        <div style={{ textAlign: "center" }}>
          <button
            style={buttonStyle}
            className="btn-secondary"
            disabled={loadingSwitch}
            onClick={chgNet}>
            Switch to Mainnet
          </button>
          {networkError && <div>{networkError?.message ?? "Failed to switch"}</div>}
        </div>
      );
    }
  } else if (!emptyIfNotConnected) {
    content = (
      <div style={{ textAlign: "center" }}>
        {connectData.connectors.map((x) => (
          <div key={x.id} style={{ margin: 12 }}>
            <button
              disabled={!x.ready || loadingConnect}
              onClick={() => {
                connect(x);
              }}
              style={buttonStyle}
              className="btn-secondary">
              {x.name}
              {!x.ready && " (unsupported)"}
            </button>
          </div>
        ))}
        {connectError && <div>{connectError?.message ?? "Failed to connect"}</div>}
      </div>
    );
  }
  return <div style={{ minWidth: 200 }}>{content}</div>;
};
