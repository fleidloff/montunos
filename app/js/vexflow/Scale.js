import Vex from "vexflow";

const m = new Vex.Flow.Music();

export default class Scale {
    constructor({ root="c", scale="M" }) {
        this.root = root;
        this.key = root.toUpperCase() + scale.replace("M", "");
    }

    getKey() {
        return this.key;
    }

    note(interval="unison") {
        const intervalValue = m.getIntervalValue(interval);
        const rootValue = m.getNoteValue(this.root);
        const value = (rootValue + intervalValue) % Vex.Flow.Music.NUM_TONES;
        const canonicalNoteName = m.getCanonicalNoteName(value);
        const noteName = m.getRelativeNoteName(canonicalNoteName, value);

        return noteName; 
    }
}
