import qs from "querystring";

export function get() {
    return qs.decode(window.location.search.replace("?", ""));
}
