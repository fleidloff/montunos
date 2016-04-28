import Vexflow from "../vexflow/Vexflow";
import Notes from "../vexflow/Notes";
import Props from "../shared/Props";

export default class Montuno extends Props {
    render() {
        const notes = new Notes()
            .push({ keys: "g/5", duration: 4, articulation: "^" })
            .push({ keys: "d/4", duration: 8 })
                .push({ tie: 1 })
            .push({ keys: "g/4" })
            .push({ keys: "f#/4" })
                .push({ tie: 1 })
                .push({ keys: "d/5", articulation: ">" })
            .push({ keys: "r"})
            .push({ keys: "d/4"})
            .push({ keys: "r"})
            .push({ keys: "fn/4"})
            .push({ keys: "r"})
            .push({ keys: "d/4"})
            .push({ keys: "r"})
            .push({ keys: "e/4", articulation: "." })
                .push({ keys: "f/4", articulation: "."})
                .push({ keys: "f#/4.", articulation: "."});


        new Vexflow()
            .set({ canvas: this.props.element })
            .set({ key: "g-" })
            .set({ notes })
            .render();
    }
}
