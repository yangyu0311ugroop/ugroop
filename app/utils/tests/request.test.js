/**
 * Test the request function
 */
import { horizontalSide } from 'utils/helpers/request';
import request, {
  fetchWithAuthorisation,
  fetchWithAuthorisationUpload,
  checkStatusCode,
  checkStatus,
  errorHandler,
  sessionErrorHandler,
} from '../request';
import { responseErrorType as ret } from '../constant';

jest.mock('lib/awsLib', () => ({
  Auth: {
    currentSession: jest
      .fn()
      .mockReturnValue(Promise.resolve({ idToken: { jwtToken: 'avcs' } })),
  },
  getTokenIfNotExpired: jest.fn(() => null),
}));
describe('Utility Request', () => {
  describe('fetchWithAuthorisation', () => {
    beforeEach(() => {
      window.fetch = jest.fn();
      const res = new Response('{"hello":"world"}', {
        status: 200,
        headers: {
          'Content-type': 'application/json',
        },
      });
      window.fetch.mockReturnValue(Promise.resolve(res));
    });

    it('should format the response correctly', done => {
      fetchWithAuthorisation('get', 'http://www.ugroop.com')
        .catch(done)
        .then(json => {
          expect(json.hello).toBe('world');
          done();
        });
    });
  });

  describe('fetchWithAuthorisation - invalid response type', () => {
    beforeEach(() => {
      window.fetch = jest.fn();
      const res = new Response('hi ho ho', {
        status: 400,
      });
      window.fetch.mockReturnValue(Promise.resolve(res));
    });

    it('should not format the response', () => {
      fetchWithAuthorisation('get', '/thisurliscorrect').catch(expect);
    });
  });

  describe('fetchWithAuthorisationUpload - invalid response type', () => {
    beforeEach(() => {
      window.fetch = jest.fn();
      const res = new Response('hi ho ho', {
        status: 400,
      });
      window.fetch.mockReturnValue(Promise.resolve(res));
    });

    it('should not format the response', () => {
      fetchWithAuthorisationUpload('get', '/thisurliscorrect').catch(expect);
    });
  });

  describe('request', () => {
    // Before each test, stub the fetch function
    beforeEach(() => {
      window.fetch = jest.fn();
    });

    describe('stubbing successful response', () => {
      // Before each test, pretend we got a successful response
      beforeEach(() => {
        const res = new Response('{"hello":"world"}', {
          status: 200,
          headers: {
            'Content-type': 'application/json',
          },
        });

        window.fetch.mockReturnValue(Promise.resolve(res));
      });

      it('should format the response correctly', done => {
        request('/thisurliscorrect')
          .catch(done)
          .then(json => {
            expect(json.hello).toBe('world');
            done();
          });
      });
    });

    describe('stubbing 204 response', () => {
      // Before each test, pretend we got a successful response
      beforeEach(() => {
        const res = new Response('', {
          status: 204,
          statusText: 'No Content',
        });

        window.fetch.mockReturnValue(Promise.resolve(res));
      });

      it('should return null on 204 response', done => {
        request('/thisurliscorrect')
          .catch(done)
          .then(json => {
            expect(json).toBeNull();
            done();
          });
      });
    });

    describe('stubbing error response', () => {
      // Before each test, pretend we got an unsuccessful response
      beforeEach(() => {
        const res = new Response('', {
          status: 404,
          statusText: 'Not Found',
          headers: {
            'Content-type': 'application/json',
          },
        });

        window.fetch.mockReturnValue(Promise.resolve(res));
      });

      it('should catch errors', done => {
        request('/thisdoesntexist').catch(err => {
          expect(err.response.status).toBe(404);
          expect(err.response.statusText).toBe('Not Found');
          done();
        });
      });
    });
  });

  describe('checkStatusCode', () => {
    const obj = { status: 400, message: 'some error' };
    const obj2 = { error: { statusCode: 401, message: 'some error' } };
    const obj3 = {};

    it('Should return 400 with Obj', () => {
      const error = new Error();
      error.response = obj;
      const code = checkStatusCode(error);
      expect(code).toBe(400);
    });
    it('Should return 401 with Obj', () => {
      const error = new Error();
      error.response = obj2;
      const code = checkStatusCode(error);
      expect(code).toBe(401);
    });
    it('Should return undefined with Obj', () => {
      const error = new Error();
      error.response = obj3;
      const code = checkStatusCode(obj3);
      expect(code).toBeUndefined();
    });
  });

  describe('Check Status', () => {
    let testResponse;
    let errThrown;
    let body;

    it('shall throw internal error with error with correct response', () => {
      const error = new Error('internal error');
      const response = {
        status: 200,
      };
      try {
        checkStatus(error)(response);
      } catch (err) {
        expect(err.response).toMatchSnapshot();
      }
    });
    it('shall throw internal error with error with correct response', () => {
      const error = new Error('internal error');
      const myResponse = {
        status: 401,
        json: () => error,
      };
      try {
        checkStatus(error)(myResponse);
      } catch (err) {
        expect(err.response).toMatchSnapshot();
      }
    });
    it('should return JSON error info if response has JSON content', async () => {
      body = { statusCode: 404, statusText: 'Resource not found' };

      testResponse = {
        status: 404,
        headers: { get: () => 'application/json; charset="utf-8"' },
        json: () => Promise.resolve(body),
      };

      errThrown = null;

      try {
        await checkStatus()(testResponse);
      } catch (err) {
        errThrown = err;
      }

      expect(errThrown).not.toBe(null);
      expect(errThrown.status).toBe(404);
      expect(errThrown.code).toBe(ret.JSON_ERROR);
      expect(errThrown.response).toBe(body);
    });
    it('should return HTML error info if response has HTML content (1)', async () => {
      body =
        '<html><head><title>Resource not found</title></head><body>Unable to find the requested resource.</body></html>';

      testResponse = {
        status: 404,
        headers: { get: () => 'text/html; charset="utf-8"' },
        text: () => Promise.resolve(body),
      };

      errThrown = null;

      try {
        await checkStatus()(testResponse);
      } catch (err) {
        errThrown = err;
      }

      expect(errThrown).not.toBe(null);
      expect(errThrown.status).toBe(404);
      expect(errThrown.code).toBe(ret.HTML_ERROR);
      expect(errThrown.response).toEqual({
        content: body,
        title: 'Resource not found',
      });
    });
    it('should return HTML error info if response has HTML content (2)', async () => {
      body = '<html><body>Unable to find the requested resource.</body></html>';

      testResponse = {
        status: 404,
        headers: { get: () => 'text/html; charset="utf-8"' },
        text: () => Promise.resolve(body),
      };

      errThrown = null;

      try {
        await checkStatus()(testResponse);
      } catch (err) {
        errThrown = err;
      }

      expect(errThrown).not.toBe(null);
      expect(errThrown.status).toBe(404);
      expect(errThrown.code).toBe(ret.HTML_ERROR);
      expect(errThrown.response).toEqual({ content: body, title: '' });
    });
    it('should return text error info if response has text content', async () => {
      body = 'Unable to find the requested resource.';

      testResponse = {
        status: 404,
        headers: { get: () => 'text/plain; charset="utf-8"' },
        text: () => Promise.resolve(body),
      };

      errThrown = null;

      try {
        await checkStatus()(testResponse);
      } catch (err) {
        errThrown = err;
      }

      expect(errThrown).not.toBe(null);
      expect(errThrown.status).toBe(404);
      expect(errThrown.code).toBe(ret.TEXT_ERROR);
      expect(errThrown.response).toEqual({ text: body });
    });
    it('should return the raw response if response content is neither json nor html nor text', async () => {
      testResponse = {
        status: 404,
        headers: { get: () => 'application/pdf' },
        content: 'Some PDF message',
      };

      errThrown = null;

      try {
        await checkStatus()(testResponse);
      } catch (err) {
        errThrown = err;
      }

      expect(errThrown).not.toBe(null);
      expect(errThrown.status).toBe(404);
      expect(errThrown.code).toBe(ret.RAW_ERROR);
      expect(errThrown.response).toEqual(testResponse);
    });
  });

  describe('errorHandler', () => {
    // Before each test, stub the fetch function
    beforeEach(() => {
      const res = new Response('{"hello":"world"}', {
        status: 200,
        headers: {
          'Content-type': 'application/json',
        },
      });
      window.fetch = jest.fn(() => Promise.resolve(res));
    });
    it('errorHandler with error 401', () => {
      const error = { response: { status: 400 } };
      try {
        errorHandler(error);
      } catch (err) {
        expect(err.response).toEqual({ status: 400 });
      }
    });
    it('errorHandler with no 401 shall throw original error', () => {
      const error = { response: { status: 400 } };
      try {
        errorHandler('/abc', {})(error);
      } catch (e) {
        expect(e).toBe('/abc');
      }
    });
  });

  describe('sessionErrorHandler', () => {
    it('should throw error 400 with error refresh token error if error returned is "No current user"', () => {
      const testFunc = () => sessionErrorHandler('No current user');
      expect(testFunc).toThrowErrorMatchingSnapshot();
    });
    it('should throw error 400 with error refresh token error if error returned is "Cannot retrieve a new session. Please authenticate."', () => {
      const testFunc = () =>
        sessionErrorHandler({
          message: 'Cannot retrieve a new session. Please authenticate.',
        });
      expect(testFunc).toThrowErrorMatchingSnapshot();
    });
    it('should throw error 400 with error refresh token error if error returned is "Refresh Token has expired"', () => {
      const testFunc = () =>
        sessionErrorHandler({ message: 'Refresh Token has expired' });
      expect(testFunc).toThrowErrorMatchingSnapshot();
    });
    it('should throw whatever the fetch throws if it does not return "No current user" error', () => {
      const mockErr = new Error('Something');
      mockErr.statusCode = 401;
      const testFunc = () => sessionErrorHandler(mockErr);
      expect(testFunc).toThrow('Something');
    });
  });

  describe('horizontalSide ', () => {
    it('should return height if rotate angle is 90 or 270', () => {
      expect(horizontalSide(90)).toBe('height');
      expect(horizontalSide(270)).toBe('height');
    });
    it('should return width if rotate angle is 0 or 180', () => {
      expect(horizontalSide(0)).toBe('width');
      expect(horizontalSide(180)).toBe('width');
    });
  });
});
