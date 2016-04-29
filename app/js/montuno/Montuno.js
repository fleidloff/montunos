import Vexflow from "../vexflow/Vexflow";
import Notes from "../vexflow/Notes";
import Props from "../shared/Props";
import Scale from "../vexflow/Scale";

export default class Montuno extends Props {
    render() {
        const scale = new Scale({ key: "Gm" });
        console.log(scale.get(), scale.note("1/4"), scale.note("5/4"));

        const notes = new Notes()
            .push({ keys: "g/4", duration: 4, articulation: "^^" })
            .push({ keys: "d/4", duration: 8, tie: 1 })
            .push({ keys: "g/4" })
            .push({ keys: "f#/4", tie: 1 })
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
            .set({ key: scale.getKey() })
            .set({ notes })
            .render();
    }
}
