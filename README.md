# lambda-middleware-flow
middleware support to lambda functions

# Usage
```js
const LambdaWithMiddlewareSupport = require('lambda-middleware-flow')
const lambda = new LambdaWithMiddlewareSupport()
lambda.use((_event, ctx, cb, next) => {
    // here is the first middleware
    next();
});

lambda.use((_event, ctx, cb, next) => {
    // second middleware
    const response = {}
    const error = null
    next()
});

lambda.use((_event, ctx, cb, next) => {
    // last middleware is here
    cb(error, response)
});
lambda.handler()// return a aws lambda handler
```


# API

## instance method

### handler() -> return a aws lambda handler

### use(middleware,[others]) -> self