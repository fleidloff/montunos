import Note from "./Note";
import Rest from "./Rest";
import Ties from "./Ties";

export default class Notes {
    constructor() {
        this.notes = [];
        this.ties = new Ties();
        this.lastDuration = "4";
    }

    get() {
        return this.notes.map(note => note.get());
    }

    getTies() {
        return this.ties.get();
    }

    drawTies({ ctx }) {
        this.getTies().forEach(tie => {
            new Vex.Flow.StaveTie({
                first_note: this.get()[tie.first_note],
                last_note: this.get()[tie.last_note]
            }).setContext(ctx).draw();
        });
    }

    getWithBars(barEveryNTicks) {
        const result = [];
        let walkingTicks = 0;
        this.notes
            .map(note => note.get())
            .forEach(note => {
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
        return this.notes.map(note => note.get().intrinsicTicks).reduce((pv, cv) => pv + cv, 0);
    }
    
    pushAll(...notes) {
        notes.forEach(note => this.push(note));
        return this;
    }
    
    push({ keys, duration = this.lastDuration, tie, articulation }) {
        duration = ("" + duration).replace(".", "d");
        this.lastDuration = duration;

        if (keys === "r") {
            this.notes.push(new Rest({ duration }));
        } else {
            this.notes.push(new Note({ keys, duration, articulation }));
        }
        if (typeof tie !== "undefined") {
            this.ties.push({ tieLength: tie, notesLength: this.notes.length });
        }

        return this;
    }
}
