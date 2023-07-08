import "@nomicfoundation/hardhat-verify";
import { HardhatUserConfig } from "hardhat/config";
require("dotenv").config();
const { API_URL, PRIVATE_KEY, ETHERSCAN_SEPOLIA_API_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
const config: HardhatUserConfig = {
  solidity: "0.8.9",
  paths: {
    artifacts: "./frontend/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337, // We set 1337 to make interacting with MetaMask simpler
    },
    sepolia: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  typechain: {
    outDir: "./frontend/types/typechain",
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_SEPOLIA_API_KEY || "",
    },
  },
};

export default config;
