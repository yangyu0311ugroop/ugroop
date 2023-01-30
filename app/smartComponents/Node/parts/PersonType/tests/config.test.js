import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { getOrganisationType } from 'datastore/orgStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG_2, CONFIG_1 } from '../config';

describe('smartComponents/Node/parts/PersonType/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG_2).toBeDefined();
    });
  });

  describe('#value', () => {
    it('contains required properties', () => {
      const props = {
        id: 'id',
      };
      expect(CONFIG_2.value.value(props)).toEqual(
        NODE_STORE_SELECTORS.nodeProp({
          id: props.id,
          path: NODE_PATHS.personType,
        }),
      );
      expect(CONFIG_2.value.orgType({ orgId: 1 })).toEqual(
        getOrganisationType({ id: 1 }),
      );
    });
  });

  describe('CONFIG_1 values', () => {
    it('should have orgId', () => {
      expect(CONFIG_1.value.orgId({ nodeId: 1 })).toEqual(
        NODE_STORE_SELECTORS.organisationId({ id: 1 }),
      );
    });
  });
});
