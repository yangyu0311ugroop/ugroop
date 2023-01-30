import { INVITATION_STORE, PENDING } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG_1 } from '../config';

describe('Content/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG_1).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG_1.value).toBe('object');
    });

    it('should match result #owner', () => {
      expect(CONFIG_1.value.owner({ templateId: 999 })).toEqual(
        NODE_STORE_SELECTORS.createdBy({ id: 999 }),
      );
    });

    it('should match result #exist', () => {
      expect(CONFIG_1.value.exist.getter('someone')).toBe(true);
    });

    describe('status', () => {
      it('should exists', () => {
        expect(CONFIG_1.value.status).toMatchSnapshot();

        expect(CONFIG_1.value.status.keyPath({ inviteeToken: 999 })).toEqual([
          INVITATION_STORE,
          'shares',
          999,
          'status',
        ]);

        expect(CONFIG_1.value.status.getter(PENDING)).toEqual({
          pending: true,
          accepted: false,
        });
      });
    });
  });
});
