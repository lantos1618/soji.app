import { expect } from "chai";
import { ethers } from "hardhat";

describe("Greeter", function () {
    it("Should return the new greeting once it's changed", async function () {
        const Greeter = await ethers.getContractFactory("Greeter");
        const greeter = await Greeter.deploy("Hello, world!");
        await greeter.deployed();

        expect(await greeter.greet()).to.equal("Hello, world!");

        const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

        // wait until the transaction is mined
        await setGreetingTx.wait();

        expect(await greeter.greet()).to.equal("Hola, mundo!");
    });
});



describe("VFC Contract", function () {
  it("should return a random number", async function () {


    // const contract = await ethers.getContractFactory("VFRContractTest");
    // const deployedContract = await contract.deploy(
      
    //   // vfr Address of the VFR contract
    //   // '0x6168499c0cFfCaCD319c818142124B7A15E857ab',
    //   // link to the contract that will be used to mint the token
    //   // '0x01BE23585060835E02B77ef475b0Cc51aA1e0709'
    //   // subscription address
    //   // '0xc6ea3bb52161837a1e8cc7ae63ce33b1a05ca7fb
    //   // subscription id
    //   // '6182' 
 
    //   );
    // await deployedContract.deployed();

    // const mintedSoji = await deployedContract.mintSpecialSOJI(
    //     "0x00000000000000000000000000000000000000FF",
    //     "my soji",
    //     "test soji",
    //     "my image",
    //     "my animation",
    //     "[\"my sound\"]",
    // )


    // await expect(deployedContract.mintSpecialSOJI(
    //     "0x00000000000000000000000000000000000000FF",
    //     "my soji",
    //     "test soji",
    //     "my image",
    //     "my animation",
    //     "[\"my sound\"], \"attributes\": \"sneaky\"",
    // )).to.be.revertedWith(
    // "IllegalAttemptToSetAttributes"
    // )
  })
})



describe("SojiNft", function () {
  it("should return the new SOJI count after mint", async function () {


    const contract = await ethers.getContractFactory("SojiNft");

    const deployedContract = await contract.deploy(
      // vfr Address of the VFR contract
      // '0x6168499c0cFfCaCD319c818142124B7A15E857ab'
      // '0x01BE23585060835E02B77ef475b0Cc51aA1e0709'
      // link to the contract that will be used to mint the token
 
      );
    await deployedContract.deployed();

    const mintedSoji = await deployedContract.mintSpecialSOJI(
        "0x00000000000000000000000000000000000000FF",
        "my soji",
        "test soji",
        "my image",
        "my animation",
        "[\"my sound\"]",
    )


    await expect(deployedContract.mintSpecialSOJI(
        "0x00000000000000000000000000000000000000FF",
        "my soji",
        "test soji",
        "my image",
        "my animation",
        "[\"my sound\"], \"attributes\": \"sneaky\"",
    )).to.be.revertedWith(
    "IllegalAttemptToSetAttributes"
    )
  })
})


describe("SojiNft", function () {
  it("testing string contains function", async function () {


    const contract = await ethers.getContractFactory("SojiNft");
    const deployedContract = await contract.deploy();
    await deployedContract.deployed();


    // this should pass because the string contains the word 
    await expect(
      deployedContract.contains("hello world", "world"),
    ).to.equal(true);
    // this should fail because the string doesn't contain the substring
    await expect(
      deployedContract.contains("hello world", "dog"),
    ).to.equal(false);

  })
})