import getRandom from '../helpers/random.js';

function getRandomInt (max) {
  return Math.floor(getRandom() * max);
}

function choiceOne (weaponList) {
  if (weaponList.length < 1) {
    return null;
  }

  return weaponList[getRandomInt(weaponList.length)];
}

export default function (weapons, category, subWeapon, special) {
  if (typeof category === 'string' && category !== 'all') {
    weapons = weapons.filter(v => v.type === category);
  }

  if (typeof subWeapon === 'string' && subWeapon !== 'all') {
    weapons = weapons.filter(v => v.sub.id === subWeapon);
  }

  if (typeof special === 'string' && special !== 'all') {
    weapons = weapons.filter(v => v.special.id === special);
  }

  return choiceOne(weapons);
}
