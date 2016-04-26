/* global Vex*/

export default class Renderer {
    render({ canvas, width, notes, time, clef }) {
        const beatValue = parseInt(time.split("/")[1], 10);
        const barEveryNTicks = Vex.Flow.RESOLUTION * parseInt(time.split("/")[0], 10) / beatValue;

        var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);

        var ctx = renderer.getContext();
        var stave = new Vex.Flow.Stave(10, 0, width - 20);
        stave.addClef("treble").setContext(ctx).draw();
        

        // Create a voice in 4/4
        var voice = new Vex.Flow.Voice({
            num_beats: notes.ticks() / Vex.Flow.RESOLUTION * beatValue,
            beat_value: 4,
            resolution: Vex.Flow.RESOLUTION
        });
        // Add notes to voice
        voice.addTickables(notes.getWithBars(barEveryNTicks));

        // Format and justify the notes to 500 pixels
        var formatter = new Vex.Flow.Formatter().
        joinVoices([voice]).format([voice], width - 30);

        Vex.Flow.Formatter.FormatAndDraw(ctx, stave, notes);

        // Render voice
        voice.draw(ctx, stave);
    }
}
