module.exports = function (opts) {
    const env = {};
    Object.keys(process.env).forEach(key => {
        if (
            key === 'NODE_ENV' ||
            key === 'VEA_ENV' ||
            key === 'HMR' ||
            key === 'SOCKET_SERVER'
        ) {
            env[key] = process.env[key];
        }
    });

    for (const key in env) {
        env[key] = JSON.stringify(env[key]);
    }

    const define = {};
    if (opts.defined) {
        for (const key in opts.defined) {
            define[key] = JSON.stringify(opts.defined[key]);
        }
    }
    return {
        'process.env': env,
        ...define,
    };
}
