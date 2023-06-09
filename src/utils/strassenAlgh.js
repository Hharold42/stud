// Compute (base^exponent) % modulus efficiently using modular exponentiation
function modularExponentiation(base, exponent, modulus) {
  if (modulus === 1) return 0; // Invalid modulus

  let result = 1;
  base = base % modulus;

  while (exponent > 0) {
    if (exponent % 2 === 1) result = (result * base) % modulus;

    exponent = Math.floor(exponent / 2);
    base = (base * base) % modulus;
  }

  return result;
}

// Compute the Jacobi symbol (a|n)
function jacobiSymbol(a, n) {
  if (n <= 0 || n % 2 === 0) return 0; // Invalid modulus

  let t = 1;

  while (a !== 0) {
    while (a % 2 === 0) {
      a /= 2;
      if (n % 8 === 3 || n % 8 === 5) t = -t;
    }

    [a, n] = [n, a];

    if (a % 4 === 3 && n % 4 === 3) t = -t;

    a = a % n;
  }

  if (n === 1) return t;

  return 0;
}

function gcd(a, b) {
  if (!b) {
    return a;
  }

  return gcd(b, a % b);
}

// Perform a single iteration of the Solovay-Strassen primality test
function solovayStrassenTest(n, iterationCount) {
  const time = performance.now();

  if (n === 2 || n === 3) return [true, performance.now() - time]; // Base case

  if (n <= 1 || n % 2 === 0) return [false, performance.now() - time]; // Even or negative numbers are composite

  for (let i = 0; i < iterationCount; i++) {
    let a = Math.floor(Math.random() * (n - 2)) + 2; // Random base between 2 and (n-1)
    if (gcd(a, n) > 1) return [false, performance.now() - time];
    let y = modularExponentiation(a, (n - 1) / 2, n);
    if (y === 0 || y === 1) continue;
    let x = jacobiSymbol(a, n);
    let mod = modularExponentiation(y - x, n - 1, n);
    if (mod !== 0) return [false, performance.now() - time];
  }

  return [true, performance.now() - time]; // Likely prime
}

export default solovayStrassenTest;
