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

describe("SojiNft", function () {
  it("should return the new SOJI count after mint", async function () {


    const SojiNft = await ethers.getContractFactory("SojiNft");
    const sojinft = await SojiNft.deploy();
    await sojinft.deployed();

    const mintSOJITX = await sojinft.mintSpecialSOJI(
        "0x00000000000000000000000000000000000000FF",
        "my soji",
        "test soji",
        "my image",
        "my animation",
        "[\"my sound\"]",
    )


    await expect(sojinft.mintSpecialSOJI(
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


    const SojiNft = await ethers.getContractFactory("SojiNft");
    const sojinft = await SojiNft.deploy();
    await sojinft.deployed();


    // this should pass because the string contains the word 
    await expect(
      sojinft.contains("hello world", "world"),
    ).to.equal(true);
    // this should fail because the string doesn't contain the substring
    await expect(
      sojinft.contains("hello world", "dog"),
    ).to.equal(false);

  })
})