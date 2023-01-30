import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';
import first from 'lodash/first';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG, CONFIG_PARENT, CONFIG_3 } from '../config';

describe('smartComponents/Node/types/Participant/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });
  describe('CONFIG_PARENT', () => {
    it('exists', () => {
      expect(CONFIG_PARENT).toBeDefined();
    });
  });

  describe('value', () => {
    it('has personId keyPath', () => {
      expect(CONFIG.value.personId.keyPath({ id: 1 })).toEqual(
        NODE_STORE_SELECTORS.nodeProp({
          id: 1,
          path: NODE_PATHS.calculatedPeople,
        }),
      );
    });
    it('should have personId getter', () => {
      expect(CONFIG.value.personId.getter([1])).toEqual(first([1]));
    });
    it('has personType', () => {
      expect(CONFIG.value.personType({ id: 1 })).toEqual(
        NODE_STORE_SELECTORS.nodeProp({ id: 1, path: NODE_PATHS.personType }),
      );
    });
    it('has personEmail', () => {
      expect(CONFIG.value.personEmail({ id: 1 })).toEqual(
        NODE_STORE_SELECTORS.nodeProp({ id: 1, path: NODE_PATHS.email }),
      );
    });
    it('has nodeType', () => {
      expect(CONFIG.value.nodeType({ id: 1 })).toEqual(
        NODE_STORE_SELECTORS.type({ id: 1 }),
      );
    });
  });

  describe('CONFIG_3 value', () => {
    it('should have participantEmail', () => {
      expect(CONFIG_3.value.participantEmail({ personId: 1 })).toEqual(
        PERSON_STORE_SELECTORS.email({ id: 1 }),
      );
    });
  });
  describe('#value', () => {
    it('contains required properties', () => {
      expect(CONFIG.value.personType({ id: 1 })).toEqual([
        'nodeStore',
        'nodes',
        1,
        'customData',
        'personType',
      ]);
      expect(CONFIG.value.createdBy({ id: 1 })).toEqual([
        'nodeStore',
        'nodes',
        1,
        'createdBy',
      ]);
      expect(CONFIG.value.personId.keyPath({ id: 1 })).toEqual([
        'nodeStore',
        'nodes',
        1,
        'calculated',
        'people',
      ]);
      expect(CONFIG.value.personId.getter([1, 2, 3])).toEqual(1);
      expect(CONFIG.value.createdBy({ id: 1 })).toEqual([
        'nodeStore',
        'nodes',
        1,
        'createdBy',
      ]);
      expect(CONFIG.value.parentType({ parentId: 1 })).toEqual([
        'nodeStore',
        'nodes',
        1,
        'type',
      ]);
    });
  });
});
