import "./styles.css";

class Todo {
    constructor (title, desc, dueDate, priority) {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completionStatus = false;
    }
}

class Project {
    constructor (title) {
        this.title = title;
        this.todos = [];
    }
    get todoList() {
        return this.todos;
    }
    addTodo(todo) {
        this.todos.push(todo);
    }
}

const todo1 = new Todo("First todo", "This is my first todo. Gotta start somewhere dawg.", "12/09/25", 2);
const todo2 = new Todo("Second todo", "This is my first todo. Gotta start somewhere dawg.", "12/09/25", 2);
const todo3 = new Todo("Third todo", "This is my first todo. Gotta start somewhere dawg.", "12/09/25", 2);
const todo4 = new Todo("Fourth todo", "This is my first todo. Gotta start somewhere dawg.", "12/09/25", 2);
const todo5 = new Todo("Fifth todo", "This is my first todo. Gotta start somewhere dawg.", "12/09/25", 2);
const todo6 = new Todo("Sixth todo", "This is my first todo. Gotta start somewhere dawg.", "12/09/25", 2);
const todo7 = new Todo("Seventh todo", "This is my first todo. Gotta start somewhere dawg.", "12/09/25", 2);
const todo8 = new Todo("Eighth todo", "This is my first todo. Gotta start somewhere dawg.", "12/09/25", 2);

const project1 = new Project("First Project");
const project2 = new Project("Second Project");

project1.addTodo(todo1);
project1.addTodo(todo2);
project1.addTodo(todo3);
project1.addTodo(todo4);
project2.addTodo(todo5);
project2.addTodo(todo6);
project2.addTodo(todo7);
project2.addTodo(todo8);

console.log(todo1);
console.log(todo2);
console.log(todo3);
console.log(todo4);
console.log(todo5);
console.log(todo6);
console.log(todo7);
console.log(todo8);

console.log(project1);
console.log(project2);

console.log(project1.todoList);
console.log(project2.todoList);
