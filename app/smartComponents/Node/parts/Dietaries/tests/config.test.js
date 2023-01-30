import { ARRAY_HELPERS } from 'utils/helpers/arrays';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

import { CONFIG_2, CONFIG_1 } from '../config';

describe('config', () => {
  describe('CONFIG_1', () => {
    describe('value', () => {
      it('should have children', () => {
        expect(CONFIG_1.value.children).toEqual(NODE_STORE_SELECTORS.children);
      });

      describe('nodeValues', () => {
        it('should have keyPath', () => {
          expect(CONFIG_1.value.nodeValues.keyPath({ personId: 1 })).toEqual(
            PERSON_STORE_SELECTORS.dietaries({ id: 1 }),
          );
        });
        it('should have cacheKey', () => {
          expect(CONFIG_1.value.nodeValues.cacheKey({ personId: 1 })).toEqual(
            `Node.parts.Dietaries.${1}.nodeValues`,
          );
        });
        it('should have null props', () => {
          expect(CONFIG_1.value.nodeValues.props).toEqual(null);
        });
        it('should have getter', () => {
          expect(CONFIG_1.value.nodeValues.getter).toEqual(ARRAY_HELPERS.uniq);
        });
      });

      it('should have userPersonId', () => {
        expect(CONFIG_1.value.userPersonId).toEqual(USER_STORE_SELECTORS.id);
      });
    });
  });

  describe('CONFIG_2', () => {
    describe('value', () => {
      describe('userValues', () => {
        it('should have keyPath', () => {
          expect(
            CONFIG_2.value.userValues.keyPath({ userPersonId: 1 }),
          ).toEqual(PERSON_STORE_SELECTORS.dietaries({ id: 1 }));
        });
        it('should have cacheKey', () => {
          expect(
            CONFIG_2.value.userValues.cacheKey({ userPersonId: 1 }),
          ).toEqual(`Node.parts.Dietaries.${1}.userValues`);
        });
        it('should have null props', () => {
          expect(CONFIG_2.value.userValues.props).toEqual(null);
        });
        it('should have getter', () => {
          expect(CONFIG_2.value.userValues.getter).toEqual(ARRAY_HELPERS.uniq);
        });
      });
    });
  });
});
