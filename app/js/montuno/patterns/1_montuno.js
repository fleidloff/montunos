import Montuno from "../Montuno";

export default class extends Montuno {
    scale() {
        return {
            scale: "M",
            root: "e"
        }    
    }
    
    notes() {
        return [
            { s: "5", d: 4 },
            { s: ["M7", "2"], o: [0, 1], d: 8 },
            { s: "4", t: 1 },
            { s: "4" },
            { s: ["6", "octave"] },
            { s: "u" },
            { s: "u", t: 1 },
            { s: "u" },
            { s: "M3" },
            { s: "5" },
            { s: "u" },
            { s: "2", d: 4 },
            { s: ["4", "6"], d: 8 },
            { s: ["2"] }
        ];
    }
}
