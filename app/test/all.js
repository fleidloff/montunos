window.__dirname = window.__dirname || "";
// https://github.com/substack/tape
import test from "tape";
import path from "path"

const results = {
    fail: 0,
    success: 0
};

let current;
test.createStream({ objectMode: true }).on('data', function (row) {
    if (row.type === "end" || row.type === "test") {
        current = row;
        return;
    }
    if (row.ok) {
        results.success = results.success + 1;
    } else {
        results.fail = results.fail + 1;
        console.log(`TEST FAILED: ${current.name}; REASON: ${row.name}, expected: ${row.expected}, actual: ${row.actual}`)
    }
});

test.onFinish((res) => console.log("all tests finished", results));

import run from "./scale.js";
run(test);
