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
    mapping(Class => Hero) public baseStats;

    event CreatedHero(address from, string heroName);

    constructor() {
        console.log("DEPLOY DEPLOY>>>>>>>");
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
