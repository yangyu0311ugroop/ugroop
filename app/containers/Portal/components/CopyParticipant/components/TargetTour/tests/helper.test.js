import { MODEL_HELPERS } from '../helpers';

describe('MODEL_HELPERS', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof MODEL_HELPERS).toBe('object');
    });
  });
  describe('createModel', () => {
    it('should call setValue', () => {
      expect(MODEL_HELPERS.createModel({})).toEqual({});
    });
  });

  describe('createModel', () => {
    it('should call setValue', () => {
      const currentPerson = { firstName: 'a', lastName: 'b', email: 'd' };
      const nodes = [{ customData: currentPerson }];
      expect(MODEL_HELPERS.getParticipant(nodes, currentPerson)).toEqual([
        currentPerson,
      ]);
    });
    it('should call return by email', () => {
      const currentPerson = { firstName: 'a', lastName: 'b', email: 'd' };
      const nodeData = { firstName: 'f', lastName: 'g', email: 'd' };
      const nodes = [{ customData: nodeData }];
      expect(MODEL_HELPERS.getParticipant(nodes, currentPerson)).toEqual([
        nodeData,
      ]);
    });
  });
});
