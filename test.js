const assert = require('assert');

const AwsTest = require('aws-lambda-testing');

const Lambda = require('./index');


describe('test to lambda middleware', () => {
    it('should exec every middleware', async() => {
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
});
