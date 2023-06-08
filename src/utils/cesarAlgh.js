const exclude = (keyword, alph) => {
  return alph.split("").reduce((prev, curr) => {
    if (keyword.includes(curr)) {
      return prev;
    }
    return prev + curr;
  }, "");
};

function hasRepeats(str) {
  return /(.).*\1/.test(str) || !/^[а-яА-Я]+$/.test(str);
}

function isValidInput(str) {
  return !/^[а-яА-Я]+$/.test(str);
}

const getNumbers = (alph, input) => {
  const arr = [];

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < alph.length; j++) {
      if (input[i] === alph[j]) {
        arr.push(j);
      }
    }
  }

  return arr;
};

function leftrotate(str, d) {
  var ans = str.substring(d, str.length) + str.substring(0, d);
  return ans;
}

function rightrotate(str, d) {
  return leftrotate(str, str.length - d);
}

export function cesar(keyword, input, rot) {
  if (hasRepeats(keyword) || isValidInput(input)) {
    return -1;
  }

  const alph = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
  const numericInput = getNumbers(alph, input.toUpperCase());
  const newAlph = keyword.toUpperCase() + exclude(keyword.toUpperCase(), alph);
  const rotNewAlph = rightrotate(newAlph, rot);
  const result = numericInput.map((item) => rotNewAlph[item]);

  return result.join("");
}

export function deCesar(keyword, input, rot) {
  if (hasRepeats(keyword) || isValidInput(input)) {
    return -1;
  }

  const alph = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
  const newAlph = keyword.toUpperCase() + exclude(keyword.toUpperCase(), alph);
  const rotNewAlph = rightrotate(newAlph, rot);
  const numericInput = getNumbers(rotNewAlph, input.toUpperCase());
  const result = numericInput.map((item) => alph[item]);

  return result.join("");
}

export function getNewAlph(keyword, rot) {
  if (hasRepeats(keyword) || !keyword) {
    return null;
  }

  const alph = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
  const newAlph = keyword.toUpperCase() + exclude(keyword.toUpperCase(), alph);
  const rotNewAlph = rightrotate(newAlph, rot);

  return rotNewAlph.split("");
}
