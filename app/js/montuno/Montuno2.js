import Vexflow from "../vexflow/Vexflow";
import Notes from "../vexflow/Notes";
import Props from "../shared/Props";
import Scale from "../vexflow/Scale";

export default class Montuno extends Props {
    render() {
        const scale = new Scale({ root: "g", scale: "m", octave: 4 });

        const notes = new Notes({ scale }).pushAll(
            { steps: "u", duration: 8 },
            { steps: "b2" },
            { steps: ["2", "4", "b7"], octave: [0, 0, -1] },
            { steps: "b3" },
            { steps: "3" },
            { steps: "4" },
            { steps: "b5" },
            { steps: "5" },
            { steps: "5" },
            { steps: "6" },
            { steps: "b7" },
            { steps: "M7" },
            { steps: "8" },
            { steps: "u", octave: +1, duration: "4." }
        );


        new Vexflow()
            .set({ canvas: this.props.element })
            .set({ key: scale.get("key") })
            .set({ notes })
            .render();
    }
}
