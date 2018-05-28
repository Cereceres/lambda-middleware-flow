const someTimes = require('only-some-times');

const validateParamsFromAws = require('./lib/validate-params-from-aws');

module.exports = class Lambda {
    constructor() {
        this.flow = [];
        this.index = 0;
    }

    use(...cbs) {
        this.flow.push(...cbs);
        return this;
    }

    next(err) {
        if (this.cb.cbIsCalled) return;

        if (err) return this.cb(err);

        if (this.index === this.flow.length) return this.cb(err);

        const cb = this.flow[this.index];
        this.index++;
        const next = someTimes(this.next.bind(this)).bind(this);
        const res = cb(this.event, this.ctx, this.cb, next);
        const waitForPromiseReturned = res instanceof Promise &&
            !next.cbIsCalled &&
            !this.cb.cbIsCalled;

        if (waitForPromiseReturned) return res
            .then(() => this.next())
            .catch(this.next);
    }

    handler(parserParamsFromAws) {
        return (_event, _ctx, _cb) => {
            validateParamsFromAws(_ctx, _cb);
            let event = _event;
            let ctx = _ctx;
            let cb = _cb;

            if (typeof parserParamsFromAws === 'function') ({
                event = _event,
                ctx = _ctx,
                cb = _cb
            } = parserParamsFromAws(_event, _ctx, _cb));

            validateParamsFromAws(ctx, cb, true);
            this.event = event;
            this.ctx = ctx;
            this.cb = someTimes(cb.bind(this));
            this.index = 0;
            return this.next();
        };
    }
};
