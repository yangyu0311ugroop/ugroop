import { GET_TRAIL, GET_DATA } from '../config';

describe('TrailData/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(GET_TRAIL).toMatchSnapshot();
      expect(GET_DATA).toMatchSnapshot();
    });
  });

  describe('GET_DATA Test', () => {
    it('should work properly', () => {
      expect(GET_DATA.value.types.cacheKey({ trail: 1122 })).toMatchSnapshot();
      expect(
        GET_DATA.value.types.cacheKey({ trail: [11, 22, 33] }),
      ).toMatchSnapshot();
      expect(GET_DATA.value.types.keyPath({ trail: 1122 })).toMatchSnapshot();
      expect(
        GET_DATA.value.types.keyPath({ trail: [11, 22, 33] }),
      ).toMatchSnapshot();
      expect(GET_DATA.value.types.getter(1, 2, 3)).toMatchSnapshot();
    });
  });
});
