export default function (categoryIdList) {
  return categoryIdList
    .sort()
    .map(v => '`' + v + '`')
    .join(', ');
}
