export default class Notes {
    constructor() {
        this.notes = [];
        this.lastDuration = "4";
    }

    get() {
        return this.notes;
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
            new Vex.Flow.StaveNote({ keys: [breakKeys[Vex.Flow.sanitizeDuration(duration)]], duration: `${duration}r` })
        );
    }

    push({ keys, duration = this.lastDuration }) {
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

const breakKeys = {
    "1":    "d/5",
    "2":    "b/4",
    "4":    "b/4",
    "8":    "b/4",
    "16":   "b/4",
    "32":   "b/4",
    "64":   "b/4",
    "128":  "b/4",
    "256":  "b/4"
};
