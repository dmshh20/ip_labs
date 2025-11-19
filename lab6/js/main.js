"use strict";

/**
 * Лабораторна робота №6.
 * Усі результати виводяться у консоль Chrome DevTools.
 */

function logSection(title) {
  console.group(title);
}

function endSection() {
  console.groupEnd();
}

// ────────────────────────────────────────────────────────────────────────────────
// Завдання 1. Підіймання (hoisting) та тимчасова мертва зона
// ────────────────────────────────────────────────────────────────────────────────
logSection("Завдання 1: hoisting var / let / const");
console.log("Перед var a декларацією =>", a); // undefined: var підіймається, ініціалізується значенням undefined
var a = 10;
console.log("Після var a декларації =>", a); // 10

try {
  console.log("Перед let b декларацією =>", b);
} catch (error) {
  console.log("ReferenceError для let b:", error.message);
}
let b = 20;
console.log("Після let b декларації =>", b); // 20

try {
  console.log("Перед const c декларацією =>", c);
} catch (error) {
  console.log("ReferenceError для const c:", error.message);
}
const c = 30;
console.log("Після const c декларації =>", c); // 30
endSection();

// ────────────────────────────────────────────────────────────────────────────────
// Завдання 2. Область видимості всередині if
// ────────────────────────────────────────────────────────────────────────────────
logSection("Завдання 2: область видимості у функції");
function testScope() {
  if (true) {
    var x = 5;
    let y = 10;
    const z = 15;
    console.log("Всередині if ->", { x, y, z });
  }

  console.log("Поза if var x доступний =>", x); // 5

  try {
    console.log("Поза if let y доступний? =>", y);
  } catch (error) {
    console.log("ReferenceError для y:", error.message);
  }

  try {
    console.log("Поза if const z доступний? =>", z);
  } catch (error) {
    console.log("ReferenceError для z:", error.message);
  }
}

testScope();
endSection();

// ────────────────────────────────────────────────────────────────────────────────
// Завдання 3. Приведення типів
// ────────────────────────────────────────────────────────────────────────────────
logSection("Завдання 3: приведення типів");
console.log("5 + '5' =", 5 + "5", "// конкатенація -> '55'");
console.log("'5' - 2 =", "5" - 2, "// рядок перетворюється на число -> 3");
console.log("true + false =", true + false, "// true -> 1, false -> 0 => 1");
console.log("null + 1 =", null + 1, "// null -> 0 => 1");
console.log("undefined + 1 =", undefined + 1, "// undefined -> NaN");
console.log("0 == false =", 0 == false, "// нестроге порівняння -> true");
console.log("0 === false =", 0 === false, "// різні типи -> false");
endSection();

// ────────────────────────────────────────────────────────────────────────────────
// Завдання 4. Object.freeze та const
// ────────────────────────────────────────────────────────────────────────────────
logSection("Завдання 4: Object.freeze та const");
const person = Object.freeze({
  name: "John",
  age: 30
});

try {
  person.age = 31;
} catch (error) {
  console.log("person.age = 31 -> TypeError:", error.message);
}

try {
  person.city = "New York";
} catch (error) {
  console.log("person.city = 'New York' -> TypeError:", error.message);
}

console.log("Після Object.freeze person лишається:", person);

try {
  person = { name: "Alice", age: 25 };
} catch (error) {
  console.log("Переприсвоєння const person неможливе:", error.message);
}
endSection();

// ────────────────────────────────────────────────────────────────────────────────
// Завдання 5. Функція визначення типу
// ────────────────────────────────────────────────────────────────────────────────
logSection("Завдання 5: checkType(value)");
function checkType(value) {
  if (value === null) return "object"; // окрема домовленість із завдання
  return typeof value;
}

console.log("checkType(10) ->", checkType(10));
console.log('checkType("Hello") ->', checkType("Hello"));
console.log("checkType(null) ->", checkType(null));
console.log("checkType({}) ->", checkType({}));
console.log("checkType(undefined) ->", checkType(undefined));
endSection();

