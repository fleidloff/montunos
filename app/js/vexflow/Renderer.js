/* global Vex*/

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
            beat_value: 4,
            resolution: Vex.Flow.RESOLUTION
        });
        voice.addTickables(notes.getWithBars(barEveryNTicks));

        const formatter = new Vex.Flow.Formatter()
            .joinVoices([voice])
            .format([voice], width - 30);

        //Vex.Flow.Formatter.FormatAndDraw(ctx, stave, notes);

        voice.draw(ctx, stave);

        //var beam = new Vex.Flow.Beam([notes.get()[1], notes.get()[2]]);
        //beam.setContext(ctx).draw();

        notes.getTies().forEach(tie => {
            new Vex.Flow.StaveTie({
                first_note: notes.get()[tie.first_note],
                last_note: notes.get()[tie.last_note]
            }).setContext(ctx).draw();
        });
        
    }
}
