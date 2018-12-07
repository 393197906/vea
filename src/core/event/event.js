const EventEmitter = require("events").EventEmitter
const assert = require("assert");
const events = [
    "beforeDevServer",
    "afterDevServer",
    "onStart",
    "onDevCompileDone",
    "onBuildSuccess",
    "onBuildFail",
];
module.exports = class event extends EventEmitter {
    constructor(args) {
        super(args);
        this.events = events.reduce((container, item) => {
            return {...container, [item]: item}
        }, {})
    }

    on(name, fn) {
        assert(events.includes(name), `非法的evenet 可用event集合为 ${events.join(",")}`)
        super.on(name, fn)
    }
};

