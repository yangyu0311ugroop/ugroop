import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { CONFIG } from '../config';

const props = {
  type: 'shares',
};

describe('Content/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should match snapshot', () => {
      expect(CONFIG).toMatchSnapshot();
    });
  });
  describe('value.sent', () => {
    it('should match snapshot', () => {
      expect(CONFIG.value.sent(props)).toEqual(
        INVITATION_STORE_SELECTORS.sent(props),
      );
    });
  });
  describe('value.received', () => {
    it('should match snapshot', () => {
      expect(CONFIG.value.received(props)).toEqual(
        INVITATION_STORE_SELECTORS.received(props),
      );
    });
  });
  describe('value.completedToMe', () => {
    it('should match snapshot', () => {
      expect(CONFIG.value.completedToMe(props)).toEqual(
        INVITATION_STORE_SELECTORS.completedToMe(props),
      );
    });
  });
  describe('value.completedFromMe', () => {
    it('should match snapshot', () => {
      expect(CONFIG.value.completedFromMe(props)).toEqual(
        INVITATION_STORE_SELECTORS.completedFromMe(props),
      );
    });
  });
  describe('value.completedFromMe', () => {
    it('should match snapshot', () => {
      expect(CONFIG.value.orgUserIds({ userId: 1 })).toEqual(
        USER_STORE_SELECTORS.orgUsers({ id: 1 }),
      );
    });
  });
});
