import Montuno from "./montuno/Montuno";
import Montuno2 from "./montuno/Montuno2";

document.addEventListener("DOMContentLoaded", () => {
    new Montuno({ element: document.getElementById("canvas") }).render();
    new Montuno2({ element: document.getElementById("canvas2") }).render();
});
