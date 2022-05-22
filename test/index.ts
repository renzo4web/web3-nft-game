import { expect } from "chai";
import { ContractReceipt } from "ethers";
import { ethers } from "hardhat";
import { EpicGame } from "../typechain";

describe("EpicGame", function () {
  
  let game: EpicGame;

  this.beforeAll(async() => {

    const EpicGame = await ethers.getContractFactory("EpicGame");
    game = await EpicGame.deploy();
    await game.deployed();

  })




  it("Should created a hero with the correct name", async function () {

    const tx = await game.mintHero("turbopila", "ajsdklj");

    // wait until the transaction is mined
    //let receipt: ContractReceipt = await tx.wait();

    const contractReceipt: ContractReceipt = await tx.wait()
    const event = contractReceipt.events?.find(event => event.event === 'CreatedHero')
    const heroName: string = event?.args!['heroName']

    expect(heroName).to.equal("turbopila")

  });


  it("Should failed the event when a wrong anem is expected", async function () {

    const tx = await game.mintHero("turbopila", "ajsdklj");

    // wait until the transaction is mined
    //let receipt: ContractReceipt = await tx.wait();

    const contractReceipt: ContractReceipt = await tx.wait()
    const event = contractReceipt.events?.find(event => event.event === 'CreatedHero')
    const heroName: string = event?.args!['heroName']

    expect(heroName).to.not.equal("turbopilasa")

  });




});
