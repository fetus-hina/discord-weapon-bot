export default function (weapon) {
  if (!weapon) {
    return String.fromCodePoint(0x2757) + ' カテゴリ名が違います（またはデータが壊れています）';
  }

  return String.fromCodePoint(0x1F3AF) + ` ${weapon.name} (\`${weapon.sub}\` / \`${weapon.special}\`)`;
}
