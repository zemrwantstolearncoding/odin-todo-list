import "./styles.css";
import { format, formatDistance } from "date-fns";

import workPath from "./work.svg";
import personalPath from "./personal.svg";
import householdPath from "./household.svg";
import financePath from "./finance.svg";
import otherPath from "./other.svg";

import editButtonDarkPath from "./edit-dark.svg";
import deleteButtonDarkPath from "./delete-dark.svg";
import editButtonLightPath from "./edit-light.svg";
import deleteButtonLightPath from "./delete-light.svg";
import calendarPath from "./calendar.svg";
import crossButtonPath from "./cross.svg";
import forbiddenPath from "./forbidden.svg";

import { saveProjectsToStorage, addProject, getProjectById, deleteProject, setCurrentProject, getProjects, getCurrentProject } from "./projectManager.js";


const displayController = (function () {

    const allProjectTagTemplates = [
        {
            id: 1,
            type: "work",
            template: function() {
                const workTag = document.createElement("div");
                workTag.classList.add("tag-item");
                workTag.dataset.id = 1;
                const workTagImage = document.createElement("img");
                workTagImage.classList.add("tag-image");
                workTagImage.src = workPath;
                workTagImage.alt = "work icon";
                const workTagText = document.createElement("p");
                workTagText.textContent = "Work";
                workTag.appendChild(workTagImage);
                workTag.appendChild(workTagText);

                return workTag;
            }
        },
        {
            id: 2,
            type: "personal",
            template: function() {
                const personalTag = document.createElement("div");
                personalTag.classList.add("tag-item");
                personalTag.dataset.id = 2;
                const personalTagImage = document.createElement("img");
                personalTagImage.classList.add("tag-image");
                personalTagImage.src = personalPath;
                personalTagImage.alt = "personal icon";
                const personalTagText = document.createElement("p");
                personalTagText.textContent = "Personal";
                personalTag.appendChild(personalTagImage);
                personalTag.appendChild(personalTagText);

                return personalTag;
            }
        },
        {
            id: 3,
            type: "household",
            template: function() {
                const householdTag = document.createElement("div");
                householdTag.classList.add("tag-item");
                householdTag.dataset.id = 3;
                const householdTagImage = document.createElement("img");
                householdTagImage.classList.add("tag-image");
                householdTagImage.src = householdPath;
                householdTagImage.alt = "household icon";
                const householdTagText = document.createElement("p");
                householdTagText.textContent = "Household";
                householdTag.appendChild(householdTagImage);
                householdTag.appendChild(householdTagText);

                return householdTag;
            }
        },
        {
            id: 4,
            type: "finance",
            template: function() {
                const financeTag = document.createElement("div");
                financeTag.classList.add("tag-item");
                financeTag.dataset.id = 1;
                const financeTagImage = document.createElement("img");
                financeTagImage.classList.add("tag-image");
                financeTagImage.src = financePath;
                financeTagImage.alt = "finance icon";
                const financeTagText = document.createElement("p");
                financeTagText.textContent = "Finance";
                financeTag.appendChild(financeTagImage);
                financeTag.appendChild(financeTagText);

                return financeTag;
            }
        },
        {
            id: 5,
            type: "other",
            template: function() {
                const otherTag = document.createElement("div");
                otherTag.classList.add("tag-item");
                otherTag.dataset.id = 1;
                const otherTagImage = document.createElement("img");
                otherTagImage.classList.add("tag-image");
                otherTagImage.src = otherPath;
                otherTagImage.alt = "other icon";
                const otherTagText = document.createElement("p");
                otherTagText.textContent = "Other";
                otherTag.appendChild(otherTagImage);
                otherTag.appendChild(otherTagText);

                return otherTag;
            }
        }
    ];

    const calendarImage = document.createElement("img");
    calendarImage.classList.add("utility");
    calendarImage.src = calendarPath;
    calendarImage.alt = "Due Date";

    const editButtonDark = document.createElement("img");
    editButtonDark.classList.add("button", "utility");
    editButtonDark.src = editButtonDarkPath;
    editButtonDark.alt = "Edit Button";

    const deleteButtonDark = document.createElement("img");
    deleteButtonDark.classList.add("button", "utility");
    deleteButtonDark.src = deleteButtonDarkPath;
    deleteButtonDark.alt = "Delete Button";

    const editButtonLight = document.createElement("img");
    editButtonLight.classList.add("button", "utility");
    editButtonLight.src = editButtonLightPath;
    editButtonLight.alt = "Edit Button";

    const deleteButtonLight = document.createElement("img");
    deleteButtonLight.classList.add("button", "utility");
    deleteButtonLight.src = deleteButtonLightPath;
    deleteButtonLight.alt = "Delete Button";

    const crossButton = document.createElement("img");
    crossButton.classList.add("button", "utility");
    crossButton.src = crossButtonPath;
    crossButton.alt = "Delete Button";

    const forbiddenImage = document.createElement("img");
    forbiddenImage.classList.add("utility");
    forbiddenImage.src = forbiddenPath;
    forbiddenImage.alt = "Forbidden";


    const projectContainer = document.querySelector("div.project-list");
    const projectFormContainer = document.querySelector("div.projects-top-all");
    const infoProjectTitle = document.querySelector("p.project-title.info");
    const infoProjectTags = document.querySelector("div.project-tags.info");

    const todoHeadAll = document.querySelector("div.todo-head-all");
    const noteHeadAll = document.querySelector("div.note-head-all");
    const notTodoHeadAll = document.querySelector("div.not-todo-head-all");

    const todosContainer = document.querySelector("div.todo-list");
    const notesContainer = document.querySelector("div.note-list");
    const notTodosContainer = document.querySelector("div.not-todo-list");


    const createProjectTemplate = function () {
        const projectItem = document.createElement("div");
        projectItem.classList.add("project-item");

        const projectHead = document.createElement("div");
        projectHead.classList.add("project-head");

        const projectTitle = document.createElement("p");
        projectTitle.classList.add("project-title");

        const projectUtility = document.createElement("div");
        projectUtility.classList.add("project-utility");

        const editButton = editButtonDark.cloneNode(true);
        editButton.classList.add("project-edit-btn")
        const deleteButton = deleteButtonDark.cloneNode(true);
        deleteButton.classList.add("project-delete-btn");

        projectUtility.appendChild(editButton);
        projectUtility.appendChild(deleteButton);

        projectHead.appendChild(projectTitle);
        projectHead.appendChild(projectUtility);

        projectItem.appendChild(projectHead);

        return projectItem;
    };

    const renderProjectTags = function (tags, projectTags) {
        tags.forEach((projectTag) => {
            const tag = allProjectTagTemplates.find(tag => tag.id === projectTag).template();
            projectTags.appendChild(tag);
        });
    };

    const createProjectItem = function (project) {
        const projectItem = createProjectTemplate();
        projectItem.dataset.projectId = project.id;

        const projectTitle = projectItem.querySelector("p.project-title");
        projectTitle.textContent = project.title;

        if (project.projectTags) {
            const projectTags = document.createElement("div");
            projectTags.classList.add("project-tags");
            renderProjectTags(project.projectTags, projectTags);
            projectItem.appendChild(projectTags);
        }

        projectContainer.appendChild(projectItem);
    };

    const renderProjects = function() {
        projectContainer.innerHTML = "";
        getProjects().forEach((project) => {
            createProjectItem(project);
        });
    };

    const renderProjectHeader = function () {
        infoProjectTags.innerHTML = "";
        const currentProject = getCurrentProject();
        if (currentProject) {
            infoProjectTitle.textContent = currentProject.title;
            renderProjectTags(currentProject.projectTags, infoProjectTags);
        } else {
            infoProjectTitle.textContent = "Project: No Project selected";
        }
    };
    

    const sortTodos = function (sortId) {
        const currentProject = getCurrentProject();
        switch(sortId) {
            case 1:
                currentProject.sortTodosByDateCreated();
                break;
            case 2:
                currentProject.sortTodosByDueDate();
                break;
            case 3:
                currentProject.sortTodosByPriority();
                break;
        }
        renderTodos();
    };

    let showId = 1;
    let sortId = 1;

    const showTodos = function (showId) {
        const todoItems = todosContainer.querySelectorAll("div.todo-item");
        if (showId === 2) {
            todoItems.forEach((todo) => {
                if (todo.classList.contains("in-progress")) {
                    todo.classList.add("hidden");
                } else {
                    todo.classList.remove("hidden");
                }
            });
        } else if (showId === 3) {
            todoItems.forEach((todo) => {
                if (todo.classList.contains("completed")) {
                    todo.classList.add("hidden");
                } else {
                    todo.classList.remove("hidden");
                }
            });
        } else {
            todoItems.forEach((todo) => {
                todo.classList.remove("hidden");
            });
        }
    };

    const setSortOption = function (event) {
        sortId = parseInt(event.target.value);
        sortTodos(parseInt(sortId));
    };

    const setShowOption = function (event) {
        showId = parseInt(event.target.value);
        showTodos(showId);
    };

    const createBasicTodo = function () {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");

        const itemHead = document.createElement("div");
        itemHead.classList.add("item-head");

        const todoTitle = document.createElement("p");
        todoTitle.classList.add("todo-title");

        const itemHeadRight = document.createElement("div");
        itemHeadRight.classList.add("item-head-right");

        const todoPriority = document.createElement("div");
        todoPriority.classList.add("todo-priority");

        const editButton = editButtonDark.cloneNode(true);
        editButton.classList.add("todo-edit-btn");

        const deleteButton = deleteButtonDark.cloneNode(true);
        deleteButton.classList.add("todo-delete-btn");

        itemHeadRight.appendChild(todoPriority);
        itemHeadRight.appendChild(editButton);
        itemHeadRight.appendChild(deleteButton);

        itemHead.appendChild(todoTitle);
        itemHead.appendChild(itemHeadRight);


        const itemTail = document.createElement("div");
        itemTail.classList.add("item-tail");

        const todoDesc = document.createElement("p");
        todoDesc.classList.add("todo-desc");

        const todoStatus = document.createElement("div");
        todoStatus.classList.add("todo-status");

        const dueDate = document.createElement("div");
        dueDate.classList.add("due-date");

        const calendar = calendarImage.cloneNode(true);

        const progressStatus = document.createElement("div");
        progressStatus.classList.add("progress-status");

        const dot = document.createElement("span");
        dot.classList.add("dot");

        dueDate.appendChild(calendar);

        progressStatus.appendChild(dot);

        todoStatus.appendChild(dueDate);
        todoStatus.appendChild(progressStatus);

        itemTail.appendChild(todoDesc);
        itemTail.appendChild(todoStatus);

        todoItem.appendChild(itemHead);
        todoItem.appendChild(itemTail);

        return todoItem;
    };

    const createTodo = function (todo) {
        const todoItem = createBasicTodo();
        todoItem.dataset.todoId = todo.id;

        const todoTitle = todoItem.querySelector("p.todo-title");
        todoTitle.textContent = todo.title;

        const todoDesc = todoItem.querySelector("p.todo-desc");
        todoDesc.textContent = todo.desc;

        const dueDate = todoItem.querySelector("div.due-date");
        const date = document.createElement("p");
        const formattedDueDate = formatDistance(todo.dueDate, Date.now(), { addSuffix: true });
        date.textContent = formattedDueDate;
        dueDate.appendChild(date);

        const todoPriority = todoItem.querySelector("div.todo-priority");
        if (todo.priority === 1) {
            todoItem.classList.add("red");
            todoPriority.classList.add("priority-high");
            todoPriority.textContent = "Priority: High";
        } else if (todo.priority === 2) {
            todoItem.classList.add("gray");
            todoPriority.classList.add("priority-medium");
            todoPriority.textContent = "Priority: Medium";
        } else {
            todoItem.classList.add("blue");
            todoPriority.classList.add("priority-low");
            todoPriority.textContent = "Priority: Low";
        }

        const progressSpan = document.createElement("span");
        const progressStatus = todoItem.querySelector("div.progress-status");
        const dot = progressStatus.querySelector("span.dot");

        if (!todo.completionStatus) {
            if (showId === 2) {
                todoItem.classList.add("hidden");
            }
            todoItem.classList.add("in-progress");
            progressStatus.classList.add("orange");
            dot.classList.add("orange");
            progressSpan.textContent = "In Progress";
        } else {
            if (showId === 3) {
                todoItem.classList.add("hidden");
            }
            todoItem.classList.add("completed");
            progressStatus.classList.add("green");
            dot.classList.add("green");
            progressSpan.textContent = "Completed";
        }
        progressStatus.appendChild(progressSpan);

        return todoItem;
    };

    const renderTodos = function () {
        todosContainer.innerHTML = "";
        const currentProject = getCurrentProject();
        if (currentProject) {
            const todoList = currentProject.todos;
            todoList.forEach((todo) => {
                const todoItem = createTodo(todo);
                todosContainer.appendChild(todoItem);
            });
        }
    };


    const createBasicNote = function () {
        const noteItem = document.createElement("div");
        noteItem.classList.add("note-item");

        const itemHead = document.createElement("div");
        itemHead.classList.add("item-head");

        const noteTitle = document.createElement("p");
        noteTitle.classList.add("note-title");

        const itemHeadRight = document.createElement("div");
        itemHeadRight.classList.add("item-head-right");

        const editButton = editButtonLight.cloneNode(true);
        editButton.classList.add("note-edit-btn");

        const deleteButton = deleteButtonLight.cloneNode(true);
        deleteButton.classList.add("note-delete-btn");

        itemHeadRight.appendChild(editButton);
        itemHeadRight.appendChild(deleteButton);

        itemHead.appendChild(noteTitle);
        itemHead.appendChild(itemHeadRight);

        const itemTail = document.createElement("div");
        itemTail.classList.add("item-tail");

        const noteDesc = document.createElement("p");
        noteDesc.classList.add("note-desc");

        itemTail.appendChild(noteDesc);

        noteItem.appendChild(itemHead);
        noteItem.appendChild(itemTail);

        return noteItem;
    };

    const createNote = function (note) {
        const noteItem = createBasicNote();
        noteItem.dataset.noteId = note.id;

        const noteTitle = noteItem.querySelector("p.note-title");
        noteTitle.textContent = note.title;

        const noteDesc = noteItem.querySelector("p.note-desc");
        noteDesc.textContent = note.desc;

        return noteItem;
    };

    const renderNotes = function () {
        notesContainer.innerHTML = "";
        const currentProject = getCurrentProject();
        if (currentProject) {
            const noteList = currentProject.notes;
            noteList.forEach((note) => {
                const noteItem = createNote(note);
                notesContainer.appendChild(noteItem);
            });
        }
    };


    const createNotTodoItem = function (notTodo) {
        const notTodoItem = document.createElement("div");
        notTodoItem.classList.add("not-todo-item");
        notTodoItem.dataset.notTodoId = notTodo.id;

        const notTodoTop = document.createElement("div");
        notTodoTop.classList.add("not-todo-item-top");

        const forbidden = forbiddenImage.cloneNode(true);

        const notTodoText = document.createElement("p");
        notTodoText.classList.add("not-todo-text");
        notTodoText.textContent = notTodo.text;

        notTodoTop.appendChild(forbidden);
        notTodoTop.appendChild(notTodoText);

        const deleteButton = crossButton.cloneNode(true);
        deleteButton.classList.add("not-todo-delete-btn");

        notTodoItem.appendChild(notTodoTop);
        notTodoItem.appendChild(deleteButton);

        return notTodoItem;
    };

    const renderNotTodos = function () {
        notTodosContainer.innerHTML = "";
        const currentProject = getCurrentProject();
        if (currentProject) {
            const notTodoList = currentProject.notTodos;
            notTodoList.forEach((notTodo) => {
                const notTodoItem = createNotTodoItem(notTodo);
                notTodosContainer.appendChild(notTodoItem);
            });
        }
    }


    const makeFormTemplate = function () {
        const addItemForm = document.createElement("form");
        addItemForm.classList.add("add-item-form");

        const formTop = document.createElement("div");
        formTop.classList.add("form-top");

        const titleFormItem = document.createElement("div");
        titleFormItem.classList.add("form-item");

        const titleLabel = document.createElement("label");
        titleLabel.htmlFor = "title";
        titleLabel.textContent = "Title";

        const titleInput = document.createElement("input");
        titleInput.id = "title";
        titleInput.name = "title";
        titleInput.type = "text";
        titleInput.placeholder = "Some work";
        titleInput.required = true;

        titleFormItem.appendChild(titleLabel);
        titleFormItem.appendChild(titleInput);

        const descFormItem = document.createElement("div");
        descFormItem.classList.add("form-item");

        const descLabel = document.createElement("label");
        descLabel.htmlFor = "desc";
        descLabel.textContent = "Description";

        const descTextarea = document.createElement("textarea");
        descTextarea.id = "desc";
        descTextarea.name = "desc";
        descTextarea.placeholder = "This is how I'm going to do said work.";
        descTextarea.required = true;

        descFormItem.appendChild(descLabel);
        descFormItem.appendChild(descTextarea);

        formTop.appendChild(titleFormItem);
        formTop.appendChild(descFormItem);

        addItemForm.appendChild(formTop);

        return addItemForm;
    };

    const makeAddTodoForm = function (addTodoForm) {
        addTodoForm.classList.add("add-todo");
        
        const formBottom = document.createElement("div");
        formBottom.classList.add("form-bottom");

        const dueDateFormItem = document.createElement("div");
        dueDateFormItem.classList.add("form-item");

        const dueDateLabel = document.createElement("label");
        dueDateLabel.htmlFor = "due-date";

        const calendar = calendarImage.cloneNode(true);

        dueDateLabel.appendChild(calendar);

        const dueDateInput = document.createElement("input");
        dueDateInput.id = "due-date";
        dueDateInput.name = "due-date";
        dueDateInput.type = "date";
        dueDateInput.required = true;

        dueDateFormItem.appendChild(dueDateLabel);
        dueDateFormItem.appendChild(dueDateInput);

        const priorityFormItem = document.createElement("div");
        priorityFormItem.classList.add("form-item");

        const priorityLabel = document.createElement("label");
        priorityLabel.htmlFor = "priority";
        priorityLabel.textContent = "Priority";

        const prioritySelect = document.createElement("select");
        prioritySelect.id = "priority";
        prioritySelect.name = "priority";
        prioritySelect.required = true;

        const priorityOption1 = document.createElement("option");
        priorityOption1.value = "1";
        priorityOption1.textContent = "High";

        const priorityOption2 = document.createElement("option");
        priorityOption2.value = "2";
        priorityOption2.textContent = "Medium";

        const priorityOption3 = document.createElement("option");
        priorityOption3.value = "3";
        priorityOption3.textContent = "Low";

        prioritySelect.appendChild(priorityOption1);
        prioritySelect.appendChild(priorityOption2);
        prioritySelect.appendChild(priorityOption3);

        priorityFormItem.appendChild(priorityLabel);
        priorityFormItem.appendChild(prioritySelect);

        const submitButton = document.createElement("button");
        submitButton.classList.add("todo-submit-btn");
        submitButton.type = "submit";
        submitButton.textContent = "Save";

        formBottom.appendChild(dueDateFormItem);
        formBottom.appendChild(priorityFormItem);
        formBottom.appendChild(submitButton);

        addTodoForm.appendChild(formBottom);

        return addTodoForm;
    };

    const makeAddNoteForm = function (addNoteForm) {
        addNoteForm.classList.add("add-note");

        const submitButton = document.createElement("button");
        submitButton.classList.add("note-submit-btn");
        submitButton.type = "submit";
        submitButton.textContent = "Save";

        addNoteForm.appendChild(submitButton);

        return addNoteForm;
    };

    const makeAddNotTodoForm = function () {
        const addItemForm = document.createElement("form");
        addItemForm.classList.add("add-item-form", "add-not-todo");

        const textFormItem = document.createElement("div");
        textFormItem.classList.add("form-item", "not-todo");

        const textLabel = document.createElement("label");
        textLabel.htmlFor = "text";

        const textInput = document.createElement("input");
        textInput.id = "text";
        textInput.name = "text";
        textInput.type = "text";
        textInput.placeholder = "Do not fart at a funeral";
        textInput.required = true;

        textFormItem.appendChild(textLabel);
        textFormItem.appendChild(textInput);

        const submitButton = document.createElement("button");
        submitButton.classList.add("not-todo-submit-btn");
        submitButton.type = "submit";
        submitButton.textContent = "Save";

        addItemForm.appendChild(textFormItem);
        addItemForm.appendChild(submitButton);

        return addItemForm;
    };

    const addTodoForm = makeAddTodoForm(makeFormTemplate());
    const addNoteForm = makeAddNoteForm(makeFormTemplate());
    const addNotTodoForm = makeAddNotTodoForm();
    let todoFormShown = false;
    let noteFormShown = false;
    let notTodoFormShown = false;


    const toggleAddTodoForm = function () {
        if (todoHeadAll.children.length < 2) {
            todoHeadAll.appendChild(addTodoForm);
            todoFormShown = true;
        } else {
            todoHeadAll.removeChild(addTodoForm);
            todoFormShown = false;
        }
    };

    const saveNewTodo = function (event) {
        if (!addTodoForm.checkValidity()) {
        addTodoForm.reportValidity();
        return;
        }

        const formData = new FormData(addTodoForm);

        const title = formData.get("title");
        const desc = formData.get("desc");
        const dueDate = formData.get("due-date");
        const priority = parseInt(formData.get("priority"));

        getCurrentProject().addTodo(title, desc, dueDate, priority);
        saveProjectsToStorage();

        sortTodos(sortId);

        addTodoForm.reset();

        event.preventDefault();
    };


    const toggleAddNoteForm = function () {
        if (noteHeadAll.children.length < 2) {
            noteHeadAll.appendChild(addNoteForm);
            noteFormShown = true;
        } else {
            noteHeadAll.removeChild(addNoteForm);
            noteFormShown = false;
        }
    };

    const saveNewNote = function (event) {
        if (!addNoteForm.checkValidity()) {
        addNoteForm.reportValidity();
        return;
        }

        const formData = new FormData(addNoteForm);

        const title = formData.get("title");
        const desc = formData.get("desc");

        getCurrentProject().addNote(title, desc);
        saveProjectsToStorage();

        renderNotes();

        addNoteForm.reset();

        event.preventDefault();
    };


    const toggleAddNotTodoForm = function () {
        if (notTodoHeadAll.children.length < 2) {
            notTodoHeadAll.appendChild(addNotTodoForm);
            notTodoFormShown = true;
        } else {
            notTodoHeadAll.removeChild(addNotTodoForm);
            notTodoFormShown = false;
        }
    };

    const saveNewNotTodo = function (event) {
        if (!addNotTodoForm.checkValidity()) {
        addNotTodoForm.reportValidity();
        return;
        }

        const formData = new FormData(addNotTodoForm);

        const text = formData.get("text");

        getCurrentProject().addNotTodo(text);
        saveProjectsToStorage();

        renderNotTodos();

        addNotTodoForm.reset();

        event.preventDefault();
    };


    const makeEditTodoForm = function () {
        const editTodoForm = addTodoForm.cloneNode(true);
        editTodoForm.classList.remove("add-item-form", "add-todo");
        editTodoForm.classList.add("edit-item-form", "edit-todo");

        const submitButton = editTodoForm.querySelector("button.todo-submit-btn");
        submitButton.classList.remove("todo-submit-btn");
        submitButton.classList.add("todo-edit-btn");

        return editTodoForm;
    };

    const makeEditNoteForm = function () {
        const editNoteForm = addNoteForm.cloneNode(true);
        editNoteForm.classList.remove("add-item-form", "add-note");
        editNoteForm.classList.add("edit-item-form", "edit-note");

        const submitButton = editNoteForm.querySelector("button.note-submit-btn");
        submitButton.classList.remove("note-submit-btn");
        submitButton.classList.add("note-edit-btn");

        return editNoteForm;
    };

    const editTodoForm = makeEditTodoForm();
    const editNoteForm = makeEditNoteForm();
    let editTodoFormShown = false;
    let editNoteFormShown = false;


    const toggleEditTodoForm = function (todoId, todoItem) {
        const todo = getCurrentProject().getTodoById(todoId);

        const title = editTodoForm.querySelector("input#title");
        title.value = todo.title;

        const desc = editTodoForm.querySelector("textarea#desc");
        desc.value = todo.desc;

        const dueDate = editTodoForm.querySelector("input#due-date");
        dueDate.value = todo.dueDate;

        const priority = editTodoForm.querySelector("select#priority");
        priority.value = `${todo.priority}`;

        if (todoItem.children.length < 3) {
            todoItem.appendChild(editTodoForm);
            editTodoFormShown = true;
        } else {
            todoItem.removeChild(editTodoForm);
            editTodoFormShown = false;
        }
    };

    const saveEditedTodo = function (event) {
        if (!editTodoForm.checkValidity()) {
        editTodoForm.reportValidity();
        return;
        }

        const todoId = event.target.closest("div.todo-item").dataset.todoId;

        const formData = new FormData(editTodoForm);

        const title = formData.get("title");
        const desc = formData.get("desc");
        const dueDate = formData.get("due-date");
        const priority = parseInt(formData.get("priority"));

        getCurrentProject().editTodo(todoId, title, desc, dueDate, priority);
        saveProjectsToStorage();

        sortTodos(sortId);

        editTodoForm.reset();

        event.preventDefault();
    };

    const modifyTodo = function (event) {
        const clickedTodoItem = event.target.closest("div.todo-item");

        if (clickedTodoItem) {
            const editButton = clickedTodoItem.querySelector("img.todo-edit-btn");
            const deleteButton = clickedTodoItem.querySelector("img.todo-delete-btn");
            const progressStatus = clickedTodoItem.querySelector("div.progress-status");
            const todoId = clickedTodoItem.dataset.todoId;
            
            if (editButton && event.target === editButton) {
                toggleEditTodoForm(todoId, clickedTodoItem);
            }
            if (deleteButton && event.target === deleteButton) {
                getCurrentProject().deleteTodo(todoId);
                saveProjectsToStorage();
                sortTodos(sortId);
            }
            if (progressStatus && progressStatus.contains(event.target)) {
                getCurrentProject().toggleTodoCompletion(todoId);
                clickedTodoItem.classList.toggle("completed");
                clickedTodoItem.classList.toggle("in-progress");
                sortTodos(sortId);
            }
        }
    };


    const toggleEditNoteForm = function (noteId, noteItem) {
        const note = getCurrentProject().getNoteById(noteId);

        const title = editNoteForm.querySelector("input#title");
        title.value = note.title;

        const desc = editNoteForm.querySelector("textarea#desc");
        desc.value = note.desc;

        if (noteItem.children.length < 3) {
            noteItem.appendChild(editNoteForm);
            editNoteFormShown = true;
        } else {
            noteItem.removeChild(editNoteForm);
            editNoteFormShown = false;
        }
    };

    const saveEditedNote = function (event) {
        if (!editNoteForm.checkValidity()) {
        editNoteForm.reportValidity();
        return;
        }

        const noteId = event.target.closest("div.note-item").dataset.noteId;

        const formData = new FormData(editNoteForm);

        const title = formData.get("title");
        const desc = formData.get("desc");

        getCurrentProject().editNote(noteId, title, desc);
        saveProjectsToStorage();

        renderNotes();

        editNoteForm.reset();

        event.preventDefault();
    };
    
    const modifyNote = function (event) {
        const clickedNoteItem = event.target.closest("div.note-item");
        const editButton = clickedNoteItem.querySelector("img.note-edit-btn");
        const deleteButton = clickedNoteItem.querySelector("img.note-delete-btn");

        if (clickedNoteItem) {
            const noteId = clickedNoteItem.dataset.noteId;

            if (editButton && event.target === editButton) {
                toggleEditNoteForm(noteId, clickedNoteItem);
            }
            if (deleteButton && event.target === deleteButton) {
                getCurrentProject().deleteNote(noteId);
                saveProjectsToStorage();
                renderNotes();
            }
        }
    };


    const modifyNotTodo = function (event) {
        const clickedNotTodoItem = event.target.closest("div.not-todo-item");
        const deleteButton = clickedNotTodoItem.querySelector("img.not-todo-delete-btn");

        if (clickedNotTodoItem) {
            const notTodoId = clickedNotTodoItem.dataset.notTodoId;

            if (deleteButton && event.target === deleteButton) {
                getCurrentProject().deleteNotTodo(notTodoId);
                saveProjectsToStorage();
                renderNotTodos();
            }
        }
    };


    const createTagFormOption = function (tagObject) {
        const formTagOption = document.createElement("div");
        formTagOption.classList.add("form-tag-option");

        const formTagInput = document.createElement("input");
        formTagInput.classList.add("ui-checkbox");
        formTagInput.id = tagObject.type;
        formTagInput.name = tagObject.type;
        formTagInput.type = "checkbox";
        formTagInput.value = `${tagObject.id}`;

        const formTagLabel = document.createElement("label");
        formTagLabel.htmlFor = tagObject.type;

        const tagItem = tagObject.template();

        formTagLabel.appendChild(tagItem);

        formTagOption.appendChild(formTagInput);
        formTagOption.appendChild(formTagLabel);

        return formTagOption;
    };

    const projectFormTemplate = function () {
        const addProjectForm = document.createElement("form");
        addProjectForm.classList.add("add-item-form", "add-project");

        const formTop = document.createElement("div");
        formTop.classList.add("form-top");

        const titleFormItem = document.createElement("div");
        titleFormItem.classList.add("form-item");

        const titleLabel = document.createElement("label");
        titleLabel.htmlFor = "title";
        titleLabel.textContent = "Project Title";

        const titleInput = document.createElement("input");
        titleInput.id = "title";
        titleInput.name = "title";
        titleInput.type = "text";
        titleInput.placeholder = "Build A Spaceship";
        titleInput.required = true;

        titleFormItem.appendChild(titleLabel);
        titleFormItem.appendChild(titleInput);

        formTop.appendChild(titleFormItem);

        const formBottom = document.createElement("div");
        formBottom.classList.add("form-bottom");

        const tagFormItem = document.createElement("div");
        tagFormItem.classList.add("form-item");

        const addTagsText = document.createElement("p");
        addTagsText.classList.add("add-tags");
        addTagsText.textContent = "Add Tags:";

        const formTagList = document.createElement("div");
        formTagList.classList.add("form-tag-list");

        const workTagOption = createTagFormOption(allProjectTagTemplates[0]);
        const personalTagOption = createTagFormOption(allProjectTagTemplates[1]);
        const householdTagOption = createTagFormOption(allProjectTagTemplates[2]);
        const financeTagOption = createTagFormOption(allProjectTagTemplates[3]);
        const otherTagOption = createTagFormOption(allProjectTagTemplates[4]);

        formTagList.appendChild(workTagOption);
        formTagList.appendChild(personalTagOption);
        formTagList.appendChild(householdTagOption);
        formTagList.appendChild(financeTagOption);
        formTagList.appendChild(otherTagOption);

        tagFormItem.appendChild(addTagsText);
        tagFormItem.appendChild(formTagList);

        formBottom.appendChild(tagFormItem);

        const saveProjectButton = document.createElement("button");
        saveProjectButton.classList.add("project-submit-btn");
        saveProjectButton.type = "submit";
        saveProjectButton.textContent = "Save";

        addProjectForm.appendChild(formTop);
        addProjectForm.appendChild(formBottom);
        addProjectForm.appendChild(saveProjectButton);

        return addProjectForm;
    };

    const makeEditProjectForm = function () {
        const editProjectForm = projectFormTemplate();
        editProjectForm.classList.remove("add-item-form", "add-project");
        editProjectForm.classList.add("edit-item-form", "edit-project");

        const editTagsText = editProjectForm.querySelector("p.add-tags");
        editTagsText.classList.remove("add-tags");
        editTagsText.classList.add("edit-tags");
        editTagsText.textContent = "Edit Tags:";

        const submitButton = editProjectForm.querySelector("button.project-submit-btn");
        submitButton.classList.remove("project-submit-btn");
        submitButton.classList.add("project-edit-btn");

        return editProjectForm;
    };

    const editProjectForm = makeEditProjectForm();
    let editProjectFormShown = false;

    const toggleEditProjectForm = function (projectId, projectItem) {
        const project = getProjectById(projectId);

        const title = editProjectForm.querySelector("input#title");
        title.value = project.title;

        const tags = editProjectForm.querySelectorAll(`input[type="checkbox"]`);
        tags.forEach((tag) => {
            if (project.projectTags.includes(parseInt(tag.value))) {
                tag.checked = true;
            } else {
                tag.checked = false;
            }
        });

        if (projectItem.children.length < 3) {
            projectItem.appendChild(editProjectForm);
            editProjectFormShown = true;
        } else {
            projectItem.removeChild(editProjectForm);
            editProjectFormShown = false;
        }
    };

    const saveEditedProject = function (event) {
        if (!editProjectForm.checkValidity()) {
        editProjectForm.reportValidity();
        return;
        }

        const projectId = event.target.closest("div.project-item").dataset.projectId;
        const project = getProjectById(projectId);

        const formData = new FormData(editProjectForm);

        const title = formData.get("title");

        const addedTags = editProjectForm.querySelectorAll('input[type="checkbox"]:checked');
        const tagList = [];
        addedTags.forEach((tag) => {
            tagList.push(parseInt(tag.value));
        });

        project.changeTitle(title);
        project.addProjectTag(tagList);
        saveProjectsToStorage();

        renderProjects();
        renderProjectHeader();
        sortTodos(sortId);
        renderNotes();
        renderNotTodos();

        editProjectForm.reset();

        event.preventDefault();
    };


    const addProjectForm = projectFormTemplate();
    let addProjectFormShown = false;

    const toggleAddProjectForm = function () {
        if (projectFormContainer.children.length < 2) {
            projectFormContainer.appendChild(addProjectForm);
            addProjectFormShown = true;
        } else {
            projectFormContainer.removeChild(addProjectForm);
            addProjectFormShown = false;
        }
    };

    const saveNewProject = function (event) {
        if (!addProjectForm.checkValidity()) {
        addProjectForm.reportValidity();
        return;
        }

        const formData = new FormData(addProjectForm);

        const title = formData.get("title");
        const newProject = addProject(title);

        const addedTags = addProjectForm.querySelectorAll('input[type="checkbox"]:checked');
        const tagList = [];
        addedTags.forEach((tag) => {
            tagList.push(parseInt(tag.value));
        });
        newProject.addProjectTag(tagList);

        setCurrentProject(newProject.id);

        renderProjects();
        renderProjectHeader();
        sortTodos(sortId);
        renderNotes();
        renderNotTodos();

        addProjectForm.reset();

        event.preventDefault();
    };

    const modifyProject = function (event) {
        const clickedProjectItem = event.target.closest("div.project-item");
        const projectId = clickedProjectItem.dataset.projectId;

        if (clickedProjectItem) {
            const editButton = clickedProjectItem.querySelector("img.project-edit-btn");
            const deleteButton = clickedProjectItem.querySelector("img.project-delete-btn");

            if (getCurrentProject() === getProjectById(projectId)) {
                if (event.target === editButton) {
                    toggleEditProjectForm(projectId, clickedProjectItem);

                } else if (event.target === deleteButton) {
                    deleteProject(projectId);
                    const allProjects = getProjects();
                    if (allProjects.length) {
                        setCurrentProject(allProjects[0].id);
                    }
                    renderProjects();
                    renderProjectHeader();
                    sortTodos(sortId);
                    renderNotes();
                    renderNotTodos();
                }
            } else {
                setCurrentProject(projectId);
                if (event.target === editButton) {
                    toggleEditProjectForm(projectId, clickedProjectItem);
                    renderProjectHeader();
                    sortDropdown.value = "1";
                    showDropdown.value = "1";
                    sortId = 1;
                    showId = 1;
                    sortTodos(sortId);
                    renderNotes();
                    renderNotTodos();

                } else if (event.target === deleteButton) {
                    deleteProject(projectId);
                    const allProjects = getProjects();
                    if (allProjects.length) {
                        setCurrentProject(allProjects[0].id);
                    }
                    renderProjects();
                } else {
                    renderProjectHeader();
                    sortDropdown.value = "1";
                    showDropdown.value = "1";
                    sortId = 1;
                    showId = 1;
                    sortTodos(sortId);
                    renderNotes();
                    renderNotTodos();
                }
            }
        }
    };


    const hideAllForms = function (event) {
        if (editProjectFormShown && !projectContainer.contains(event.target)) {
            renderProjects();
            editProjectFormShown = false;
        }
        if (editTodoFormShown && !todosContainer.contains(event.target)) {
            sortTodos(sortId);
            editTodoFormShown = false;
        }
        if (editNoteFormShown && !notesContainer.contains(event.target)) {
            renderNotes();
            editNoteFormShown = false;
        }

        if (addProjectFormShown && event.target !== projectFormContainer && !projectFormContainer.contains(event.target)) {
            projectFormContainer.removeChild(addProjectForm);
            addProjectFormShown = false;
        }
        if (todoFormShown && event.target !== todoHeadAll && !todoHeadAll.contains(event.target)) {
            todoHeadAll.removeChild(addTodoForm);
            todoFormShown = false;
        }
        if (noteFormShown && event.target !== noteHeadAll && !noteHeadAll.contains(event.target)) {
            noteHeadAll.removeChild(addNoteForm);
            noteFormShown = false;
        }
        if (notTodoFormShown && event.target !== notTodoHeadAll && !notTodoHeadAll.contains(event.target)) {
            notTodoHeadAll.removeChild(addNotTodoForm);
            notTodoFormShown = false;
        }
    };

    document.addEventListener("click", hideAllForms);

    const addTodoButton = document.querySelector("button.add-todo-btn");
    addTodoButton.addEventListener("click", toggleAddTodoForm);

    const saveTodoButton = addTodoForm.querySelector("button.todo-submit-btn");
    saveTodoButton.addEventListener("click", saveNewTodo);

    const addNoteButton = document.querySelector("button.add-note-btn");
    addNoteButton.addEventListener("click", toggleAddNoteForm);

    const saveNoteButton = addNoteForm.querySelector("button.note-submit-btn");
    saveNoteButton.addEventListener("click", saveNewNote);

    const addNotTodoButton = document.querySelector("button.add-not-todo-btn");
    addNotTodoButton.addEventListener("click", toggleAddNotTodoForm);

    const saveNotTodoButton = addNotTodoForm.querySelector("button.not-todo-submit-btn");
    saveNotTodoButton.addEventListener("click", saveNewNotTodo);

    todosContainer.addEventListener("click", modifyTodo);
    notesContainer.addEventListener("click", modifyNote);
    notTodosContainer.addEventListener("click", modifyNotTodo);

    const saveEditedTodoButton = editTodoForm.querySelector("button.todo-edit-btn");
    saveEditedTodoButton.addEventListener("click", saveEditedTodo);

    const saveEditedNoteButton = editNoteForm.querySelector("button.note-edit-btn");
    saveEditedNoteButton.addEventListener("click", saveEditedNote);


    const sortDropdown = document.querySelector("select#sort");
    sortDropdown.addEventListener("change", setSortOption);

    const showDropdown = document.querySelector("select#show");
    showDropdown.addEventListener("change", setShowOption);


    projectContainer.addEventListener("click", modifyProject);

    const addProjectButton = document.querySelector("button.add-project-btn");
    addProjectButton.addEventListener("click", toggleAddProjectForm);

    const saveProjectButton = addProjectForm.querySelector("button.project-submit-btn");
    saveProjectButton.addEventListener("click", saveNewProject);

    const saveEditedProjectButton = editProjectForm.querySelector("button.project-edit-btn");
    saveEditedProjectButton.addEventListener("click", saveEditedProject);


    if (getProjects().length === 0) {
        const defaultProject = addProject("Default Project");
        defaultProject.addProjectTag([1, 4]);
        defaultProject.addTodo("Do Something.", "This is a test todo, lets see how this works.", "11-02-26", 3);
        defaultProject.addTodo("Do Something Else.", "This is also a test todo, a very big one at that, I'll just be blabbering in here so you might as well move on to the next one. lets see how this works.", "09-28-25", 2);
        defaultProject.addTodo("Do this blindfolded.", "This is yet another test todo, lets see how this one works as well.", "01-23-26", 1);
        const todoId = defaultProject.todos[2].id;
        defaultProject.toggleTodoCompletion(todoId);
        defaultProject.addNote("Test Note", "Again, test note. Should work fine (hopefully)");
        defaultProject.addNote("Anotha One", "This is another test note and like the second test todo, this is also gonna be a very big one so hang tight and lorem... oops lorem doesn't work here. Javascript, take notes. In Gus Fring's voice: It is unacceptabol.");
        defaultProject.addNote("Things to remember", "Mongolz won a trophy(finally) and there's more to come. Techno4k is the GOAT. Blitz > Baldpex. Genghis Khan strikes again. Most of the camels of Saudi Arabia are imported from Australia.");
        defaultProject.addNotTodo("Please do not do this!");
        defaultProject.addNotTodo("Definitely do not do this dawg.");
        defaultProject.addNotTodo("You're crazy if you do this.");
        setCurrentProject(defaultProject.id);

        const anotherProject = addProject("Another Project");
        anotherProject.addProjectTag([5]);
        anotherProject.addTodo("Another Project Todo", "This is a todo from another project.", "01-22-26", 3);
        anotherProject.addNote("Another Project Note", "This is a note from another project");
        anotherProject.addNotTodo("Don't look here. You've already done this even though you were not supposed to. Shame.")

        saveProjectsToStorage();
    };

    renderProjects();
    renderProjectHeader();
    sortTodos(1);
    renderNotes();
    renderNotTodos();
})();