import Scale from "../js/vexflow/Scale.js";

export default function(test) {
    test("root and key should be correct", (assert) => {
        const s = new Scale({ root: "g", scale: "M" });
        
        assert.equal(s.get("root"), "g");
        assert.equal(s.get("key"), "G");
        assert.end();
    });

    test("notes must be correct for flat keys (b accidentals)", (assert) => {
        const s = new Scale({ root: "g", scale: "m" });
        
        assert.equal(s.canonicalNote("b3"), "bb");
        assert.end();
    });    

    test("notes must be correct for sharp keys (# accidentals)", (assert) => {
        const s = new Scale({ root: "g", scale: "M" });
        
        assert.equal(s.canonicalNote("b5"), "c#");
        assert.end();
    }); 

    test("notes must be correct for 2 scales at the same time", (assert) => {
        const gm = new Scale({ root: "g", scale: "m" });
        const g = new Scale({ root: "g", scale: "M" });
        
        assert.equal(g.canonicalNote("b5"), "c#");
        assert.equal(gm.canonicalNote("b3"), "bb");
        assert.end();
    }); 

    test("notes must be correct existing accidentals", (assert) => {
        const s = new Scale({ root: "g", scale: "M" });
        
        assert.equal(s.note("M7"), "f");
        assert.equal(s.note("m7"), "fn");
        assert.equal(s.note("m7"), "f");
        assert.end();
    });  

    test("notes must be correct existing accidentals with bs", (assert) => {
        const s = new Scale({ root: "g", scale: "m" });
        
        assert.equal(s.note("b3"), "b");
        assert.equal(s.note("M3"), "bn");
        assert.equal(s.note("b3"), "bb");
        assert.end();
    });     
}
