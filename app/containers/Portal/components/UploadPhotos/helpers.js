import { DEFAULT, UPLOADED } from 'appConstants';
import dotProp from 'dot-prop-immutable';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { ACTIVITY } from 'utils/modelConstants';

const gridSize = count =>
  LOGIC_HELPERS.switchCase(count, {
    1: { xs: 12 },
    2: { xs: 12, sm: 6 },
    [DEFAULT]: { xs: 12, sm: 6, md: 4, lg: 3 },
  });

const maxWidth = count => LOGIC_HELPERS.ifElse(count <= 2, 'sm', 'md');

const rotateLeftFn = rotate => {
  if (!rotate || typeof rotate !== 'number') return -90;
  if (rotate === -270) return 0;

  return rotate - 90;
};

const rotateRightFn = rotate => {
  if (!rotate || typeof rotate !== 'number') return 90;
  if (rotate === 270) return 0;

  return rotate + 90;
};

const normaliseSubmitData = ({ id, form, uploadedFiles, droppedFiles }) => (
  accu,
  fileId,
) => {
  const file = dotProp.get(droppedFiles, `${fileId}`);

  if (!file) return accu;

  const { status, rotate, errorMessage } = file;
  const photo = dotProp.get(uploadedFiles, `${fileId}.url`);
  const description = dotProp.get(form, `${fileId}.description`);

  if (status !== UPLOADED || errorMessage) {
    return accu;
  }

  return accu.concat({
    type: ACTIVITY,
    parentNodeId: id,
    customData: {
      description,
      photo,
      metaInfo: {
        rotate,
      },
    },
  });
};

export const UPLOAD_PHOTO_UTILS = {
  gridSize,
  maxWidth,
  rotateLeftFn,
  rotateRightFn,
  normaliseSubmitData,
};
