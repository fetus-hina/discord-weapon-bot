function findEmoji (emojis, name) {
  if (!Object.keys(emojis).includes(name)) {
    return null;
  }

  return emojis[name].toString();
}

export default function (weapon, emojis = {}) {
  if (!weapon) {
    return String.fromCodePoint(0x2757) + ' カテゴリ名が違います';
  }

  const emoji = findEmoji(emojis, weapon.icon);
  return String.fromCodePoint(0x1F3AF) +
    (emoji ? ` ${emoji}` : '') +
    ` ${weapon.name} (${weapon.sub} / ${weapon.special})`;
}
