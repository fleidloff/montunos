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
    mode: "M", 
    octave: 4 
};

export default class Scale extends GetterAndSetter {
    constructor(props) {
        super();
        this.set(Object.assign({}, defaultProps, props));
        this.set({ key: this.toKey() });
        this.set({ scaleMap: Music.createScaleMap(this.props.key)});
        this.set({ bAccidentals: bAccidentals(this.props)});
    }

    toKey() {
        const root = this.props.root.charAt(0).toUpperCase() + this.props.root.slice(1);
        return root + this.props.mode.replace("M", "");   
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

    from({ steps, octave=0 }) {
        if (typeof steps.push !== "function") {
            steps = [steps];
        }
        if (typeof octave.push !== "function") {
            octave = [octave];
        }

        const result = steps.map((step, idx) => { 
            const octaveStep = typeof octave[idx] === "undefined" ? octave[0] : octave[idx];
            return {
                note: this.note(step) + this.octave(step, octaveStep),
                interval: Music.getIntervalValue(step),
                octave: octaveStep
            };
        });
        // sort because https://github.com/0xfe/vexflow/issues/104
        result.sort((a, b) => {
            if (a.octave < b.octave) {
                return -1;
            } else if (a.octave > b.octave) {
                return 1;
            } 

            if (a.interval < b.interval) {
                return -1;
            } else {
                return 1;
            }
        });
        return result.map(it => it.note);
    }
}
