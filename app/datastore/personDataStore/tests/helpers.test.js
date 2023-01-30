import { USER_DATA_STORE } from 'appConstants';
import { PERSON_STORE_HELPERS } from '../helpers';

describe('PERSON_STORE_HELPERS', () => {
  describe('#pathToPersonInputName', () => {
    it('returns correct name', () => {
      const path = 'some.path';
      expect(PERSON_STORE_HELPERS.pathToPersonInputName(path)).toEqual(
        'person.some.path',
      );
    });
  });

  describe('#selectPersonProperty', () => {
    describe('#keyPath', () => {
      it('returns correct value', () => {
        const selector = ({ id }) => `selector.${id}`;
        const selectors = { [USER_DATA_STORE]: selector };
        expect(
          PERSON_STORE_HELPERS.selectPersonProperty(selectors).keyPath({
            id: 1,
          }),
        ).toEqual(`selector.${1}`);
      });
    });

    describe('#props', () => {
      it('returns correct value', () => {
        const propName = 'prop';
        const props = { [propName]: 'value' };
        expect(
          PERSON_STORE_HELPERS.selectPersonProperty(null, propName).props(
            props,
          ),
        ).toEqual(props[propName]);
      });
    });

    describe('#getter', () => {
      it('returns correct default value', () => {
        const storeValue = 'store';
        expect(
          PERSON_STORE_HELPERS.selectPersonProperty().getter(storeValue),
        ).toEqual(storeValue);
      });
    });
  });

  describe('#pathToMedicalInputName', () => {
    it('returns correct name', () => {
      const path = 'some.path';
      expect(PERSON_STORE_HELPERS.pathToMedicalInputName(path)).toEqual(
        'medical.some.path',
      );
    });
  });

  describe('#pathToDietaryInputName', () => {
    it('returns correct name', () => {
      const path = 'some.path';
      expect(PERSON_STORE_HELPERS.pathToDietaryInputName(path)).toEqual(
        'dietary.some.path',
      );
    });
  });

  describe('#pathToStudentDetailInputName', () => {
    it('returns correct name', () => {
      const path = 'some.path';
      expect(PERSON_STORE_HELPERS.pathToStudentDetailInputName(path)).toEqual(
        'studentDetail.some.path',
      );
    });
  });
});
