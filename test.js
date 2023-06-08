/* global BigInt */

function jacobiSymbol(a, n) {
  if (n <= 0 || n % 2 === 0) {
    throw new Error("n должно быть нечетным и положительным");
  }

  let aModN = a % n;
  if (aModN < 0) {
    aModN += n;
  }

  if (aModN === 0) {
    return 0;
  }

  if (aModN === 1) {
    return 1;
  }

  let t = 1;
  while (aModN !== 0) {
    while (aModN % 2 === 0) {
      aModN /= 2;
      if (n % 8 === 3 || n % 8 === 5) {
        t = -t;
      }
    }

    let temp = aModN;
    aModN = n;
    n = temp;

    if (aModN % 4 === 3 && n % 4 === 3) {
      t = -t;
    }

    aModN %= n;
  }

  return n === 1 ? t : 0;
}

function powMod(base, exponent, modulus) {
  if (modulus === 1n) {
    return 0n;
  }

  let result = 1n;
  base = base % modulus;

  while (exponent > 0n) {
    if (exponent % 2n === 1n) {
      result = (result * base) % modulus;
    }

    exponent = exponent >> 1n;
    base = (base * base) % modulus;
  }

  return result;
}

function solovayStrassen(n, k = 5) {
  if (n <= 1) {
    return false;
  }
  if (n === 2 || n === 3) {
    return true;
  }
  if (n % 2 === 0) {
    return false;
  }

  for (let i = 0; i < k; i++) {
    const a = BigInt(Math.floor(Math.random() * (n - 2)) + 2);
    const x = jacobiSymbol(Number(a), Number(n));
    const y = powMod(a, BigInt((n - 1) / 2), BigInt(n));

    if (x === 0 || y !== x % n) {
      return false; // n составное
    }
  }

  return true; // n вероятно простое
}

// Пример использования
const number = 7;
const isPrime = solovayStrassen(number);
console.log(`Число ${number} ${isPrime ? "вероятно простое" : "составное"}`);
