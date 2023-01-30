import { CONFIG, CONFIG2 } from '../config';

describe('DueDate/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(CONFIG).toMatchSnapshot();
    });

    describe('startTime()', () => {
      it('should startTime()', () => {
        expect(CONFIG.value.startTime.cacheKey({ id: 2233 })).toBe(
          '2233.startTime',
        );
        expect(CONFIG.value.startTime.getter()).toBe(null);
        expect(CONFIG.value.startTime.getter({ real: false })).toBe(null);
        expect(
          CONFIG.value.startTime.getter({ real: true, value: 'value' }),
        ).toBe('value');
      });
    });
    describe('CONFIG2.timeNodesCount()', () => {
      it('should timeNodesCount.keypath', () => {
        expect(
          CONFIG2.value.timeNodesCount.keyPath({ startTime: 'some time' }),
        ).toEqual(['nodeStore', 'timeNodes', ['some time']]);
      });
      it('should timeNodesCount.getter', () => {
        expect(CONFIG2.value.timeNodesCount.getter([1])).toBe(1);
      });
      it('should timeNodesCount.getter not eplode', () => {
        expect(CONFIG2.value.timeNodesCount.getter()).toBe(0);
      });
    });
  });
});
