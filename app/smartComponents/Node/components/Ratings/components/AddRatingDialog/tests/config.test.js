import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { CONFIG, GET_NODE_ID, GET_USER_NODES, GET_MY_USER_ID } from '../config';

describe('GET_MY_USER_ID', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof GET_MY_USER_ID).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof GET_MY_USER_ID.value).toBe('object');
    });
  });
});

describe('GET_USER_NODES', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof GET_USER_NODES).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof GET_USER_NODES.value).toBe('object');
    });

    describe('linkedNodeId', () => {
      it('should return selector', () => {
        const result = GET_USER_NODES.value.linkedNodeId({ userNodeIds: [1] });

        expect(result).toEqual(
          INVITATION_STORE_SELECTORS.userNodeUserNodes({ id: 1 }),
        );
      });
    });
  });
});

describe('GET_NODE_ID', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof GET_NODE_ID).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof GET_NODE_ID.value).toBe('object');
    });

    describe('participantId', () => {
      const result = GET_NODE_ID.value.participantId({ linkedNodeId: 1 });

      expect(result).toEqual(
        INVITATION_STORE_SELECTORS.userNodeNodeId({ id: 1 }),
      );
    });
  });
});

describe('CONFIG', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });
  });
});
