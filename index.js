module.exports = class Lambda {
    constructor() {
        this.flow = [];
    }

    use(...cbs) {
        this.flow.push(...cbs);
    }

    next(err) {
        console.log('error in next ', err);
        console.log('this.flow ', this.flow);
        if (err) return this.cb(err);

        if (!this.flow.length) return this.cb();

        const cb = this.flow.shift();
        return cb(this.event, this.ctx, this.cb, this.next.bind(this));
    }

    handler() {
        return (event, ctx, cb) => {
            this.event = event;
            this.ctx = ctx;
            this.cb = cb;
            return this.next();
        };
    }
};
