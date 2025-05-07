import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getContract } from "../utils/contract";

const TOKEN_SYMBOL = "ORS";
const TOKEN_DECIMALS = 18;

export default function FaucetClaim({ account }) {
  const [status, setStatus] = useState("");
  const [claimAmount, setClaimAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [mining, setMining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hashrate, setHashrate] = useState(0);
  const [target, setTarget] = useState(account || "");

  useEffect(() => {
    if (!target) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    provider.getSigner().then(async (signer) => {
      const contract = getContract(signer);
      const amt = await contract.claimAmount();
      setClaimAmount(Number(ethers.formatUnits(amt, TOKEN_DECIMALS)));
      const bal = await contract.balanceOf(target);
      setBalance(Number(ethers.formatUnits(bal, TOKEN_DECIMALS)));
    });
    setHashrate((Math.random() * 200 + 20).toFixed(2));
  }, [target, status]);

  useEffect(() => {
    let interval;
    if (mining) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) return 100;
          return p + Math.random() * 10 + 5;
        });
      }, 200);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [mining]);

  const mine = async () => {
    setMining(true);
    setStatus("Mining in progress...");
    setProgress(0);
    setTimeout(async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = getContract(signer);
        const tx = await contract.mine(target);
        await tx.wait();
        setStatus(`Success! ${claimAmount} ORS mined to ${target}.`);
      } catch (e) {
        setStatus("Error: " + (e.reason || e.message));
      }
      setMining(false);
    }, 2200 + Math.random() * 1200);
  };

  return (
    <div className="faucet-card mining-faucet" style={{ maxWidth: 480, margin: "40px auto" }}>
      <div style={{ width: "100%", textAlign: "center" }}>
        <img src="https://media.giphy.com/media/sIIhZliB2McAo/giphy.gif" alt="nyan cat" style={{ width: 180, margin: "0 auto" }} />
      </div>
      <div className="faucet-title" style={{ fontSize: "2rem", margin: "16px 0" }}>
        <span role="img" aria-label="rocket">🚀</span> ORS Mining Faucet
      </div>
      <div style={{ margin: "12px 0" }}>
        <b>Target Address:</b>
        <input
          type="text"
          value={target}
          onChange={e => setTarget(e.target.value)}
          style={{
            width: "100%",
            fontFamily: "monospace",
            fontSize: "1rem",
            background: "#e0e7ef",
            borderRadius: 6,
            padding: "6px 10px",
            margin: "4px 0 8px 0",
            border: "1px solid #a5b4fc"
          }}
          placeholder="0x..."
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", margin: "8px 0" }}>
        <div>
          <b>Your Mining Reward:</b>
          <div style={{ fontSize: "1.3rem", color: "#2563eb" }}>{claimAmount} ORS</div>
        </div>
        <div>
          <b>Current Hashrate:</b>
          <div style={{ fontSize: "1.3rem", color: "#2563eb" }}>{hashrate} H/s</div>
        </div>
      </div>
      <div style={{ margin: "8px 0" }}>
        <b>ORS Balance:</b> <span>{balance} ORS</span>
      </div>
      {mining && (
        <div style={{ width: "100%", margin: "18px 0" }}>
          <div style={{ background: "#e0e7ef", borderRadius: 8, height: 18, width: "100%" }}>
            <div style={{ background: "linear-gradient(90deg,#6366f1,#2563eb)", height: 18, borderRadius: 8, width: `${Math.min(progress, 100)}%`, transition: "width 0.2s" }} />
          </div>
        </div>
      )}
      <button className="faucet-btn big-claim" onClick={mine} disabled={mining || !target || !target.startsWith('0x') || target.length !== 42} style={{ marginTop: 18 }}>
        {mining ? "Mining..." : `Mine ${claimAmount} ORS`}
      </button>
      <div className="faucet-status">{status}</div>
    </div>
  );
}