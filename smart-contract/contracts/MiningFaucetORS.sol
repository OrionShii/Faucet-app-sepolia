// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MiningFaucetORS is ERC20, Ownable {
    uint256 public claimAmount = 100 * 10**18;

    constructor() ERC20("OrasiToken", "ORS") Ownable(msg.sender) {
        // Tidak perlu _mint ke owner
    }

    function mine(address target) external {
        require(target != address(0), "Invalid address");
        _mint(target, claimAmount);
    }

    function setClaimAmount(uint256 _amount) external onlyOwner {
        claimAmount = _amount;
    }
}