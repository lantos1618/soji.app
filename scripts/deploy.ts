// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import fs from "fs";

import { artifacts, ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const contractName = "Greeter";
  const Greeter = await ethers.getContractFactory(contractName);
  const greeter = await Greeter.deploy("Hello, Hardhat!");
  await greeter.deployed();
  console.log("Greeter deployed to:", greeter.address);

  const frontEndPath = "./frontend/src/contracts/Greeter/";
  // const frontEndPath = "./decentralized_soji_frontend/src/contracts/Greeter/";
  const frontEndFile = frontEndPath + contractName

  if (!fs.existsSync(frontEndPath)) {
    fs.mkdirSync(frontEndPath);
  }

  // write the contract address to the front end
  fs.writeFileSync(
    frontEndFile + "_address.json",
    JSON.stringify({ address: greeter.address }, undefined, 2)
  );

  // write the contract abi to the front end
  const artifact = await artifacts.readArtifact(contractName);

  fs.writeFileSync(
    frontEndFile + ".json",
    JSON.stringify(artifact, undefined, 2)
  )



  // const SojiNft = await ethers.getContractFactory("SojiNft");
  // const sojinft = await SojiNft.deploy();
  // await sojinft.deployed();

  // console.log("SojiNft deployed to:", sojinft.address)


  // const VFRContractTest = await ethers.getContractFactory("VFRContractTest");
  // const vfrContractTest = await VFRContractTest.deploy();
  // await vfrContractTest.deployed();
}

// // save the abi information to the front end
// async function saveContractToFrontend(contractName: string) {
//   const Contract = await ethers.getContractFactory(contractName);
//   const contract = await Contract.deploy();

//   const frontEndPath = "./decentralized_soji_frontend/src/contracts/";
//   const frontEndFile = frontEndPath + contractName

//   if (!fs.existsSync(frontEndPath)) {
//     fs.mkdirSync(frontEndPath);
//   }

//   // write the contract address to the front end
//   fs.writeFileSync(
//     frontEndFile + "_address.json",
//     JSON.stringify({ Contract: contract.address }, undefined, 2)
//   );

//   // write the contract abi to the front end
//   const artifact = await artifacts.readArtifact(contractName);

//   fs.writeFileSync(
//     frontEndFile + ".json",
//     JSON.stringify(artifact, undefined, 2)
//   )
// }


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
