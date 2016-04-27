export default class Ties {
    constructor() {
        this.ties = [];
    }

    push({ tieLength, notesLength }) {
        this.ties.push({
            first_note: notesLength - 1,
            last_note: notesLength - 1 + tieLength
        });
    }

    get() {
        return this.ties;
    }    
}
