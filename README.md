# ORS Mining Faucet dApp

Faucet dApp + smart contract ERC20 custom, buat simulasi mining token ORS ke wallet siapa aja.  
Frontend React, backend smart contract Solidity (Hardhat).

---

## Fitur

- **Mining Faucet**: Siapa aja bisa "mine" token ORS ke address mana pun (bebas input address).
- **Wallet Connect**: Support MetaMask, auto detect & update address.
- **Live Hashrate**: UI mining animasi, fake hashrate, progress bar.
- **Balance & Reward**: Lihat balance ORS & reward per claim.
- **Admin**: Owner bisa set reward per claim (via contract).

---

## Stack

- **Frontend**: React 18, ethers.js 6, Create React App
- **Smart Contract**: Solidity 0.8.20, OpenZeppelin ERC20, Hardhat

---

## Smart Contract

`MiningFaucetORS.sol`  
- ERC20: "OrasiToken" (ORS)
- Fungsi utama:
  - `mine(address target)`: Mint 100 ORS (default) ke address target
  - `setClaimAmount(uint256)`: Ganti reward per claim (owner only)
- Tidak ada limit per address, bebas spam (buat testing/dev)

---

## Cara Jalanin

### Frontend

```bash
cd frontend
npm install
npm start
```
Akses di http://localhost:3000

### Smart Contract

```bash
cd smart-contract
npm install
npx hardhat node
npx hardhat run --network localhost scripts/deploy.js
```
Edit `frontend/src/utils/constants.js` kalau ganti alamat contract.

---

## Deploy/Config

- Ganti `CONTRACT_ADDRESS` di frontend kalau deploy ulang.
- ABI auto sync dari contract.
- Bisa deploy ke testnet, tinggal ganti provider di frontend.

---

## License

MIT

---

Kalau mau detail lebih lanjut (testing, advanced config, dsb), cek README di masing-masing folder (`frontend/README.md`, `smart-contract/README.md`).  
Saran: tambahin test, rate limit, atau anti-bot kalau mau dipakai publik.
