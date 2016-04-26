export default class Notes {
    constructor() {
        this.notes = [];
        this.ties = [];
        this.lastDuration = "4";
    }

    get() {
        return this.notes;
    }

    getTies() {
        return this.ties;
    }

    getWithBars(barEveryNTicks) {
        const result = [];
        let walkingTicks = 0;
        this.notes.forEach(note => {
            walkingTicks += note.intrinsicTicks;
            result.push(note);
            if (walkingTicks === barEveryNTicks) {
                result.push(
                    new Vex.Flow.BarNote([])
                );
                walkingTicks = 0;
            }
        });
        
        return result;
    }
    
    ticks() {
        return this.notes.map(note => note.intrinsicTicks).reduce((pv, cv) => pv + cv, 0);
    }

    pushNote({ keys, duration }) {
        let keysArr = typeof keys.push === "function" ? keys : [keys];
        const note = new Vex.Flow.StaveNote({ keys: keysArr, duration: duration, "auto_stem": true });
        keysArr.forEach((key, idx) => {
            if (duration.indexOf("d") > 0) {
                note.addDotToAll();
            }

            switch(true) {
                case key.indexOf("##") > 0:
                    note.addAccidental(idx, new Vex.Flow.Accidental("##"));
                    break;
                case key.indexOf("#") > 0:
                    note.addAccidental(idx, new Vex.Flow.Accidental("#"));
                    break;
                case key.indexOf("bb") > 0:
                    note.addAccidental(idx, new Vex.Flow.Accidental("bb"));
                    break;
                case key.indexOf("b") > 0:
                    note.addAccidental(idx, new Vex.Flow.Accidental("b"));
                    break;
            }
        });
        this.notes.push(note);
    }

    pushBreak({ duration }) {
        this.notes.push(
            new Vex.Flow.StaveNote({ keys: [breakKey(Vex.Flow.sanitizeDuration(duration))], duration: `${duration}r` })
        );
    }

    pushTie(tie) {
        this.ties.push({
            first_note: this.notes.length - 1,
            last_note: this.notes.length - 1 + tie
        });
        
    }

    push({ keys, duration = this.lastDuration, tie }) {
        if (typeof tie !== "undefined") {
            this.pushTie(tie);
            return this;
        }
        duration = "" + duration;
        duration = duration.replace(".", "d");
        this.lastDuration = duration;

        if (keys === "r") {
            this.pushBreak({ duration });
        } else {
            this.pushNote({ keys, duration });
        }

        return this;
    }
}

function breakKey(duration) {
    switch(duration) {
        case "1": return "d/5";
        default: return "b/4";
    }
}
