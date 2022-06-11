import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/types";
import { task } from "hardhat/config";

import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import "@nomiclabs/hardhat-etherscan";
import "solidity-coverage";


// added openzeppelin
require('@openzeppelin/hardhat-upgrades');

dotenv.config();
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

export default <HardhatUserConfig>{
  solidity: "0.8.14",
  paths: {
    artifacts: "./src/artifacts",

  },
  typechain: {
    outDir: "./src/types",
  },
  networks: {
    hardhat: {
      chainId: 1337,
      accounts: [
        {
          privateKey: process.env.PRIVATE_KEY,
          balance: "100000000000000000000000000"
        }
      ]
    },
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    goerli: {
      url: process.env.GOERLI_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  }
};