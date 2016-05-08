export default function renderResults({ fail, success }) {
    const result = document.getElementById("result");
    result.innerHTML = `
        <div>success: ${success}</div>
        <div>fail: ${fail}</div>
    `;
    if (fail > 0) {
        document.body.style = "background: red;";
    } else {
        document.body.style = "background: green;"
    }
}
