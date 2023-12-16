# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
"#ERC-20 and DEX Contract" 

The following project contains 2 contracts.
1) First contract is ERC 20 Contract which creates our own token. We have used openzeppelin library to create an ERC20 token and its interface. This has given our token some functionalities like approve, balanceOf. The documentation for the library is here: https://docs.openzeppelin.com/contracts/5.x/api/token/erc20

2) The second contract is the DEX contract. This contract is used to create a DEX and give the exchange certain functionalities like checking how many tokens does your metamask wallet have and buying the token you have created and selling it. The owner grants access to the DEX to sell a certain amount of tokens and that amount is sold to the buyer when he buys it.
