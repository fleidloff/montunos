import Vex from "vexflow";
import GetterAndSetter from "../shared/GetterAndSetter";

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

function bAccidentals({ key, scaleMap }) {
    return Object.keys(scaleMap)
        .map(key => scaleMap[key][1])
        .filter(accidental => accidental === "b")
        .length > 0;
}

const defaultProps = { 
    root: "c", 
    scale: "M", 
    octave: 4 
};

export default class Scale extends GetterAndSetter {
    constructor(props) {
        super();
        this.set(Object.assign({}, defaultProps, props));
        this.set({ key: this.props.root.toUpperCase() + this.props.scale.replace("M", "")});
        this.set({ scaleMap: Music.createScaleMap(this.props.key)});
        this.set({ bAccidentals: bAccidentals(this.props)});
    }

    canonicalNote(interval="unison") {
        const intervalValue = Music.getIntervalValue(interval);
        const rootValue = Music.getNoteValue(this.props.root);
        const value = (rootValue + intervalValue) % Vex.Flow.Music.NUM_TONES;
        const canonicalNoteName = this.props.bAccidentals ? b_canonical_notes[value] : canonical_notes[value];
        return canonicalNoteName; 
    }

    note(interval="unison") {
        let canonicalNote = this.canonicalNote(interval);
        if (canonicalNote.length === 1) {
            canonicalNote += "n";
        }
        if (this.props.scaleMap[canonicalNote[0]] === canonicalNote) {
            return canonicalNote[0];
        } else {
            this.props.scaleMap[canonicalNote[0]] = canonicalNote;
            return canonicalNote;
        }
    }

    octave(interval="unison", octaveModifier=0) {
        const intervalValue = Music.getIntervalValue(interval);
        const rootValue = Music.getNoteValue(this.props.root);
        
        return "/" + (this.props.octave + Math.floor((rootValue + intervalValue) / Vex.Flow.Music.NUM_TONES) + octaveModifier);    
    }
}
