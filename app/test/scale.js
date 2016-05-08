import Scale from "../js/vexflow/Scale2.js";

Scale.registerScale({ name: "blues", notes: ["1", "b3", "4", "b5", "5", "b7"] });

export default function(test) {
    test("simple example test", (assert) => {
        const s = new Scale({ scale: "blues", root: "g" })
        
        assert.equal(s.root, "q");
        assert.equal(typeof s.scale, "object");
        assert.end();
    });   
}
