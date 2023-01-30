import { UPLOADED } from 'appConstants';
import { UPLOAD_PHOTO_UTILS } from '../helpers';

describe('UploadPhotos/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof UPLOAD_PHOTO_UTILS).toBe('object');
    });
  });

  describe('gridSize', () => {
    it('should return count = 1', () => {
      expect(UPLOAD_PHOTO_UTILS.gridSize(1)).toMatchSnapshot();
    });

    it('should return count = 2', () => {
      expect(UPLOAD_PHOTO_UTILS.gridSize(2)).toMatchSnapshot();
    });

    it('should return count = 8', () => {
      expect(UPLOAD_PHOTO_UTILS.gridSize(8)).toMatchSnapshot();
    });
  });

  describe('maxWidth', () => {
    it('should return count = 1', () => {
      expect(UPLOAD_PHOTO_UTILS.maxWidth(2)).toMatchSnapshot();
    });

    it('should return count = 2', () => {
      expect(UPLOAD_PHOTO_UTILS.maxWidth(3)).toMatchSnapshot();
    });
  });

  describe('rotateLeftFn', () => {
    it('should return -90', () => {
      expect(UPLOAD_PHOTO_UTILS.rotateLeftFn()).toBe(-90);
      expect(UPLOAD_PHOTO_UTILS.rotateLeftFn(0)).toBe(-90);
      expect(UPLOAD_PHOTO_UTILS.rotateLeftFn('0')).toBe(-90);
    });

    it('should return 0', () => {
      expect(UPLOAD_PHOTO_UTILS.rotateLeftFn(-270)).toBe(0);
    });

    it('should -90', () => {
      expect(UPLOAD_PHOTO_UTILS.rotateLeftFn(-90)).toBe(-180);
      expect(UPLOAD_PHOTO_UTILS.rotateLeftFn(-180)).toBe(-270);
    });
  });

  describe('rotateRightFn', () => {
    it('should return 90', () => {
      expect(UPLOAD_PHOTO_UTILS.rotateRightFn()).toBe(90);
      expect(UPLOAD_PHOTO_UTILS.rotateRightFn(0)).toBe(90);
      expect(UPLOAD_PHOTO_UTILS.rotateRightFn('0')).toBe(90);
    });

    it('should return 0', () => {
      expect(UPLOAD_PHOTO_UTILS.rotateRightFn(270)).toBe(0);
    });

    it('should +90', () => {
      expect(UPLOAD_PHOTO_UTILS.rotateRightFn(90)).toBe(180);
      expect(UPLOAD_PHOTO_UTILS.rotateRightFn(180)).toBe(270);
    });
  });

  describe('normaliseSubmitData', () => {
    it('should return accu', () => {
      expect(UPLOAD_PHOTO_UTILS.normaliseSubmitData({})(111, 1)).toBe(111);
    });

    it('should return accu 2', () => {
      expect(
        UPLOAD_PHOTO_UTILS.normaliseSubmitData({
          droppedFiles: {
            1: { status: 'uploading' },
          },
        })(111, 1),
      ).toBe(111);
    });

    it('should return accu 3', () => {
      expect(
        UPLOAD_PHOTO_UTILS.normaliseSubmitData({
          droppedFiles: {
            1: { status: UPLOADED, errorMessage: 'wrong' },
          },
        })(111, 1),
      ).toBe(111);
    });

    it('should concat', () => {
      expect(
        UPLOAD_PHOTO_UTILS.normaliseSubmitData({
          droppedFiles: {
            1: { status: UPLOADED, errorMessage: '' },
          },
        })([], 1),
      ).toMatchSnapshot();
    });
  });
});
