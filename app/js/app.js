import Montuno from "./montuno/patterns/1_montuno";

document.addEventListener("DOMContentLoaded", () => {
    new Montuno({ element: document.getElementById("canvas") }).render();
});
