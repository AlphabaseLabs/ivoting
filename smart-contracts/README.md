\

### Installation

npm install
install hardhat

### Usage

run npx hardhat node
after that in new terminal
npx hardhat compile to compile the contracts

npx hardhat test to test the contracts

Once installed, you can use the contracts in the library by importing them:

```solidity
pragma solidity ^0.8.3;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract MyCollectible is ERC721 {
  constructor() ERC721('MyCollectible', 'MCO') {}
}

```
