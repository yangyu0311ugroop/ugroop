/**
 * Created by quando on 30/3/17.
 */

/**
 * this function return a Promise, which takes an action and the params for it
 * @param action
 * @param params
 * @returns {Promise}
 */
export function makePromise(action, ...params) {
  return new Promise((resolve, reject) => {
    action(...params, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

export const makeCancelable = promise => {
  let hasCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      // eslint-disable-next-line prefer-promise-reject-errors
      val => (hasCanceled ? reject({ isCanceled: true }) : resolve(val)),
      // eslint-disable-next-line prefer-promise-reject-errors
      error => (hasCanceled ? reject({ isCanceled: true }) : reject(error)),
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true;
    },
  };
};
