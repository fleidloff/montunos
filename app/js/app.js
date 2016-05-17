import Montuno from "./montuno/Montuno";
import * as qs from "./shared/querystring";
import { isValidNoteName } from "./shared/validator";

document.addEventListener("DOMContentLoaded", () => {
    const { montuno = "/montunos/1_montuno.json" } = qs.get();
    fetch(montuno)
        .then(data => data.json())
        .then(json => Montuno.from(addSearchOptions(Object.assign({ element: document.getElementById("canvas") }, json))).render())
        .catch(err => console.error("something went wrong"));
});

function addSearchOptions(props) {
    const { root } = qs.get();
    if (isValidNoteName(root)) {
        return Object.assign({}, props, {
            root
        });    
    }

    console.log(`"${root}" is not a valid root note. Using default...`);
    return props;
}
