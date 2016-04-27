export default class Rest {
    constructor({ duration }) {
        this.rest = new Vex.Flow.StaveNote({ keys: [restKey(Vex.Flow.sanitizeDuration(duration))], duration: `${duration}r` });
    }

    get() {
        return this.rest;
    }
}

function restKey(duration) {
    switch(duration) {
        case "1": return "d/5";
        default: return "b/4";
    }
}
