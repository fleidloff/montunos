import qs from "querystring";


export function get() {
    return qs.decode(window.location.search.replace("?", ""));
}

export function update(updatedData) {
    const currentQuery = qs.encode(Object.assign({}, get(), updatedData));
    setSearch(currentQuery);
}

export function setSearch(value) {
    history.pushState(null, "", `?${value}`);
}
