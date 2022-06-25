//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "erc721a/contracts/ERC721A.sol";

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

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

    struct Boss {
        uint256 hp;
        uint256 maxHp;
        uint256 attackDamage;
        string name;
    }

    Boss public boss;

    using Counters for Counters.Counter;
    mapping(Class => Hero) public baseHeroes;
    // who own a nft. address => tokenId
    mapping(address => uint256) public nftHolders;
    // tokenId => attributes
    mapping(uint256 => Hero) public heroesHolderAttr;
    mapping(Class => string) public classes;
    Counters.Counter private _tokenIds;

    event CreatedHero(address from, string heroName, uint256 nftNumber);
    event HitBoss(uint256 tokenId, uint256 bossHp, uint256 heroeHp);

    constructor(Hero[] memory bases, Boss memory bossAttr)
        ERC721A("Heroes", "HRG")
    {
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

        boss = Boss({
            hp: bossAttr.hp,
            maxHp: bossAttr.maxHp,
            attackDamage: bossAttr.attackDamage,
            name: bossAttr.name
        });

        classes[Class.Mage] = "Mage";
        classes[Class.Healer] = "Healer";
        classes[Class.Barbarian] = "Barbarian";

        // Start the minting with 1
        _tokenIds.increment();
    }

    function mintHero(
        Class choice,
        string memory _name,
        string memory _imageURI
    ) public payable {
        require(msg.value >= 0.003 ether, "Not enough amount");

        uint256 currentItemId = _tokenIds.current();

        _safeMint(msg.sender, currentItemId);

        Hero memory templateHeroe = baseHeroes[choice];

        Hero memory newHero = Hero({
            heroIndex: choice,
            maxHp: templateHeroe.maxHp,
            hp: templateHeroe.hp,
            attackDamage: templateHeroe.attackDamage,
            name: _name,
            imageURI: _imageURI
        });

        nftHolders[msg.sender] = currentItemId;
        heroesHolderAttr[currentItemId] = newHero;

        emit CreatedHero(msg.sender, newHero.name, currentItemId);

        // increment for next mint
        _tokenIds.increment();
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        Hero memory heroAttr = heroesHolderAttr[_tokenId];

        string memory strHp = Strings.toString(heroAttr.hp);
        string memory strMaxHp = Strings.toString(heroAttr.maxHp);
        string memory strAttackDamage = Strings.toString(heroAttr.attackDamage);
        string memory heroClass = classes[heroAttr.heroIndex];
        string memory heroeImage = heroAttr.imageURI;

        string memory json = Base64.encode(
            abi.encodePacked(
                '{"name": "',
                heroAttr.name,
                " -- NFT #: ",
                Strings.toString(_tokenId),
                '", "description": "Grande Jogo first NFT game that is fun", "image": "',
                heroeImage,
                '", "Class" : "',
                heroClass,
                '", "attributes": [ { "trait_type": "Health Points", "value": ',
                strHp,
                ', "max_value":',
                strMaxHp,
                '}, { "trait_type": "Attack Damage", "value": ',
                strAttackDamage,
                "} ]}"
            )
        );

        string memory output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        return output;
    }

    function attackBoss(uint256 _tokenId) public payable isBossAlive {
        require(
            _exists(_tokenId) && ownerOf(_tokenId) == msg.sender,
            "Invalid"
        );

        Hero storage heroe = heroesHolderAttr[_tokenId];

        require(heroe.hp > 0, "Heroe died");

        boss.hp = boss.hp < heroe.attackDamage
            ? 0
            : boss.hp - heroe.attackDamage;
        heroe.hp = heroe.hp < boss.attackDamage
            ? 0
            : heroe.hp - boss.attackDamage;

        emit HitBoss(_tokenId, boss.hp, heroe.hp);
    }

    modifier isBossAlive() {
        require(boss.hp > 0, "The Game Boss is dead!!!");
        _;
    }
}
