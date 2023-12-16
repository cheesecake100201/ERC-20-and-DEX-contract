const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DEX", () => {
  let owner;
  let tokenSupply = "100";
  let addr1;
  let addr2;
  let token;
  let price = 100;

  before(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy(tokenSupply);

    const DEX = await ethers.getContractFactory("DEX");
    dex = await DEX.deploy(token.target, price);
  });

  describe("Sell", () => {
    it("Should fail if contract is not approved", async () => {
      await expect(dex.sell()).to.be.reverted;
    });

    it("Should pass the tokens if contract is approved", async () => {
      await token.approve(dex.target, 100);
    });

    it("Should not allow a non-owner to call sell()", async () => {
      await expect(dex.connect(addr1).sell()).to.be.reverted;
    });

    it("Sell should transfer token from owner to contract", async () => {
      await expect(dex.sell()).to.changeTokenBalances(
        token,
        [owner.address, dex.target],
        [-100, 100]
      );
    });

    describe("Getters", () => {
      it("Should return correct token balance", async () => {
        expect(await dex.getTokenBalance()).to.equal(100);
      });

      it("Should return correct token price", async () => {
        expect(await dex.getPrice(10)).to.equal(price * 10);
      });
    });

    describe("Buy", () => {
      it("User can buy tokens", async () => {
        await expect(
          dex.connect(addr1).buy(10, { value: 1000 })
        ).to.changeTokenBalances(token, [dex.target, addr1.address], [-10, 10]);
      });

      it("User cannot buy invalid number of tokens", async () => {
        await expect(dex.connect(addr1).buy(91, { value: 9100 })).to.be
          .reverted;
      });

      it("User cannot buy invalid value", async () => {
        await expect(dex.connect(addr1).buy(5, { value: 510 })).to.be.reverted;
      });
    });

    describe("Withdraw tokens", () => {
      it("Non owner cannot withdraw tokens", async () => {
        await expect(dex.connect(addr1).withdrawTokens()).to.be.reverted;
      });

      it("Owner can withdraw tokens", async () => {
        await expect(dex.withdrawTokens()).to.changeTokenBalances(
          token,
          [dex.target, owner.address],
          [-90, 90]
        );
      });
    });

    describe("Withdraw funds", () => {
      it("Should be able to transfer funds from contract to owner", async () => {
        await expect(dex.withdrawFunds()).to.changeEtherBalances(
          [owner.address, dex.target],
          [1000, -1000]
        );
      });
      it("Non-owner cannot withdraw token proceeds", async () => {
        await expect(dex.connect(addr1).withdrawFunds()).to.be.reverted;
      })
    });
  });
});
