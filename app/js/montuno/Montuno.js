import Vexflow from "../vexflow/Vexflow";
import Notes from "../vexflow/Notes";
import Props from "../shared/Props";
import Scale from "../vexflow/Scale";
import { markdown } from "markdown";
import noLeadingSpaces from "../shared/noLeadingSpaces";

const defaults = {
    notes: [],
    scale: {},
    description: ""
};

export default class Montuno extends Props {
    constructor(props) {
        super(Object.assign({}, props, defaults));
        this.props.scale = new Scale(Object.assign({}, this.scale(), this.props));
    }
    
    // todo: implement from method that return new Montuno from a regular object
    from(obj) {
        
    }

    notes() { return this.props.notes; }
    scale() { return this.props.scale; }
    description() { return this.props.description; }

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
