import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';
import { CONFIG } from '../config';

describe('Content/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(CONFIG).toMatchSnapshot();
    });
  });
  describe('value', () => {
    it('should have memberIds', () => {
      expect(CONFIG.value.memberIds({ orgId: 999 })).toEqual(
        ORGANISATION_STORE_SELECTORS.getRoleMembersIds({ id: 999 }),
      );
    });
  });
  describe('setValue', () => {
    it('should have nodes', () => {
      expect(CONFIG.setValue.nodes).toEqual(NODE_STORE_SELECTORS.nodes);
    });
  });
});
