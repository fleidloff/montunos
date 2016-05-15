import Vexflow from "../vexflow/Vexflow";
import Notes from "../vexflow/Notes";
import Props from "../shared/Props";
import Scale from "../vexflow/Scale";

export default class Montuno extends Props {
    constructor(props) {
        super(props);
        this.props.scale = new Scale(Object.assign({}, this.scale(), this.props));
    }

    notes() { return []; }
    scale() { return {}; }

    render() {
        const notes = new Notes({ scale: this.props.scale });
        notes.pushAll(...this.notes());

        new Vexflow()
            .set({ canvas: this.props.element })
            .set({ key: this.props.scale.get("key") })
            .set({ notes })
            .render();
    }
}
