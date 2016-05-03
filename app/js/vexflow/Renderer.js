/* global Vex*/
import Voice from "./Voice";

export default class Renderer {
    render({ canvas, width, notes, time, clef, key }) {
        const beatValue = parseInt(time.split("/")[1], 10);
        const barEveryNTicks = Vex.Flow.RESOLUTION * parseInt(time.split("/")[0], 10) / beatValue;

        const renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);

        const ctx = renderer.getContext();
        const stave = new Vex.Flow.Stave(10, 20, width);
        stave
            .addClef(clef)
            .setEndBarType(Vex.Flow.Barline.type.END)
            .setTimeSignature(time)
            .setKeySignature(key)
            .setText(key || "", Vex.Flow.Modifier.Position.ABOVE, {
                shift_x: Math.floor(stave.getNoteStartX()),
                shift_y: -10,
                justification: Vex.Flow.TextNote.Justification.LEFT
            })
            .setWidth(width - 20)
            .setContext(ctx)
            .draw();

        new Voice({ notes, beatValue, barEveryNTicks }).draw({ ctx, stave });
    }
}
