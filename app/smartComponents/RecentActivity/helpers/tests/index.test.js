import { iconAction } from '../index';

describe('Helper', () => {
  describe('iconAction', () => {
    it('shall return eye icon', () => {
      const res = iconAction('view');
      expect(res).toBe('lnr-eye');
    });
    it('shall return circle icon', () => {
      const res = iconAction('create');
      expect(res).toBe('lnr-plus-circle');
    });
    it('no exists ATM', () => {
      const res = iconAction('other');
      expect(res).toBe('');
    });
  });
});
