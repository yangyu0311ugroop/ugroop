import { MY_TEMPLATE_VIEWSTORE } from 'containers/Templates/Components/NodeExplorer/constants';
import { CONFIG } from '../config';

describe('EditableFolderCard/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof CONFIG.setValue).toBe('object');
    });
    describe('folderFormOpen', () => {
      it('should be an array', () => {
        expect(CONFIG.setValue.folderFormOpen).toEqual([
          MY_TEMPLATE_VIEWSTORE,
          'folderFormOpen',
        ]);
      });
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });
    describe('currFolderId', () => {
      it('should be an array', () => {
        expect(CONFIG.value.currFolderId).toEqual([
          MY_TEMPLATE_VIEWSTORE,
          'id',
        ]);
      });
    });
  });
});
