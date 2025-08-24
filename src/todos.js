import { format } from "date-fns";

import Note from "./notes.js";

export default class Todo extends Note {
    constructor(title, desc, dueDate, priority) {
        super(title, desc);
        this.dueDate = format(new Date(dueDate), "yyyy-MM-dd");
        this.priority = priority;
        this.completionStatus = false;
        this.dateCreated = format(Date.now(), "yyyy-MM-dd");
    }

    changeDueDate(dueDate) {
        this.dueDate = format(new Date(dueDate), "yyyy-MM-dd");
    }

    changePriority(priority) {
        this.priority = priority;
    }

    toggleCompletionStatus() {
        this.completionStatus = !this.completionStatus;
    }
}