import {
  Authenticated,
  NotAuthenticated,
  SetupDone,
  FirstTime,
  FirstStep,
  LastStep,
} from '../index';

describe('Route Protection', () => {
  describe('Authenticated', () => {
    it('should be defined', () => {
      expect(Authenticated).toBeDefined();
    });
  });

  describe('NotAuthenticated', () => {
    it('should be defined', () => {
      expect(NotAuthenticated).toBeDefined();
    });
  });

  describe('SetupDone', () => {
    it('should be defined', () => {
      expect(SetupDone).toBeDefined();
    });
  });

  describe('FirstTime', () => {
    it('should be defined', () => {
      expect(FirstTime).toBeDefined();
    });
  });

  describe('FirstStep', () => {
    it('should be defined', () => {
      expect(FirstStep).toBeDefined();
    });
  });

  describe('LastStep', () => {
    it('should be defined', () => {
      expect(LastStep).toBeDefined();
    });
  });
});
