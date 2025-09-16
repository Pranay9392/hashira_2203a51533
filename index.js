// Decoding the given string from base to BigInt
function decodeBase(valueStr, base) {
  const digits = "0123456789abcdefghijklmnopqrstuvwxyz";
  let result = 0n;
  let b = BigInt(base);

  for (let ch of valueStr.toLowerCase()) {
    let digit = digits.indexOf(ch);
    if (digit === -1) {
      throw new Error(`Invalid character '${ch}' in input`);
    }
    if (digit >= base) {
      // fallback : treat as base-16 if input contains invalid digit
      console.warn(
        ` Warning: digit '${ch}' not valid for base ${base}, switching to base 16`
      );
      return decodeBase(valueStr, 16);
    }
    result = result * b + BigInt(digit);
  }
  return result;
}

// GCD for BigInt
function gcd(a, b) {
  if (b === 0n) return a < 0n ? -a : a;
  return gcd(b, a % b);
}

// fraction (num/den)
function simplify(num, den) {
  if (den < 0n) { num = -num; den = -den; }
  const g = gcd(num < 0n ? -num : num, den);
  return { num: num / g, den: den / g };
}

// Fraction addition
function addFrac(a, b) {
  let num = a.num * b.den + b.num * a.den;
  let den = a.den * b.den;
  return simplify(num, den);
}

// Fraction multiplication
function mulFrac(a, b) {
  let num = a.num * b.num;
  let den = a.den * b.den;
  return simplify(num, den);
}

// --------------------- Lagrange Interpolation ---------------------

function lagrangeConstantBig(points, k) {
  let result = { num: 0n, den: 1n };

  for (let i = 0; i < k; i++) {
    let xi = BigInt(points[i].x);
    let yi = BigInt(points[i].y);
    let term = { num: yi, den: 1n };

    for (let j = 0; j < k; j++) {
      if (i !== j) {
        let xj = BigInt(points[j].x);
        let frac = { num: -xj, den: xi - xj }; // (0 - xj)/(xi - xj)
        term = mulFrac(term, frac);
      }
    }
    result = addFrac(result, term);
  }

  return result.num / result.den;
}

// --------------------- JSON Parser ---------------------

function decodePointsBig(jsonObj) {
  const points = [];
  for (const key in jsonObj) {
    if (key === "keys") continue;
    const entry = jsonObj[key];
    const base = parseInt(entry.base, 10);
    const valueStr = entry.value;
    const y = decodeBase(valueStr, base);
    const x = BigInt(key);
    points.push({ x, y });
    console.log(`Decoded Point -> x: ${x}, y: ${y.toString()}`);
  }
  return points;
}

// Driver function

function solvePolynomialConstant(jsonStr) {
  const obj = JSON.parse(jsonStr);
  const k = parseInt(obj.keys.k ?? obj.keys, 10);
  const points = decodePointsBig(obj);

  if (points.length < k) {
    throw new Error("Not enough points for interpolation");
  }

  const c = lagrangeConstantBig(points, k);
  console.log(`✅ Computed constant term (c): ${c.toString()}`);
  return c.toString();
}


// Sample Test Case 1
const input1 = `{
  "keys": { "n": 4, "k": 3 },
  "1": { "base": "10", "value": "4" },
  "2": { "base": "2", "value": "111" },
  "3": { "base": "10", "value": "12" },
  "6": { "base": "4", "value": "213" }
}`;

console.log("\n--- Test 1 ---");
solvePolynomialConstant(input1);

// Sample Test Case 2
const input2 = `{
  "keys": { "n": 10, "k": 7 },
  "1": { "base": "6", "value": "13444211440455345511" },
  "2": { "base": "15", "value": "aed7015a346d635" },
  "3": { "base": "15", "value": "6aeeb69631c227c" },
  "4": { "base": "16", "value": "e1b5e05623d881f" },
  "5": { "base": "8", "value": "316034514573652620673" },
  "6": { "base": "3", "value": "2122212201122002221120200210011020220200" },
  "7": { "base": "3", "value": "20120221122211000100210021102001201112121" },
  "8": { "base": "6", "value": "20220554335330240002224253" },
  "9": { "base": "12", "value": "45153788322a1255483" },
  "10": { "base": "7", "value": "1101613130313526312514143" }
}`;

console.log("\n--- Test 2 ---");
solvePolynomialConstant(input2);
