// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import fs from 'fs';
import { config, ethers, } from 'hardhat';
import { HardhatRuntimeEnvironment } from "hardhat/types";


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

async function main(hre: HardhatRuntimeEnvironment) {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // fs.unlinkSync(`${config.paths.artifacts}/contracts/contractAddress.ts`);


  // We get the contract to deploy
  const EpicGamesContract = await ethers.getContractFactory('EpicGame');
  const contract = await EpicGamesContract.deploy(BASE_HEROES, BOSS_ATTR);
  await contract.deployed();
  console.log('EpicGames deployed to:', contract.address);


  saveFrontendFiles(
    contract.address,
    'EpicGame',
  );
}

// https://github.com/nomiclabs/hardhat-hackathon-boilerplate/blob/master/scripts/deploy.js
function saveFrontendFiles(
  contractAddress: string,
  contractName: string,
) {
  fs.writeFileSync(
    `${config.paths.artifacts}/contracts/contractAddress.ts`,
    `export const ${contractName} = '${contractAddress}'\n`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
