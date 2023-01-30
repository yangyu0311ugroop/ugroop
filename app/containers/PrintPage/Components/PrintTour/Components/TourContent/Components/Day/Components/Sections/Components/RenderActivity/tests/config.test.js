import { NODE_STORE } from 'appConstants';
import { CONFIG } from '../config';

describe('Config Test', () => {
  describe('ActivityIds Test', () => {
    describe('PhotoId', () => {
      it('KeyPath', () => {
        const props = { activityId: 1 };
        expect(CONFIG.value.photoId(props)).toEqual([
          NODE_STORE,
          'nodes',
          1,
          'photos',
          '0',
        ]);
      });
    });
  });
});
