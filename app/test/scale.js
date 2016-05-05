import expect from "expect";
//import Scale from "../js/vexflow/Scale2.js";


Scale.registerScale({ name: "blues", notes: ["1", "b3", "4", "b5", "5", "b7"] });

console.log(new Scale({ scale: "blues", root: "g" }));
const s = new Scale({ scale: "blues", root: "g" });
//expect(s.root).to.eql("g");
//expect(s.scale).to.be.an("object");
