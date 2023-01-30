import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import { CONFIG, CONFIG_2, CONFIG_3 } from '../config';

describe('SelectActivityDetail/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('CONFIG', () => {
    describe('Smoke Test', () => {
      it('should exists', () => {
        expect(typeof CONFIG).toBe('object');
      });
    });

    describe('value', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value).toBe('object');
      });

      describe('details', () => {
        it('should match snapshot', () => {
          expect(CONFIG.value.details({ id: 1 })).toEqual(
            EVENT_STORE_DATA_SELECTORS.eventProp({
              id: 1,
              path: EVENT_PATHS.activityDetails,
            }),
          );
        });
      });
    });
  });

  describe('CONFIG_2', () => {
    describe('Smoke Test', () => {
      it('should exists', () => {
        expect(typeof CONFIG_2).toBe('object');
      });
    });

    describe('value', () => {
      it('should exists', () => {
        expect(typeof CONFIG_2.value).toBe('object');
      });

      describe('detailKeys', () => {
        describe('keyPath', () => {
          it('should return array of keyPaths', () => {
            const details = [1, 2];
            expect(CONFIG_2.value.detailKeys.keyPath({ details })).toEqual([
              EVENT_STORE_DATA_SELECTORS.activityDetailProp({
                id: 1,
                path: EVENT_PATHS.activityDetailKey,
              }),
              EVENT_STORE_DATA_SELECTORS.activityDetailProp({
                id: 2,
                path: EVENT_PATHS.activityDetailKey,
              }),
            ]);
          });
        });

        describe('cacheKey', () => {
          it('should return a particular cacheKey shape if details is not null', () => {
            expect(
              CONFIG_2.value.detailKeys.cacheKey({
                details: [1],
                targetKey: 'start',
                id: 2,
              }),
            ).toEqual(`events.SelectActivityDetail.1.detail.2.start`);
          });

          it('should return a particular cacheKey shape if details is null', () => {
            expect(
              CONFIG_2.value.detailKeys.cacheKey({
                details: null,
                targetKey: 'start',
                id: 2,
              }),
            ).toEqual(`events.SelectActivityDetail.null.detail.2.start`);
          });
        });

        describe('props', () => {
          it('should return null', () => {
            expect(CONFIG_2.value.detailKeys.props()).toEqual(null);
          });
        });

        describe('getter', () => {
          it('should return array of all the arguments returned', () => {
            expect(CONFIG_2.value.detailKeys.getter(1, 2)).toEqual([1, 2]);
          });
        });
      });
    });
  });

  describe('CONFIG_3', () => {
    describe('Smoke Test', () => {
      it('should exists', () => {
        expect(typeof CONFIG_3).toBe('object');
      });
    });

    describe('value', () => {
      it('should exists', () => {
        expect(typeof CONFIG_3.value).toBe('object');
      });

      describe('dataId', () => {
        describe('getter', () => {
          it('should return 0 if targetKey was not present in the details', () => {
            const detailKeys = ['start', 'end'];
            const details = [1, 2];
            const targetKey = 'something';

            expect(
              CONFIG_3.value.dataId.getter({ detailKeys, details, targetKey }),
            ).toBe(0);
          });

          it('should return id of the detail if targetKey was present in the details', () => {
            const detailKeys = ['start', 'end'];
            const details = [1, 2];
            const targetKey = 'start';

            expect(
              CONFIG_3.value.dataId.getter({ detailKeys, details, targetKey }),
            ).toBe(1);
          });
        });
      });
    });
  });
});
