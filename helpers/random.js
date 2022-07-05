import { webcrypto as crypto } from 'crypto';

export default function () {
  while (true) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    const value = array[0] / 0x100000000;
    // 絶対満たしているはずだが念のために [0, 1) であることを検査する
    if (value >= 0.0 && value < 1.0) {
      return value;
    }
  }
}
