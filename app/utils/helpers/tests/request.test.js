/**
 * Test the request function
 */

import {
  getHeaders,
  getBody,
  analyse,
  getHeadersUpload,
  getBodyUpload,
  analyseUpload,
  hasScheme,
  padFacadeURL,
  postMetaInfo,
  queryImageURL,
  trimContainerScheme,
  horizontalSide,
} from 'utils/helpers/request';

describe('request.js', () => {
  afterAll(() => {
    process.env.COORDINATE_BASE_URL = '';
  });

  describe('analyse', () => {
    it('should exist', () => {
      expect(analyse);
    });
    it('should return analysed data', () => {
      const mockVerb = 'post';
      const mockBody = { hi: 'ho' };
      const mockUrl = '/nodes';
      const header = analyse(mockVerb, mockUrl, mockBody);
      expect(header.fullURL);
      expect(header.options);
    });
    it('should return analysed data', () => {
      const mockVerb = 'get';
      const mockUrl = '/nodes';
      const header = analyse(mockVerb, mockUrl);
      expect(header.fullURL);
      expect(header.options);
    });
  });

  describe('analyseUpload', () => {
    it('should exist', () => {
      expect(analyseUpload);
    });
    it('should return analysed data', () => {
      const mockVerb = 'post';
      const mockBody = { hi: 'ho' };
      const mockUrl = '/nodes';
      const header = analyseUpload(mockVerb, mockUrl, mockBody);
      expect(header.fullURL);
      expect(header.options);
    });
    it('should return analysed data', () => {
      const mockVerb = 'get';
      const mockUrl = '/nodes';
      const header = analyseUpload(mockVerb, mockUrl);
      expect(header.fullURL);
      expect(header.options);
    });
  });

  describe('getHeaders', () => {
    it('should exist', () => {
      expect(getHeaders);
    });
    it('should return headers', () => {
      const mockVerb = 'get';
      const header = getHeaders(mockVerb);
      expect(header.method).toEqual(mockVerb.toUpperCase());
      expect(header.credentials);
      expect(header.headers);
    });
  });

  describe('getHeadersUpload', () => {
    it('should exist', () => {
      expect(getHeadersUpload);
    });
    it('should return headers', () => {
      const mockVerb = 'get';
      const header = getHeadersUpload(mockVerb);
      expect(header.method).toEqual(mockVerb.toUpperCase());
      expect(header.credentials);
      expect(header.headers);
    });
  });

  describe('getBody', () => {
    it('should exist', () => {
      expect(getBody);
    });
    it('should return body', () => {
      const mockVerb = 'get';
      const mockBody = { hi: 'ho' };
      const body = getBody(mockVerb, mockBody);
      expect(body).toEqual({});
    });
    it('should return not body', () => {
      const mockVerb = 'post';
      const mockBody = { hi: 'ho' };
      const header = getBody(mockVerb, mockBody);
      expect(header.body);
    });
  });

  describe('getBodyUpload', () => {
    it('should exist', () => {
      expect(getBodyUpload);
    });
    it('should return body', () => {
      const mockVerb = 'get';
      const mockBody = { hi: 'ho' };
      const body = getBodyUpload(mockVerb, mockBody);
      expect(body).toEqual({});
    });
    it('should return not body', () => {
      const mockVerb = 'post';
      const mockBody = { hi: 'ho' };
      const header = getBodyUpload(mockVerb, mockBody);
      expect(header.body);
    });

    describe('hasScheme() ', () => {
      it('should return true if scheme is detected', () => {
        expect(hasScheme('http://some/image.jpg')).toBe(true);
      });

      it('should return true if scheme is detected and in uppercase', () => {
        expect(hasScheme('HTTP://some/image.jpg')).toBe(true);
      });

      it('should return false if scheme is not detected', () => {
        expect(hasScheme('some/image.jpg')).toBe(false);
      });
    });

    describe('padFacadeURL()', () => {
      let baseUrl;
      let url;
      let expected;

      beforeEach(() => {
        baseUrl = process.env.COORDINATE_BASE_URL;
        process.env.COORDINATE_BASE_URL = 'https://some.domain.com/api';
      });

      afterEach(() => {
        process.env.COORDINATE_BASE_URL = baseUrl;
      });

      it('should pad the Account Service Base URL on given url if the url is relative', () => {
        url = 'com.testContainer.ugroop/download/test.png';
        expected = `${process.env.COORDINATE_BASE_URL}/${url}`;
        expect(padFacadeURL(url)).toBe(expected);
      });

      it('should NOT pad the Account Service Base URL on given url if the url is absolute', () => {
        url =
          'https://some.domain.com/api/com.testContainer.ugroop/download/test.png';
        expect(padFacadeURL(url)).toBe(url);
      });

      it('should return the given url if the base URL is undefined', () => {
        delete process.env.COORDINATE_BASE_URL;
        url = 'com.testContainer.ugroop/download/test.png';
        expect(padFacadeURL(url)).toBe(url);
      });

      it('should return same url if baseURL already exists, and the baseURL is absolute', () => {
        url = 'com.testContainer.ugroop/download/test.png';
        expected = `${process.env.COORDINATE_BASE_URL}/${url}`;
        expect(padFacadeURL(expected)).toBe(expected);
      });

      it('should pad the url even if the baseURL is relative (1)', () => {
        process.env.COORDINATE_BASE_URL = '/api';
        url = 'com.testContainer.ugroop/download/test.png';
        expect(padFacadeURL(url)).toBe(`/api/${url}`);
      });

      it('should pad the url even if the baseURL is relative (2)', () => {
        process.env.COORDINATE_BASE_URL = '/api';
        url = 'com.testContainer.ugroop/api/download/test.png';
        expect(padFacadeURL(url)).toBe(`/api/${url}`);
      });

      it('should NOT pad the url if the baseURL already exists, and the baseURL is relative', () => {
        process.env.COORDINATE_BASE_URL = '/api';
        url = '/api/com.testContainer.ugroop/download/test.png';
        expect(padFacadeURL(url)).toBe(url);
      });

      it('should avoid producing double consecutive backslashes (1)', () => {
        process.env.COORDINATE_BASE_URL = 'https://some.domain.com/api';
        url = 'com.testContainer.ugroop/download/test.png';
        expect(padFacadeURL(url)).toBe(
          'https://some.domain.com/api/com.testContainer.ugroop/download/test.png',
        );
      });

      it('should avoid producing double consecutive backslashes (2)', () => {
        process.env.COORDINATE_BASE_URL = 'https://some.domain.com/api/';
        url = 'com.testContainer.ugroop/download/test.png';
        expect(padFacadeURL(url)).toBe(
          'https://some.domain.com/api/com.testContainer.ugroop/download/test.png',
        );
      });

      it('should avoid producing double consecutive backslashes (3)', () => {
        process.env.COORDINATE_BASE_URL = 'https://some.domain.com/api';
        url = '/com.testContainer.ugroop/download/test.png';
        expect(padFacadeURL(url)).toBe(
          'https://some.domain.com/api/com.testContainer.ugroop/download/test.png',
        );
      });

      it('should avoid producing double consecutive backslashes (4)', () => {
        process.env.COORDINATE_BASE_URL = 'https://some.domain.com/api/';
        url = '/com.testContainer.ugroop/download/test.png';
        expect(padFacadeURL(url)).toBe(
          'https://some.domain.com/api/com.testContainer.ugroop/download/test.png',
        );
      });

      it('should avoid producing double consecutive backslashes (5)', () => {
        process.env.COORDINATE_BASE_URL = '/';
        url = '/com.testContainer.ugroop/download/test.png';
        expect(padFacadeURL(url)).toBe(
          '/com.testContainer.ugroop/download/test.png',
        );
      });
    });
    // test.js
    describe('postMetaInfo', () => {
      it('shall return correct format', () => {
        const result = postMetaInfo({
          x: 1,
          y: 1,
          width: 1,
          height: 1,
        });
        expect(result).toBe('h=1&w=1&x=1&y=1');
      });
      it('handles falsy', () => {
        expect(postMetaInfo()).toBe('');
        expect(postMetaInfo(null)).toBe('');
        expect(postMetaInfo('')).toBe('');
        expect(postMetaInfo(false)).toBe('');
      });
      describe('handle incomplete metainfo ', () => {
        it('x is absent: return empty', () => {
          expect(postMetaInfo({ y: 1, width: 1, height: 1 })).toBe('');
        });
        it('y is absent : return empty', () => {
          expect(postMetaInfo({ x: 1, width: 1, height: 1 })).toBe('');
        });
        it('width is absent : return empty', () => {
          expect(postMetaInfo({ x: 1, y: 1, height: 1 })).toBe('');
        });
        it('height is absent : return empty', () => {
          expect(postMetaInfo({ x: 1, y: 1, width: 1 })).toBe('');
        });
        it('x is null: return empty', () => {
          expect(postMetaInfo({ y: 1, width: 1, height: 1 })).toBe('');
        });
        it('y is null : return empty', () => {
          expect(postMetaInfo({ x: 1, width: 1, height: 1 })).toBe('');
        });
        it('width is null : return empty', () => {
          expect(postMetaInfo({ x: 1, y: 1, height: 1 })).toBe('');
        });
        it('height is null : return empty', () => {
          expect(postMetaInfo({ x: 1, y: 1, width: 1 })).toBe('');
        });
        it('x is 0: return something', () => {
          expect(
            postMetaInfo({
              x: 0,
              y: 1,
              width: 1,
              height: 1,
            }),
          ).toBe('h=1&w=1&x=0&y=1');
        });
        it('y is 0 : return something', () => {
          expect(
            postMetaInfo({
              x: 1,
              y: 0,
              width: 1,
              height: 1,
            }),
          ).toBe('h=1&w=1&x=1&y=0');
        });
        it('width is 0 : return something', () => {
          expect(
            postMetaInfo({
              x: 1,
              y: 1,
              width: 0,
              height: 1,
            }),
          ).toBe('h=1&w=0&x=1&y=1');
        });
        it('height is 0 : return something', () => {
          expect(
            postMetaInfo({
              x: 1,
              y: 1,
              width: 1,
              height: 0,
            }),
          ).toBe('h=0&w=1&x=1&y=1');
        });
      });
    });

    describe('queryImageURL', () => {
      let baseUrl;

      beforeEach(() => {
        baseUrl = process.env.COORDINATE_BASE_URL;
        process.env.COORDINATE_BASE_URL = 'https://some.domain.com/api';
      });

      afterEach(() => {
        process.env.COORDINATE_BASE_URL = baseUrl;
      });

      const file =
        'FileContainers/com.ugroop.personContainer/download/QgaTglhzFA_5cKeLaYuHXSjwi_p5CsiAz8JAHKZgC+A=.jpeg';
      const fileqs =
        'FileContainers/com.ugroop.personContainer/download/QgaTglhzFA_5cKeLaYuHXSjwi_p5CsiAz8JAHKZgC+A=.jpeg?access_token=abcd1234';

      it('shall return file', () => {
        const result = queryImageURL(file);
        expect(result).toBe(file);
      });
      it('shall return correct file with URL', () => {
        const result = queryImageURL(file, true);
        expect(result).toBe(`${process.env.COORDINATE_BASE_URL}/${file}`);
      });
      it('shall return correct file with URL with CropInfo', () => {
        const postMeta = 'h=1&w=1&x=1&y=1';
        const result = queryImageURL(file, true, 0, postMeta);
        expect(result).toBe(
          `${process.env.COORDINATE_BASE_URL}/${file}?${postMeta}`,
        );
      });
      it('shall return correct file with URL with Width (1)', () => {
        const result = queryImageURL(file, true, 400, '');
        const width = 'width=400';
        expect(result).toBe(
          `${process.env.COORDINATE_BASE_URL}/${file}?${width}`,
        );
      });
      it('shall return correct file with URL with Width (2)', () => {
        const result = queryImageURL(file, true, 400, '', '');
        const width = 'width=400';
        expect(result).toBe(
          `${process.env.COORDINATE_BASE_URL}/${file}?${width}`,
        );
      });
      it('shall return correct file with URL with Width (3)', () => {
        const result = queryImageURL(file, true, 400, '', null);
        const width = 'width=400';
        expect(result).toBe(
          `${process.env.COORDINATE_BASE_URL}/${file}?${width}`,
        );
      });
      it('shall return correct file with URL with Width & CropInfo', () => {
        const postMeta = 'h=1&w=1&x=1&y=1';
        const result = queryImageURL(file, true, 400, postMeta);
        const width = 'width=400';
        expect(result).toBe(
          `${process.env.COORDINATE_BASE_URL}/${file}?${postMeta}&${width}`,
        );
      });
      it('shall return correct file with URL with Height & CropInfo', () => {
        const postMeta = 'h=1&w=1&x=1&y=1';
        const result = queryImageURL(file, true, 400, postMeta, 'height');
        const width = 'height=400';
        expect(result).toBe(
          `${process.env.COORDINATE_BASE_URL}/${file}?${postMeta}&${width}`,
        );
      });
      it('shall return correct file with URL with Width, if resizeSide is an invalid value', () => {
        const result = queryImageURL(file, true, 400, '', 'depth');
        const width = 'width=400';
        expect(result).toBe(
          `${process.env.COORDINATE_BASE_URL}/${file}?${width}`,
        );
      });

      it('shall return correct file with URL and rotate', () => {
        const result = queryImageURL(
          file,
          true,
          undefined,
          undefined,
          undefined,
          90,
        );
        expect(result).toBe(
          `${process.env.COORDINATE_BASE_URL}/${file}?rotate=90`,
        );
      });
      it('shall return correct file with URL with CropInfo and rotate', () => {
        const postMeta = 'h=1&w=1&x=1&y=1';
        const result = queryImageURL(file, true, 0, postMeta, undefined, 90);
        expect(result).toBe(
          `${process.env.COORDINATE_BASE_URL}/${file}?${postMeta}&rotate=90`,
        );
      });
      it('shall return correct file with URL with Width and rotate', () => {
        const result = queryImageURL(file, true, 400, '', undefined, 90);
        const width = 'width=400';
        expect(result).toBe(
          `${process.env.COORDINATE_BASE_URL}/${file}?${width}&rotate=90`,
        );
      });
      it('shall return correct file with URL with Width & CropInfo and rotate', () => {
        const postMeta = 'h=1&w=1&x=1&y=1';
        const result = queryImageURL(file, true, 400, postMeta, undefined, 90);
        const width = 'width=400';
        expect(result).toBe(
          `${
            process.env.COORDINATE_BASE_URL
          }/${file}?${postMeta}&${width}&rotate=90`,
        );
      });
      it('shall return correct file with URL with Height & CropInfo and rotate', () => {
        const postMeta = 'h=1&w=1&x=1&y=1';
        const result = queryImageURL(file, true, 400, postMeta, 'height', 90);
        const width = 'height=400';
        expect(result).toBe(
          `${
            process.env.COORDINATE_BASE_URL
          }/${file}?${postMeta}&${width}&rotate=90`,
        );
      });

      it('shall return correct file with URL with CropInfo, even if pad URL is false', () => {
        const postMeta = 'h=1&w=1&x=1&y=1';
        const result = queryImageURL(file, false, 0, postMeta);
        expect(result).toBe(`${file}?${postMeta}`);
      });
      it('shall return correct file with URL with Width, even if pad URL is false', () => {
        const result = queryImageURL(file, false, 400, '');
        const width = 'width=400';
        expect(result).toBe(`${file}?${width}`);
      });
      it('shall return correct file with URL with Width & CropInfo, even if pad URL is false', () => {
        const postMeta = 'h=1&w=1&x=1&y=1';
        const result = queryImageURL(file, false, 400, postMeta);
        const width = 'width=400';
        expect(result).toBe(`${file}?${postMeta}&${width}`);
      });
      it('shall return correct file with URL with Height & CropInfo, even if pad URL is false', () => {
        const postMeta = 'h=1&w=1&x=1&y=1';
        const result = queryImageURL(file, false, 400, postMeta, 'height');
        const width = 'height=400';
        expect(result).toBe(`${file}?${postMeta}&${width}`);
      });

      it('shall return correct file with URL and rotate, even if pad URL is false', () => {
        const result = queryImageURL(
          file,
          false,
          undefined,
          undefined,
          undefined,
          90,
        );
        expect(result).toBe(`${file}?rotate=90`);
      });
      it('shall return correct file with URL with CropInfo and rotate, even if pad URL is false', () => {
        const postMeta = 'h=1&w=1&x=1&y=1';
        const result = queryImageURL(file, false, 0, postMeta, undefined, 90);
        expect(result).toBe(`${file}?${postMeta}&rotate=90`);
      });
      it('shall return correct file with URL with Width and rotate, even if pad URL is false', () => {
        const result = queryImageURL(file, false, 400, '', undefined, 90);
        const width = 'width=400';
        expect(result).toBe(`${file}?${width}&rotate=90`);
      });
      it('shall return correct file with URL with Width & CropInfo and rotate, even if pad URL is false', () => {
        const postMeta = 'h=1&w=1&x=1&y=1';
        const result = queryImageURL(file, false, 400, postMeta, undefined, 90);
        const width = 'width=400';
        expect(result).toBe(`${file}?${postMeta}&${width}&rotate=90`);
      });
      it('shall return correct file with URL with Height & CropInfo and rotate, even if pad URL is false', () => {
        const postMeta = 'h=1&w=1&x=1&y=1';
        const result = queryImageURL(file, false, 400, postMeta, 'height', 90);
        const width = 'height=400';
        expect(result).toBe(`${file}?${postMeta}&${width}&rotate=90`);
      });
      it('shall return correct file with URL with CropInfo, if the file has an existing query string', () => {
        const postMeta = 'h=1&w=1&x=1&y=1';
        const result = queryImageURL(fileqs, true, 0, postMeta);
        expect(result).toBe(
          `${process.env.COORDINATE_BASE_URL}/${fileqs}&${postMeta}`,
        );
      });
      it('shall return correct file with URL with Width, if the file has an existing query string', () => {
        const result = queryImageURL(fileqs, true, 400, '');
        const width = 'width=400';
        expect(result).toBe(
          `${process.env.COORDINATE_BASE_URL}/${fileqs}&${width}`,
        );
      });
      it('shall return correct file with URL with Width & CropInfo, if the file has an existing query string', () => {
        const postMeta = 'h=1&w=1&x=1&y=1';
        const result = queryImageURL(fileqs, true, 400, postMeta);
        const width = 'width=400';
        expect(result).toBe(
          `${process.env.COORDINATE_BASE_URL}/${fileqs}&${postMeta}&${width}`,
        );
      });
      it('shall return correct file with URL with Height & CropInfo, if the file has an existing query string', () => {
        const postMeta = 'h=1&w=1&x=1&y=1';
        const result = queryImageURL(fileqs, true, 400, postMeta, 'height');
        const width = 'height=400';
        expect(result).toBe(
          `${process.env.COORDINATE_BASE_URL}/${fileqs}&${postMeta}&${width}`,
        );
      });
      it('shall return correct file with URL with Width, if resizeSide is an invalid value, and if the file has an existing query string', () => {
        const result = queryImageURL(fileqs, true, 400, '', 'depth');
        const width = 'width=400';
        expect(result).toBe(
          `${process.env.COORDINATE_BASE_URL}/${fileqs}&${width}`,
        );
      });

      it('shall return correct file with URL and rotate', () => {
        const result = queryImageURL(
          fileqs,
          true,
          undefined,
          undefined,
          undefined,
          90,
        );
        expect(result).toBe(
          `${process.env.COORDINATE_BASE_URL}/${fileqs}&rotate=90`,
        );
      });
      it('shall return correct file with URL with CropInfo and rotate, if the file has an existing query string', () => {
        const postMeta = 'h=1&w=1&x=1&y=1';
        const result = queryImageURL(fileqs, true, 0, postMeta, undefined, 90);
        expect(result).toBe(
          `${process.env.COORDINATE_BASE_URL}/${fileqs}&${postMeta}&rotate=90`,
        );
      });
      it('shall return correct file with URL with Width and rotate, if the file has an existing query string', () => {
        const result = queryImageURL(fileqs, true, 400, '', undefined, 90);
        const width = 'width=400';
        expect(result).toBe(
          `${process.env.COORDINATE_BASE_URL}/${fileqs}&${width}&rotate=90`,
        );
      });
      it('shall return correct file with URL with Width & CropInfo and rotate, if the file has an existing query string', () => {
        const postMeta = 'h=1&w=1&x=1&y=1';
        const result = queryImageURL(
          fileqs,
          true,
          400,
          postMeta,
          undefined,
          90,
        );
        const width = 'width=400';
        expect(result).toBe(
          `${
            process.env.COORDINATE_BASE_URL
          }/${fileqs}&${postMeta}&${width}&rotate=90`,
        );
      });
      it('shall return correct file with URL with Height & CropInfo and rotate, if the file has an existing query string', () => {
        const postMeta = 'h=1&w=1&x=1&y=1';
        const result = queryImageURL(fileqs, true, 400, postMeta, 'height', 90);
        const width = 'height=400';
        expect(result).toBe(
          `${
            process.env.COORDINATE_BASE_URL
          }/${fileqs}&${postMeta}&${width}&rotate=90`,
        );
      });

      it('shall return correct file with URL with CropInfo, even if pad URL is false, and if the file has an existing query string', () => {
        const postMeta = 'h=1&w=1&x=1&y=1';
        const result = queryImageURL(fileqs, false, 0, postMeta);
        expect(result).toBe(`${fileqs}&${postMeta}`);
      });
      it('shall return correct file with URL with Width, even if pad URL is false, and if the file has an existing query string', () => {
        const result = queryImageURL(fileqs, false, 400, '');
        const width = 'width=400';
        expect(result).toBe(`${fileqs}&${width}`);
      });
      it('shall return correct file with URL with Width & CropInfo, even if pad URL is false, and if the file has an existing query string', () => {
        const postMeta = 'h=1&w=1&x=1&y=1';
        const result = queryImageURL(fileqs, false, 400, postMeta);
        const width = 'width=400';
        expect(result).toBe(`${fileqs}&${postMeta}&${width}`);
      });
      it('shall return correct file with URL with Height & CropInfo, even if pad URL is false, and if the file has an existing query string', () => {
        const postMeta = 'h=1&w=1&x=1&y=1';
        const result = queryImageURL(fileqs, false, 400, postMeta, 'height');
        const width = 'height=400';
        expect(result).toBe(`${fileqs}&${postMeta}&${width}`);
      });

      it('shall return correct file with URL and rotate, even if pad URL is false, and if the file has an existing query string', () => {
        const result = queryImageURL(
          fileqs,
          false,
          undefined,
          undefined,
          undefined,
          90,
        );
        expect(result).toBe(`${fileqs}&rotate=90`);
      });
      it('shall return correct file with URL with CropInfo and rotate, even if pad URL is false, and if the file has an existing query string', () => {
        const postMeta = 'h=1&w=1&x=1&y=1';
        const result = queryImageURL(fileqs, false, 0, postMeta, undefined, 90);
        expect(result).toBe(`${fileqs}&${postMeta}&rotate=90`);
      });
      it('shall return correct file with URL with Width and rotate, even if pad URL is false, and if the file has an existing query string', () => {
        const result = queryImageURL(fileqs, false, 400, '', undefined, 90);
        const width = 'width=400';
        expect(result).toBe(`${fileqs}&${width}&rotate=90`);
      });
      it('shall return correct file with URL with Width & CropInfo and rotate, even if pad URL is false, and if the file has an existing query string', () => {
        const postMeta = 'h=1&w=1&x=1&y=1';
        const result = queryImageURL(
          fileqs,
          false,
          400,
          postMeta,
          undefined,
          90,
        );
        const width = 'width=400';
        expect(result).toBe(`${fileqs}&${postMeta}&${width}&rotate=90`);
      });
      it('shall return correct file with URL with Height & CropInfo and rotate, even if pad URL is false, and if the file has an existing query string', () => {
        const postMeta = 'h=1&w=1&x=1&y=1';
        const result = queryImageURL(
          fileqs,
          false,
          400,
          postMeta,
          'height',
          90,
        );
        const width = 'height=400';
        expect(result).toBe(`${fileqs}&${postMeta}&${width}&rotate=90`);
      });
    });
  });

  describe('trimContainerScheme', () => {
    it('should trim the photo url and only return the file name', () => {
      const result = trimContainerScheme(
        'FileContainers/Person/download/qqq.png',
        'Person',
      );
      expect(result).toBe('qqq.png');
    });
    it('should return blank string if url is null', () => {
      const result = trimContainerScheme(null);
      expect(result).toBe('');
    });
  });

  describe('horizontalSlide', () => {
    it('should return height if param passed is 90 or 270', () => {
      const result = horizontalSide(90);
      const result2 = horizontalSide(270);
      expect(result).toBe('height');
      expect(result2).toBe('height');
    });
    it('should return width if param passed is not 90 or 270', () => {
      const result = horizontalSide();
      expect(result).toBe('width');
    });
  });
});
