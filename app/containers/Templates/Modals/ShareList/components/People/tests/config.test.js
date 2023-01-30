import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { CONFIG_FILTER } from '../config';

describe('People/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(CONFIG_FILTER).toMatchSnapshot();
    });
  });
  describe('value', () => {
    describe('shareListFilter', () => {
      it('should exists', () => {
        expect(CONFIG_FILTER.value.shareListFilter).toEqual(
          TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.shareListFilter,
        );
      });
    });
    describe('selectedOrgId', () => {
      it('props', () => {
        expect(CONFIG_FILTER.value.roles.props({ selectedRole: '1' })).toEqual(
          '1',
        );
      });
      it('getter', () => {
        expect(CONFIG_FILTER.value.roles.getter(1, 1)).toEqual(1);
      });
      it('getter', () => {
        expect(CONFIG_FILTER.value.roles.getter(2, 0)).toEqual(2);
      });
    });
  });
});
