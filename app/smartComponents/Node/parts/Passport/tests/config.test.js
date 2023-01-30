import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { ARRAY_HELPERS } from 'utils/helpers/arrays';
import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
import {
  USER_PASSPORTS_FIELDS,
  USER_PASSPORTS_SELECTOR_CREATOR,
  USER_STORE_SELECTORS,
} from 'datastore/userStore/selectors';
import { CONFIG_1, CONFIG_2, CONFIG_3 } from '../config';

describe('CONFIG', () => {
  describe('CONFIG_1 value', () => {
    it('should have childrenValues', () => {
      expect(CONFIG_1.value.childrenValues).toEqual(
        NODE_STORE_SELECTORS.children,
      );
    });
    describe('nodeValues', () => {
      it('should have keyPath', () => {
        expect(CONFIG_1.value.nodeValues.keyPath({ personId: 1 })).toEqual(
          PERSON_STORE_SELECTORS.passports({ id: 1 }),
        );
      });
      it('should have cacheKey', () => {
        expect(CONFIG_1.value.nodeValues.cacheKey({ personId: 1 })).toEqual(
          `Node.parts.Passport.${1}.values`,
        );
      });
      it('should have props', () => {
        expect(CONFIG_1.value.nodeValues.props).toEqual(null);
      });
      it('should have getter', () => {
        expect(CONFIG_1.value.nodeValues.getter).toEqual(ARRAY_HELPERS.uniq);
      });
    });

    it('should have userPersonId', () => {
      expect(CONFIG_1.value.userPersonId).toEqual(USER_STORE_SELECTORS.id);
    });
    it('should have myId', () => {
      expect(CONFIG_1.value.myId).toEqual(COGNITO_STORE_SELECTORS.myId);
    });
  });

  describe('CONFIG_2', () => {
    describe('passportNodeId', () => {
      it('should have keyPath', () => {
        const childrenValues = [1];
        expect(
          CONFIG_2.value.passportNodeId.keyPath({ childrenValues }),
        ).toEqual(
          childrenValues &&
            childrenValues.map(id => NODE_STORE_SELECTORS.type({ id })),
        );
      });
      it('should have cacheKey', () => {
        const childrenValues = [1];
        expect(
          CONFIG_2.value.passportNodeId.cacheKey({
            userPersonId: 1,
            childrenValues: [1],
          }),
        ).toEqual(
          `Node.parts.Passport.${1}.${childrenValues.toString()}.passportNodeId`,
        );
      });
      it('should have cahceKey with null', () => {
        expect(
          CONFIG_2.value.passportNodeId.cacheKey({
            userPersonId: 1,
            childrenValues: null,
          }),
        ).toEqual(`Node.parts.Passport.${1}.${null}.passportNodeId`);
      });
      it('should have props', () => {
        const childrenValues = [1];
        expect(CONFIG_2.value.passportNodeId.props({ childrenValues })).toEqual(
          childrenValues,
        );
      });
      it('should have getter that matches snapshot', () => {
        const snap = shallow(
          <div>{CONFIG_2.value.passportNodeId.getter([1])}</div>,
        );
        expect(toJSON(snap)).toMatchSnapshot();
      });
    });

    describe('userValues', () => {
      it('should have keyPath', () => {
        expect(CONFIG_2.value.userValues.keyPath({ userPersonId: 1 })).toEqual(
          PERSON_STORE_SELECTORS.passports({ id: 1 }),
        );
      });
      it('should have cacheKey', () => {
        expect(CONFIG_2.value.userValues.cacheKey({ userPersonId: 1 })).toEqual(
          `Node.parts.Passport.${1}.userValues`,
        );
      });
    });
  });

  describe('CONFIG_3', () => {
    it('should have value', () => {
      expect(CONFIG_3.value.value({ passportNodeId: 1 })).toEqual(
        NODE_STORE_SELECTORS.nodeProp({ id: 1, path: NODE_PATHS.passportId }),
      );
    });

    describe('defaultUserValue', () => {
      it('should have keyPath', () => {
        const userValues = [1];
        expect(CONFIG_3.value.defaultUserValue.keyPath({ userValues })).toEqual(
          userValues.map(id =>
            USER_PASSPORTS_SELECTOR_CREATOR(USER_PASSPORTS_FIELDS.isDefault)({
              id,
            }),
          ),
        );
      });
      it('should have cacheKey', () => {
        expect(
          CONFIG_3.value.defaultUserValue.cacheKey({ userPersonId: 1 }),
        ).toEqual(`Node.parts.Passport.${1}.defaultUserValue`);
      });
      it('should have props', () => {
        const userValues = [1];
        expect(CONFIG_3.value.defaultUserValue.props({ userValues })).toEqual(
          userValues,
        );
      });
      it('should getter that matches snapshot', () => {
        const snap = shallow(
          <div>{CONFIG_3.value.defaultUserValue.getter([1])}</div>,
        );
        expect(toJSON(snap)).toMatchSnapshot();
      });
    });
  });
});
