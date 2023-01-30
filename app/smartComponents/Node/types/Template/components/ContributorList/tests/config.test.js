import { USER_DATA_STORE, SHARED_TEMPLATES_DATASTORE } from 'appConstants';
import { CONFIG } from '../config';

describe('ContributorsList/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof CONFIG.setValue).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('persons', () => {
      describe('keyPath', () => {
        it('should have a particular keyPath based on props', () => {
          expect(
            CONFIG.value.persons({ dataStore: 'sampleDataStore', id: 1 }),
          ).toEqual(['sampleDataStore', 'nodes', 1, 'people']);
        });
        it('should return a particular keyPath when dataStore props is from shared', () => {
          expect(
            CONFIG.value.persons({
              dataStore: SHARED_TEMPLATES_DATASTORE,
              id: 2,
            }),
          ).toEqual([SHARED_TEMPLATES_DATASTORE, 'children', 2, 'people']);
        });
      });
    });

    describe('firstPersonName', () => {
      describe('keyPath', () => {
        it('should have particular keyPaths based on the props passed to it', () => {
          expect(
            CONFIG.value.firstPersonName.keyPath[0]({
              dataStore: 'sample',
              id: 1,
            }),
          ).toEqual(['sample', 'nodes', 1, 'people']);
          expect(
            CONFIG.value.firstPersonName.keyPath[1]({ dataStore: 'sample' }),
          ).toEqual([USER_DATA_STORE, 'people']);
        });
        it('should have particular keyPath if dataStore is SHARED_TEMPLATE_DATASTORE', () => {
          expect(
            CONFIG.value.firstPersonName.keyPath[0]({
              dataStore: SHARED_TEMPLATES_DATASTORE,
              id: 1,
            }),
          ).toEqual([SHARED_TEMPLATES_DATASTORE, 'children', 1, 'people']);
          expect(
            CONFIG.value.firstPersonName.keyPath[1]({
              dataStore: SHARED_TEMPLATES_DATASTORE,
            }),
          ).toEqual([USER_DATA_STORE, 'people']);
        });
      });
      describe('getter', () => {
        it('should return knownAs value if people object exist', () => {
          const peopleIds = [1];
          const people = { 1: { knownAs: 'Paul Cedrick' } };

          expect(
            CONFIG.value.firstPersonName.getter(peopleIds, people),
          ).toEqual({
            firstPersonName: 'Paul Cedrick',
            secondPersonName: '',
          });
        });

        it('should return blank string if people object does not exist', () => {
          const peopleIds = [1];

          expect(CONFIG.value.firstPersonName.getter(peopleIds)).toEqual({
            firstPersonName: '',
            secondPersonName: '',
          });
        });

        it('should return knownAs value even of the second person if people exist', () => {
          const peopleIds = [1, 2];
          const people = {
            1: { knownAs: 'Paul Cedrick' },
            2: { knownAs: 'Paul Cedrick' },
          };

          expect(
            CONFIG.value.firstPersonName.getter(peopleIds, people),
          ).toEqual({
            firstPersonName: 'Paul Cedrick',
            secondPersonName: 'Paul Cedrick',
          });
        });

        it('should return both blank if people object is undefined or null', () => {
          const peopleIds = [1, 2];
          const people = undefined;

          expect(
            CONFIG.value.firstPersonName.getter(peopleIds, people),
          ).toEqual({
            firstPersonName: '',
            secondPersonName: '',
          });
        });

        it('should return both blank if peopleIds is undefined or null', () => {
          const peopleIds = undefined;
          const people = { 1: { knownAs: 'Paul Cedrick' } };

          expect(
            CONFIG.value.firstPersonName.getter(peopleIds, people),
          ).toEqual({
            firstPersonName: '',
            secondPersonName: '',
          });
        });
      });
    });
  });
});
