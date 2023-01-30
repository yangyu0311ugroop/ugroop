import { LOCAL_USER_STORE, NODE_STORE, NODE_STORE_ITEM } from 'appConstants';
import {
  CONFIG,
  organisationTours,
  organisationUpdatedAt,
  CONFIG2,
} from '../config';

describe('Card/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('organisationTours()', () => {
    it('should organisationTours()', () => {
      expect(organisationTours({ toggleId: 2233 })).toMatchSnapshot();
    });
  });

  describe('organisationUpdatedAt()', () => {
    it('should organisationUpdatedAt()', () => {
      expect(organisationUpdatedAt({ toggleId: 2233 })).toMatchSnapshot();
    });
  });

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
    it('should have featuredTours', () => {
      expect(CONFIG.value.featuredTours).toEqual([
        NODE_STORE,
        NODE_STORE_ITEM.FEATURED_TOURS,
      ]);
    });
    it('should have starred tours', () => {
      expect(CONFIG.value.starredTours({ userId: 1 })).toEqual([
        LOCAL_USER_STORE,
        `${1}`,
        'stars',
      ]);
    });
  });

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG2).toBe('object');
    });
  });
  describe('confg2.value', () => {
    it('should exists', () => {
      expect(CONFIG2.value.paxLabel.keyPath({ preferenceId: 1 })).toEqual([
        'organisationDataStore',
        'preferences',
        1,
        'paxLabel',
      ]);
    });
    it('should paxlabel getter return value', () => {
      expect(CONFIG2.value.paxLabel.getter('test')).toEqual('test');
    });
    it('should paxlabel getter return default', () => {
      expect(CONFIG2.value.paxLabel.getter()).toEqual('PAX');
    });
  });
});
