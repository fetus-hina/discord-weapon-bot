import findEmoji from '../helpers/find-emoji.js';

export default function (special, emojis = {}) {
  if (!special) {
    return '';
  }

  return [
    findEmoji(emojis, special.id),
    special.name
  ].filter(v => v !== null).join(' ');
}
