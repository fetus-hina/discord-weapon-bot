import findEmoji from '../helpers/find-emoji.js';
import formatSp from './special.js';
import formatSub from './sub-weapon.js';

function formatSubAndSp (subWeapon, special, emojis) {
  return `(${formatSub(subWeapon, emojis)} / ${formatSp(special, emojis)})`;
}

export default function (weapon, emojis = {}, enableEmojiForSubSp = false) {
  if (!weapon) {
    return String.fromCodePoint(0x2757) + ' 該当するブキはありません';
  }

  const emoji = findEmoji(emojis, weapon.icon);
  return [
    String.fromCodePoint(0x1F3AF),
    emoji || null,
    weapon.name,
    formatSubAndSp(weapon.sub, weapon.special, enableEmojiForSubSp ? emojis : {})
  ].filter(v => v !== null).join(' ');
}
