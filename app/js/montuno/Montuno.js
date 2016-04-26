import Vexflow from "../vexflow/Vexflow";
import Notes from "../vexflow/Notes";
import Props from "../shared/Props";

export default class Montuno extends Props {
    render() {
        const notes = new Notes()
            .push({ keys: "c/5", duration: 4 })
            .push({ keys: "d/4", duration: 4 })
            .push({ keys: "r", duration: 4 })
            .push({ keys: ["c/4", "e/4", "g/4"], duration: 4 });

        new Vexflow()
            .set({ canvas: this.props.element })
            .set({ notes })
            .render();
    }
}
