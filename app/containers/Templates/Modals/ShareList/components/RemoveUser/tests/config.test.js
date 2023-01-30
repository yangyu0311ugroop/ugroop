import { TOUR_INTERESTED, TOUR_PARTICIPANT } from 'utils/modelConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG, CONFIG2 } from '../config';

describe('RemoveUser/config.js', () => {
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
    it('#createdBy', () => {
      expect(CONFIG.value.createdBy({ nodeId: 1 })).toEqual(
        NODE_STORE_SELECTORS.createdBy({ id: 1 }),
      );
    });
    it('#closeDetailDlg - participants', () => {
      expect(
        CONFIG.value.closeDetailDlg.getter(true, false, false, {
          role: TOUR_PARTICIPANT,
        }),
      ).toBe(true);
    });
    it('#closeDetailDlg - Interested', () => {
      expect(
        CONFIG.value.closeDetailDlg.getter(false, true, false, {
          role: TOUR_INTERESTED,
        }),
      ).toBe(true);
    });
    it('#closeDetailDlg - Sharelist', () => {
      expect(
        CONFIG.value.closeDetailDlg.getter(false, false, true, {
          role: 'tour_viewer',
        }),
      ).toBe(true);
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(CONFIG.value).toMatchSnapshot();
    });
  });
  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG2).toBe('object');
    });
  });
});
