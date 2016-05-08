import Scale from "../js/vexflow/Scale2.js";

Scale.registerScale({ name: "blues", notes: ["1", "b3", "4", "b5", "5", "b7"], accidentals: "{root}m" });

export default function(test) {
    test("root, scale and accidentals should be correct", (assert) => {
        const s = new Scale({ scale: "blues", root: "g" })
        
        assert.equal(s.root, "g");
        assert.equal(s.scale, "blues");
        assert.equal(s.accidentals, "Gm");
        assert.same(s.rootValue, { root_index: 4, int_val: 7 });
        assert.end();
    });

    test("notes of blues scale must be correct", (assert) => {
        const s = new Scale({ scale: "blues", root: "g" })
        
        assert.equal(s.root, "g");
        assert.deepEqual(s.notes, ["1", "b3", "4", "b5", "5", "b7"]);
        assert.end();
    });      
}
