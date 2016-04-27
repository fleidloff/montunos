/* global Vex*/
import Beams from "./Beams";

export default class Renderer {
    render({ canvas, width, notes, time, clef }) {
        const beatValue = parseInt(time.split("/")[1], 10);
        const barEveryNTicks = Vex.Flow.RESOLUTION * parseInt(time.split("/")[0], 10) / beatValue;

        const renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);

        const ctx = renderer.getContext();
        const stave = new Vex.Flow.Stave(10, 0, width - 20);
        stave
            .addClef("treble")
            .setContext(ctx)
            .draw();

        const voice = new Vex.Flow.Voice({
            num_beats: notes.ticks() / Vex.Flow.RESOLUTION * beatValue,
            beat_value: beatValue,
            resolution: Vex.Flow.RESOLUTION
        });
        voice.addTickables(notes.getWithBars(barEveryNTicks));

        const beams = new Beams(voice);

        new Vex.Flow.Formatter()
                    .joinVoices([voice])
                    .format([voice], width - 30);

        voice.draw(ctx, stave);

        beams.draw(ctx);

        notes.getTies().forEach(tie => {
            new Vex.Flow.StaveTie({
                first_note: notes.get()[tie.first_note],
                last_note: notes.get()[tie.last_note]
            }).setContext(ctx).draw();
        });
        
    }
}
