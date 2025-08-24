import Todo from "./todos.js";
import Note from "./notes.js";
import NotTodo from "./notTodos.js";

export default class Project {
    constructor (title) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.todoList = [];
        this.noteList = [];
        this.notTodoList = [];
        this.projectTagsList = [];
    }

    get projectTags() {
        return this.projectTagsList;
    }

    addProjectTag(tagList) {
        this.projectTagsList = tagList;
    }

    removeProjectTag(tagId) {
        this.projectTagsList = this.projectTagsList.filter(t => t !== tagId);
    }

    get todos() {
        return this.todoList;
    }
    get notes() {
        return this.noteList;
    }
    get notTodos() {
        return this.notTodoList;
    }

    getTodoById(todoId) {
        return this.todoList.find(t => t.id === todoId) || null;
    }
    getNoteById(noteId) {
        return this.noteList.find(n => n.id === noteId) || null;
    }
    getNotTodoById(notTodoId) {
        return this.notTodoList.find(nt => nt.id === notTodoId) || null;
    }

    changeTitle (title) {
        this.title = title;
    }

    addTodo(title, desc, dueDate, priority) {
        this.todoList.push(new Todo(title, desc, dueDate, priority));
    }

    editTodo (todoId, title, desc, dueDate, priority) {
        const todo = this.getTodoById(todoId);
        if (!todo) return;

        if (title) todo.changeTitle(title);
        if (desc) todo.changeDesc(desc);
        if (dueDate) todo.changeDueDate(dueDate);
        if (priority) todo.changePriority(priority);
    }

    deleteTodo(todoId) {
        this.todoList = this.todoList.filter(t => t.id !== todoId);
    }

    sortTodosByPriority() {
        this.todoList.sort((a, b) => a.priority - b.priority);
    }

    sortTodosByDueDate() {
        this.todoList.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }

    sortTodosByDateCreated() {
        this.todoList.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
    }

    toggleTodoCompletion(todoId) {
        const todo = this.getTodoById(todoId);
        if (todo) todo.toggleCompletionStatus();
    }

    addNote(title, desc) {
        this.noteList.push(new Note(title, desc));
    }

    editNote(noteId, title, desc) {
        const note = this.getNoteById(noteId);
        if (!note) return;

        if (title) note.changeTitle(title);
        if (desc) note.changeDesc(desc);
    }

    deleteNote(noteId) {
        this.noteList = this.noteList.filter(n => n.id !== noteId);
    }

    addNotTodo(text) {
        this.notTodoList.push(new NotTodo(text));
    }

    deleteNotTodo(notTodoId) {
        this.notTodoList = this.notTodoList.filter(nt => nt.id !== notTodoId);
    }
}