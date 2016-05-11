import Vexflow from "../vexflow/Vexflow";
import Notes from "../vexflow/Notes";
import Props from "../shared/Props";
import Scale from "../vexflow/Scale";

export default class Montuno extends Props {
    constructor(props) {
        super(props);
        this.scale = new Scale(props);
    }

    notes() { return []; }

    render() {
        const notes = new Notes({ scale: this.scale });
        notes.pushAll(...this.notes());

        new Vexflow()
            .set({ canvas: this.props.element })
            .set({ key: this.scale.get("key") })
            .set({ notes })
            .render();
    }
}
