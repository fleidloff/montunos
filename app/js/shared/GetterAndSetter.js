export default class GetterAndSetter {
    set(props) {
        this.props = Object.assign({}, this.props, props);
        return this;
    }

    get(key) {
        return this.props[key];
    }
}