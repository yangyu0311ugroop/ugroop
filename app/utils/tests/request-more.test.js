import {
  fetchUpload,
  fetchImage,
  fetchWithURL,
  errorHandler,
  postJSONRequest,
  appendToken,
} from '../request';

jest.mock('lib/awsLib', () => ({
  Auth: {
    currentSession: jest
      .fn()
      .mockReturnValue(Promise.resolve({ idToken: { jwtToken: 'avcs' } })),
  },
  getTokenIfNotExpired: jest.fn(() => null),
}));
describe('More tests for request ', () => {
  let oldBaseUrl;
  let oldFetch;
  let ret;
  let res;
  let blob;

  beforeEach(() => {
    oldBaseUrl = process.env.ACCOUNT_BASE_URL;
    process.env.ACCOUNT_BASE_URL = 'http://localhost:8080/api';

    oldFetch = window.fetch;
    window.fetch = jest.fn();
  });

  afterEach(() => {
    process.env.ACCOUNT_BASE_URL = oldBaseUrl;
    window.fetch = oldFetch;
  });

  describe.skip('fetchUpload ', () => {
    let container;
    let data;

    it('should be called properly', async () => {
      container = 'test-container';
      data = { id: 1 };

      res = new Response('{"hello":"world"}', {
        status: 200,
        headers: {
          'Content-type': 'application/json',
        },
      });
      window.fetch.mockReturnValue(Promise.resolve(res));

      ret = await fetchUpload(container, data);
      const url = appendToken(
        'http://localhost:8080/api/FileContainers/test-container/upload',
        'avcs',
      );
      expect(window.fetch).toHaveBeenCalledWith(url, {
        body: { id: 1 },
        credentials: 'include',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        method: 'POST',
      });

      expect(ret).toEqual({ hello: 'world' });
    });
  });

  describe('fetchImage', () => {
    let oldCoordinateBase = null;
    beforeEach(() => {
      oldCoordinateBase = process.env.COORDINATE_BASE_URL;
      process.env.COORDINATE_BASE_URL = 'http://localhost:3011';
    });

    afterEach(() => {
      // eslint-disable-next-line no-undef
      process.env.COORDINATE_BASE_URL = oldCoordinateBase;
    });
    it('should be called properly', async () => {
      blob = new Blob([], { type: 'text/plain' });

      res = new Response(blob, {
        status: 200,
        headers: {
          ImageWidth: 300,
          ImageHeight: 400,
        },
      });

      window.fetch.mockReturnValue(Promise.resolve(res));

      ret = await fetchImage('GET', '/my/image.jpg');
      ret.blob = await ret.blob;

      expect(window.fetch).toHaveBeenCalledWith(
        'http://localhost:3011/my/image.jpg',
        {
          headers: {
            Accept:
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Access-Control-Allow-Origin': '*',
          },
          method: 'GET',
        },
      );

      expect(ret).toMatchObject({
        blob: {},
        size: { height: '400', width: '300' },
      });
    });
  });

  describe('fetchWithURL ', () => {
    it('should be called properly', async () => {
      res = new Response('{"hello":"world"}', {
        status: 200,
        headers: {
          'Content-type': 'application/json',
        },
      });
      window.fetch.mockReturnValue(Promise.resolve(res));

      ret = await fetchWithURL('GET', '/nodes', '');

      expect(window.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/nodes',
        {
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
          method: 'GET',
        },
      );

      expect(ret).toEqual({ hello: 'world' });
    });
  });

  describe('errorHandler ', () => {
    it('should return original error', () => {
      const err = new Error('s');
      try {
        errorHandler(err);
      } catch (e) {
        expect(e).toEqual(err);
      }
    });
  });

  describe('postJSONRequest', () => {
    it('should be called properly, if post body exists', async () => {
      res = new Response('{"hello":"world"}', {
        status: 200,
        headers: {
          'Content-type': 'application/json',
        },
      });
      window.fetch.mockReturnValue(Promise.resolve(res));

      ret = await postJSONRequest('/api/node', {
        body: 'yes',
        credentials: '123abc',
      });

      expect(window.fetch).toHaveBeenCalledWith('/api/node', {
        0: '1',
        1: '2',
        2: '3',
        3: 'a',
        4: 'b',
        5: 'c',
        body: '"yes"',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      expect(ret).toEqual({ hello: 'world' });
    });

    it('should be called properly, even if post body DOES NOT exist', async () => {
      res = new Response('{"hello":"world"}', {
        status: 200,
        headers: {
          'Content-type': 'application/json',
        },
      });
      window.fetch.mockReturnValue(Promise.resolve(res));

      ret = await postJSONRequest('/api/node');

      expect(window.fetch).toHaveBeenCalledWith('/api/node', {
        body: undefined,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      expect(ret).toEqual({ hello: 'world' });
    });
  });
});
