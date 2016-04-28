import Montuno from "./montuno/Montuno";

document.addEventListener("DOMContentLoaded", () => {
    new Montuno({ element: document.getElementById("canvas") }).render();
});
