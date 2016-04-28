import Beams from "./Beams";

export default class Voice {
    constructor({ notes, beatValue, barEveryNTicks }) {
        this.voice = new Vex.Flow.Voice({
            num_beats: notes.ticks() / Vex.Flow.RESOLUTION * beatValue,
            beat_value: beatValue,
            resolution: Vex.Flow.RESOLUTION
        });
        this.voice.addTickables(notes.getWithBars(barEveryNTicks));

        this.beams = new Beams(this.voice);
        this.notes = notes;
    }

    get() {
        return this.voice;
    }

    draw({ ctx, stave }) {
        new Vex.Flow.Formatter()
            .joinVoices([this.voice])
            .format([this.voice], stave.getWidth() - Math.floor(stave.getNoteStartX()) + 10);

        this.voice.draw(ctx, stave);
        this.beams.draw(ctx);
        this.notes.drawTies({ ctx });
    }
}