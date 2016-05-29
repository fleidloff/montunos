import Montuno from "./montuno/Montuno";
import * as qs from "./shared/querystring";
import { isValidNoteName } from "./shared/validator";
import { montunos } from "./montunos";

document.addEventListener("DOMContentLoaded", () => {

    let { montuno = `${montunos[0].file}` } = qs.get();
    montuno = `montunos/${montuno}`;
    fetch(montuno)
        .then(data => data.json())
        .then(json => Montuno.from(addSearchOptions(Object.assign({ element: document.getElementById("canvas") }, json))).render())
        .catch(err => console.error("something went wrong", err));
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
