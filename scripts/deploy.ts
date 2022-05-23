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

async function main() {
  const EpicGame = await ethers.getContractFactory("EpicGame");
  const game = await EpicGame.deploy(BASE_HEROES);

  await game.deployed();

  console.log("Greeter deployed to:", game.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
