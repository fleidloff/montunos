export default class Note {
    constructor({ keys, duration, articulation }) {
        const keysArr = typeof keys.push === "function" ? keys : [keys];
        const note = new Vex.Flow.StaveNote({ keys: keysArr, duration, "auto_stem": true });
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
        
        this.addArticulation({ articulation, note });
        this.note = note;
    }

    addArticulation({ articulation, position, note }) {
        if (typeof articulation === "undefined") {
            return;
        }

        position = this.getPosition({ direction: articulation[1], note });

        if (articulation.length === 2) {
            articulation = articulation[0];
        } 
        note.addArticulation(0, new Vex.Flow.Articulation(`a${articulation}`).setPosition(position));
    }

    getPosition({ direction, note }) {
        switch(direction) {
            case "^": 
                return Vex.Flow.Modifier.Position.ABOVE;
            case "_":
                return Vex.Flow.Modifier.Position.BELOW;
            default: 
                return note.stem_direction === -1 ? Vex.Flow.Modifier.Position.ABOVE : Vex.Flow.Modifier.Position.BELOW;
        }
    }

    get() {
        return this.note;
    }
}
