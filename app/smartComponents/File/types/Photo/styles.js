import {
  IMAGE_SIZES_CONSTANTS,
  IMAGE_VARIANTS_CONSTANTS,
} from 'smartComponents/File/types/Photo/constants';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grow: {
    flex: '1',
  },
  [IMAGE_SIZES_CONSTANTS.XL]: {
    width: 400,
    height: 400,
  },
  [IMAGE_SIZES_CONSTANTS.LG]: {
    width: 344,
    height: 248,
  },
  [IMAGE_SIZES_CONSTANTS.MEDIUM]: {
    width: 120,
    height: 120,
  },
  [IMAGE_SIZES_CONSTANTS.SMALL]: {
    width: 40,
    height: 40,
  },
  [IMAGE_SIZES_CONSTANTS.NORMAL]: {
    width: 80,
    height: 80,
  },
  [IMAGE_SIZES_CONSTANTS.XS]: {
    width: 32,
    height: 32,
  },
  [IMAGE_SIZES_CONSTANTS.XXS]: {
    width: 24,
    height: 24,
  },
  [IMAGE_SIZES_CONSTANTS.XXXS]: {
    width: 16,
    height: 16,
  },
  [IMAGE_SIZES_CONSTANTS.LANDSCAPE_SM]: {
    maxHeight: 80,
    maxWidth: 360,
    width: 'unset',
  },
  [IMAGE_SIZES_CONSTANTS.AUTO_WIDTH]: {
    width: '100%',
    height: 'auto',
  },
  [IMAGE_SIZES_CONSTANTS.FULL_SIZE]: {
    width: '100%',
    height: '100%',
  },
  [IMAGE_SIZES_CONSTANTS.LANDSCAPE_MD]: {
    height: '100%',
    width: '100%',
  },
  [IMAGE_VARIANTS_CONSTANTS.ROUND]: {
    borderRadius: '50%',
  },
  [IMAGE_VARIANTS_CONSTANTS.SQUARE]: {
    borderRadius: 4,
  },
  [IMAGE_VARIANTS_CONSTANTS.ROUND]: {
    borderRadius: '50%',
  },
  [IMAGE_VARIANTS_CONSTANTS.SQUARE]: {
    borderRadius: 4,
  },
};

export default styles;
