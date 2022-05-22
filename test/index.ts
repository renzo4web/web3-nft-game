import { expect } from "chai";
import { ContractReceipt } from "ethers";
import { ethers } from "hardhat";
import { BASE_HEROES, Class } from "../scripts/deploy";
import { EpicGame } from "../typechain";

describe("EpicGame", function () {

  let game: EpicGame;

  this.beforeAll(async () => {

    const EpicGame = await ethers.getContractFactory("EpicGame");
    game = await EpicGame.deploy(BASE_HEROES);
    await game.deployed();

  })




  it("Should mint a hero with the correct name", async function () {

    const tx = await game.mintHero("turbopila", "ajsdklj");

    // wait until the transaction is mined
    //let receipt: ContractReceipt = await tx.wait();

    const contractReceipt: ContractReceipt = await tx.wait()
    const event = contractReceipt.events?.find(event => event.event === 'CreatedHero')
    const heroName: string = event?.args!['heroName']

    expect(heroName).to.equal("turbopila")

  });


  it("Should create the base heroes with the proper name", async function () {

    const barbarian = await game.baseHeroes(Class.Barbarian)
    const healer = await game.baseHeroes(Class.Healer)
    const mage = await game.baseHeroes(Class.Mage)

    // wait until the transaction is mined
    //let receipt: ContractReceipt = await tx.wait();


    expect(barbarian.name).to.be.equal("Barbarian")
    expect(healer.name).to.be.equal("Healer")
    expect(mage.name).to.be.equal("Mage")


  });




});
