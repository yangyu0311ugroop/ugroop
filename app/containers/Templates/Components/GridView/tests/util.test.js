import util from '../util';

describe('util ', () => {
  describe('dispatchTo ', () => {
    let args;
    let funcName;

    beforeEach(() => {
      funcName = 'testFunc';
    });

    it('args exists, config does not exist: throw an error', async () => {
      let except = null;

      try {
        await util.dispatch(null, funcName, args);
      } catch (ex) {
        except = ex;
      }

      expect(except).not.toBe(null);
      expect(except.message).toBe('Missing resaga config');
    });

    it('resaga does not exist, args does not exist, config does not exist: throw an error', async () => {
      let except = null;

      try {
        await util.dispatch(null, funcName);
      } catch (ex) {
        except = ex;
      }

      expect(except).not.toBe(null);
      expect(except.message).toBe('Missing resaga config');
    });

    describe('resaga does not exist, config exists', () => {
      describe('config.requests exists and config.requests[funcName] is defined', () => {
        let config1;
        let config2;
        let config3;
        let config4;
        let args1;
        let hasArgs;
        let noArgs;
        let invokedFuncs;
        let errFunc;

        beforeEach(() => {
          invokedFuncs = {};

          hasArgs = jest.fn();
          noArgs = jest.fn();

          config1 = {
            requests: {
              [funcName]: arg =>
                Promise.resolve(arg).then(a => (a ? hasArgs(a) : noArgs())),
            },
          };

          config2 = {
            requests: {
              [funcName]: arg =>
                Promise.resolve(arg).then(a => {
                  invokedFuncs[funcName] = true;
                  return a || 'No arg';
                }),
            },
          };

          config3 = {
            requests: {
              [funcName]: arg =>
                Promise.resolve(arg).then(a => {
                  invokedFuncs[funcName] = true;
                  throw new Error(a ? 'Has args' : 'No arg');
                }),
            },
          };

          config4 = {
            requests: {
              [funcName]: arg =>
                Promise.resolve(arg).then(a => {
                  invokedFuncs[funcName] = true;
                  return a || 'No arg';
                }),
            },
            processResult: {
              [funcName]: result => ({ processed: true, result }),
            },
          };
        });

        it('function should be able to get invoked, with args', async () => {
          args1 = {
            payload: { id: 2 },
          };

          await util.dispatch(config1, funcName, args1);

          expect(hasArgs).toHaveBeenCalledWith({ id: 2 });
        });

        it('function should be able to get invoked, without args (1)', async () => {
          await util.dispatch(config1, funcName, null);

          expect(noArgs).toHaveBeenCalled();
        });

        it('function should be able to get invoked, without args (2)', async () => {
          await util.dispatch(config1, funcName);

          expect(noArgs).toHaveBeenCalled();
        });

        it('function should be able to get invoked, with args but no payload', async () => {
          await util.dispatch(config1, funcName, {});

          expect(noArgs).toHaveBeenCalled();
        });

        it('with args.payload and args.onSuccess, function gets invoked successfully', async () => {
          args1 = {
            payload: { id: 2 },
            onSuccess: jest.fn(),
          };

          await util.dispatch(config2, funcName, args1);

          expect(invokedFuncs[funcName]).toBe(true);
          expect(args1.onSuccess).toHaveBeenCalledWith({ id: 2 });
        });

        it('with args and args.onSuccess but no args.payload, function gets invoked successfully (1)', async () => {
          args1 = {
            onSuccess: jest.fn(),
          };

          await util.dispatch(config2, funcName, args1);

          expect(invokedFuncs[funcName]).toBe(true);
          expect(args1.onSuccess).toHaveBeenCalledWith('No arg');
        });

        it('with args and args.onSuccess but no args.payload, function gets invoked successfully (2)', async () => {
          args1 = {
            payload: null,
            onSuccess: jest.fn(),
          };

          await util.dispatch(config2, funcName, args1);

          expect(invokedFuncs[funcName]).toBe(true);
          expect(args1.onSuccess).toHaveBeenCalledWith('No arg');
        });

        it('with args.payload, no args.onSuccess, function gets invoked successfully', async () => {
          args1 = {
            payload: { id: 2 },
          };

          await util.dispatch(config2, funcName, args1);

          expect(invokedFuncs[funcName]).toBe(true);
        });

        it('with no args.payload and no args.onSuccess, function gets invoked successfully', async () => {
          args1 = {};

          await util.dispatch(config2, funcName, args1);

          expect(invokedFuncs[funcName]).toBe(true);
        });

        it('with no args.payload and no args.onSuccess, function gets invoked successfully', async () => {
          await util.dispatch(config2, funcName);

          expect(invokedFuncs[funcName]).toBe(true);
        });

        it('with args.payload and args.onError, function gets invoked with error', async () => {
          errFunc = jest.fn();

          args1 = {
            payload: { id: 2 },
            onError: er => errFunc(er.message),
          };

          await util.dispatch(config3, funcName, args1);

          expect(invokedFuncs[funcName]).toBe(true);
          expect(errFunc).toHaveBeenCalledWith('Has args');
        });

        it('with args.payload but no args.onError, function gets invoked with error (1)', async () => {
          errFunc = jest.fn();

          args1 = {
            payload: { id: 2 },
          };

          await util.dispatch(config3, funcName, args1);

          expect(invokedFuncs[funcName]).toBe(true);
          expect(errFunc).not.toHaveBeenCalled();
        });

        it('with args.payload but no args.onError, function gets invoked with error (2)', async () => {
          errFunc = jest.fn();

          await util.dispatch(config3, funcName);

          expect(invokedFuncs[funcName]).toBe(true);
          expect(errFunc).not.toHaveBeenCalled();
        });

        it('with config.processResult, args.payload and args.onSuccess, and function gets invoked successfully', async () => {
          args1 = {
            payload: { id: 2 },
            onSuccess: jest.fn(),
          };

          await util.dispatch(config4, funcName, args1);

          expect(invokedFuncs[funcName]).toBe(true);
          expect(args1.onSuccess).toHaveBeenCalledWith({
            processed: true,
            result: { id: 2 },
          });
        });

        it('with config.processResult, no args.payload but with args.onSuccess, and function gets invoked successfully (1)', async () => {
          args1 = {
            onSuccess: jest.fn(),
          };

          await util.dispatch(config4, funcName, args1);

          expect(invokedFuncs[funcName]).toBe(true);
          expect(args1.onSuccess).toHaveBeenCalledWith({
            processed: true,
            result: 'No arg',
          });
        });

        it('with config.processResult, no args.payload but with args.onSuccess, and function gets invoked successfully (2)', async () => {
          args1 = {
            payload: null,
            onSuccess: jest.fn(),
          };

          await util.dispatch(config4, funcName, args1);

          expect(invokedFuncs[funcName]).toBe(true);
          expect(args1.onSuccess).toHaveBeenCalledWith({
            processed: true,
            result: 'No arg',
          });
        });

        it('with config.processResult but no args , and function gets invoked successfully', async () => {
          await util.dispatch(config4, funcName);

          expect(invokedFuncs[funcName]).toBe(true);
        });
      });

      describe('function is not defined in config', () => {
        let arg2;
        let invokedFuncs;
        let config1;
        let config2;
        let undefinedFuncName;
        let errFunc;

        beforeEach(() => {
          undefinedFuncName = 'undefinedFunc';
          invokedFuncs = {};

          config1 = {};

          config2 = {
            requests: {
              [funcName]: arg =>
                Promise.resolve(arg).then(a => {
                  invokedFuncs[funcName] = true;
                  return a || 'No arg';
                }),
            },
          };
        });

        it('config.request is defined but function is not defined, arg.onError is defined', async () => {
          errFunc = jest.fn();

          arg2 = {
            payload: 'xyz',
            onError: err => errFunc(err.message),
          };

          await util.dispatch(config2, undefinedFuncName, arg2);

          expect(errFunc).toHaveBeenCalledWith(
            'Undefined function in config: undefinedFunc',
          );
        });

        it('config.request is defined but function is not defined, arg.onError is not defined (1)', async () => {
          errFunc = jest.fn();

          arg2 = {
            payload: 'xyz',
          };

          await util.dispatch(config2, undefinedFuncName, arg2);

          expect(errFunc).not.toHaveBeenCalled();
        });

        it('config.request is defined but function is not defined, arg.onError is not defined (2)', async () => {
          errFunc = jest.fn();

          await util.dispatch(config2, undefinedFuncName);

          expect(errFunc).not.toHaveBeenCalled();
        });

        it('config.request is not defined, arg.onError is defined', async () => {
          errFunc = jest.fn();

          arg2 = {
            payload: 'xyz',
            onError: err => errFunc(err.message),
          };

          await util.dispatch(config1, undefinedFuncName, arg2);

          expect(errFunc).toHaveBeenCalledWith(
            'Undefined function in config: undefinedFunc',
          );
        });
      });
    });
  });
});
