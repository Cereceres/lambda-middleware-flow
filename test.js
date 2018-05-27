const assert = require('assert');

const AwsTest = require('aws-lambda-testing');

const Lambda = require('./index');


describe('test to lambda middleware', () => {
    it('should exec every middleware with user command', async() => {
        const event = {};
        let numMiddlewares = 0;
        const handler = new Lambda();
        handler.use((_event, ctx, cb, next) => {
            assert.deepEqual(event, _event);
            assert(ctx);
            assert(cb);
            numMiddlewares++;
            next();
        });

        handler.use((_event, ctx, cb, next) => {
            assert.deepEqual(event, _event);
            assert(ctx);
            assert(cb);
            numMiddlewares++;
            next();
        });

        handler.use((_event, ctx, cb, next) => {
            assert.deepEqual(event, _event);
            assert(ctx);
            assert(cb);
            numMiddlewares++;
            next();
        });
        await new AwsTest().setHandler(handler.handler())
            .exec(event);
        assert(numMiddlewares === 3);
    });

    it('should exec every middleware with parser', async() => {
        const event = {};
        let numMiddlewares = 0;
        const handler = new Lambda();
        handler.use((_event, ctx, cb, next) => {
            assert.deepEqual(event, _event);
            assert(ctx);
            assert(cb);
            numMiddlewares++;
            next();
        });

        handler.use((_event, ctx, cb, next) => {
            assert.deepEqual(event, _event);
            assert(ctx);
            assert(cb);
            numMiddlewares++;
            next();
        });

        handler.use((_event, ctx, cb, next) => {
            assert.deepEqual(event, _event);
            assert(ctx);
            assert(cb);
            numMiddlewares++;
            next();
        });
        await new AwsTest().setHandler(handler.handler((event, ctx, cb) => ({ event, ctx, cb })))
            .exec(event);
        assert(numMiddlewares === 3);
    });

    it('should exec every middleware if next is not called', async() => {
        const event = {};
        let numMiddlewares = 0;
        const handler = new Lambda();
        handler.use((_event, ctx, cb, next) => {
            assert.deepEqual(event, _event);
            assert(ctx);
            assert(cb);
            numMiddlewares++;
            next();
        });

        handler.use((_event, ctx, cb, next) => {
            assert.deepEqual(event, _event);
            assert(ctx);
            assert(cb);
            numMiddlewares++;
            cb();
            next();
        });

        handler.use((_event, ctx, cb, next) => {
            assert.deepEqual(event, _event);
            assert(ctx);
            assert(cb);
            numMiddlewares++;
            next();
        });
        await new AwsTest().setHandler(handler.handler())
            .exec(event);
        assert(numMiddlewares === 2);
    });

    it('should exec every middleware and catch the error passed to next', async() => {
        const event = {};
        let numMiddlewares = 0;
        const handler = new Lambda();
        handler.use((_event, ctx, cb, next) => {
            assert.deepEqual(event, _event);
            assert(ctx);
            assert(cb);
            numMiddlewares++;
            next();
        });

        handler.use((_event, ctx, cb, next) => {
            assert.deepEqual(event, _event);
            assert(ctx);
            assert(cb);
            numMiddlewares++;
            next();
        });

        handler.use((_event, ctx, cb, next) => {
            assert.deepEqual(event, _event);
            assert(ctx);
            assert(cb);
            numMiddlewares++;
            next(new Error('error'));
        });
        const error = await new AwsTest().setHandler(handler.handler())
            .exec(event).catch((error) => error);
        assert(error.message = 'error');
    });
});
