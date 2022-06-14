import unique from '../helpers/unique.js';

export default function (weaponList) {
  return unique(weaponList.map(weapon => weapon.special.id)).sort();
}
