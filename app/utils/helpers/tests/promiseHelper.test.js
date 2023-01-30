/**
 * Created by quando on 4/4/17.
 */
import { makePromise, makeCancelable } from '../promiseHelper';

const mockRes = { res: 'Good' };
const mockErr = { error: 'Some error.' };

function mockAction(success, callback) {
  if (success) {
    callback(null, mockRes);
  } else {
    callback(mockErr);
  }
}

describe('Smoke Tests', () => {
  it('should exists', () => {
    expect(makePromise);
  });
});

describe('makeCancelable() with resolved', () => {
  let myPromise;
  beforeEach(() => {
    myPromise = new Promise(resolve => {
      resolve(1);
    });
  });
  it('should get the result', () => {
    const cancelablePromise = makeCancelable(myPromise);
    cancelablePromise.promise
      .then(res => {
        expect(res).toEqual(1);
      })
      .catch(() => {});
  });
  it('promise shall be canceled', () => {
    const cancelablePromise = makeCancelable(myPromise);
    cancelablePromise.promise.then().catch(({ isCanceled }) => {
      expect(isCanceled).toEqual(true);
    });
    cancelablePromise.cancel();
  });
});

describe('makeCancelable() with reject', () => {
  let myPromise;
  beforeEach(() => {
    myPromise = new Promise((resolve, reject) => {
      reject(new Error('error'));
    });
  });
  it('should get the error', () => {
    const cancelablePromise = makeCancelable(myPromise);
    cancelablePromise.promise.then().catch(error => {
      expect(error).toEqual('error');
    });
  });
  it('promise shall be canceled', () => {
    const cancelablePromise = makeCancelable(myPromise);
    cancelablePromise.promise.then().catch(({ isCanceled }) => {
      expect(isCanceled).toEqual(true);
    });
    cancelablePromise.cancel();
  });
});

describe('makePromise()', () => {
  it('should not resolve', () => {
    const promise = makePromise(mockAction, true);
    promise
      .then(res => {
        expect(res).toEqual(mockRes);
      })
      .catch(() => {});
  });
  it('should not reject', () => {
    const promise = makePromise(mockAction, false);
    promise.then().catch(err => {
      expect(err).toEqual(mockErr);
    });
  });
});
