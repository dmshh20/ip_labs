"use strict";

/**
 * Лабораторна робота №7. Варіант 1 (номер студента % 2 = 1).
 * Усі завдання демонструються через prompt()/alert() і логуються в консоль.
 */

const MAX_PROMPT_RETRIES = 5;

function askNumber(message, validator = (n) => !Number.isNaN(n) && Number.isFinite(n)) {
  let attempts = 0;
  while (attempts < MAX_PROMPT_RETRIES) {
    const input = prompt(message);
    if (input === null) return null;
    const parsed = Number(input);
    if (validator(parsed)) return parsed;
    alert("Будь ласка, введіть коректне число.");
    attempts += 1;
  }
  alert("Перевищено кількість спроб.");
  return null;
}

// ────────────────────────────────────────────────────────────────────────────────
// Завдання 1. Ромб із цифр
// ────────────────────────────────────────────────────────────────────────────────
function buildDiamondRow(row, maxRows) {
  const digits = Array.from({ length: row }, (_, i) => (i + 1) % 10);
  const mirrored = digits.slice(0, -1).reverse();
  return " ".repeat(maxRows - row) + [...digits, ...mirrored].join("");
}

function printDigitDiamond() {
  const n = askNumber("Введіть розмір ромба (додатне ціле):", (value) => Number.isInteger(value) && value > 0);
  if (n === null) return;

  const lines = [];
  for (let row = 1; row <= n; row += 1) {
    lines.push(buildDiamondRow(row, n));
  }
  for (let row = n - 1; row >= 1; row -= 1) {
    lines.push(buildDiamondRow(row, n));
  }

  console.log("Ромб із цифр (n =", n + "):");
  console.log(lines.join("\n"));
  alert(`Результат в консолі (n=${n})`);
}

// ────────────────────────────────────────────────────────────────────────────────
// Завдання 2. Гармонічний ряд 1/1 + 1/2 + ... + 1/n
// ────────────────────────────────────────────────────────────────────────────────
function computeHarmonicSeries() {
  const n = askNumber("Введіть n для ряду 1/1 + ... + 1/n (додатне ціле):", (value) => Number.isInteger(value) && value > 0);
  if (n === null) return;

  let sum = 0;
  const terms = [];
  for (let i = 1; i <= n; i += 1) {
    const term = 1 / i;
    terms.push(`1/${i}`);
    sum += term;
  }

  console.log(`Ряд для n=${n}: ${terms.join(" + ")}`);
  console.log("Сума =", sum.toFixed(6));
  alert(`Подивіться консоль: виведено ${n} членів і суму ${sum.toFixed(6)}`);
}

// ────────────────────────────────────────────────────────────────────────────────
// Завдання 3. Гра «Вгадай число»
// ────────────────────────────────────────────────────────────────────────────────
function guessNumberGame() {
  const secret = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;

  while (true) {
    const guessRaw = prompt("Вгадайте число від 1 до 100 (або натисніть Cancel для виходу):");
    if (guessRaw === null) {
      alert("Гру перервано.");
      console.log("Гравець перервав гру. Загадане число було:", secret);
      return;
    }

    const guess = Number(guessRaw);
    if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
      alert("Введіть ціле число від 1 до 100.");
      continue;
    }

    attempts += 1;
    if (guess === secret) {
      alert(`Вітаємо! Ви вгадали число ${secret} за ${attempts} спроб(и).`);
      console.log(`Гравець вгадав ${secret} за ${attempts} спроб(и).`);
      break;
    } else if (guess < secret) {
      alert("Загадане число більше.");
    } else {
      alert("Загадане число менше.");
    }
  }
}

// ────────────────────────────────────────────────────────────────────────────────
// Експорт функцій в глобальний контекст для запуску через DevTools
// ────────────────────────────────────────────────────────────────────────────────
window.lab7 = {
  printDigitDiamond,
  computeHarmonicSeries,
  guessNumberGame
};

console.info("lab7: Використовуйте lab7.printDigitDiamond(), lab7.computeHarmonicSeries(), lab7.guessNumberGame() у консолі.");

