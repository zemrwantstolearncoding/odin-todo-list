export default class Note {
    constructor(title, desc) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.desc = desc;
    }

    changeTitle(title) {
        this.title = title;
    }

    changeDesc(desc) {
        this.desc = desc;
    }
}