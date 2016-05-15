import Vex from "vexflow";

export function isValidNoteName(note) {
    return Object.keys(Vex.Flow.Music.noteValues).indexOf(note) > -1;
}
