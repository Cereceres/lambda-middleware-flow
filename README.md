# lambda-middleware-flow
middleware support to lambda functions

# Usage
```js
const LambdaWithMiddlewareSupport = require('lambda-middleware-flow')
const lambda = new LambdaWithMiddlewareSupport()
lambda.use((_event, ctx, cb, next) => {
    assert.deepEqual(event, _event);
    assert(ctx);
    assert(cb);
    next();
});

lambda.use((_event, ctx, cb, next) => {
    assert.deepEqual(event, _event);
    assert(ctx);
    assert(cb);
    next();
});

lambda.use((_event, ctx, cb, next) => {
    assert.deepEqual(event, _event);
    assert(ctx);
    assert(cb);
    next(); // if next is called with argument is interpreted like an error
});
lambda.handler()// return a aws lambda handler
```


# API

## instance method

### handler() -> return a aws lambda handler

### use(middleware,[others]) -> self