import { ethers } from "hardhat";

export enum Class {
  Mage,
  Healer,
  Barbarian,
}

export const BASE_HEROES = [
  {
    heroIndex: 0,
    hp: 500,
    maxHp: 500,
    attackDamage: 30,
    name: "Mage",
    imageURI: "hhettppf",
  },
  {
    heroIndex: 1,
    hp: 1500,
    maxHp: 1500,
    attackDamage: 25,
    name: "Healer",
    imageURI: "hhettppf",
  },
  {
    heroIndex: 2,
    hp: 1000,
    maxHp: 1000,
    attackDamage: 50,
    name: "Barbarian",
    imageURI: "hhettppf",
  },
];

export const BOSS_ATTR = {
  hp: 10000,
  maxHp: 10000,
  attackDamage: 150,
  name: "The Boss",
};

async function main() {
  const EpicGame = await ethers.getContractFactory("EpicGame");
  const game = await EpicGame.deploy(BASE_HEROES, BOSS_ATTR);

  await game.deployed();

  let txn;
  // We only have three characters.
  // an NFT w/ the character at index 2 of our array.
  txn = await game.mintHero(Class.Barbarian, "eeeeel", "http:2//", {
    value: ethers.utils.parseEther("0.1"),
  });
  await txn.wait();

  const returnedTokenUri = await game.tokenURI(1);
  console.log("Token URI:", returnedTokenUri);

  console.log("Greeter deployed to:", game.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
