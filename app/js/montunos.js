import { all } from "../montunos/base";
const base = withPrefix("base")(all);

function withPrefix(prefix) {
    return (arr) => arr.map(it => {
        it.file = prefix + "/" + it.file;
        return it;
    });
}

export const montunos = [...base];
