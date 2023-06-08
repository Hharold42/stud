function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const jacobian = (a, n) => {
  if (a === 0) return 0;
  let res = 1;

  if (a < 0) {
    a = -a;
    if (n % 4 === 3) res = -res;
  }

  if (a === 1) return res;

  while (a !== 0) {
    if (a < 0) {
      a = -a;
      if (n % 4 === 3) res = -res;
    }

    while (a % 2 === 0) {
      a = a / 2;
      if (n % 8 === 3 || n % 8 === 5) res = -res;
    }
    let tmp = a;
    a = n;
    n = tmp;

    if (a % 4 === 3 && n % 4 === 3) res = -res;

    a = a % n;
  }
  if (n === 1) return res;
  return 0;
};

function gcd(a, b) {
  if (!b) {
    return a;
  }

  return gcd(b, a % b);
}

const solovay = (number, tests) => {
  const time = performance.now();

  if (number < 2 || number % 2 === 0) return [false, time - performance.now()];
  if (number === 2 || number === 3) return [true, time - performance.now()];
  for (let i = 0; i < tests; i++) {
    const random = Math.floor(getRandomArbitrary(2, number - 2));
    console.log(random);
    let d = gcd(random, number);
    console.log(d);
    if (d > 1) return [false, time - performance.now()];
    let x = Math.pow(random, (number - 1) / 2) % number;
    console.log(x);
    if (x === 0 || x === 1) continue;
    let jacob = jacobian(random, number);
    console.log(jacob);
    let mod = Math.pow(x - jacob, number - 1) % number;
    console.log(mod);
    if (mod !== 0) return [false, time - performance.now()];
  }
  return [true, time - performance.now()];
};

export default solovay;
