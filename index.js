const validateParamsFromAws = require('./lib/validate-params-from-aws');

module.exports = class Lambda {
    constructor() {
        this.flow = [];
    }

    use(...cbs) {
        this.flow.push(...cbs);
        return this;
    }

    next(err) {
        if (this.called) return;

        if (err) return this.cb(err);

        if (!this.flow.length) return this.cb(err);

        let called = false;
        const cb = this.flow.shift();
        const res = cb(this.event, this.ctx, this.cb.bind(this), (error) => {
            called = true;
            this.next(error);
        });

        if (res instanceof Promise && !called && !this.called) return res
            .then(() => this.next())
            .catch(this.next);
    }

    handler(parserParamsFromAws) {
        return (_event, _ctx, _cb) => {
            validateParamsFromAws(_ctx, _cb);
            let event = _event, ctx = _ctx, cb = _cb;

            if (typeof parserParamsFromAws === 'function') ({
                event = _event,
                ctx = _ctx,
                cb = _cb
            } = parserParamsFromAws(_event, _ctx, _cb));

            validateParamsFromAws(ctx, cb, true);

            this.event = event;
            this.ctx = ctx;
            this.called = false;
            this.cb = (err, res) => {
                if (!this.called) cb(err, res);
                this.called = true;
            };
            return this.next();
        };
    }
};
