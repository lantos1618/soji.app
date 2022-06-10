
import { artifacts, ethers } from "hardhat"
import fs from "fs";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile')

  const SojiNFT = await ethers.getContractFactory("SojiNft")
  const sojiNFT = await SojiNFT.deploy()
  await sojiNFT.deployed()
  console.log("SojiNFT deployed to:", sojiNFT.address)

  const sojiContractAddressLocation = "./src/artifacts/contracts/SojiNft.sol/"
  if (!fs.readdirSync(sojiContractAddressLocation)){
    fs.mkdirSync(sojiContractAddressLocation)
  }
  fs.writeFileSync(
    sojiContractAddressLocation + "SojiNFTAddress.json",
    JSON.stringify({ address: sojiNFT.address })
  )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})