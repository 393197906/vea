
module.exports =  function(opts) {
  const env = {};
  Object.keys(process.env).forEach(key => {
    if (
      key === 'NODE_ENV' ||
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
  if (opts.define) {
    for (const key in opts.define) {
      define[key] = JSON.stringify(opts.define[key]);
    }
  }

  return {
    'process.env': env,
    ...define,
  };
}
