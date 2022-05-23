//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract EpicGame {
    enum Class {
        Mage,
        Healer,
        Barbarian
    }

    struct Hero {
        Class heroIndex;
        uint256 hp;
        uint256 maxHp;
        uint256 attackDamage;
        string name;
        string imageURI;
    }

    mapping(address => Hero) public heroes;
    mapping(Class => Hero) public baseHeroes;

    event CreatedHero(address from, string heroName);

    constructor(
            Hero[] memory bases
    ) {

        for(uint i = 0; i < bases.length; i++ ){
            Hero memory baseHero;
            baseHero.name = bases[i].name;
            baseHero.hp = bases[i].hp;
            baseHero.maxHp = bases[i].hp;
            baseHero.attackDamage = bases[i].attackDamage;
            baseHero.imageURI = bases[i].imageURI;
            baseHero.heroIndex = Class(i);

            baseHeroes[Class(i)] = baseHero;
        }


        console.log("Mage attack %s",baseHeroes[Class.Mage].attackDamage);
        console.log("Healer attack %s",baseHeroes[Class.Healer].attackDamage);
        console.log("Barbarian attack %s",baseHeroes[Class.Barbarian].attackDamage);
    }

    function mintHero(string memory _name, string memory _imageURI)
        public
        payable
    {
        Hero memory newHero;

        // TODO: set this value dinamic
        newHero.maxHp = 200;
        newHero.hp = newHero.maxHp;

        newHero.attackDamage = 50;

        newHero.name = _name;
        newHero.imageURI = _imageURI;


        heroes[msg.sender] = newHero;

        emit CreatedHero(msg.sender, newHero.name);
    }
}
