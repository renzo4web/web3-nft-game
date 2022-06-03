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

    // const returnedTokenUri = await game.tokenURI(1);
    // console.log("Token URI:", returnedTokenUri);

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

    const bossAttack = boss.attackDamage;

    expect(barbarian.name).to.be.equal("Barbarian");
    expect(healer.name).to.be.equal("Healer");
    expect(mage.name).to.be.equal("Mage");
    expect(bossAttack).to.be.equal(BOSS_ATTR.attackDamage);
  });

  it("Should attack the hero", async function () {
    const [, bamba] = await ethers.getSigners();

    const choice = Class.Mage;

    const tx2 = await game
      .connect(bamba)
      .mintHero(choice, "turbopila2", "ajsdklj", {
        value: ethers.utils.parseEther("0.003"),
      });

    await tx2.wait();

    const tx = await game.connect(bamba).attackBoss(2);

    // wait until the transaction is mined
    // let receipt: ContractReceipt = await tx.wait();

    const contractReceipt: ContractReceipt = await tx.wait();
    const event = contractReceipt.events?.find(
      (event) => event.event === "HitBoss"
    );
    const tokenId: number = event?.args?.tokenId;
    const bossHp: number = event?.args?.bossHp;
    const heroeHp: number = event?.args?.heroeHp;

    // const returnedTokenUri = await game.tokenURI(1);
    console.log("TOKEN ID ", tokenId);
    console.log("bossHp ", bossHp);
    console.log("heroeHP ", heroeHp);

    expect(tokenId).to.equal(2);
    expect(bossHp).to.be.equal(BOSS_ATTR.hp - BASE_HEROES[choice].attackDamage);
    expect(heroeHp).to.be.equal(
      BASE_HEROES[choice].hp - BOSS_ATTR.attackDamage
    );
  });
});
