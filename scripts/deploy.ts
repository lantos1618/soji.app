
import { artifacts, ethers } from "hardhat"

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile')

  // We get the contract to deploy
  const Greeter = await ethers.getContractFactory("Greeter")
  const greeter = await Greeter.deploy("Hello, Hardhat!")
  await greeter.deployed()
  console.log("Greeter deployed to:", greeter.address)
 
  

  const SojiNFT = await ethers.getContractFactory("SojiNft")
  const sojiNFT = await SojiNFT.deploy()
  await sojiNFT.deployed()
  console.log("SojiNFT deployed to:", sojiNFT.address)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})