export default class Note {
    constructor({ keys, duration }) {
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
                case key.indexOf("n") > 0:
                    note.addAccidental(idx, new Vex.Flow.Accidental("n"));
                    break;
            }
        });
        this.note = note;
    }

    get() {
        return this.note;
    }
}
