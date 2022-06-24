import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

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

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  await deploy("EpicGame", {
    from: deployer,
    args: [BASE_HEROES, BOSS_ATTR],
    log: true,
    autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
  });
};
export default func;
func.tags = ["EpicGame"];
