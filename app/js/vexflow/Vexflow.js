import GetterAndSetter from "../shared/GetterAndSetter";
import Renderer from "./Renderer";

const defaults = {
    clef: "treble",
    time: "4/4",
    width: 500
};

export default class Vexflow extends GetterAndSetter {
    constructor(props) {
        super();
        this.set(Object.assign({}, defaults, props));
    }

    render() {
        // todo: validate if all params are present!
        this.set({ width: this.props.canvas.getAttribute("width") });
        new Renderer().render(Object.assign({}, this.props, { notes: this.props.notes }));  
    }
}
