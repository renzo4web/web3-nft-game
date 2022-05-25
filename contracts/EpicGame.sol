//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "erc721a/contracts/ERC721A.sol";

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract EpicGame is ERC721A {
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

    using Counters for Counters.Counter;
    mapping(Class => Hero) public baseHeroes;
    // who own a nft. address => tokenId
    mapping(address => uint256) public nftHolders;
    // tokenId => attributes
    mapping(uint256 => Hero) public heroesHolderAttr;
    Counters.Counter private _tokenIds;

    event CreatedHero(address from, string heroName, uint nftNumber);

    constructor(Hero[] memory bases) ERC721A("Heroes", "HRG") {
        for (uint256 i = 0; i < bases.length; i++) {
            Hero memory baseHero;
            baseHero.name = bases[i].name;
            baseHero.hp = bases[i].hp;
            baseHero.maxHp = bases[i].hp;
            baseHero.attackDamage = bases[i].attackDamage;
            baseHero.imageURI = bases[i].imageURI;
            baseHero.heroIndex = Class(i);

            baseHeroes[Class(i)] = baseHero;
        }

        // Start the minting with 1
        _tokenIds.increment();

        console.log("Mage attack %s", baseHeroes[Class.Mage].attackDamage);
        console.log("Healer attack %s", baseHeroes[Class.Healer].attackDamage);
        console.log(
            "Barbarian attack %s",
            baseHeroes[Class.Barbarian].attackDamage
        );
    }

    function mintHero(
        Class choice,
        string memory _name,
        string memory _imageURI
    ) public payable {
        uint256 currentItemId = _tokenIds.current();

        _safeMint(msg.sender, currentItemId);

        Hero memory newHero = Hero({
            heroIndex: choice,
            maxHp: 200,
            hp: 200,
            attackDamage: 50,
            name: _name,
            imageURI: _imageURI
        });

        nftHolders[msg.sender] = currentItemId;


        emit CreatedHero(msg.sender, newHero.name, currentItemId);

        // increment for next mint
        _tokenIds.increment();
    }
}
