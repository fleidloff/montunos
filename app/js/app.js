import Montuno from "./montuno/Montuno";
import * as qs from "./shared/querystring";
import { isValidNoteName } from "./shared/validator";
import { montunos } from "./montunos";

document.addEventListener("DOMContentLoaded", () => {
    addMontunosTo(montunos)(document.getElementById("montunos-listbox"));
    addEventListeners();

    renderMontuno();
});

function renderMontuno() {
    const canvas = document.getElementById("canvas");

    clearCanvas(canvas);
    
    let { montuno = `${montunos[0].file}`, root } = qs.get();
    montuno = `montunos/${montuno}`;

    fetch(montuno)
        .then(data => data.json())
        .then(json => Montuno.from(addSearchOptions(Object.assign({ element: canvas }, json), root)).render())
        .catch(err => console.error("something went wrong", err));    
}

function clearCanvas(canvas) {
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);
    var w = canvas.width;
    canvas.width = 1;
    canvas.width = w;
}

function addSearchOptions(props, root) {
    if (isValidNoteName(root)) {
        return Object.assign({}, props, {
            root
        });    
    }

    console.log(`"${root}" is not a valid root note. Using default...`);
    return props;
}

function addMontunosTo(montunos) {
    return element => {
        element.innerHTML = montunos.map(montuno => `
            <paper-item value="${montuno.file}">${montuno.name}</paper-item>
        `).join("");
    }
}

function addEventListeners() {
    document.getElementById("key-listbox").addEventListener("iron-select", ev => {
        const root = ev.target.selectedItem.innerHTML.trim().toLowerCase();
        qs.update({ root });
        renderMontuno();
    });

    document.getElementById("montunos-listbox").addEventListener("iron-select", ev => {
        const montuno = ev.target.selectedItem.getAttribute("value");
        qs.update({ montuno });
        renderMontuno();
    });
}
