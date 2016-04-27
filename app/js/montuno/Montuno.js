import Vexflow from "../vexflow/Vexflow";
import Notes from "../vexflow/Notes";
import Props from "../shared/Props";
import Note from "../vexflow/Note";

export default class Montuno extends Props {
    render() {
        const notes = new Notes()
            .push({ keys: "g/4", duration: 4 })
            .push({ keys: "d/4", duration: 8 })
            .push({ keys: "g/4" })
            .push({ keys: "f#/4" })
                .push({ tie: 1 })
                .push({ keys: "g/4" })
            .push({ keys: "r"})
            .push({ keys: "d/4"})
            .push({ keys: "r"})
            .push({ keys: "fn/4"})
            .push({ keys: "r"})
            .push({ keys: "d/4"})
            .push({ keys: "r"})
            .push({ keys: "e/4"})
                .push({ tie: 2 })
                .push({ keys: "f/4"})
                .push({ keys: "f#/4"});


        new Vexflow()
            .set({ canvas: this.props.element })
            .set({ notes })
            .render();
    }
}
