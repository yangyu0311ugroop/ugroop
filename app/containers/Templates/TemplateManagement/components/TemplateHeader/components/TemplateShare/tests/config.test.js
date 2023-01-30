import { NODE_STORE } from 'appConstants';
import { CONFIG } from '../config';

describe('TemplateShare/config.test', () => {
  describe('value', () => {
    it('should match snapshot', () => {
      expect(CONFIG.value).toMatchSnapshot();
    });

    describe('ownerId', () => {
      it('should return correct keyPath', () => {
        expect(CONFIG.value.ownerId({ templateId: 111 })).toEqual([
          NODE_STORE,
          'nodes',
          111,
          'createdBy',
        ]);
      });
    });
  });
});
