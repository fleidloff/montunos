import Montuno from "./montuno/patterns/1_montuno";
import * as qs from "./shared/querystring";
import { isValidNoteName } from "./shared/validator";

document.addEventListener("DOMContentLoaded", () => {
    new Montuno(addSearchOptions({ element: document.getElementById("canvas") })).render();
});

function addSearchOptions(props) {
    const { root } = qs.get();
    if (isValidNoteName(root)) {
        return Object.assign({}, props, {
            root
        });    
    }

    console.log(`"${root}" is not a valid root note.`);
    return props;
}