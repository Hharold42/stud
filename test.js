// Define the elliptic curve parameters
const p = 23; // Prime modulus
const a = 1; // Curve parameter 'a'
const b = 1; // Curve parameter 'b'
const G = { x: 5, y: 19 }; // Base point (generator)

// Generate a private key
function generatePrivateKey() {
  return Math.floor(Math.random() * (p - 1)) + 1;
}

// Perform elliptic curve point addition
function pointAddition(P, Q) {
  let m;

  if (P === Q) {
    m = ((3 * Math.pow(P.x, 2) + a) * modInverse(2 * P.y, p)) % p;
  } else {
    const dx = Q.x - P.x;
    const dy = Q.y - P.y;
    m = (dy * modInverse(dx, p)) % p;
  }

  const x = (Math.pow(m, 2) - P.x - Q.x + p) % p;
  const y = ((m * (P.x - x)) - P.y + p) % p;

  return { x, y };
}

// Perform scalar multiplication of a point on the elliptic curve
function scalarMultiply(P, d) {
  if (d === 0) {
    return { x: Infinity, y: Infinity };
  }

  let Q = P;

  for (let i = 2; i <= d; i++) {
    Q = pointAddition(Q, P);
  }

  return Q;
}

// Perform ECDH key exchange
function performECDHKeyExchange(privateKey, publicKey) {
  const sharedSecret = scalarMultiply(publicKey, privateKey);
  return sharedSecret;
}

// Compute the modular inverse of a number
function modInverse(a, m) {
  let [x1, x2, y1, y2] = [1, 0, 0, 1];
  let q, r, x, y;

  while (a !== 0) {
    q = Math.floor(m / a);
    r = m % a;
    x = x2 - q * x1;
    y = y2 - q * y1;

    [m, a, x2, x1, y2, y1] = [a, r, x1, x, y1, y];
  }

  return x2 >= 0 ? x2 : x2 + m;
}

// Example usage
const alicePrivateKey = generatePrivateKey();
const bobPrivateKey = generatePrivateKey();

const alicePublicKey = scalarMultiply(G, alicePrivateKey);
const bobPublicKey = scalarMultiply(G, bobPrivateKey);

const aliceSharedSecret = performECDHKeyExchange(alicePrivateKey, bobPublicKey);
const bobSharedSecret = performECDHKeyExchange(bobPrivateKey, alicePublicKey);

console.log('Alice private key:', alicePrivateKey);
console.log('Alice public key:', alicePublicKey);
console.log('Bob private key:', bobPrivateKey);
console.log('Bob public key:', bobPublicKey);
console.log('Shared secrets match:', aliceSharedSecret.x === bobSharedSecret.x && aliceSharedSecret.y === bobSharedSecret.y);
