import Scale from "../js/vexflow/Scale.js";

export default function(test) {
    test("rootand key should be correct", (assert) => {
        const s = new Scale({ root: "g", scale: "M" })
        
        assert.equal(s.root, "g");
        assert.equal(s.getKey(), "G");
        assert.end();
    });

    test("notes must be correct for flat keys (b accidentals)", (assert) => {
        const s = new Scale({ root: "g", scale: "m" })
        
        assert.equal(s.note("b3"), "bb");
        assert.end();
    });    

    test("notes must be correct for sharp keys (# accidentals)", (assert) => {
        const s = new Scale({ root: "g", scale: "M" })
        
        assert.equal(s.note("b5"), "c#");
        assert.end();
    });    
}
