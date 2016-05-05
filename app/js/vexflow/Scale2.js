export default class Scale {
    constructor({ root="c", scale="major" }) {
        this.scale = Scale.scales[scale];
        this.root = root;
    }
    
    static registerScale({ name, notes }) {
        this.scales[name] = { notes };
    }
}

Scale.scales = {};
Scale.music = Music(); //new Vex.Flow.Music();

function Music() {
    const Music = {};

    Music.intervals = {
        "u":  0, "unison": 0,
        "m2": 1, "b2": 1, "min2": 1, "S": 1, "H": 1,
        "2": 2, "M2": 2, "maj2": 2, "T": 2, "W": 2,
        "m3": 3, "b3": 3, "min3": 3,
        "M3": 4, "3": 4, "maj3": 4,
        "4":  5, "p4":  5,
        "#4": 6, "b5": 6, "aug4": 6, "dim5": 6,
        "5":  7, "p5":  7,
        "#5": 8, "b6": 8, "aug5": 8,
        "6":  9, "M6":  9, "maj6": 9,
        "b7": 10, "m7": 10, "min7": 10, "dom7": 10,
        "M7": 11, "maj7": 11,
        "8": 12, "octave": 12
    };

    Music.noteValues = {
        "c":   { root_index: 0, int_val: 0 },
        "cn":  { root_index: 0, int_val: 0 },
        "c#":  { root_index: 0, int_val: 1 },
        "c##": { root_index: 0, int_val: 2 },
        "cb":  { root_index: 0, int_val: 11 },
        "cbb": { root_index: 0, int_val: 10 },
        "d":   { root_index: 1, int_val: 2 },
        "dn":  { root_index: 1, int_val: 2 },
        "d#":  { root_index: 1, int_val: 3 },
        "d##": { root_index: 1, int_val: 4 },
        "db":  { root_index: 1, int_val: 1 },
        "dbb": { root_index: 1, int_val: 0 },
        "e":   { root_index: 2, int_val: 4 },
        "en":  { root_index: 2, int_val: 4 },
        "e#":  { root_index: 2, int_val: 5 },
        "e##": { root_index: 2, int_val: 6 },
        "eb":  { root_index: 2, int_val: 3 },
        "ebb": { root_index: 2, int_val: 2 },
        "f":   { root_index: 3, int_val: 5 },
        "fn":  { root_index: 3, int_val: 5 },
        "f#":  { root_index: 3, int_val: 6 },
        "f##": { root_index: 3, int_val: 7 },
        "fb":  { root_index: 3, int_val: 4 },
        "fbb": { root_index: 3, int_val: 3 },
        "g":   { root_index: 4, int_val: 7 },
        "gn":  { root_index: 4, int_val: 7 },
        "g#":  { root_index: 4, int_val: 8 },
        "g##": { root_index: 4, int_val: 9 },
        "gb":  { root_index: 4, int_val: 6 },
        "gbb": { root_index: 4, int_val: 5 },
        "a":   { root_index: 5, int_val: 9 },
        "an":  { root_index: 5, int_val: 9 },
        "a#":  { root_index: 5, int_val: 10 },
        "a##": { root_index: 5, int_val: 11 },
        "ab":  { root_index: 5, int_val: 8 },
        "abb": { root_index: 5, int_val: 7 },
        "b":   { root_index: 6, int_val: 11 },
        "bn":  { root_index: 6, int_val: 11 },
        "b#":  { root_index: 6, int_val: 0 },
        "b##": { root_index: 6, int_val: 1 },
        "bb":  { root_index: 6, int_val: 10 },
        "bbb": { root_index: 6, int_val: 9 }
    };
    
    return Music;
}
