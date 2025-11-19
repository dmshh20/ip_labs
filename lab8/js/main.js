"use strict";

/**
 * Лабораторна робота №8. Варіант 1 (непарні номери).
 * Приклади доступні через об'єкт window.lab8.
 */

function calculateSum(n) {
  if (!Number.isInteger(n) || n < 1) throw new Error("n має бути додатним цілим");
  let sum = 0;
  for (let i = 1; i <= n; i += 1) {
    sum += i;
  }
  return sum;
}

const multiply = function (a, b) {
  return a * b;
};

const power = (a, b) => {
  if (!Number.isInteger(b)) throw new Error("Степінь має бути цілим");
  return a ** b;
};

function harmonicSeries(n) {
  if (!Number.isInteger(n) || n < 1) throw new Error("n має бути додатним цілим");
  if (n === 1) return 1;
  return 1 / n + harmonicSeries(n - 1);
}

function createMultiplier(multiplier) {
  return function (value) {
    return value * multiplier;
  };
}

function applyFunction(value, func) {
  if (typeof func !== "function") throw new Error("Другий аргумент має бути функцією");
  return func(value);
}

const double = (x) => x * 2;
const square = (x) => x ** 2;

function processSet(set, callback) {
  if (!(set instanceof Set)) throw new Error("Перший аргумент має бути Set");
  if (typeof callback !== "function") throw new Error("Другий аргумент має бути функцією");
  const result = [];
  for (const item of set) {
    result.push(callback(item));
  }
  return result;
}

window.lab8 = {
  calculateSum,
  multiply,
  power,
  harmonicSeries,
  createMultiplier,
  applyFunction,
  double,
  square,
  processSet
};

console.info("lab8: використовуйте lab8.* функції у консолі DevTools.");

