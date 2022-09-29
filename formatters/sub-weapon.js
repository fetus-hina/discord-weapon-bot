import findEmoji from '../helpers/find-emoji.js';

export default function (subWeapon, emojis = {}) {
  if (!subWeapon) {
    return '';
  }

  return [
    findEmoji(emojis, subWeapon.id),
    subWeapon.name
  ].filter(v => v !== null).join(' ');
}
