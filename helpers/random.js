import { webcrypto as crypto } from 'crypto';

const UINT32_MAX = 0xffffffff;

function getRandomU32 () {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0];
}

function expectInteger (value) {
  if (Number.isInteger(value)) {
    if (Number.isSafeInteger(value)) {
      return value;
    }

    throw new RangeError('The value is an integer value, but it is not a safe integer value');
  }

  value = Number.parseInt(value);
  if (Number.isInteger(value)) {
    if (Number.isSafeInteger(value)) {
      return value;
    }

    throw new RangeError('The value is integer-like value, but it is not a safe integer range');
  }

  throw new RangeError('The value is not an integer');
}

// [0.0, 1.0)
export function random () {
  for (let retry = 0; retry < 100; ++retry) {
    const value = getRandomU32() / (UINT32_MAX + 1);
    // 絶対満たしているはずだが念のために [0, 1) であることを検査する
    if (value >= 0.0 && value < 1.0) {
      return value;
    }
  }
  return Math.random();
}

// PHP's random_int() like, [min, max]
export function randomInt (min, max) {
  min = expectInteger(min);
  max = expectInteger(max);

  if (min > max) {
    throw new RangeError('min > max');
  }

  if (min === max) {
    return min;
  }

  const range = max - min + 1;
  const limit = UINT32_MAX - (UINT32_MAX % range) - 1;
  while (true) {
    const trial = getRandomU32();
    if (trial <= limit) {
      return (trial % range) + min;
    }
  }
}

export default random;
