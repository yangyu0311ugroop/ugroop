/**
 * Created by stephenkarpinskyj on 30/4/18.
 */

import { DONE_UPLOAD } from './constants';

export const getProgressBarClassName = (classes, progress, dialogState) => {
  if (dialogState === DONE_UPLOAD) {
    return classes.progressBarRushed;
  }
  if (progress === 0) {
    return classes.progressBarInstant;
  }
  return null;
};
