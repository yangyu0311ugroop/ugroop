import { ATTACHMENT_STORE_SELECTORS } from 'datastore/attachmentStore/selectors';
import { CONFIG, CONFIG_ATTACH } from '../config';

describe('NodeProp/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(CONFIG).toMatchSnapshot();
    });
  });

  describe('CONFIG_ATTACH', () => {
    describe('value', () => {
      it('should return valueKey keyPath', () => {
        expect(CONFIG_ATTACH.value.attachmentName({ attachmentId: 1 })).toEqual(
          ATTACHMENT_STORE_SELECTORS.name({ id: 1 }),
        );
      });
      it('should return attachmentdescription keyPath', () => {
        expect(
          CONFIG_ATTACH.value.attachmentdescription({ attachmentId: 1 }),
        ).toEqual(ATTACHMENT_STORE_SELECTORS.description({ id: 1 }));
      });
    });
  });

  describe('setValue', () => {});
});
