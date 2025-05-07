import { useState, useEffect } from "react";

export default function WalletConnect({ onConnect }) {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
        onConnect(accounts[0]);
      });
    }
  }, [onConnect]);

  const connect = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
      onConnect(accounts[0]);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {account ? (
        <span className="wallet-bar">Connected: {account.slice(0, 6)}...{account.slice(-4)}</span>
      ) : (
        <button className="faucet-btn" onClick={connect}>Connect Wallet</button>
      )}
    </div>
  );
}
