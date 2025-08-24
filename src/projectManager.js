import Project from "./projects.js";
import Todo from "./todos.js";
import Note from "./notes.js";
import NotTodo from "./notTodos.js";

let projects = [];
let currentProject = null;


const STORAGE_KEY = "myProjects";

export const saveProjectsToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

const loadProjectsFromStorage = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        const rawProjects = JSON.parse(stored);

        projects = rawProjects.map(p => {
            const project = new Project(p.title);
            project.id = p.id;
            project.projectTagsList = p.projectTagsList;

            project.todoList = p.todoList.map(t => {
                const todo = new Todo(t.title, t.desc, t.dueDate, t.priority);
                todo.id = t.id;
                todo.completionStatus = t.completionStatus;
                todo.dateCreated = t.dateCreated;
                return todo;
            });

            project.noteList = p.noteList.map(n => {
                const note = new Note(n.title, n.desc);
                note.id = n.id;
                return note;
            });

            project.notTodoList = p.notTodoList.map(nt => {
                const notTodo = new NotTodo(nt.text);
                notTodo.id = nt.id;
                return notTodo;
            });

            return project;
        });

        if (projects.length > 0) {
            currentProject = projects[0];
        }
    }
};


export const addProject = (title) => {
    const newProject = new Project(title);
    projects.push(newProject);
    saveProjectsToStorage();
    return newProject;
};

export const getProjectById = (projectId) => {
    return projects.find(p => p.id === projectId) || null;
};

export const deleteProject = (projectId) => {
    projects = projects.filter(p => p.id !== projectId);
    if (!projects.length) currentProject = null;
    saveProjectsToStorage();
};

export const setCurrentProject = (projectId) => {
    currentProject = getProjectById(projectId);
    return currentProject;
};

export const getProjects = () => projects;
export const getCurrentProject = () => currentProject;

loadProjectsFromStorage();