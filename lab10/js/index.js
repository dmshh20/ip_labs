// Лабораторна робота №10
// Класи та наслідування (ES6)
// Реалізовано обидва варіанти завдання.

console.log("=== Лабораторна робота №10: старт скрипта ===");

// ---------------------------------------------------------------------------
// ВАРІАНТ 1 – “Система управління курсами”
// Класи: Person, Course, Teacher, Student
// ---------------------------------------------------------------------------

class Person {
  constructor(name) {
    this.name = name;
  }

  getInfo() {
    return `Особа: ${this.name}`;
  }
}

class Course {
  constructor(title) {
    this.title = title;
    this.students = [];
  }

  addStudent(student) {
    if (!this.students.includes(student)) {
      this.students.push(student);
      console.log(`Студента "${student.name}" додано до курсу "${this.title}"`);
    }
  }

  listStudents() {
    console.log(`Список студентів курсу "${this.title}":`);
    if (this.students.length === 0) {
      console.log("  (поки що немає студентів)");
      return;
    }
    this.students.forEach((s, index) => {
      console.log(`  ${index + 1}. ${s.name}`);
    });
  }
}

class Teacher extends Person {
  constructor(name) {
    super(name);
    this.courses = [];
  }

  addCourse(course) {
    if (!this.courses.includes(course)) {
      this.courses.push(course);
      console.log(`Курс "${course.title}" додано викладачу "${this.name}"`);
    }
  }

  listCourses() {
    console.log(`Курси викладача "${this.name}":`);
    if (this.courses.length === 0) {
      console.log("  (курсів немає)");
      return;
    }
    this.courses.forEach((c, index) => {
      console.log(`  ${index + 1}. ${c.title}`);
    });
  }
}

class Student extends Person {
  constructor(name) {
    super(name);
    this.courses = [];
  }

  addCourse(course) {
    if (!this.courses.includes(course)) {
      this.courses.push(course);
      course.addStudent(this);
      console.log(`Курс "${course.title}" додано студенту "${this.name}"`);
    }
  }

  viewCourses() {
    console.log(`Курси студента "${this.name}":`);
    if (this.courses.length === 0) {
      console.log("  (курсів немає)");
      return;
    }
    this.courses.forEach((c, index) => {
      console.log(`  ${index + 1}. ${c.title}`);
    });
  }
}

// --------------------- Тестування Варіанту 1 ------------------------------

console.log("=== ВАРІАНТ 1 – Система управління курсами (класи) ===");

const person1 = new Person("Звичайна людина");
console.log(person1.getInfo());

const courseA = new Course("Основи JavaScript");
const courseB = new Course("HTML & CSS");

const teacher10 = new Teacher("Викладач Петренко");
teacher10.addCourse(courseA);
teacher10.addCourse(courseB);

const student10a = new Student("Студент Андрій");
const student10b = new Student("Студент Ірина");

student10a.addCourse(courseA);
student10b.addCourse(courseA);
student10b.addCourse(courseB);

courseA.listStudents();
courseB.listStudents();
teacher10.listCourses();
student10a.viewCourses();
student10b.viewCourses();

// ---------------------------------------------------------------------------
// ВАРІАНТ 2 – “Онлайн-магазин”
// Класи: Product, User, Customer, Order
// ---------------------------------------------------------------------------

class Product {
  constructor(name, price, category) {
    this.name = name;
    this.price = price;
    this.category = category;
  }

  getInfo() {
    return `${this.name} (${this.category}) – ${this.price} грн`;
  }
}

class User {
  constructor(name) {
    this.name = name;
  }

  getInfo() {
    return `Користувач: ${this.name}`;
  }
}

class Order {
  constructor() {
    this.products = [];
    this.total = 0;
  }

  addProduct(product) {
    this.products.push(product);
    this.total += product.price;
    console.log(`До замовлення додано товар: ${product.getInfo()}`);
  }

  getSummary() {
    console.log("Склад замовлення:");
    if (this.products.length === 0) {
      console.log("  (замовлення порожнє)");
      return;
    }
    this.products.forEach((p, index) => {
      console.log(`  ${index + 1}. ${p.getInfo()}`);
    });
    console.log(`Загальна сума: ${this.total} грн`);
  }
}

class Customer extends User {
  constructor(name) {
    super(name);
    this.orders = [];
  }

  addOrder(order) {
    this.orders.push(order);
    console.log(`Клієнту "${this.name}" додано нове замовлення.`);
  }

  viewOrders() {
    console.log(`Замовлення клієнта "${this.name}":`);
    if (this.orders.length === 0) {
      console.log("  (замовлень немає)");
      return;
    }
    this.orders.forEach((order, index) => {
      console.log(`  Замовлення #${index + 1}:`);
      order.getSummary();
    });
  }
}

// --------------------- Тестування Варіанту 2 ------------------------------

console.log("=== ВАРІАНТ 2 – Онлайн-магазин (класи) ===");

const product10a = new Product("Смартфон", 18000, "Електроніка");
const product10b = new Product("Навушники", 2500, "Електроніка");

const order10 = new Order();
order10.addProduct(product10a);
order10.addProduct(product10b);

const customer10 = new Customer("Покупець Олег");
console.log(customer10.getInfo());
customer10.addOrder(order10);

customer10.viewOrders();

console.log("=== Кінець роботи скрипта лабораторної №10 ===");


