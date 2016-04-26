export default class Notes {
    constructor() {
        this.notes = [];
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
        this.notes.push(
            new Vex.Flow.StaveNote({ keys: typeof keys.push === "function" ? keys : [keys], duration: ""+duration, "auto_stem": true })
        );
    }

    pushBreak({ duration }) {
        this.notes.push(
            new Vex.Flow.StaveNote({ keys: [breakKeys[Vex.Flow.sanitizeDuration(duration)]], duration: `${duration}r` })
        );
    }

    push({ keys, duration}) {
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
