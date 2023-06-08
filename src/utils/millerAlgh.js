/* global BigInt */

function millerRabin(n, k = 5) {
  const time = performance.now();

  if (n <= 1) {
    return [false, time - performance.now()];
  }
  if (n === 2 || n === 3) {
    return [true, time - performance.now()];
  }
  if (n % 2 === 0) {
    return [false, time - performance.now()];
  }

  // Представляем n - 1 в виде (2^r) * d
  let r = 0;
  let d = n - 1;
  while (d % 2 === 0) {
    r += 1;
    d /= 2;
  }

  // Повторяем k раз
  for (let i = 0; i < k; i++) {
    const a = Math.floor(Math.random() * (n - 2)) + 2;
    let x = BigInt(a) ** BigInt(d) % BigInt(n); // Вычисляем a^d mod n

    if (x === BigInt(1) || x === BigInt(n - 1)) {
      continue;
    }

    let isComposite = true;
    for (let j = 0; j < r - 1; j++) {
      x = x ** BigInt(2) % BigInt(n); // Возведение в квадрат по модулю n
      if (x === BigInt(n - 1)) {
        isComposite = [false, time - performance.now()];
        break;
      }
    }

    if (isComposite) {
      return [false, time - performance.now()]; // n составное
    }
  }

  return [true, time - performance.now()]; // n вероятно простое
}

export default millerRabin;
