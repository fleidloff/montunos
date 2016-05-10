import Vexflow from "../vexflow/Vexflow";
import Notes from "../vexflow/Notes";
import Props from "../shared/Props";
import Scale from "../vexflow/Scale";

export default class Montuno extends Props {
    render() {
        const scale = new Scale({ root: "g", scale: "m", octave: 4 });

        const notes = new Notes().pushAll(
            { keys: scale.note("u") + scale.getOctave("u"), duration: 8 },
            { keys: scale.note("b2") + scale.getOctave("b2") },
            { keys: scale.note("2") + scale.getOctave("2") },
            { keys: scale.note("b3") + scale.getOctave("b3") },
            { keys: scale.note("3") + scale.getOctave("3") },
            { keys: scale.note("4") + scale.getOctave("4") },
            { keys: scale.note("b5") + scale.getOctave("b5") },
            { keys: scale.note("5") + scale.getOctave("5") },
            { keys: scale.note("#5") + scale.getOctave("#5") },
            { keys: scale.note("6") + scale.getOctave("6") },
            { keys: scale.note("b7") + scale.getOctave("b7") },
            { keys: scale.note("M7") + scale.getOctave("M7") },
            { keys: scale.note("8") + scale.getOctave("8") },
            { keys: scale.note("u") + scale.getOctave("u", 1), duration: "4." }
        );


        new Vexflow()
            .set({ canvas: this.props.element })
            .set({ key: scale.getKey() })
            .set({ notes })
            .render();
    }
}
