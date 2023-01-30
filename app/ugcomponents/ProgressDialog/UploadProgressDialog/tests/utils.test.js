import { getProgressBarClassName } from '../utils';
import { DONE_UPLOAD } from '../constants';

describe('ugcomponents/ProgressDialog/UploadProgressDialog/utils', () => {
  describe('#getProgressBarClassName()', () => {
    const classes = {
      progressBarRushed: 'progressBarRushed',
      progressBarInstant: 'progressBarInstant',
    };

    it('returns correctly when DONE_UPLOAD', () => {
      expect(getProgressBarClassName(classes, 100, DONE_UPLOAD)).toEqual(
        classes.progressBarRushed,
      );
    });
    it('returns correctly when not DONE_UPLOAD and progress is 0', () => {
      expect(getProgressBarClassName(classes, 0, 'not_DONE_UPLOAD')).toEqual(
        classes.progressBarInstant,
      );
    });
    it('else returns null', () => {
      expect(getProgressBarClassName(classes, 1, 'not_DONE_UPLOAD')).toBeNull();
    });
  });
});
