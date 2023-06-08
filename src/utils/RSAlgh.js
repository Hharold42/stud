/* global BigInt */

let x, y;

function bigSqrt(value) {
  if (value < 0n) {
    throw new Error("square root of negative numbers is not supported");
  }

  if (value < 2n) {
    return value;
  }

  function newtonIteration(n, x0) {
    const x1 = (n / x0 + x0) >> 1n;
    if (x0 === x1 || x0 === x1 - 1n) {
      return x0;
    }
    return newtonIteration(n, x1);
  }

  return newtonIteration(value, 1n);
}

function gcdExtended(a, b) {
  if (a === 0n) {
    x = 0n;
    y = 1n;
    return b;
  }

  let gcd = gcdExtended(b % a, a);
  let x1 = x;
  let y1 = y;

  x = y1 - (b / a) * x1;
  y = x1;

  return gcd;
}

function modInverse(a, m) {
  let g = gcdExtended(a, m);
  if (g !== 1n) {
    return null;
  } else {
    let res = ((x % m) + m) % m;
    return res;
  }
}

const isPrime = (num) => {
  for (let i = 2n, s = bigSqrt(num); i <= s; i++) {
    if (num % i === 0) return false;
  }
  return num > 1n;
};

function gcd(a, b) {
  if (!b) {
    return a;
  }

  return gcd(b, a % b);
}

const nextPrime = (num = 1) => {
  while (!isPrime(++num)) {}
  return num;
};

const generateE = (phi) => {
  let e = 2n;
  while (gcd(e, phi) !== 1n) {
    e = nextPrime(e);
  }
  return e;
};

function encryptRussianToNumbers(word) {
  const alphabet = {
    а: 1,
    б: 2,
    в: 3,
    г: 4,
    д: 5,
    е: 6,
    ё: 7,
    ж: 8,
    з: 9,
    и: 10,
    й: 11,
    к: 12,
    л: 13,
    м: 14,
    н: 15,
    о: 16,
    п: 17,
    р: 18,
    с: 19,
    т: 20,
    у: 21,
    ф: 22,
    х: 23,
    ц: 24,
    ч: 25,
    ш: 26,
    щ: 27,
    ъ: 28,
    ы: 29,
    ь: 30,
    э: 31,
    ю: 32,
    я: 33,
  };

  word = word.toLowerCase();
  let encryptedWord = "";

  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    const encryptedChar = alphabet[char];
    if (encryptedChar) {
      encryptedWord += (encryptedChar + 10).toString();
    } else {
      encryptedWord += char;
    }
  }

  return encryptedWord;
}

function decryptNumbersToRussian(encryptedWord) {
  const alphabet = {
    1: "а",
    2: "б",
    3: "в",
    4: "г",
    5: "д",
    6: "е",
    7: "ё",
    8: "ж",
    9: "з",
    10: "и",
    11: "й",
    12: "к",
    13: "л",
    14: "м",
    15: "н",
    16: "о",
    17: "п",
    18: "р",
    19: "с",
    20: "т",
    21: "у",
    22: "ф",
    23: "х",
    24: "ц",
    25: "ч",
    26: "ш",
    27: "щ",
    28: "ъ",
    29: "ы",
    30: "ь",
    31: "э",
    32: "ю",
    33: "я",
  };

  let decryptedWord = "";

  for (let i = 0; i < encryptedWord.length; i += 2) {
    const char = Number(encryptedWord[i] + encryptedWord[i + 1]);
    console.log(char);
    const decryptedChar = alphabet[char - 10];
    if (decryptedChar) {
      decryptedWord += decryptedChar;
    } else {
      decryptedWord += char;
    }
  }

  return decryptedWord;
}

const encrypt = (m, pk) => {
  const { e, n } = pk;

  if (m < 0n || m >= n) {
    console.log("wtf");
    return null;
  }
  console.log(2);
  if (gcd(m, n) !== 1n) {
    return null;
  }

  const c = m ** e % n;

  return c;
};

const decrypt = (c, sk) => {
  const { d, n } = sk;

  const m = c ** d % n;

  return m;
};

export default function rsalgh(p, q, msg, ed) {
  console.log(p, q, typeof p, typeof q);

  if (isPrime(p) && isPrime(q) && q !== p) {
    const n = p * q;
    const phi = (p - 1n) * (q - 1n);
    const e = generateE(phi);
    const d = modInverse(e, phi);
    const pk = { e, n };
    const sk = { d, n };
    const m = encryptRussianToNumbers(msg);
    const c = encrypt(BigInt(m), pk);
    const m2 = decrypt(c, sk);
    return ed === "e" ? c.toString() : decryptNumbersToRussian(m2.toString());
  }
  return null;
}
