// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract OurBrain {
    uint256 totalThoughts;

     uint256 private seed;
    
    event NewThought(address indexed from, uint256 timestamp, string message);

    struct Thought {
        address user; 
        string message; 
        uint256 timestamp; 
    }

    Thought[] thoughts;

     mapping(address => uint256) public lastThoughtSendedAt;

    constructor() payable {
        console.log("I AM SMART CONTRACT.");

        seed = (block.timestamp + block.difficulty) % 100;
    }

    function sendThought(string memory _message) public {

       require(
            lastThoughtSendedAt[msg.sender] + 5 minutes < block.timestamp,
            "Wait 5m"
        );

        lastThoughtSendedAt[msg.sender] = block.timestamp;

        totalThoughts += 1;                                                                                                                                                                                                                                                                                                                                   
        console.log("%s send thought: %s", msg.sender, _message);

        thoughts.push(Thought(msg.sender, _message, block.timestamp));

        seed = (block.difficulty + block.timestamp + seed) % 100;

        console.log("Random # generated: %d", seed);

        if (seed <= 50) {
            console.log("%s won!", msg.sender);

            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }

        emit NewThought(msg.sender, block.timestamp, _message);
    }

    function getAllThoughts() public view returns (Thought[] memory) {
        return thoughts;
    }

    function getTotalThoughts() public view returns (uint256) {

        console.log("We have %d total waves!", totalThoughts);
        return totalThoughts;
    }
}