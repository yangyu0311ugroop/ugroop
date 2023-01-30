import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';
import { CONFIG, CONFIG_ORGANISATION_ID } from '../config';

describe('AddEditChecklist/config.js', () => {
  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(CONFIG).toMatchSnapshot();
    });
  });
  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('orgIdNode()', () => {
      it('should return orgIdNode()', () => {
        expect(
          CONFIG_ORGANISATION_ID.value.orgIdNode({ templateId: 2233 }),
        ).toEqual(NODE_STORE_SELECTORS.organisationId({ id: 2233 }));
      });
    });

    describe('parentType()', () => {
      it('should return parentType()', () => {
        expect(
          CONFIG_ORGANISATION_ID.value.parentType.cacheKey({ id: 2233 }),
        ).toEqual(`parentType${2233}`);
      });
    });

    describe('organisationId()', () => {
      it('should return organisationId()', () => {
        expect(
          CONFIG_ORGANISATION_ID.value.organisationId.getter({
            orgIdUrl: 0,
            orgIdNode: 2233,
          }),
        ).toEqual(2233);
      });
    });

    describe('orgRootNodeId()', () => {
      it('should return orgRootNodeId()', () => {
        expect(
          CONFIG.value.orgRootNodeId({
            organisationId: 2233,
          }),
        ).toEqual(ORGANISATION_STORE_SELECTORS.rootNodeId({ id: 2233 }));
      });
    });

    describe('rootNodeId()', () => {
      it('should return rootNodeId()', () => {
        expect(
          CONFIG.value.rootNodeId.getter({
            organisationId: 2,
            orgRootNodeId: 2233,
          }),
        ).toEqual(2233);
      });
    });
  });
});
