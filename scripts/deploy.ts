import { ethers } from "hardhat";

async function main() {
  const EpicGame = await ethers.getContractFactory("EpicGame");
  const game = await EpicGame.deploy();

  await game.deployed();

  console.log("Greeter deployed to:", game.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
