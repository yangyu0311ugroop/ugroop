import { UPLOAD_FILE, DESTROY_FILE } from 'apis/constants';
import { requests } from 'utils/request';
import { CONFIG } from '../config';

describe('apis/FileContainer/config', () => {
  requests.fetchWithAuthorisationUpload = jest.fn();
  requests.fetchWithAuthorisation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#requests', () => {
    it('still matches snapshot', () => {
      const file = '3284d33c-dca6-4c4f-9932-e0b2af607738.jpeg';
      CONFIG.requests[DESTROY_FILE]({
        container: 'com.ugroop.personContainer',
        file,
      });
      CONFIG.requests[UPLOAD_FILE]({
        container: 'someContainer',
        data: { x: 1 },
      });
      CONFIG.requests[DESTROY_FILE]({
        container: 'someContainer',
        file: 'qqq',
      });

      expect(
        requests.fetchWithAuthorisationUpload.mock.calls,
      ).toMatchSnapshot();
      expect(requests.fetchWithAuthorisation.mock.calls).toMatchSnapshot();
    });
  });
});
