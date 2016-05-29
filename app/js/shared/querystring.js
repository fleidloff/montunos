import qs from "querystring";


export function get() {
    return qs.decode(window.location.search.replace("?", ""));
}

export function update(updatedSearch) {
    const search = Object.assign({}, get(), updatedSearch);
    console.log(search);
    window.location.search = "?" + qs.encode(search);
}
