function unique (data) {
  return Array.from(new Set(data));
}

export default function (weaponList) {
  return unique(weaponList.map(v => v.type)).sort();
}
