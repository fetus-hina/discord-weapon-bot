function getRandomInt (max) {
  return Math.floor(Math.random() * max);
}

function choiceOne (weaponList) {
  if (weaponList.length < 1) {
    return null;
  }

  return weaponList[getRandomInt(weaponList.length)];
}

export default function (weapons, category) {
  if (typeof category === 'string') {
    weapons = weapons.filter(v => v.type === category);
  }

  return choiceOne(weapons);
}
