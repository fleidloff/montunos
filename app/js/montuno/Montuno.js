import Vexflow from "../vexflow/Vexflow";
import Notes from "../vexflow/Notes";
import Props from "../shared/Props";
import Scale from "../vexflow/Scale";
import { markdown } from "markdown";
import noLeadingSpaces from "../shared/noLeadingSpaces";


export default class Montuno extends Props {
    constructor(props) {
        super(props);
        this.props.scale = new Scale(Object.assign({}, this.props.scale || this.scale(), this.props));
    }

    static from(props) {
        props.description = typeof props.description === "string" ? props.description : props.description.join("  \n");
        return new Montuno(props);
    }

    notes() { return []; }
    scale() { return {}; }
    description() { return ""; }

    renderDescription() {
        this.props.element.previousSibling.innerHTML = markdown.toHTML(noLeadingSpaces`${this.props.description || this.description()}`);
    }

    renderMontuno() {
        const notes = new Notes({ scale: this.props.scale });
        notes.pushAll(...(this.props.notes || this.notes()));

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
