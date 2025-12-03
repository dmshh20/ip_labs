// Лабораторна робота №9
// Об'єктна модель + прототипне наслідування
// Реалізовані обидва варіанти завдання.

console.log("=== Лабораторна робота №9: старт скрипта ===");

// ---------------------------------------------------------------------------
// ВАРІАНТ 1 – “Система управління курсами”
// Спільний прототип для всіх сутностей (Course, Teacher, Student)
// ---------------------------------------------------------------------------

function Entity(name) {
  this.name = name;
}

Entity.prototype.getName = function () {
  return this.name;
};

// ----------------------- Клас Course ---------------------------------------

function Course(title) {
  Entity.call(this, title); // наслідуємо name як title курсу
  this.students = [];
}

Course.prototype = Object.create(Entity.prototype);
Course.prototype.constructor = Course;

Course.prototype.addStudent = function (student) {
  if (this.students.indexOf(student) === -1) {
    this.students.push(student);
    console.log(`Студента "${student.getName()}" додано до курсу "${this.getName()}"`);
  }
};

Course.prototype.listStudents = function () {
  console.log(`Список студентів курсу "${this.getName()}":`);
  if (this.students.length === 0) {
    console.log("  (поки що немає студентів)");
    return;
  }
  this.students.forEach(function (s, index) {
    console.log(`  ${index + 1}. ${s.getName()}`);
  });
};

// ----------------------- Клас Teacher --------------------------------------

function Teacher(name) {
  Entity.call(this, name);
  this.courses = [];
}

Teacher.prototype = Object.create(Entity.prototype);
Teacher.prototype.constructor = Teacher;

Teacher.prototype.addCourse = function (course) {
  if (this.courses.indexOf(course) === -1) {
    this.courses.push(course);
    console.log(`Курс "${course.getName()}" додано викладачу "${this.getName()}"`);
  }
};

Teacher.prototype.listCourses = function () {
  console.log(`Курси викладача "${this.getName()}":`);
  if (this.courses.length === 0) {
    console.log("  (курсів немає)");
    return;
  }
  this.courses.forEach(function (c, index) {
    console.log(`  ${index + 1}. ${c.getName()}`);
  });
};

// ----------------------- Клас Student --------------------------------------

function Student(name) {
  Entity.call(this, name);
  this.courses = [];
}

Student.prototype = Object.create(Entity.prototype);
Student.prototype.constructor = Student;

Student.prototype.addCourse = function (course) {
  if (this.courses.indexOf(course) === -1) {
    this.courses.push(course);
    course.addStudent(this); // двосторонній зв'язок
    console.log(`Курс "${course.getName()}" додано студенту "${this.getName()}"`);
  }
};

Student.prototype.viewCourses = function () {
  console.log(`Курси студента "${this.getName()}":`);
  if (this.courses.length === 0) {
    console.log("  (курсів немає)");
    return;
  }
  this.courses.forEach(function (c, index) {
    console.log(`  ${index + 1}. ${c.getName()}`);
  });
};

// --------------------- Тестування Варіанту 1 ------------------------------

console.log("=== ВАРІАНТ 1 – Система управління курсами ===");

var course1 = new Course("JavaScript для початківців");
var course2 = new Course("Вебдизайн та UX");

var teacher1 = new Teacher("Іван Петров");

teacher1.addCourse(course1);
teacher1.addCourse(course2);

var student1 = new Student("Артем");
var student2 = new Student("Марія");

student1.addCourse(course1);
student2.addCourse(course1);
student2.addCourse(course2);

course1.listStudents();
course2.listStudents();
teacher1.listCourses();
student1.viewCourses();
student2.viewCourses();

// ---------------------------------------------------------------------------
// ВАРІАНТ 2 – “Онлайн-магазин”
// Спільний прототип для сутностей магазину
// ---------------------------------------------------------------------------

function ShopEntity(name) {
  this.name = name;
}

ShopEntity.prototype.getName = function () {
  return this.name;
};

// ----------------------- Клас Product --------------------------------------

function Product(name, price, category) {
  ShopEntity.call(this, name);
  this.price = price;
  this.category = category;
}

Product.prototype = Object.create(ShopEntity.prototype);
Product.prototype.constructor = Product;

Product.prototype.getInfo = function () {
  return `${this.getName()} (${this.category}) – ${this.price} грн`;
};

// ----------------------- Клас Order ----------------------------------------

function Order() {
  this.products = [];
  this.total = 0;
}

Order.prototype.addProduct = function (product) {
  this.products.push(product);
  this.total += product.price;
  console.log(`До замовлення додано товар: ${product.getInfo()}`);
};

Order.prototype.getSummary = function () {
  console.log("Склад замовлення:");
  if (this.products.length === 0) {
    console.log("  (замовлення порожнє)");
    return;
  }
  this.products.forEach(function (p, index) {
    console.log(`  ${index + 1}. ${p.getInfo()}`);
  });
  console.log(`Загальна сума: ${this.total} грн`);
};

// ----------------------- Клас Customer -------------------------------------

function Customer(name) {
  ShopEntity.call(this, name);
  this.orders = [];
}

Customer.prototype = Object.create(ShopEntity.prototype);
Customer.prototype.constructor = Customer;

Customer.prototype.addOrder = function (order) {
  this.orders.push(order);
  console.log(`Клієнту "${this.getName()}" додано нове замовлення.`);
};

Customer.prototype.viewOrders = function () {
  console.log(`Замовлення клієнта "${this.getName()}":`);
  if (this.orders.length === 0) {
    console.log("  (замовлень немає)");
    return;
  }
  this.orders.forEach(function (order, index) {
    console.log(`  Замовлення #${index + 1}:`);
    order.getSummary();
  });
};

// --------------------- Тестування Варіанту 2 ------------------------------

console.log("=== ВАРІАНТ 2 – Онлайн-магазин ===");

var product1 = new Product("Ноутбук", 25000, "Електроніка");
var product2 = new Product("Мишка", 600, "Електроніка");
var product3 = new Product("Рюкзак", 1200, "Аксесуари");

var order1 = new Order();
order1.addProduct(product1);
order1.addProduct(product2);

var order2 = new Order();
order2.addProduct(product3);

var customer1 = new Customer("Олена");
customer1.addOrder(order1);
customer1.addOrder(order2);

customer1.viewOrders();

console.log("=== Кінець роботи скрипта лабораторної №9 ===");


