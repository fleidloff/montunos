import Vexflow from "../vexflow/Vexflow";
import Notes from "../vexflow/Notes";
import Props from "../shared/Props";
import Scale from "../vexflow/Scale";
import { markdown } from "markdown";
import noLeadingSpaces from "../shared/noLeadingSpaces";


export default class Montuno extends Props {
    constructor(props) {
        super(props);
        this.props.scale = new Scale(Object.assign({}, this.scale(), this.props));
    }

    notes() { return []; }
    scale() { return {}; }
    description() { return ""; }

    renderDescription() {
        this.props.element.previousSibling.innerHTML = markdown.toHTML(noLeadingSpaces`${this.description()}`);
    }

    renderMontuno() {
        const notes = new Notes({ scale: this.props.scale });
        notes.pushAll(...this.notes());

        new Vexflow()
            .set({ canvas: this.props.element })
            .set({ key: this.props.scale.get("key") })
            .set({ notes })
            .render();   
    }

    render() {
        this.renderDescription();
        this.renderMontuno();
    }
}
