module.exports = (_ctx, _cb, isParamFromParser) => {
    if (typeof _cb !== 'function') throw new Error(
        isParamFromParser ? 'The parser need to return the callback' :
            'callback is required'
    );

    if (!_ctx) throw new Error(
        isParamFromParser ? 'The parser need to return the callback' :
            'context is required'
    );
};
