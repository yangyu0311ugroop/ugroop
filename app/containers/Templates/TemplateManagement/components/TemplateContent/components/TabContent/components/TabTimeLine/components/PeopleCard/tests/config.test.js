import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG, CONFIG_0 } from '../config';

describe('PeopleCard/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG_0.value).toBe('object');
    });
    it('contains required properties', () => {
      expect(CONFIG_0.value.peopleTabId({ templateId: 1 })).toEqual(
        NODE_STORE_SELECTORS.calculatedPeopleTabId({ id: 1 }),
      );
    });
    it('contains required properties', () => {
      expect(CONFIG_0.value.interestedPersonIds({ templateId: 1 })).toEqual(
        NODE_STORE_SELECTORS.interestedPeople({ id: 1 }),
      );
    });
    it('contains required properties', () => {
      expect(CONFIG_0.value.participantIds({ templateId: 1 })).toEqual(
        NODE_STORE_SELECTORS.calculatedParticipants({ id: 1 }),
      );
    });
  });
  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });
    it('peopleTabIndex keypath', () => {
      expect(CONFIG.value.peopleTabIndex.keyPath({ templateId: 1 })).toEqual(
        NODE_STORE_SELECTORS.calculatedVisibleChildren({ id: 1 }),
      );
    });
    it('peopleTabIndex cacheKey', () => {
      expect(CONFIG.value.peopleTabIndex.cacheKey({ templateId: 1 })).toEqual(
        'node.1.peopleTabIdIndex',
      );
    });
    it('peopleTabIndex props', () => {
      expect(CONFIG.value.peopleTabIndex.props({ peopleTabId: 1 })).toEqual(1);
    });
    it('peopleTabIndex getter return 0', () => {
      expect(CONFIG.value.peopleTabIndex.getter([1, 2], 2)).toEqual(1);
    });
  });
});
