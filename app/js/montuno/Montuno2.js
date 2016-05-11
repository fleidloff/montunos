import Vexflow from "../vexflow/Vexflow";
import Notes from "../vexflow/Notes";
import Props from "../shared/Props";
import Scale from "../vexflow/Scale";

export default class Montuno extends Props {
    render() {
        const scale = new Scale({ root: "g", scale: "m", octave: 4 });

        const notes = new Notes().pushAll(
            { keys: scale.note("u") + scale.octave("u"), duration: 8 },
            { keys: scale.note("b2") + scale.octave("b2") },
            { keys: scale.note("2") + scale.octave("2") },
            { keys: scale.note("b3") + scale.octave("b3") },
            { keys: scale.note("3") + scale.octave("3") },
            { keys: scale.note("4") + scale.octave("4") },
            { keys: scale.note("b5") + scale.octave("b5") },
            { keys: scale.note("5") + scale.octave("5") },
            { keys: scale.note("#5") + scale.octave("#5") },
            { keys: scale.note("6") + scale.octave("6") },
            { keys: scale.note("b7") + scale.octave("b7") },
            { keys: scale.note("M7") + scale.octave("M7") },
            { keys: scale.note("8") + scale.octave("8") },
            { keys: scale.note("u") + scale.octave("u", 1), duration: "4." }
        );


        new Vexflow()
            .set({ canvas: this.props.element })
            .set({ key: scale.get("key") })
            .set({ notes })
            .render();
    }
}
