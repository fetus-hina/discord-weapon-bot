import { randomInt } from '../helpers/random.js';

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

  if (weapons.length < 1) {
    return null;
  }

  for (let retry = 0; retry < 100; ++retry) {
    const index = randomInt(0, weapons.length - 1);
    if (index >= 0 && index < weapons.length) {
      return weapons[index];
    }
  }

  return null;
}
