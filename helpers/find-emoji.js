export default function findEmoji (emojis, name) {
  if (!Object.keys(emojis).includes(name)) {
    return null;
  }

  return emojis[name].toString();
}
