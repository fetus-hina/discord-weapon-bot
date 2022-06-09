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
    if (Object.getOwnPropertyNames(weapons).includes(category)) {
      return choiceOne(weapons[category]);
    }

    console.warn('Unknown category: ' + category);
    return null;
  }

  const flatten = [];
  for (const [, inCategory] of Object.entries(weapons)) {
    inCategory.forEach(v => flatten.push(v));
  }
  return choiceOne(flatten);
}
