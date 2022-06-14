import formatSp from './special.js';
import formatSub from './sub-weapon.js';

function findEmoji (emojis, name) {
  if (!Object.keys(emojis).includes(name)) {
    return null;
  }

  return emojis[name].toString();
}

function formatSubAndSp (subWeapon, special) {
  return `(${formatSub(subWeapon)} / ${formatSp(special)})`;
}

export default function (weapon, emojis = {}) {
  if (!weapon) {
    return String.fromCodePoint(0x2757) + ' 該当するブキはありません';
  }

  const emoji = findEmoji(emojis, weapon.icon);
  return [
    String.fromCodePoint(0x1F3AF),
    emoji || null,
    weapon.name,
    formatSubAndSp(weapon.sub, weapon.special)
  ].filter(v => v !== null).join(' ');
}
