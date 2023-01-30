import { CONFIG } from '../config';

describe('Firebase', () => {
  describe('Config', () => {
    it('should exists', () => {
      expect(CONFIG.value.id).toMatchSnapshot();
    });
    it('setValue', () => {
      expect(CONFIG.setValue.ugroopNotifications).toMatchSnapshot();
      expect(CONFIG.setValue.ugroopIds).toMatchSnapshot();
    });
  });
});
