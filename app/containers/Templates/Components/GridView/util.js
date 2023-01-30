const dispatch = async (config, funcName, args = {}) => {
  if (config) {
    if (config.requests && config.requests[funcName]) {
      try {
        let result;
        result = await config.requests[funcName](
          args && args.payload ? args.payload : null,
        );

        if (config.processResult && config.processResult[funcName]) {
          result = config.processResult[funcName](result);
        }

        if (args && args.onSuccess) {
          args.onSuccess(result);
        }
      } catch (err) {
        if (args && args.onError) {
          args.onError(err);
        }
      }
    } else if (args && args.onError) {
      // eslint-disable-line no-lonely-if
      args.onError(new Error(`Undefined function in config: ${funcName}`));
    }
  } else {
    throw new Error('Missing resaga config');
  }
};

export default { dispatch };
