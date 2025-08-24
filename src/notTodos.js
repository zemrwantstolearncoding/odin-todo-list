export default class NotTodo {
    constructor(text) {
        this.id = crypto.randomUUID();
        this.text = text;
    }

    changeText(text) {
        this.text = text;
    }
}