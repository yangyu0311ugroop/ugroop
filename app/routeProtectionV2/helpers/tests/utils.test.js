import { OWNER, URL_HELPERS } from 'appConstants';
import lodash from 'lodash';
import setup, { locationHelper, setupUtils } from '../setup';
import utils from '../utils';

describe('Route Protection Utility Functions', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('isOrgDone', () => {
    it('should be defined', () => {
      expect(typeof setupUtils.isOrgDone).toBe('function');
    });

    it('should return true', () => {
      utils.selectAccountRelatedOrg = jest.fn(() => true);
      lodash.has = jest.fn(() => true);
      expect(setupUtils.isOrgDone()).toBe(true);
    });

    it('should return false - no account', () => {
      utils.selectAccountRelatedOrg = jest.fn(() => false);
      expect(setupUtils.isOrgDone()).toBe(false);
    });
  });

  describe('isPersonDone', () => {
    it('should be defined', () => {
      expect(typeof setupUtils.isPersonDone).toBe('function');
    });

    it('should return true', () => {
      utils.selectAccount = jest.fn(() => true);
      lodash.has = jest.fn(() => true);
      expect(setupUtils.isPersonDone()).toBe(true);
    });

    it('should return false - no account', () => {
      utils.selectAccount = jest.fn(() => false);
      expect(setupUtils.isPersonDone()).toBe(false);
    });

    it('should return false - no customData', () => {
      utils.selectAccount = jest.fn(() => true);
      lodash.has = jest.fn(() => false);
      expect(setupUtils.isPersonDone()).toBe(false);
    });
  });

  describe('isSetupDone', () => {
    it('should be defined', () => {
      expect(typeof setup.isSetupDone).toBe('function');
    });

    it('should return true', () => {
      setupUtils.isOrgDone = jest.fn(() => true);
      setupUtils.isPersonDone = jest.fn(() => true);
      expect(setup.isSetupDone()).toBe(true);
    });

    it('should return false - not org done', () => {
      setupUtils.isPersonDone = jest.fn(() => false);
      expect(setup.isSetupDone()).toBe(false);
    });

    it('should return false - not person done', () => {
      setupUtils.isPersonDone = jest.fn(() => false);
      expect(setup.isSetupDone()).toBe(false);
    });
  });

  describe('isSetupRequired', () => {
    it('should be defined', () => {
      expect(typeof setup.isSetupRequired).toBe('function');
    });

    it('should return false', () => {
      setupUtils.isOrgDone = jest.fn(() => true);
      setupUtils.isPersonDone = jest.fn(() => true);
      expect(setup.isSetupRequired()).toBe(false);
    });

    it('should return true - not org done', () => {
      setupUtils.isPersonDone = jest.fn(() => false);
      expect(setup.isSetupRequired()).toBe(true);
    });

    it('should return true - not person done', () => {
      setupUtils.isPersonDone = jest.fn(() => false);
      expect(setup.isSetupRequired()).toBe(true);
    });
  });

  describe('isFirstStep', () => {
    it('should be defined', () => {
      expect(typeof setup.isFirstStep).toBe('function');
    });

    it('should return true', () => {
      setupUtils.isOrgDone = jest.fn(() => false);
      expect(setup.isFirstStep()).toBe(true);
    });

    it('should return false', () => {
      setupUtils.isOrgDone = jest.fn(() => true);
      expect(setup.isFirstStep()).toBe(false);
    });
  });

  describe('isLastStep', () => {
    it('should be defined', () => {
      expect(typeof setup.isLastStep).toBe('function');
    });

    it('should return true', () => {
      setupUtils.isOrgDone = jest.fn(() => true);
      setupUtils.isPersonDone = jest.fn(() => false);
      expect(setup.isLastStep()).toBe(true);
    });

    it('should return false - org not done', () => {
      setupUtils.isOrgDone = jest.fn(() => false);
      expect(setup.isLastStep()).toBe(false);
    });

    it('should return false - both done', () => {
      setupUtils.isOrgDone = jest.fn(() => true);
      setupUtils.isPersonDone = jest.fn(() => true);
      expect(setup.isLastStep()).toBe(false);
    });
  });

  describe('finishSetupRedirect', () => {
    it('should be defined', () => {
      expect(typeof setup.finishSetupRedirect).toBe('function');
    });

    it('should return query', () => {
      locationHelper.getRedirectQueryParam = jest.fn(() => 123);
      expect(setup.finishSetupRedirect()).toBe(123);
    });

    it('should return /admin', () => {
      locationHelper.getRedirectQueryParam = jest.fn(() => false);
      expect(setup.finishSetupRedirect()).toBe(URL_HELPERS.index());
    });
  });

  describe('hasOrgSetup', () => {
    it('should return true if !array', () => {
      expect(utils.hasOrgSetup()).toBe(true);
      expect(utils.hasOrgSetup(null)).toBe(true);
      expect(utils.hasOrgSetup(123)).toBe(true);
      expect(utils.hasOrgSetup('array')).toBe(true);
    });

    it('should return true if !array length', () => {
      expect(utils.hasOrgSetup([])).toBe(true);
    });

    it('should return true if first time setup', () => {
      expect(utils.hasOrgSetup([{ firstTimeSetup: true }])).toBe(true);
    });

    it('should return true if role is not owner', () => {
      expect(
        utils.hasOrgSetup([{ firstTimeSetup: false, role: 'some role' }]),
      ).toBe(true);
    });

    it('should return false', () => {
      expect(utils.hasOrgSetup([{ firstTimeSetup: false, role: OWNER }])).toBe(
        false,
      );
    });
  });
});
