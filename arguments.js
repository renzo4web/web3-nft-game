const BASE_HEROES = [{
    heroIndex: 0,
    hp: 500,
    maxHp: 500,
    attackDamage: 30,
    name: "Mage",
    imageURI: "hhettppf",
  },
  {
    heroIndex: 1,
    hp: 1500,
    maxHp: 1500,
    attackDamage: 25,
    name: "Healer",
    imageURI: "hhettppf",
  },
  {
    heroIndex: 2,
    hp: 1000,
    maxHp: 1000,
    attackDamage: 50,
    name: "Barbarian",
    imageURI: "hhettppf",
  },
];

const BOSS_ATTR = {
  hp: 10000,
  maxHp: 10000,
  attackDamage: 150,
  name: "The Boss",
};

module.exports = [BASE_HEROES, BOSS_ATTR]