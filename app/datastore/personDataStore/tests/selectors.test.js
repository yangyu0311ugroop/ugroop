import { MEDICAL_SEVERITIES } from 'utils/constants/people';
import { PERSON_STORE_SELECTORS } from '../selectors';

describe('PERSON selectors', () => {
  describe('PERSON_STORE_SELECTORS', () => {
    describe('people', () => {
      describe('person()', () => {
        it('should return keyPath', () => {
          const props = { id: 1 };
          expect(PERSON_STORE_SELECTORS.person(props)).toEqual([
            ...PERSON_STORE_SELECTORS.people,
            props.id,
          ]);
        });
      });

      describe('personProp()', () => {
        it('should return keyPath', () => {
          const props = { id: 1, path: 'path' };
          expect(PERSON_STORE_SELECTORS.personProp(props)).toEqual([
            ...PERSON_STORE_SELECTORS.person(props),
            props.path,
          ]);
        });
      });

      describe('userId()', () => {
        it('should return keyPath', () => {
          const props = { id: 1 };
          expect(PERSON_STORE_SELECTORS.userId(props)).toEqual([
            ...PERSON_STORE_SELECTORS.person(props),
            'userId',
          ]);
        });
      });

      describe('knownAs()', () => {
        it('should return keyPath', () => {
          const props = { id: 1 };
          expect(PERSON_STORE_SELECTORS.knownAs(props)).toEqual([
            ...PERSON_STORE_SELECTORS.person(props),
            'knownAs',
          ]);
        });
      });

      describe('insurancePolicy()', () => {
        it('should return keyPath', () => {
          const props = { id: 1 };
          expect(PERSON_STORE_SELECTORS.insurancePolicy(props)).toEqual([
            ...PERSON_STORE_SELECTORS.person(props),
            'insurancePolicy',
          ]);
        });
      });

      describe('firstName()', () => {
        it('should return keyPath', () => {
          const props = { id: 1 };
          expect(PERSON_STORE_SELECTORS.firstName(props)).toEqual([
            ...PERSON_STORE_SELECTORS.person(props),
            'firstName',
          ]);
        });
      });

      describe('middleName()', () => {
        it('should return keyPath', () => {
          const props = { id: 1 };
          expect(PERSON_STORE_SELECTORS.middleName(props)).toEqual([
            ...PERSON_STORE_SELECTORS.person(props),
            'middleName',
          ]);
        });
      });

      describe('lastName()', () => {
        it('should return keyPath', () => {
          const props = { id: 1 };
          expect(PERSON_STORE_SELECTORS.lastName(props)).toEqual([
            ...PERSON_STORE_SELECTORS.person(props),
            'lastName',
          ]);
        });
      });

      describe('email()', () => {
        it('should return keyPath', () => {
          const props = { id: 1 };
          expect(PERSON_STORE_SELECTORS.email(props)).toEqual([
            ...PERSON_STORE_SELECTORS.person(props),
            'email',
          ]);
        });
      });

      describe('gender()', () => {
        it('should return keyPath', () => {
          const props = { id: 1 };
          expect(PERSON_STORE_SELECTORS.gender(props)).toEqual([
            ...PERSON_STORE_SELECTORS.person(props),
            'gender',
          ]);
        });
      });

      describe('passports()', () => {
        it('should return keyPath', () => {
          const props = { id: 1 };
          expect(PERSON_STORE_SELECTORS.passports(props)).toEqual([
            ...PERSON_STORE_SELECTORS.person(props),
            'passports',
          ]);
        });
      });

      describe('medicals()', () => {
        it('should return keyPath', () => {
          const props = { id: 1 };
          expect(PERSON_STORE_SELECTORS.medicals(props)).toEqual([
            ...PERSON_STORE_SELECTORS.person(props),
            'medicals',
          ]);
        });
      });

      describe('dietaries()', () => {
        it('should return keyPath', () => {
          const props = { id: 1 };
          expect(PERSON_STORE_SELECTORS.dietaries(props)).toEqual([
            ...PERSON_STORE_SELECTORS.person(props),
            'dietaries',
          ]);
        });
      });

      describe('studentDetails()', () => {
        it('should return keyPath', () => {
          const props = { id: 1 };
          expect(PERSON_STORE_SELECTORS.studentDetails(props)).toEqual([
            ...PERSON_STORE_SELECTORS.person(props),
            'studentDetails',
          ]);
        });
      });
      describe('noMedical()', () => {
        it('should return keyPath', () => {
          const props = { id: 1 };
          expect(PERSON_STORE_SELECTORS.noMedical(props)).toEqual([
            ...PERSON_STORE_SELECTORS.noMedical(props),
          ]);
        });
      });
      describe('noDietary()', () => {
        it('should return keyPath', () => {
          const props = { id: 1 };
          expect(PERSON_STORE_SELECTORS.noDietary(props)).toEqual([
            ...PERSON_STORE_SELECTORS.noDietary(props),
          ]);
        });
      });
    });

    describe('medicals', () => {
      describe('medicalPersonId()', () => {
        it('should return keyPath', () => {
          const props = { id: 1 };
          expect(PERSON_STORE_SELECTORS.medicalPersonId(props)).toEqual([
            ...PERSON_STORE_SELECTORS.medical,
            props.id,
            'personId',
          ]);
        });
      });

      describe('medicalDescription()', () => {
        it('should return keyPath', () => {
          const props = { id: 1 };
          expect(PERSON_STORE_SELECTORS.medicalDescription(props)).toEqual([
            ...PERSON_STORE_SELECTORS.medical,
            props.id,
            'description',
          ]);
        });
      });

      describe('medicalSeverity()', () => {
        it('should return keyPath', () => {
          const props = { id: 1 };
          expect(PERSON_STORE_SELECTORS.medicalSeverity(props)).toEqual([
            ...PERSON_STORE_SELECTORS.medical,
            props.id,
            'severity',
          ]);
        });
      });

      describe('medicalAction()', () => {
        it('should return keyPath', () => {
          const props = { id: 1 };
          expect(PERSON_STORE_SELECTORS.medicalAction(props)).toEqual([
            ...PERSON_STORE_SELECTORS.medical,
            props.id,
            'action',
          ]);
        });
      });

      describe('#sortMedicalsBySeverity', () => {
        let sortMedicalsBySeverity;

        beforeEach(() => {
          sortMedicalsBySeverity = PERSON_STORE_SELECTORS.sortMedicalsBySeverity();
        });

        it('returns correct keyPath', () => {
          const props = { ids: [1, 2] };
          expect(sortMedicalsBySeverity.keyPath(props)).toEqual(
            props.ids.map(id => PERSON_STORE_SELECTORS.medicalSeverity({ id })),
          );
        });

        it('returns correct keyPath if empty array', () => {
          const props = {};
          expect(sortMedicalsBySeverity.keyPath(props)).toEqual([]);
        });

        it('returns correct cacheKey', () => {
          const props = { ids: [1] };
          expect(sortMedicalsBySeverity.cacheKey(props)).toEqual(
            'person.ids:[1].sortMedicalsBySeverity',
          );
          expect(sortMedicalsBySeverity.cacheKey({})).toEqual(
            'person.ids:null.sortMedicalsBySeverity',
          );
        });

        it('returns correct props', () => {
          const props = { ids: 'ids' };
          expect(sortMedicalsBySeverity.props(props)).toEqual(props.ids);
        });

        it('getter sorts correctly', () => {
          const selectedSeverities = [
            MEDICAL_SEVERITIES.mild,
            MEDICAL_SEVERITIES.severe,
          ];
          const ids = [1, 2];
          expect(
            sortMedicalsBySeverity.getter(...selectedSeverities, ids),
          ).toEqual([2, 1]);
        });
        it('getter sorts correctly if no array', () => {
          const selectedSeverities = [
            MEDICAL_SEVERITIES.mild,
            MEDICAL_SEVERITIES.severe,
          ];
          const ids = [];
          expect(
            sortMedicalsBySeverity.getter(...selectedSeverities, ids),
          ).toEqual([]);
        });
      });
    });

    describe('dietary', () => {
      describe('dietaryPersonId()', () => {
        it('should return keyPath', () => {
          const props = { id: 1 };
          expect(PERSON_STORE_SELECTORS.dietaryPersonId(props)).toEqual([
            ...PERSON_STORE_SELECTORS.dietary,
            props.id,
            'personId',
          ]);
        });
      });

      describe('dietaryDescription()', () => {
        it('should return keyPath', () => {
          const props = { id: 1 };
          expect(PERSON_STORE_SELECTORS.dietaryDescription(props)).toEqual([
            ...PERSON_STORE_SELECTORS.dietary,
            props.id,
            'description',
          ]);
        });
      });
    });

    describe('studentDetails', () => {
      describe('studentDetailPersonId()', () => {
        it('should return keyPath', () => {
          const props = { id: 1 };
          expect(PERSON_STORE_SELECTORS.studentDetailPersonId(props)).toEqual([
            ...PERSON_STORE_SELECTORS.studentDetail,
            props.id,
            'personId',
          ]);
        });
      });

      describe('studentDetailYear()', () => {
        it('should return keyPath', () => {
          const props = { id: 1 };
          expect(PERSON_STORE_SELECTORS.studentDetailYear(props)).toEqual([
            ...PERSON_STORE_SELECTORS.studentDetail,
            props.id,
            'year',
          ]);
        });
      });

      describe('studentDetailClass()', () => {
        it('should return keyPath', () => {
          const props = { id: 1 };
          expect(PERSON_STORE_SELECTORS.studentDetailClass(props)).toEqual([
            ...PERSON_STORE_SELECTORS.studentDetail,
            props.id,
            'class',
          ]);
        });
      });

      describe('studentDetailNumber()', () => {
        it('should return keyPath', () => {
          const props = { id: 1 };
          expect(PERSON_STORE_SELECTORS.studentDetailNumber(props)).toEqual([
            ...PERSON_STORE_SELECTORS.studentDetail,
            props.id,
            'number',
          ]);
        });
      });

      describe('insurancePolicyPersonId()', () => {
        it('should return keyPath', () => {
          const props = { id: 1 };
          expect(PERSON_STORE_SELECTORS.insurancePolicyPersonId(props)).toEqual(
            ['personDataStore', 'insurancePolicies', 1, 'personId'],
          );
        });
      });
    });
  });
});
