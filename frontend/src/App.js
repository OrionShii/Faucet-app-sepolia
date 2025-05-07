import { useState } from "react";
import WalletConnect from "./components/WalletConnect";
import FaucetClaim from "./components/FaucetClaim";
import "./App.css";

function App() {
  const [account, setAccount] = useState(null);
  console.log("App loaded, account:", account);

  return (
    <div className="App p-4">
      <WalletConnect onConnect={setAccount} />
      {account && <FaucetClaim account={account} />}
    </div>
  );
}

export default App;