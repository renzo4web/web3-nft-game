/* eslint-disable node/no-missing-import */
import { expect } from "chai";
import { ContractReceipt } from "ethers";
import { ethers } from "hardhat";
import { BASE_HEROES, BOSS_ATTR, Class } from "../scripts/deploy";
import { EpicGame } from "../typechain";

describe("EpicGame", function () {
  let game: EpicGame;

  this.beforeAll(async () => {
    const EpicGame = await ethers.getContractFactory("EpicGame");
    game = await EpicGame.deploy(BASE_HEROES, BOSS_ATTR);
    await game.deployed();
  });

  it("Should mint a hero with the correct name", async function () {
    const tx = await game.mintHero(Class.Barbarian, "turbopila", "ajsdklj", {
      value: ethers.utils.parseEther("0.003"),
    });

    // wait until the transaction is mined
    // let receipt: ContractReceipt = await tx.wait();

    const contractReceipt: ContractReceipt = await tx.wait();
    const event = contractReceipt.events?.find(
      (event) => event.event === "CreatedHero"
    );
    const heroName: string = event?.args?.heroName;
    const nftTokenNumber: string = event?.args?.nftNumber;

    const returnedTokenUri = await game.tokenURI(1);
    console.log("Token URI:", returnedTokenUri);

    expect(heroName).to.equal("turbopila");
    expect(nftTokenNumber).to.be.equal(1);
  });

  it("It should fail if the correct amount of eth is not sent.", async function () {
    const tx = game.mintHero(Class.Barbarian, "turbopila", "ajsdklj");

    await expect(tx).to.be.reverted;
  });

  it("Should create the base heroes and boss with the proper name", async function () {
    const barbarian = await game.baseHeroes(Class.Barbarian);
    const healer = await game.baseHeroes(Class.Healer);
    const mage = await game.baseHeroes(Class.Mage);

    // wait until the transaction is mined
    // let receipt: ContractReceipt = await tx.wait();
    const boss = await game.boss();

    const bossAttack = boss["attackDamage"];

    expect(barbarian.name).to.be.equal("Barbarian");
    expect(healer.name).to.be.equal("Healer");
    expect(mage.name).to.be.equal("Mage");
    expect(bossAttack).to.be.equal(BOSS_ATTR.attackDamage);
  });
});
