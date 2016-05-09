import Vex from "vexflow";

const canonical_notes = [
    "c", "c#", "d", "d#",
    "e", "f", "f#", "g",
    "g#", "a", "a#", "b"
];

const b_canonical_notes = [
    "c", "db", "d", "eb",
    "e", "f", "gb", "g",
    "ab", "a", "bb", "b"
];

const Music = new Vex.Flow.Music();

function bAccidentals(key) {
    const scaleMap = Music.createScaleMap(key);
    return Object.keys(scaleMap)
        .map(key => scaleMap[key][1])
        .filter(accidental => accidental === "b")
        .length > 0;
}

export default class Scale {
    constructor({ root="c", scale="M" }) {
        this.root = root;
        this.key = root.toUpperCase() + scale.replace("M", "");
        this.bAccidentals = bAccidentals(this.key);
    }

    getKey() {
        return this.key;
    }

    note(interval="unison") {
        const intervalValue = Music.getIntervalValue(interval);
        const rootValue = Music.getNoteValue(this.root);
        const value = (rootValue + intervalValue) % Vex.Flow.Music.NUM_TONES;
        const canonicalNoteName = this.bAccidentals ? b_canonical_notes[value] : canonical_notes[value];

        return canonicalNoteName; 
    }
}
